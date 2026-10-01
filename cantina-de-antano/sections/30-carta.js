(function () {
  "use strict";
  function init() {
    var C = window.Cantina, root = document.getElementById("carta");
    if (!root || !C) return;
    var chips = Array.prototype.slice.call(root.querySelectorAll(".chip"));
    var panels = Array.prototype.slice.call(root.querySelectorAll(".tab-panel"));

    function select(id, focus) {
      chips.forEach(function (c) {
        var on = c.dataset.tab === id;
        c.setAttribute("aria-selected", on ? "true" : "false"); c.tabIndex = on ? 0 : -1;
        if (on && focus) c.focus({ preventScroll: true });
      });
      panels.forEach(function (p) { p.classList.toggle("on", p.dataset.tab === id); });
      bindReparto();
    }
    chips.forEach(function (c, i) {
      c.addEventListener("click", function () { select(c.dataset.tab); c.scrollIntoView({ block: "nearest", inline: "center" }); });
      c.addEventListener("keydown", function (e) {
        var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0; if (!d) return;
        e.preventDefault(); var n = chips[(i + d + chips.length) % chips.length]; select(n.dataset.tab, true);
      });
    });

    /* "+" de cada renglón, etiquetas de cocteles y chip: todos suman a Mi mesa */
    function data(el) { return { id: el.dataset.id, name: el.dataset.name, label: el.dataset.label, price: +el.dataset.price }; }
    root.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest(".plus, .tag"); if (!b) return;
      var host = b.classList.contains("tag") ? b : b.closest("[data-id]");
      if (host) C.add(data(host), 1);
    });
    function paint() {
      Array.prototype.forEach.call(root.querySelectorAll("[data-id]"), function (host) {
        var q = C.qtyOf(host.dataset.id);
        var btn = host.classList.contains("tag") ? host : host.querySelector(".plus");
        var bd = btn && btn.querySelector(".bdg");
        if (!btn) return;
        btn.classList.toggle("is-in", q > 0);
        if (bd) { bd.hidden = q === 0; bd.textContent = q; }
      });
    }
    C.on(paint); paint();

    /* El reparto: los créditos entran uno por uno ligados al scroll (reversible, sin pin) */
    var rep = root.querySelector("[data-reparto]");
    var creds = rep ? Array.prototype.slice.call(rep.querySelectorAll(".cred")) : [];
    var raf = null;
    function upd() {
      raf = null;
      if (!rep || rep.offsetParent === null) return;
      var vh = window.innerHeight;
      creds.forEach(function (c) {
        var top = c.getBoundingClientRect().top;
        var p = (vh * 0.97 - top) / (vh * 0.2);
        c.style.setProperty("--p", Math.max(0, Math.min(1, p)).toFixed(3));
      });
    }
    function sched() { if (!raf) raf = requestAnimationFrame(upd); }
    function bindReparto() { if (rep) { rep.classList.add("is-rep"); sched(); } }
    window.addEventListener("scroll", sched, { passive: true }); window.addEventListener("resize", sched);
    bindReparto();

    /* Tira de fotogramas: avanza con el scroll de la página (reversible) hasta que la persona la desliza con el dedo */
    var film = document.getElementById("film"), track = document.getElementById("film-track");
    if (film && track) {
      var manual = false, fraf = null, auto = false;
      ["touchstart", "pointerdown", "wheel", "keydown"].forEach(function (ev) { track.addEventListener(ev, function () { manual = true; }, { passive: true }); });
      track.addEventListener("scroll", function () { film.style.setProperty("--cx", track.scrollLeft); }, { passive: true });
      function fupd() {
        fraf = null; if (manual || document.documentElement.classList.contains("rm")) return;
        var r = film.getBoundingClientRect(), vh = window.innerHeight;
        if (r.bottom < 0 || r.top > vh) return;
        var p = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
        track.scrollLeft = p * (track.scrollWidth - track.clientWidth);
      }
      window.addEventListener("scroll", function () { if (!fraf) fraf = requestAnimationFrame(fupd); }, { passive: true });
      fupd();
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
