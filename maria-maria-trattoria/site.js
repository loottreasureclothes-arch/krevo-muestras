/* María María Trattoria: mecánica común (menú, reveal, flotante, horario). Sin WhatsApp: todo es Llamar. */
(function () {
  "use strict";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  /* horario de la ficha de Google (5 oct 2026): [abre, cierra] en horas, null = cerrado */
  var HORARIO = [[14, 20], [14, 23], null, [14, 23], [14, 23], [14, 24], [14, 24]];
  function hora12(h) {
    var hh = Math.floor(h), mm = Math.round((h - hh) * 60);
    if (hh === 24 || (hh === 0 && !mm)) return mm ? "12:" + (mm < 10 ? "0" : "") + mm + " am" : "12:00 am";
    var suf = hh >= 12 ? "pm" : "am", h12 = hh % 12 || 12;
    return h12 + ":" + (mm < 10 ? "0" : "") + mm + " " + suf;
  }
  function ahoraAgs() {
    try {
      var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
      var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
      var wd = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[o.weekday];
      return { dia: wd, h: (parseInt(o.hour, 10) % 24) + parseInt(o.minute, 10) / 60 };
    } catch (e) { var d = new Date(); return { dia: d.getDay(), h: d.getHours() + d.getMinutes() / 60 }; }
  }
  window.MM = { DIAS: DIAS, HORARIO: HORARIO, hora12: hora12, ahora: ahoraAgs };

  /* header sólido al bajar + menú */
  var hd = document.getElementById("hd"), body = document.body;
  function onScroll() { if (hd) hd.classList.toggle("is-solid", window.scrollY > 24); }
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
  var burger = document.getElementById("burger"), menu = document.getElementById("menu");
  function setMenu(open) {
    if (!menu) return;
    menu.hidden = !open; body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  }
  if (burger) {
    burger.addEventListener("click", function () { setMenu(menu.hidden); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  }

  /* anclas con scroll controlado (sin scroll-behavior en CSS) */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute("href"); if (id.length < 2) return;
    var el = document.querySelector(id); if (!el) return;
    e.preventDefault();
    var top = el.getBoundingClientRect().top + window.scrollY - (id === "#inicio" ? 0 : 56);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
    if (history.replaceState) history.replaceState(null, "", id);
  });

  /* reveal: visible a los 1.6 s de asomarse pase lo que pase */
  var rv = document.querySelectorAll("[data-reveal]");
  function show(el) { el.classList.add("in"); }
  if (!("IntersectionObserver" in window) || reduce) { Array.prototype.forEach.call(rv, show); }
  else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target); show(en.target);
        setTimeout(function () { en.target.classList.add("in"); }, 1600);
      });
    }, { threshold: 0, rootMargin: "0px 0px 6% 0px" });
    Array.prototype.forEach.call(rv, function (el) { io.observe(el); });
  }

  /* flotante: se esconde donde ya hay un Llamar grande */
  var zones = document.querySelectorAll("[data-hide-wa]");
  function fab() {
    var vh = window.innerHeight, on = false;
    for (var i = 0; i < zones.length; i++) { var r = zones[i].getBoundingClientRect(); if (r.top < vh * 0.7 && r.bottom > vh * 0.3) { on = true; break; } }
    body.classList.toggle("fab-off", on);
  }
  var raf = 0; function sched() { if (!raf) raf = requestAnimationFrame(function () { raf = 0; fab(); }); }
  fab(); window.addEventListener("scroll", sched, { passive: true }); window.addEventListener("resize", sched);

  /* Abierto ahora + horario con hoy marcado */
  function estado() {
    var n = ahoraAgs(), h = HORARIO[n.dia], abierto = h && n.h >= h[0] && n.h < h[1];
    var txt;
    if (abierto) txt = "Abierto ahora, hasta las " + hora12(h[1]);
    else if (h && n.h < h[0]) txt = "Cerrado ahora, abren hoy a las " + hora12(h[0]);
    else { var k = 1; while (k < 8 && !HORARIO[(n.dia + k) % 7]) k++; var d = (n.dia + k) % 7; txt = "Cerrado ahora, abren " + (k === 1 ? "mañana" : "el " + DIAS[d]) + " a las " + hora12(HORARIO[d][0]); }
    Array.prototype.forEach.call(document.querySelectorAll("[data-abierto]"), function (el) { el.textContent = txt; el.classList.toggle("on", !!abierto); });
    Array.prototype.forEach.call(document.querySelectorAll("[data-dia]"), function (el) { el.classList.toggle("hoy", parseInt(el.getAttribute("data-dia"), 10) === n.dia); });
  }
  estado(); setInterval(estado, 60000);
})();
