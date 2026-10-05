/* EG Salón de Belleza: mecánica común (header, menú, WhatsApp, reveal, anclas). */
(function () {
  "use strict";
  var WA = "5214492897006";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.EG = { WA: WA, waUrl: function (m) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(m); } };

  function initWa() { /* los href ya nacen reales en el HTML; aquí solo se abren en pestaña nueva */
    Array.prototype.forEach.call(document.querySelectorAll("[data-wa]"), function (a) { a.target = "_blank"; a.rel = "noopener"; });
  }
  function initHeader() {
    var bar = document.getElementById("eg-bar"), t = false;
    if (!bar) return;
    function u() { t = false; bar.classList.toggle("is-compact", (window.scrollY || 0) > 12); }
    window.addEventListener("scroll", function () { if (!t) { t = true; requestAnimationFrame(u); } }, { passive: true });
    u();
  }
  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".eg-menu-btn"), menu = document.getElementById("eg-menu");
    if (!btn || !menu) return;
    var body = document.body, lbl = btn.querySelector(".eg-menu-lbl"), links = menu.querySelectorAll("a");
    Array.prototype.forEach.call(menu.querySelectorAll(".eg-menu-nav>a"), function (a, i) { a.style.setProperty("--i", i); });
    function set(o) {
      if (o === body.classList.contains("eg-menu-open")) return;
      body.classList.toggle("eg-menu-open", o);
      btn.setAttribute("aria-expanded", o ? "true" : "false");
      menu.setAttribute("aria-hidden", o ? "false" : "true");
      if (lbl) lbl.textContent = o ? "Cerrar" : "Menú";
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("eg-menu-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest && e.target.closest("a")) set(false); else if (e.target === menu || e.target.classList.contains("eg-menu-nav")) set(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }
  function initWaHide() {
    var z = document.querySelectorAll("[data-hide-wa]");
    if (!z.length) return;
    var r = null;
    function u() {
      r = null;
      var vh = window.innerHeight, on = false;
      for (var i = 0; i < z.length; i++) { var b = z[i].getBoundingClientRect(); if (b.top < vh * 0.75 && b.bottom > 0) { on = true; break; } }
      document.body.classList.toggle("eg-wa-off", on);
    }
    function s() { if (!r) r = requestAnimationFrame(u); }
    s(); window.addEventListener("scroll", s, { passive: true }); window.addEventListener("resize", s);
  }
  function initReveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
    if (!els.length) return;
    if (reduce) { els.forEach(function (e) { e.classList.add("is-in"); }); return; }
    var r = null;
    function u() {
      r = null;
      var vh = window.innerHeight;
      for (var i = els.length - 1; i >= 0; i--) {
        var b = els[i].getBoundingClientRect();
        if (b.top < vh * 0.92 && b.bottom > 0) { els[i].classList.add("is-in"); els.splice(i, 1); }
      }
      if (els.length && !r) { /* se reevalúa con el scroll */ }
    }
    function s() { if (!r) r = requestAnimationFrame(u); }
    s(); window.addEventListener("scroll", s, { passive: true }); window.addEventListener("resize", s);
  }
  function go(el) {
    var bar = document.getElementById("eg-bar");
    var top = el.getBoundingClientRect().top + window.scrollY - (bar ? bar.offsetHeight - 6 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var h = a.getAttribute("href");
      if (h.length < 2) return;
      var el = document.querySelector(h);
      if (!el) return;
      e.preventDefault(); closeMenu(); go(el);
      if (history.replaceState) history.replaceState(null, "", h);
    });
  }
  function init() { initWa(); initHeader(); initMenu(); initWaHide(); initReveal(); initAnchors(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
