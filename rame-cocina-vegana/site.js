/* Ramé Cocina Vegana: mecanica comun (menu, WhatsApp flotante, reveal, anclas). */
(function () {
  "use strict";
  var WA = "524494142106";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.RAME = { WA: WA, reduce: reduce, waUrl: function (m) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(m); } };
  var root = document.documentElement;

  function watch(list, frac, cb) {
    var pend = Array.prototype.slice.call(list); if (!pend.length) return;
    var raf = null;
    function tick() {
      raf = null; var vh = window.innerHeight;
      for (var i = pend.length - 1; i >= 0; i--) {
        var r = pend[i].getBoundingClientRect();
        if (r.top < vh * frac && r.bottom > 0) { var el = pend.splice(i, 1)[0]; cb(el); }
      }
      if (pend.length) sch();
    }
    function sch() { if (!raf) raf = requestAnimationFrame(tick); }
    sch(); addEventListener("scroll", sch, { passive: true }); addEventListener("resize", sch);
  }
  window.RAME.watch = watch;

  /* WhatsApp flotante */
  var f = document.getElementById("wa-float");
  if (f) { f.href = window.RAME.waUrl("Hola Ramé, quiero hacer un pedido."); }
  var zones = document.querySelectorAll("[data-hide-wa]");
  function waHide() {
    var vh = innerHeight, on = false;
    for (var i = 0; i < zones.length; i++) { var r = zones[i].getBoundingClientRect(); if (r.top < vh * 0.85 && r.bottom > vh * 0.15) { on = true; break; } }
    root.classList.toggle("wa-off", on);
  }
  var wr = null; function wsch() { if (!wr) wr = requestAnimationFrame(function () { wr = null; waHide(); }); }
  waHide(); addEventListener("scroll", wsch, { passive: true }); addEventListener("resize", wsch);

  /* Menu */
  var btn = document.querySelector(".menu-btn"), menu = document.getElementById("menu");
  function setMenu(o) {
    document.body.classList.toggle("menu-open", o);
    btn.setAttribute("aria-expanded", o ? "true" : "false");
    menu.setAttribute("aria-hidden", o ? "false" : "true");
    btn.querySelector(".menu-lbl").textContent = o ? "Cerrar" : "Menú";
  }
  if (btn && menu) {
    btn.addEventListener("click", function () { setMenu(!document.body.classList.contains("menu-open")); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  }

  /* Anclas sin scroll-behavior en CSS */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return; var h = a.getAttribute("href"); if (h.length < 2) return;
    var el = document.querySelector(h); if (!el) return;
    e.preventDefault(); if (menu) setMenu(false);
    var top = el.getBoundingClientRect().top + scrollY - (parseInt(getComputedStyle(root).getPropertyValue("--bar"), 10) || 64) - 8;
    scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  });

  /* Reveal: el CSS base es el estado final; se esconde solo si hay JS y se permite movimiento */
  var els = document.querySelectorAll("[data-reveal]");
  if (els.length && !reduce) {
    root.classList.add("rv-on");
    watch(els, 1, function (el) { el.classList.add("is-in"); });
    setTimeout(function () {
      Array.prototype.forEach.call(els, function (el) { var r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) el.classList.add("is-in"); });
    }, 1600);
  }
})();
