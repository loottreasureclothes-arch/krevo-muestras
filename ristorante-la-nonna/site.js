/* La Nonna: mecánica común (menú, WhatsApp, reveal, anclas). Cada sección trae su propio JS. */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var WA = "524492935602";
  function initWa() {
    var l = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < l.length; i++) { l[i].href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(l[i].getAttribute("data-wa")); }
  }
  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".ln-menu-btn"), menu = document.getElementById("ln-menu");
    if (!btn || !menu) return;
    var b = document.body, lbl = btn.querySelector(".ln-menu-lbl"), links = menu.querySelectorAll("a");
    function set(o) {
      if (o === b.classList.contains("ln-menu-open")) return;
      b.classList.toggle("ln-menu-open", o);
      btn.setAttribute("aria-expanded", o ? "true" : "false");
      menu.setAttribute("aria-hidden", o ? "false" : "true");
      if (lbl) lbl.textContent = o ? "Cerrar" : "Menú";
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!b.classList.contains("ln-menu-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest && e.target.closest("a")) set(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }
  function initWaHide() {
    var zones = document.querySelectorAll("#mesa, #visita, #completar, .ln-foot");
    var raf = null;
    function upd() {
      raf = null;
      var vh = window.innerHeight, on = false;
      for (var i = 0; i < zones.length; i++) { var r = zones[i].getBoundingClientRect(); if (r.top < vh * 0.8 && r.bottom > 0) { on = true; break; } }
      document.body.classList.toggle("ln-wa-off", on);
    }
    function s() { if (!raf) raf = requestAnimationFrame(upd); }
    s(); window.addEventListener("scroll", s, { passive: true }); window.addEventListener("resize", s);
  }
  function initReveal() {
    var els = [].slice.call(document.querySelectorAll("[data-reveal]"));
    if (!els.length) return;
    function show(el) { el.classList.add("is-in"); }
    if (reduce) { els.forEach(show); return; }
    var pending = els.slice(), raf = null;
    function tick() {
      raf = null;
      var vh = window.innerHeight;
      for (var i = pending.length - 1; i >= 0; i--) {
        var r = pending[i].getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) { var el = pending.splice(i, 1)[0]; show(el); }
      }
      if (pending.length) s();
    }
    function s() { if (!raf) raf = requestAnimationFrame(tick); }
    s(); window.addEventListener("scroll", s, { passive: true }); window.addEventListener("resize", s);
    setTimeout(function () { els.forEach(show); }, 1600);
  }
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var h = a.getAttribute("href"); if (h.length < 2) return;
      var el = document.querySelector(h); if (!el) return;
      e.preventDefault(); closeMenu();
      var top = el.getBoundingClientRect().top + window.scrollY - (h === "#horno" ? 0 : 56);
      window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
    });
  }
  function init() { initWa(); initMenu(); initWaHide(); initReveal(); initAnchors(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
