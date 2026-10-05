/* Xamâ: menú, reveal, anclas, flotante de Llamar y horario en vivo. */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var body = document.body;

  /* Vigía por sondeo (sin IntersectionObserver): llama onIn cuando entra y onOut cuando sale (si se da). */
  function watch(list, frac, onIn, onOut) {
    var els = Array.prototype.slice.call(list), state = [], raf = null;
    if (!els.length) return;
    function tick() {
      raf = null;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = 0; i < els.length; i++) {
        var r = els[i].getBoundingClientRect();
        var vis = r.top < vh * frac && r.bottom > vh * (1 - frac);
        if (vis && !state[i]) { state[i] = true; onIn(els[i]); }
        else if (!vis && state[i] && onOut) { state[i] = false; onOut(els[i]); }
      }
    }
    function sch() { if (!raf) raf = requestAnimationFrame(tick); }
    sch();
    window.addEventListener("scroll", sch, { passive: true });
    window.addEventListener("resize", sch);
  }
  window.XamaWatch = watch;

  /* Menú */
  var btn = document.querySelector(".hd-menu-btn"), menu = document.getElementById("hd-menu");
  var lbl = btn && btn.querySelector(".hd-menu-lbl");
  function setMenu(open) {
    if (!btn || !menu) return;
    body.classList.toggle("menu-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    menu.setAttribute("aria-hidden", open ? "false" : "true");
    if (lbl) lbl.textContent = open ? "Cerrar" : "Menú";
  }
  if (btn) {
    btn.addEventListener("click", function () { setMenu(!body.classList.contains("menu-open")); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  }

  /* Anclas sin scroll-behavior en CSS */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var href = a.getAttribute("href");
    if (href.length < 2) return;
    var el = document.querySelector(href);
    if (!el) return;
    e.preventDefault();
    setMenu(false);
    var hd = document.getElementById("hd");
    var top = el.getBoundingClientRect().top + window.scrollY - (hd ? hd.offsetHeight : 0) - 8;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  });

  /* Reveal */
  var rv = document.querySelectorAll("[data-rv]");
  if (reduce) { Array.prototype.forEach.call(rv, function (el) { el.classList.add("is-in"); }); }
  else watch(rv, 0.94, function (el) { el.classList.add("is-in"); });

  /* Flotante: se esconde donde ya hay botones grandes de contacto */
  var zones = document.querySelectorAll("#visitanos, #pie");
  function fabCheck() {
    var vh = window.innerHeight, on = false;
    for (var i = 0; i < zones.length; i++) {
      var r = zones[i].getBoundingClientRect();
      if (r.top < vh * 0.7 && r.bottom > 0) { on = true; break; }
    }
    body.classList.toggle("fab-off", on);
  }
  window.addEventListener("scroll", function () { requestAnimationFrame(fabCheck); }, { passive: true });
  window.addEventListener("resize", fabCheck);
  fabCheck();

  /* Horario: todos los días 9:30 a 23:00, hora de Aguascalientes */
  var DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  function ahora() {
    try {
      var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
      var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
      var wd = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[o.weekday];
      return { dia: wd, min: (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10) };
    } catch (e) { var d = new Date(); return { dia: d.getDay(), min: d.getHours() * 60 + d.getMinutes() }; }
  }
  function pintaHorario() {
    var n = ahora(), abre = 9 * 60 + 30, cierra = 23 * 60;
    var open = n.min >= abre && n.min < cierra;
    var txt = open ? "Abierto ahora, cierra a las 23:00" : (n.min < abre ? "Cerrado ahora, abre a las 9:30" : "Cerrado ahora, abre mañana a las 9:30");
    Array.prototype.forEach.call(document.querySelectorAll("[data-open]"), function (el) {
      el.textContent = txt; el.setAttribute("data-state", open ? "open" : "closed");
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-dia]"), function (el) {
      el.classList.toggle("is-hoy", el.getAttribute("data-dia") === DIAS[n.dia]);
    });
  }
  pintaHorario();
  setInterval(pintaHorario, 60000);
})();
