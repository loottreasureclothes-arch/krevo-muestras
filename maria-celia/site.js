/* María Celia: header, menú, anclas, reveal, estado abierto/cerrado, flotante. */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var body = document.body;

  function header() {
    var h = document.getElementById("mc-header"), img = document.querySelector(".mc-hero-img"), tick = false;
    function upd() {
      tick = false;
      var y = window.scrollY || 0;
      if (h) h.classList.toggle("is-compact", y > 12);
      if (img && !reduce && y < 1400) img.style.setProperty("--py", (-Math.min(y, 700) * 0.06).toFixed(1) + "px");
    }
    window.addEventListener("scroll", function () { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
  }

  var closeMenu = function () {};
  function menu() {
    var btn = document.querySelector(".mc-menu-btn"), m = document.getElementById("mc-menu");
    if (!btn || !m) return;
    var lbl = btn.querySelector(".mc-menu-lbl"), links = m.querySelectorAll("a");
    function set(o) {
      if (o === body.classList.contains("mc-menu-open")) return;
      body.classList.toggle("mc-menu-open", o);
      btn.setAttribute("aria-expanded", o ? "true" : "false");
      m.setAttribute("aria-hidden", o ? "false" : "true");
      if (lbl) lbl.textContent = o ? "Cerrar" : "Menú";
      if (o && links[0]) setTimeout(function () { links[0].focus({ preventScroll: true }); }, 60);
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("mc-menu-open")); });
    m.addEventListener("click", function (e) { if (e.target === m || e.target.classList.contains("mc-menu-nav") || (e.target.closest && e.target.closest("a"))) set(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }

  function go(el) {
    var hd = document.getElementById("mc-header");
    var top = el.getBoundingClientRect().top + window.scrollY - (hd ? hd.offsetHeight + 8 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  function anchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href");
      if (href.length < 2) return;
      var el = document.querySelector(href);
      if (!el) return;
      e.preventDefault(); closeMenu(); go(el);
      if (history.replaceState) history.replaceState(null, "", href);
    });
  }

  /* vigía por sondeo (no depende de IntersectionObserver) */
  function watch(list, frac, cb) {
    var pend = Array.prototype.slice.call(list); if (!pend.length) return;
    var raf = null;
    function tick() {
      raf = null;
      var vh = window.innerHeight;
      for (var i = pend.length - 1; i >= 0; i--) {
        var r = pend[i].getBoundingClientRect();
        if (r.top < vh * frac && r.bottom > 0) { var el = pend[i]; pend.splice(i, 1); cb(el); }
      }
      if (pend.length) sched();
    }
    function sched() { if (!raf) raf = requestAnimationFrame(tick); }
    sched(); window.addEventListener("scroll", sched, { passive: true }); window.addEventListener("resize", sched);
  }
  function reveal() {
    var els = document.querySelectorAll("[data-mc-reveal]");
    function show(el) { el.classList.add("is-in"); }
    if (reduce) { Array.prototype.forEach.call(els, show); }
    else watch(els, 1.04, show);
    /* platos que se sirven: reversible (salen al irse del todo, entran al volver) */
    var pls = document.querySelectorAll("[data-mc-serve]");
    function chk() {
      var vh = window.innerHeight;
      Array.prototype.forEach.call(pls, function (p) {
        var r = p.getBoundingClientRect();
        if (reduce || (r.top < vh * 0.88 && r.bottom > vh * 0.05)) p.classList.add("is-in");
        else if (r.top > vh * 1.6 || r.bottom < -vh * 0.6) p.classList.remove("is-in");
      });
    }
    var raf = null; function s() { if (!raf) raf = requestAnimationFrame(function () { raf = null; chk(); }); }
    window.addEventListener("scroll", s, { passive: true }); window.addEventListener("resize", s); s();
    setTimeout(function () { Array.prototype.forEach.call(pls, function (p) { var r = p.getBoundingClientRect(); if (r.top < window.innerHeight * 1.1 && r.bottom > 0) p.classList.add("is-in"); }); }, 1600);
  }

  /* abierto / cerrado en hora de Aguascalientes */
  function estado() {
    var live = document.getElementById("mc-live"), t2 = document.getElementById("mc-t-live"), tabla = document.getElementById("mc-horas");
    var wd, mins;
    try {
      var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
      var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
      wd = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[o.weekday];
      mins = (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10);
    } catch (e) { return; }
    if (wd == null || isNaN(mins)) return;
    var msg, cls;
    var abre = 8 * 60 + 30, cierra = 16 * 60;
    if (wd >= 1 && wd <= 6 && mins >= abre && mins < cierra) { msg = "Abierto ahora. Cocina hasta las 4 p.m."; cls = "is-open"; }
    else if (wd >= 1 && wd <= 6 && mins < abre) { msg = "Cerrado. Abre hoy a las 8:30 a.m."; cls = "is-closed"; }
    else if (wd === 6 || wd === 0) { msg = "Cerrado. Abre el lunes a las 8:30 a.m."; cls = "is-closed"; }
    else { msg = "Cerrado. Abre mañana a las 8:30 a.m."; cls = "is-closed"; }
    if (live) { live.classList.add(cls); live.querySelector("span").textContent = msg; }
    var v2 = document.getElementById("mc-vis-live"); if (v2) { v2.classList.add(cls); v2.querySelector("span").textContent = msg; }
    if (t2) t2.textContent = cls === "is-open" ? "Abierto ahora" : "Madero 341";
    if (tabla) { var r = tabla.querySelector('tr[data-d="' + wd + '"]'); if (r) r.classList.add("is-hoy"); }
  }

  /* flotante: se esconde donde ya hay un botón de llamar grande */
  function fab() {
    var f = document.getElementById("mc-fab"); if (!f) return;
    var zones = document.querySelectorAll(".mc-hero, #ticket, #visita .mc-actions, .mc-foot");
    function upd() {
      var vh = window.innerHeight, on = false;
      for (var i = 0; i < zones.length; i++) { var r = zones[i].getBoundingClientRect(); if (r.top < vh * 0.9 && r.bottom > 0) { on = true; break; } }
      f.classList.toggle("is-off", on);
    }
    var raf = null; function s() { if (!raf) raf = requestAnimationFrame(function () { raf = null; upd(); }); }
    window.addEventListener("scroll", s, { passive: true }); window.addEventListener("resize", s); s();
  }

  function init() { header(); menu(); anchors(); reveal(); estado(); fab(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
