/* Algarabia: menu, reveal (visible a los 1.6 s pase lo que pase), anclas suaves y flotante de Llamar. */
(function () {
  "use strict";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var body = document.body;

  function initMenu() {
    var btn = document.querySelector(".hd-menu-btn"), menu = document.getElementById("hd-menu");
    if (!btn || !menu) return;
    var lbl = btn.querySelector(".hd-menu-lbl"), links = menu.querySelectorAll("a");
    function set(open) {
      if (open === body.classList.contains("hd-menu-open")) return;
      body.classList.toggle("hd-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (lbl) lbl.textContent = open ? "Cerrar" : "Menú";
    }
    btn.addEventListener("click", function () { set(!body.classList.contains("hd-menu-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest && e.target.closest("a")) set(false); else if (e.target === menu || e.target.classList.contains("hd-menu-nav")) set(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
    window.addEventListener("resize", function () { if (window.innerWidth >= 1024) set(false); });
    window.__closeMenu = function () { set(false); };
  }

  /* vigia por sondeo (no depende de IntersectionObserver) */
  function watch(list, frac, cb) {
    var pending = Array.prototype.slice.call(list), raf = null;
    if (!pending.length) return;
    function tick() {
      raf = null;
      var vh = window.innerHeight || 800;
      for (var i = pending.length - 1; i >= 0; i--) {
        var r = pending[i].getBoundingClientRect();
        if (r.top < vh * frac && r.bottom > 0) { var el = pending[i]; pending.splice(i, 1); cb(el); }
      }
      if (pending.length) sched();
    }
    function sched() { if (!raf) raf = requestAnimationFrame(tick); }
    sched();
    window.addEventListener("scroll", sched, { passive: true });
    window.addEventListener("resize", sched);
  }
  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (reduce) { Array.prototype.forEach.call(els, function (e) { e.classList.add("in"); }); return; }
    var n = 0;
    watch(els, 0.92, function (el) {
      var d = (n++ % 3) * 70;
      el.style.transitionDelay = d + "ms";
      el.classList.add("in");
      setTimeout(function () { el.style.transitionDelay = ""; }, 900 + d);
    });
  }

  function initFab() {
    var zones = document.querySelectorAll("#visitanos .btns, #pizarron .board-btns, .foot-btns, .hero .btns");
    if (!zones.length) return;
    var raf = null;
    function upd() {
      raf = null;
      var vh = window.innerHeight || 800, on = false;
      for (var i = 0; i < zones.length; i++) { var r = zones[i].getBoundingClientRect(); if (r.top < vh * 0.9 && r.bottom > 0) { on = true; break; } }
      body.classList.toggle("fab-off", on);
    }
    function sched() { if (!raf) raf = requestAnimationFrame(upd); }
    window.addEventListener("scroll", sched, { passive: true });
    window.addEventListener("resize", sched);
    upd();
  }

  function go(el) {
    var hd = document.getElementById("hd");
    var top = el.getBoundingClientRect().top + window.scrollY - (hd ? hd.offsetHeight : 0) - 6;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href");
      if (href.length < 2) return;
      var el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      if (window.__closeMenu) window.__closeMenu();
      go(el);
      if (history.replaceState) history.replaceState(null, "", href);
    });
  }
  function init() { initMenu(); initReveal(); initFab(); initAnchors(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
