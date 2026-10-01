/* 20-obras: carrusel de láminas (swipe, flechas, chips). La lámina que sale se desliza como hoja
   (translateX + 1°, 280 ms) y el cajetín de la que entra se reescribe letra por letra. */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function init() {
    var root = document.getElementById("laminas");
    if (!root) return;
    var lams = Array.prototype.slice.call(root.querySelectorAll(".fg-lam"));
    if (!lams.length) return;
    var chips = Array.prototype.slice.call(document.querySelectorAll(".fg-chip"));
    var idxBtns = Array.prototype.slice.call(document.querySelectorAll(".fg-idx"));
    var idx = 0, busy = false;
    root.classList.add("is-js");
    lams[0].classList.add("is-active");

    function paintChips() {
      var g = lams[idx].getAttribute("data-grupo");
      chips.forEach(function (c) { c.setAttribute("aria-pressed", c.getAttribute("data-chip") === g ? "true" : "false"); });
      idxBtns.forEach(function (b, i) { if (i === idx) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current"); });
    }
    function typeCajetin(lam) {
      var dds = lam.querySelectorAll("dd[data-t]");
      Array.prototype.forEach.call(dds, function (dd) {
        var full = dd.getAttribute("data-t");
        if (reduce) { dd.textContent = full; return; }
        dd.textContent = "";
        var i = 0;
        var t = setInterval(function () {
          i++; dd.textContent = full.slice(0, i);
          if (i >= full.length) { clearInterval(t); }
        }, 22);
        setTimeout(function () { clearInterval(t); dd.textContent = full; }, 900);
      });
    }
    function show(to, dir) {
      if (to === idx || busy) return;
      to = (to + lams.length) % lams.length;
      var from = lams[idx], next = lams[to];
      idx = to; paintChips();
      if (reduce || !from.animate) {
        from.classList.remove("is-active"); next.classList.add("is-active"); typeCajetin(next); return;
      }
      busy = true;
      var sign = dir >= 0 ? 1 : -1;
      next.classList.add("is-active");
      typeCajetin(next);
      next.animate([{ transform: "translateX(" + (sign * 36) + "px) rotate(" + (sign * 1) + "deg)", opacity: 0 }, { transform: "none", opacity: 1 }], { duration: 280, easing: "cubic-bezier(.23,1,.32,1)", delay: 60, fill: "backwards" });
      var out = from.animate([{ transform: "none", opacity: 1 }, { transform: "translateX(" + (-sign * 70) + "px) rotate(" + (-sign * 1) + "deg)", opacity: 0 }], { duration: 280, easing: "cubic-bezier(.77,0,.175,1)", fill: "forwards" });
      var done = function () { from.classList.remove("is-active"); out.cancel(); busy = false; };
      out.onfinish = done;
      setTimeout(function () { if (busy) done(); }, 520);
    }
    function step(d) { show(idx + d, d); }
    function gotoGroup(g) {
      for (var i = 0; i < lams.length; i++) if (lams[i].getAttribute("data-grupo") === g) { show(i, i >= idx ? 1 : -1); return; }
    }
    Array.prototype.forEach.call(document.querySelectorAll(".fg-lam-btn"), function (b) {
      b.addEventListener("click", function () { step(parseInt(b.getAttribute("data-dir"), 10)); });
    });
    idxBtns.forEach(function (b) {
      b.addEventListener("click", function () { var to = parseInt(b.getAttribute("data-i"), 10); show(to, to >= idx ? 1 : -1); });
    });
    chips.forEach(function (c) { c.addEventListener("click", function () { gotoGroup(c.getAttribute("data-chip")); }); });
    window.addEventListener("fedgar:chip", function (e) { gotoGroup(e.detail); });
    root.setAttribute("tabindex", "0");
    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
    });

    /* swipe */
    var sx = 0, sy = 0, tracking = false, st = 0;
    root.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      sx = e.clientX; sy = e.clientY; st = Date.now(); tracking = true;
    });
    root.addEventListener("pointerup", function (e) {
      if (!tracking) return; tracking = false;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.4 && Date.now() - st < 900) step(dx < 0 ? 1 : -1);
    });
    root.addEventListener("pointercancel", function () { tracking = false; });
    paintChips();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
