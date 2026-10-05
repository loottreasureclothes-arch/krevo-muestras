/* Palermo: mecánica común (menú, reveal, anclas, flotante, abierto ahora). Sin scroll-behavior en CSS. */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) document.documentElement.classList.add("js-rv");

  function go(el) {
    var bar = document.querySelector(".pl-bar");
    var top = el.getBoundingClientRect().top + window.scrollY - (bar ? bar.offsetHeight + 14 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }

  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".pl-menu-btn");
    var menu = document.getElementById("pl-menu");
    if (!btn || !menu) return;
    var body = document.body, lbl = btn.querySelector(".pl-menu-lbl");
    var links = menu.querySelectorAll("a");
    function set(open) {
      if (open === body.classList.contains("pl-menu-open")) return;
      body.classList.toggle("pl-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (lbl) lbl.textContent = open ? "Cerrar" : "Menú";
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("pl-menu-open")); });
    menu.addEventListener("click", function (e) {
      var t = e.target;
      if (t.closest && t.closest("a")) { set(false); return; }
      if (t === menu || t.classList.contains("pl-menu-panel")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && body.classList.contains("pl-menu-open")) { set(false); btn.focus(); }
    });
    for (var i = 0; i < links.length; i++) links[i].style.setProperty("--i", i);
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

  function watch(list, frac, cb) {
    var pending = Array.prototype.slice.call(list), raf = null;
    if (!pending.length) return;
    function tick() {
      raf = null;
      var vh = window.innerHeight;
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
    function show(el) { el.classList.add("is-in"); }
    if (reduce) { for (var i = 0; i < els.length; i++) show(els[i]); return; }
    watch(els, 0.92, show);
  }

  /* El flotante de Llamar se esconde donde ya hay un botón grande de Llamar. */
  function initFloat() {
    var zones = document.querySelectorAll("[data-hide-wa]");
    if (!zones.length) return;
    var raf = null;
    function update() {
      raf = null;
      var vh = window.innerHeight, on = false;
      for (var i = 0; i < zones.length; i++) {
        var r = zones[i].getBoundingClientRect();
        if (r.top < vh * 0.85 && r.bottom > vh * 0.1) { on = true; break; }
      }
      document.body.classList.toggle("pl-float-off", on);
    }
    function sched() { if (!raf) raf = requestAnimationFrame(update); }
    sched();
    window.addEventListener("scroll", sched, { passive: true });
    window.addEventListener("resize", sched);
  }

  function initHeader() {
    var h = document.getElementById("pl-header");
    if (!h) return;
    function u() { h.classList.toggle("is-compact", (window.scrollY || 0) > 12); }
    window.addEventListener("scroll", u, { passive: true }); u();
  }

  /* Abierto ahora (hora de Aguascalientes, todos los días 13:00 a 21:00). */
  function ahora() {
    var d = new Date(), p;
    try {
      p = new Intl.DateTimeFormat("es-MX", { timeZone: "America/Mexico_City", weekday: "long", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(d);
    } catch (e) { return null; }
    var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
    var h = parseInt(o.hour, 10) % 24, m = parseInt(o.minute, 10);
    return { dia: (o.weekday || "").toLowerCase(), min: h * 60 + m };
  }
  function initAbierto() {
    var st = document.querySelectorAll("[data-abierto]");
    var rows = document.querySelectorAll("[data-dia]");
    var n = ahora();
    if (!n) return;
    var abre = 13 * 60, cierra = 21 * 60, open = n.min >= abre && n.min < cierra;
    var txt = open ? "Abierto ahora, cierra a las 21:00" : (n.min < abre ? "Cerrado, abre hoy a las 13:00" : "Cerrado, abre mañana a las 13:00");
    for (var i = 0; i < st.length; i++) { st[i].textContent = txt; st[i].classList.toggle("is-open", open); st[i].classList.toggle("is-closed", !open); }
    for (var j = 0; j < rows.length; j++) {
      var dia = rows[j].getAttribute("data-dia");
      rows[j].classList.toggle("is-today", n.dia.indexOf(dia) === 0);
    }
  }

  function init() { initHeader(); initMenu(); initAnchors(); initReveal(); initFloat(); initAbierto(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
