/* Pelicanos: menú, flotante de llamar, reveal por sondeo y Abierto ahora. */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var body = document.body;

  function initMenu() {
    var btn = document.querySelector(".hd-btn"), menu = document.getElementById("menu");
    if (!btn || !menu) return;
    var lbl = btn.querySelector(".hd-lbl");
    function set(o) {
      body.classList.toggle("menu-open", o);
      btn.setAttribute("aria-expanded", o ? "true" : "false");
      menu.setAttribute("aria-hidden", o ? "false" : "true");
      if (lbl) lbl.textContent = o ? "Cerrar" : "Menú";
      document.documentElement.style.overflow = o ? "hidden" : "";
    }
    btn.addEventListener("click", function () { set(!body.classList.contains("menu-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a") || e.target === menu) set(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
    window.PelMenuClose = function () { set(false); };
  }

  function watch(list, frac, cb) {
    var pend = Array.prototype.slice.call(list); if (!pend.length) return;
    var raf = null;
    function tick() {
      raf = null; var vh = window.innerHeight;
      for (var i = pend.length - 1; i >= 0; i--) {
        var r = pend[i].getBoundingClientRect();
        if (r.top < vh * frac && r.bottom > 0) { var el = pend.splice(i, 1)[0]; cb(el); }
      }
      if (pend.length) sched();
    }
    function sched() { if (!raf) raf = requestAnimationFrame(tick); }
    sched(); window.addEventListener("scroll", sched, { passive: true }); window.addEventListener("resize", sched);
  }

  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (reduce) { Array.prototype.forEach.call(els, function (e) { e.classList.add("is-in"); }); return; }
    watch(els, 1.0, function (el) {
      var d = parseInt(el.getAttribute("data-d") || "0", 10);
      setTimeout(function () { el.classList.add("is-in"); }, d);
    });
    /* respaldo: lo que ya esta en pantalla a los 1.6 s se muestra pase lo que pase */
    setTimeout(function () {
      Array.prototype.forEach.call(els, function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("is-in");
      });
    }, 1600);
  }

  function initFab() {
    var fab = document.querySelector(".fab"), zones = document.querySelectorAll("[data-hide-fab]");
    if (!fab || !zones.length) return;
    function upd() {
      var vh = window.innerHeight, on = false;
      for (var i = 0; i < zones.length; i++) { var r = zones[i].getBoundingClientRect(); if (r.top < vh * 0.85 && r.bottom > 0) { on = true; break; } }
      fab.classList.toggle("fab-off", on);
    }
    var raf = null; function s() { if (!raf) raf = requestAnimationFrame(function () { raf = null; upd(); }); }
    s(); window.addEventListener("scroll", s, { passive: true }); window.addEventListener("resize", s);
  }

  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var h = a.getAttribute("href"); if (h.length < 2) return;
      var el = document.querySelector(h); if (!el) return;
      e.preventDefault();
      var top = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
    });
  }

  /* Abierto ahora: 10:00 a 18:00 todos los dias, hora de Aguascalientes */
  function initAbierto() {
    var out = document.querySelectorAll("[data-abierto]"); if (!out.length) return;
    var h = 12, m = 0, dow = 0;
    try {
      var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", hour: "numeric", minute: "numeric", hour12: false, weekday: "short" }).formatToParts(new Date());
      p.forEach(function (x) { if (x.type === "hour") h = parseInt(x.value, 10) % 24; if (x.type === "minute") m = parseInt(x.value, 10); if (x.type === "weekday") dow = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(x.value); });
    } catch (e) { var d = new Date(); h = d.getHours(); m = d.getMinutes(); dow = d.getDay(); }
    var mins = h * 60 + m, open = mins >= 600 && mins < 1080;
    Array.prototype.forEach.call(out, function (o) {
      o.classList.toggle("is-open", open);
      o.textContent = open ? "Abierto ahora, cerramos a las 6 pm" : (mins < 600 ? "Cerrado ahora, abrimos hoy a las 10 am" : "Cerrado ahora, abrimos mañana a las 10 am");
    });
    var rows = document.querySelectorAll("[data-dow]");
    Array.prototype.forEach.call(rows, function (r) { if (parseInt(r.getAttribute("data-dow"), 10) === dow) r.classList.add("hoy"); });
  }

  function init() { initMenu(); initReveal(); initFab(); initAnchors(); initAbierto(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
