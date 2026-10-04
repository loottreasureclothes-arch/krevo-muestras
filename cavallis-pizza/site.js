/* Cavalli's: mecánica común (menú, WhatsApp flotante, reveal, anclas, horario, giro del hero). */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var body = document.body;

  /* vigía por sondeo (no depende de IntersectionObserver) */
  function watchVisible(list, frac, cb) {
    var pending = Array.prototype.slice.call(list), raf = null;
    if (!pending.length) return;
    function tick() {
      raf = null;
      var vh = window.innerHeight || document.documentElement.clientHeight;
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
  window.CV = { watch: watchVisible, reduce: reduce };

  /* menú hamburguesa */
  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".cv-menu-btn"), menu = document.getElementById("cv-menu");
    if (!btn || !menu) return;
    var lbl = btn.querySelector(".cv-menu-lbl"), links = menu.querySelectorAll("a");
    function set(open) {
      if (open === body.classList.contains("cv-menu-open")) return;
      body.classList.toggle("cv-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      lbl.textContent = open ? "Cerrar" : "Menú";
      if (open) setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 80);
      else btn.focus({ preventScroll: true });
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("cv-menu-open")); });
    menu.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a")) return;
      if (e.target.classList.contains("cv-menu-scrim")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("cv-menu-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); }
      if (e.key === "Tab") {
        var items = [btn].concat(Array.prototype.slice.call(links)), i = items.indexOf(document.activeElement);
        e.preventDefault();
        if (i < 0) i = e.shiftKey ? 0 : -1;
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
  }

  /* el flotante se esconde donde ya hay un verde en pantalla */
  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa]"), raf = null;
    function update() {
      var vh = window.innerHeight, on = false;
      for (var i = 0; i < zones.length; i++) {
        var r = zones[i].getBoundingClientRect();
        if (r.top < vh * 0.85 && r.bottom > vh * 0.1) { on = true; break; }
      }
      body.classList.toggle("cv-wa-off", on);
    }
    function sched() { if (!raf) raf = requestAnimationFrame(function () { raf = null; update(); }); }
    sched();
    window.addEventListener("scroll", sched, { passive: true });
    window.addEventListener("resize", sched);
  }

  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (reduce) { Array.prototype.forEach.call(els, function (e) { e.classList.add("is-in"); }); return; }
    watchVisible(els, 0.9, function (e) { e.classList.add("is-in"); });
  }

  /* anclas con scroll suave por JS */
  function go(el) {
    var bar = document.querySelector(".cv-bar");
    var top = el.getBoundingClientRect().top + window.scrollY - (bar ? bar.offsetHeight - 1 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  window.CV.go = go;
  function initAnchors() {
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

  /* horario en vivo (hora de Aguascalientes, UTC-6, sin horario de verano) */
  var H = { 0: [14, 20], 1: null, 2: [14, 23], 3: [14, 23], 4: [14, 23], 5: [14, 23], 6: [14, 23] };
  var DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  function hr(h) { return (h > 12 ? h - 12 : h) + " p.m."; }
  function estado() {
    var n = new Date(Date.now() - 6 * 3600e3), d = n.getUTCDay(), h = n.getUTCHours() + n.getUTCMinutes() / 60, t = H[d];
    if (t && h >= t[0] && h < t[1]) return { open: true, txt: "Abierto ahora, cierra a las " + hr(t[1]), d: d };
    if (t && h < t[0]) return { open: false, txt: "Abre hoy a las " + hr(t[0]), d: d };
    for (var k = 1; k <= 7; k++) {
      var nd = (d + k) % 7;
      if (H[nd]) return { open: false, txt: "Cerrado, abre " + (k === 1 ? "mañana" : "el " + DIAS[nd]) + " a las " + hr(H[nd][0]), d: d };
    }
  }
  function initEstado() {
    var e = estado(); if (!e) return;
    Array.prototype.forEach.call(document.querySelectorAll("[data-estado]"), function (el) {
      el.textContent = e.txt; el.classList.toggle("is-open", e.open);
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-dia]"), function (el) {
      el.classList.toggle("is-hoy", +el.getAttribute("data-dia") === e.d);
    });
  }

  /* momento firma: la pizza del hero gira con el scroll (reversible) */
  function initSpin() {
    var el = document.querySelector("[data-spin]");
    if (!el || reduce) return;
    var raf = null;
    function update() { raf = null; el.style.transform = "rotate(" + (Math.min(window.scrollY, 1400) * 0.07).toFixed(2) + "deg)"; }
    window.addEventListener("scroll", function () { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
    update();
  }

  function init() { initMenu(); initWaHide(); initReveal(); initAnchors(); initEstado(); initSpin(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
