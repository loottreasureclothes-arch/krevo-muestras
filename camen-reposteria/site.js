/* Camen Repostería: mecánica base (menú, WhatsApp, reveal, anclas, flotante). */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var body = document.body;
  function waUrl(num, msg) { return "https://wa.me/" + num + "?text=" + encodeURIComponent(msg); }
  window.CamenWa = waUrl;

  /* WhatsApp: cada botón nace con su href real; aquí solo se confirma */
  function initWa() {
    var l = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < l.length; i++) {
      var n = l[i].getAttribute("data-wa-num");
      if (n) { l[i].href = waUrl(n, l[i].getAttribute("data-wa")); l[i].target = "_blank"; l[i].rel = "noopener"; }
    }
  }

  var btn = document.querySelector(".cm-menu-btn"), menu = document.getElementById("cm-menu");
  function setMenu(o) {
    if (!btn || !menu) return;
    body.classList.toggle("menu-open", o);
    btn.setAttribute("aria-expanded", o ? "true" : "false");
    menu.setAttribute("aria-hidden", o ? "false" : "true");
    btn.querySelector(".cm-menu-lbl").textContent = o ? "Cerrar" : "Menú";
  }
  function initMenu() { if (btn) btn.addEventListener("click", function () { setMenu(!body.classList.contains("menu-open")); }); }

  /* Reveal (visible a los 1.6 s pase lo que pase: lo asegura el script inline del head) */
  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (!els.length) return;
    if (reduce || !("IntersectionObserver" in window)) { for (var i = 0; i < els.length; i++) els[i].classList.add("in"); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    for (var j = 0; j < els.length; j++) io.observe(els[j]);
  }

  /* Anclas con scroll JS (sin scroll-behavior en CSS) */
  function go(el) {
    var bar = document.querySelector(".cm-head");
    var top = el.getBoundingClientRect().top + window.scrollY - (bar ? bar.offsetHeight + 8 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  window.CamenIr = go;
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var h = a.getAttribute("href");
      if (h.length < 2) return;
      var el = document.querySelector(h);
      if (!el) return;
      e.preventDefault(); setMenu(false); go(el);
      if (history.replaceState) history.replaceState(null, "", h);
    });
  }

  /* El flotante se esconde donde ya hay un CTA grande */
  function initHide() {
    var z = document.querySelectorAll("[data-hide-wa]");
    if (!z.length) return;
    var raf = null;
    function up() {
      raf = null;
      var vh = window.innerHeight, on = false;
      for (var i = 0; i < z.length; i++) { var r = z[i].getBoundingClientRect(); if (r.top < vh * 0.85 && r.bottom > vh * 0.15) { on = true; break; } }
      body.classList.toggle("wa-off", on);
    }
    function s() { if (!raf) raf = requestAnimationFrame(up); }
    s(); window.addEventListener("scroll", s, { passive: true }); window.addEventListener("resize", s);
  }

  function init() { initWa(); initMenu(); initReveal(); initAnchors(); initHide(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
