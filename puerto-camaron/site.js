/* Puerto Camarón: menú, reveal, WhatsApp flotante, ancla suave, horario */
(function () {
  "use strict";
  var WA = "524499179428";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.PC = {
    WA: WA,
    reduce: reduce,
    wa: function (t) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(t); },
    money: function (n) { return "$" + n.toLocaleString("es-MX"); },
    go: go
  };
  function go(el) {
    var top = el.getBoundingClientRect().top + window.scrollY - (document.querySelector(".pc-bar").offsetHeight + 10);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  function closeMenu() { setMenu(false); }
  function setMenu(open) {
    var b = document.body, btn = document.querySelector(".pc-menu-btn"), m = document.getElementById("pc-menu");
    b.classList.toggle("pc-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    m.setAttribute("aria-hidden", open ? "false" : "true");
    btn.querySelector(".pc-menu-lbl").textContent = open ? "Cerrar" : "Menú";
  }
  function initMenu() {
    var btn = document.querySelector(".pc-menu-btn");
    btn.addEventListener("click", function () { setMenu(!document.body.classList.contains("pc-open")); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  }
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      var h = a.getAttribute("href");
      if (h.length < 2) return;
      var el = document.querySelector(h);
      if (!el) return;
      e.preventDefault(); closeMenu(); go(el);
    });
  }
  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa]");
    function up() {
      var vh = window.innerHeight, on = false;
      for (var i = 0; i < zones.length; i++) { var r = zones[i].getBoundingClientRect(); if (r.top < vh * .85 && r.bottom > 60) { on = true; break; } }
      document.body.classList.toggle("pc-wa-off", on);
    }
    var raf = 0;
    function sch() { if (!raf) raf = requestAnimationFrame(function () { raf = 0; up(); }); }
    window.addEventListener("scroll", sch, { passive: true }); window.addEventListener("resize", sch); sch();
  }
  function initReveal() {
    var els = [].slice.call(document.querySelectorAll("[data-reveal]"));
    if (!els.length || reduce) return;
    document.documentElement.classList.add("pc-js");
    var pending = els.slice(), raf = 0;
    function show(el) { el.classList.add("is-in"); }
    function tick() {
      raf = 0; var vh = window.innerHeight;
      for (var i = pending.length - 1; i >= 0; i--) { var r = pending[i].getBoundingClientRect(); if (r.top < vh * .92 && r.bottom > 0) { show(pending[i]); pending.splice(i, 1); } }
    }
    function sch() { if (!raf) raf = requestAnimationFrame(tick); }
    window.addEventListener("scroll", sch, { passive: true }); window.addEventListener("resize", sch); sch();
    setTimeout(function () { els.forEach(show); }, 1600);
  }
  function init() { initMenu(); initAnchors(); initWaHide(); initReveal(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
