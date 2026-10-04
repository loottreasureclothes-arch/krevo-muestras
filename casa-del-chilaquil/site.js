/* La Casa del Chilaquil: header, menú, WhatsApp, reveal, anclas. */
(function () {
  "use strict";
  var WA = "524493770498";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.CC = { WA: WA, waUrl: function (msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); } };

  /* el href real ya viene en el HTML; aquí solo se confirma y se abre en pestaña nueva */
  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) {
      links[i].href = CC.waUrl(links[i].getAttribute("data-wa"));
      links[i].target = "_blank"; links[i].rel = "noopener";
    }
  }

  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".cc-menu-btn"), menu = document.getElementById("cc-menu");
    if (!btn || !menu) return;
    var lbl = btn.querySelector(".cc-menu-lbl"), links = menu.querySelectorAll("a");
    function set(open) {
      document.body.classList.toggle("cc-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      lbl.textContent = open ? "Cerrar" : "Menú";
      document.body.style.overflow = open ? "hidden" : "";
      if (open) setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 80);
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!document.body.classList.contains("cc-menu-open")); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { set(false); btn.focus(); } });
  }

  /* el flotante se esconde donde ya hay un botón verde grande */
  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa]");
    if (!zones.length) return;
    var raf = null;
    function update() {
      var vh = window.innerHeight, on = false;
      for (var i = 0; i < zones.length; i++) {
        var r = zones[i].getBoundingClientRect();
        if (r.top < vh * 0.85 && r.bottom > vh * 0.1) { on = true; break; }
      }
      document.body.classList.toggle("cc-wa-off", on);
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(function () { raf = null; update(); }); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }

  /* reveal con rAF (sin IntersectionObserver) */
  function initReveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll("[data-cc-reveal]"));
    if (!els.length) return;
    function show(el) { el.classList.add("is-in"); }
    if (reduce) { els.forEach(show); return; }
    var raf = null;
    function tick() {
      raf = null;
      var vh = window.innerHeight;
      for (var i = els.length - 1; i >= 0; i--) {
        var r = els[i].getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) { show(els[i]); els.splice(i, 1); }
      }
    }
    function schedule() { if (!raf && els.length) raf = requestAnimationFrame(tick); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
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
      closeMenu();
      var head = document.querySelector(".cc-header");
      var top = el.getBoundingClientRect().top + window.scrollY - (head ? head.offsetHeight - 6 : 0);
      window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
      if (history.replaceState) history.replaceState(null, "", href);
    });
  }

  function init() { initWa(); initMenu(); initWaHide(); initReveal(); initAnchors(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
