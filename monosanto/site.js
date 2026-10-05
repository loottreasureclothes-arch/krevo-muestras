/* Monosanto: mecanica comun (header, menu, flotante, reveal, anclas, horario, momento firma) */
(function () {
  "use strict";
  var reduce = false;
  try { reduce = matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
  var body = document.body;

  function initHeader() {
    var hd = document.getElementById("hd"), fill = document.getElementById("hd-fill");
    var raf = null;
    function update() {
      raf = null;
      var y = window.scrollY || 0;
      var max = (document.documentElement.scrollHeight || 0) - window.innerHeight;
      if (fill) fill.style.transform = "scaleX(" + (max > 0 ? Math.min(1, Math.max(0, y / max)) : 0) + ")";
    }
    window.addEventListener("scroll", function () { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
    update();
  }

  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".hd-menu-btn"), menu = document.getElementById("hd-menu");
    if (!btn || !menu) return;
    var lbl = btn.querySelector(".hd-menu-lbl"), links = menu.querySelectorAll("a");
    function set(open) {
      body.classList.toggle("hd-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (lbl) lbl.textContent = open ? "Cerrar" : "Menú";
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("hd-menu-open")); });
    menu.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a") : null;
      if (a || e.target === menu || (e.target.classList && (e.target.classList.contains("hd-menu-panel") || e.target.classList.contains("hd-menu-nav")))) set(false);
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }

  function watch(list, frac, cb) {
    var pending = Array.prototype.slice.call(list);
    if (!pending.length) return;
    var raf = null;
    function tick() {
      raf = null;
      var vh = window.innerHeight || 700;
      for (var i = pending.length - 1; i >= 0; i--) {
        var r = pending[i].getBoundingClientRect();
        if (r.top < vh * frac && r.bottom > 0) { var el = pending.splice(i, 1)[0]; cb(el); }
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
    if (reduce) { Array.prototype.forEach.call(els, function (e) { e.classList.add("is-in"); }); return; }
    watch(els, 0.92, function (el) { el.classList.add("is-in"); });
  }

  /* Momento firma: el vaso se llena al entrar y se vacia al salir (reversible) */
  function initFill() {
    var els = document.querySelectorAll(".fill");
    if (!els.length) return;
    if (reduce) { Array.prototype.forEach.call(els, function (e) { e.classList.add("is-in"); }); return; }
    var raf = null;
    function update() {
      raf = null;
      var vh = window.innerHeight || 700;
      Array.prototype.forEach.call(els, function (el) {
        var r = el.getBoundingClientRect();
        var inView = r.top < vh * 0.82 && r.bottom > vh * 0.12;
        el.classList.toggle("is-in", inView);
      });
    }
    function s() { if (!raf) raf = requestAnimationFrame(update); }
    window.addEventListener("scroll", s, { passive: true });
    window.addEventListener("resize", s);
    s();
    setTimeout(update, 1600);
  }

  function initFab() {
    var zones = document.querySelectorAll("#visitanos, #pie, .hero-low, #vaso");
    if (!zones.length) return;
    var raf = null;
    function update() {
      raf = null;
      var vh = window.innerHeight || 700, on = false;
      for (var i = 0; i < zones.length; i++) {
        var r = zones[i].getBoundingClientRect();
        if (r.top < vh * 0.85 && r.bottom > vh * 0.15) { on = true; break; }
      }
      body.classList.toggle("fab-off", on);
    }
    function s() { if (!raf) raf = requestAnimationFrame(update); }
    window.addEventListener("scroll", s, { passive: true });
    window.addEventListener("resize", s);
    s();
  }

  function go(el) {
    var bar = document.querySelector(".hd");
    var top = el.getBoundingClientRect().top + (window.scrollY || 0) - (bar ? bar.offsetHeight + 8 : 0);
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
      e.preventDefault();
      closeMenu();
      go(el);
      if (history.replaceState) { try { history.replaceState(null, "", h); } catch (x) {} }
    });
  }

  /* Abierto ahora (hora de Aguascalientes) */
  function initHorario() {
    var out = document.getElementById("abierto");
    if (!out) return;
    var H = { 0: [720, 1320], 1: [720, 1440], 2: [720, 1440], 3: [720, 1440], 4: [720, 1440], 5: [720, 1440], 6: [720, 1440] };
    function fmt(m) { var h = Math.floor(m / 60) % 24, mm = m % 60; return (h < 10 ? "0" : "") + h + ":" + (mm < 10 ? "0" : "") + mm; }
    function paint() {
      var p;
      try {
        p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
      } catch (e) { out.querySelector("span").textContent = "Consulta el horario"; return; }
      var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
      var d = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[o.weekday];
      var min = (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10);
      var h = H[d], open = min >= h[0] && min < h[1];
      out.classList.toggle("on", open); out.classList.toggle("off", !open);
      out.querySelector("span").textContent = open ? "Abierto ahora · cierra a las " + (h[1] >= 1440 ? "medianoche" : fmt(h[1])) : "Cerrado ahora · abre a las 12:00";
      var rows = document.querySelectorAll("#horario li");
      Array.prototype.forEach.call(rows, function (li) { li.classList.toggle("hoy", parseInt(li.getAttribute("data-d"), 10) === d); });
    }
    paint(); setInterval(paint, 60000);
  }

  function init() { initHeader(); initMenu(); initReveal(); initFill(); initFab(); initAnchors(); initHorario(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
