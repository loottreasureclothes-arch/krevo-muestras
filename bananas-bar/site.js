(function () {
  "use strict";
  var doc = document, de = doc.documentElement, body = doc.body;
  var $ = function (s, r) { return (r || doc).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); };
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* menu */
  var btn = $(".hd-btn"), menu = $("#menu");
  function setMenu(open) {
    if (!btn || !menu) return;
    menu.hidden = !open; btn.setAttribute("aria-expanded", open ? "true" : "false");
    body.classList.toggle("menu-open", open);
    var t = $(".hd-btn-t", btn); if (t) t.textContent = open ? "Cerrar" : "Menú";
  }
  if (btn) btn.addEventListener("click", function () { setMenu(menu.hidden); });
  if (menu) menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  doc.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* reveal visible a los 1.6 s pase lo que pase */
  var rv = $$("[data-reveal]");
  if (!reduce && "IntersectionObserver" in window && rv.length) {
    de.classList.add("rv");
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { en.target.classList.toggle("is-in", en.isIntersecting || en.boundingClientRect.top < 0); });
    }, { threshold: 0.08 });
    rv.forEach(function (el) { io.observe(el); });
    setTimeout(function () { rv.forEach(function (el) { el.classList.add("is-in"); }); }, 1600);
  }

  /* flotante se esconde donde ya hay botones de llamar a la vista */
  var fab = $(".fab"), zones = $$("#visitanos, .foot");
  function fabCheck() {
    if (!fab) return;
    var vh = innerHeight, hide = false;
    zones.forEach(function (z) { var r = z.getBoundingClientRect(); if (r.top < vh * 0.7 && r.bottom > vh * 0.3) hide = true; });
    fab.classList.toggle("is-off", hide);
  }
  addEventListener("scroll", fabCheck, { passive: true }); addEventListener("resize", fabCheck); fabCheck();

  /* abierto ahora (hora de Aguascalientes, UTC-6 sin horario de verano) */
  var DIAS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  function ags() { var n = new Date(); var u = n.getTime() + n.getTimezoneOffset() * 60000; return new Date(u - 6 * 3600000); }
  function openNow() {
    var d = ags(), dia = d.getDay(), h = d.getHours() + d.getMinutes() / 60;
    var abierto = dia !== 1 && h >= 9 && h < 23;
    var txt = abierto ? "Abierto ahora, cierra a las 23:00" :
      (dia === 1 ? "Cerrado hoy, abrimos mañana a las 9:00" : (h < 9 ? "Cerrado ahora, abrimos a las 9:00" : (dia === 0 ? "Cerrado ahora, abrimos el martes a las 9:00" : "Cerrado ahora, abrimos mañana a las 9:00")));
    return { abierto: abierto, dia: dia, txt: txt };
  }
  var on = openNow();
  $$("[data-open-now]").forEach(function (el) { el.textContent = on.txt; el.classList.toggle("is-open", on.abierto); });
  $$("[data-dia]").forEach(function (el) { if (+el.getAttribute("data-dia") === on.dia) el.classList.add("is-today"); });
  window.BB = { openNow: openNow };
})();
