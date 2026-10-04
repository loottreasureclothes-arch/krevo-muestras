/* Tikin Xic: mecanica comun (wa, menu, reveal, anclas, wa flotante, estado abierto). */
(function () {
  "use strict";
  var WA = "524493475594";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.TK = window.TK || {};
  window.TK.waUrl = function (msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); };

  function initWa() {
    var l = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < l.length; i++) { l[i].href = window.TK.waUrl(l[i].getAttribute("data-wa")); l[i].target = "_blank"; l[i].rel = "noopener"; }
  }
  function watch(list, frac, cb) {
    var pending = Array.prototype.slice.call(list), raf = null;
    if (!pending.length) return;
    function tick() {
      raf = null;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = pending.length - 1; i >= 0; i--) {
        var r = pending[i].getBoundingClientRect();
        if (r.top < vh * frac && r.bottom > 0) cb(pending.splice(i, 1)[0]);
      }
      if (pending.length) sch();
    }
    function sch() { if (!raf) raf = requestAnimationFrame(tick); }
    sch(); window.addEventListener("scroll", sch, { passive: true }); window.addEventListener("resize", sch);
  }
  window.TK.watch = watch;
  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (reduce) { Array.prototype.forEach.call(els, function (e) { e.classList.add("is-in"); }); return; }
    watch(els, 0.92, function (e) { e.classList.add("is-in"); });
  }
  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".hd-menu-btn"), menu = document.getElementById("hd-menu");
    if (!btn || !menu) return;
    var body = document.body, lbl = btn.querySelector(".hd-menu-lbl");
    function set(o) {
      body.classList.toggle("hd-menu-open", o);
      btn.setAttribute("aria-expanded", o ? "true" : "false");
      menu.setAttribute("aria-hidden", o ? "false" : "true");
      lbl.textContent = o ? "Cerrar" : "Menú";
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("hd-menu-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a") || e.target === menu) set(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }
  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa]");
    var raf = null;
    function up() {
      raf = null;
      var vh = window.innerHeight, on = false;
      for (var i = 0; i < zones.length; i++) { var r = zones[i].getBoundingClientRect(); if (r.top < vh * 0.85 && r.bottom > 0) { on = true; break; } }
      document.body.classList.toggle("wa-off", on);
    }
    function sch() { if (!raf) raf = requestAnimationFrame(up); }
    sch(); window.addEventListener("scroll", sch, { passive: true }); window.addEventListener("resize", sch);
  }
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || a.getAttribute("href").length < 2) return;
      var el = document.querySelector(a.getAttribute("href"));
      if (!el) return;
      e.preventDefault(); closeMenu();
      var hd = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--hd"), 10) || 60;
      var top = el.getBoundingClientRect().top + window.scrollY - (a.getAttribute("href") === "#hero" ? 0 : hd + 6);
      window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
      if (history.replaceState) history.replaceState(null, "", a.getAttribute("href"));
    });
  }
  /* abierto / cerrado en hora de Aguascalientes (martes a domingo, 13 a 19 h) */
  function initAbierto() {
    var el = document.getElementById("hero-abierto"); if (!el) return;
    try {
      var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", hour12: false }).formatToParts(new Date());
      var wd = "", h = 0;
      p.forEach(function (x) { if (x.type === "weekday") wd = x.value; if (x.type === "hour") h = parseInt(x.value, 10) % 24; });
      var cerrado = wd === "Mon";
      if (!cerrado && h >= 13 && h < 19) el.textContent = "Abierto hasta las 7 p.m.";
      else if (!cerrado && h < 13) el.textContent = "Hoy abrimos a la 1 p.m.";
      else if (wd === "Sun" || wd === "Sat" || wd === "Tue" || wd === "Wed" || wd === "Thu" || wd === "Fri") el.textContent = (wd === "Sun") ? "Mañana cerramos. Abrimos el martes" : "Hoy ya cerramos. Abrimos mañana 1 p.m.";
      else el.textContent = "Hoy cerrado. Abrimos mañana 1 p.m.";
      if (wd === "Mon") el.textContent = "Hoy cerrado. Abrimos mañana 1 p.m.";
    } catch (e) {}
  }
  function init() { initWa(); initMenu(); initReveal(); initWaHide(); initAnchors(); initAbierto(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
