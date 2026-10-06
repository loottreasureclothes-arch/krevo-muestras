/* KIMURA: mecánica común (menú, flotante, reveal, abierto ahora, anclas) */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var WA = "524493939746";
  function waUrl(m) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(m); }
  window.KimuraWa = waUrl;

  function initWa() {
    var l = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < l.length; i++) {
      var m = l[i].getAttribute("data-wa");
      if (m) l[i].href = waUrl(m);
      l[i].target = "_blank"; l[i].rel = "noopener";
    }
  }
  function initHeader() {
    var h = document.getElementById("hd"); if (!h) return;
    var t = false;
    function u() { t = false; h.classList.toggle("is-compact", (window.scrollY || 0) > 12); }
    window.addEventListener("scroll", function () { if (!t) { t = true; requestAnimationFrame(u); } }, { passive: true });
    u();
  }
  var closeMenu = function () {};
  function initMenu() {
    var b = document.querySelector(".hd-btn"), m = document.getElementById("hd-menu");
    if (!b || !m) return;
    var lbl = b.querySelector(".hd-lbl");
    function set(o) {
      document.body.classList.toggle("menu-open", o);
      b.setAttribute("aria-expanded", o ? "true" : "false");
      m.setAttribute("aria-hidden", o ? "false" : "true");
      if (lbl) lbl.textContent = o ? "Cerrar" : "Menú";
    }
    closeMenu = function () { set(false); };
    b.addEventListener("click", function () { set(!document.body.classList.contains("menu-open")); });
    m.addEventListener("click", function (e) { if (e.target.closest && e.target.closest("a")) set(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }
  function watch(list, frac, cb) {
    var p = Array.prototype.slice.call(list); if (!p.length) return;
    var raf = null;
    function tick() {
      raf = null;
      var vh = window.innerHeight || 800;
      for (var i = p.length - 1; i >= 0; i--) {
        var r = p[i].getBoundingClientRect();
        if (r.top < vh * frac && r.bottom > 0) { var el = p[i]; p.splice(i, 1); cb(el); }
      }
      if (p.length) sched();
    }
    function sched() { if (!raf) raf = requestAnimationFrame(tick); }
    sched();
    window.addEventListener("scroll", sched, { passive: true });
    window.addEventListener("resize", sched);
  }
  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    function show(el) { el.classList.add("is-in"); }
    if (reduce) { Array.prototype.forEach.call(els, show); return; }
    watch(els, 1.0, show);
  }
  function initFabHide() {
    var z = document.querySelectorAll("[data-hide-wa]"); if (!z.length) return;
    var raf = null;
    function u() {
      raf = null;
      var vh = window.innerHeight || 800, on = false;
      for (var i = 0; i < z.length; i++) { var r = z[i].getBoundingClientRect(); if (r.top < vh * 0.75 && r.bottom > vh * 0.25) { on = true; break; } }
      document.body.classList.toggle("wa-off", on);
    }
    function s() { if (!raf) raf = requestAnimationFrame(u); }
    s(); window.addEventListener("scroll", s, { passive: true }); window.addEventListener("resize", s);
  }
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var id = a.getAttribute("href"); if (id.length < 2) return;
      var el = document.querySelector(id); if (!el) return;
      e.preventDefault(); closeMenu();
      var bar = document.querySelector(".hd-bar");
      var top = el.getBoundingClientRect().top + window.scrollY - (bar ? bar.offsetHeight + 8 : 0);
      window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
      if (history.replaceState) history.replaceState(null, "", id);
    });
  }
  /* Abierto ahora: hora de Aguascalientes (America/Mexico_City), todos los días 13:00 a 22:30 */
  function initOpen() {
    var els = document.querySelectorAll("[data-open]"); if (!els.length) return;
    var wd = -1, mins = 0;
    try {
      var f = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false });
      var parts = f.formatToParts(new Date()), o = {};
      parts.forEach(function (p) { o[p.type] = p.value; });
      wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(o.weekday);
      mins = (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10);
    } catch (e) { return; }
    var open = mins >= 13 * 60 && mins < 22 * 60 + 30;
    Array.prototype.forEach.call(els, function (el) {
      el.classList.toggle("is-open", open);
      el.textContent = open ? "Abierto ahora · cierra 10:30 p.m." : (mins < 13 * 60 ? "Cerrado ahora · abre hoy 1:00 p.m." : "Cerrado ahora · abre mañana 1:00 p.m.");
    });
    var rows = document.querySelectorAll("[data-day]");
    Array.prototype.forEach.call(rows, function (r) { r.classList.toggle("is-today", parseInt(r.getAttribute("data-day"), 10) === wd); });
  }
  function init() { initWa(); initHeader(); initMenu(); initReveal(); initFabHide(); initAnchors(); initOpen(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
