(function () {
  "use strict";
  var d = document, de = d.documentElement;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* menú del header */
  var hd = d.getElementById("hd"), bt = d.getElementById("hd-burger");
  if (hd && bt) {
    bt.addEventListener("click", function () {
      var o = hd.classList.toggle("open"); bt.setAttribute("aria-expanded", o ? "true" : "false");
    });
    hd.addEventListener("click", function (e) { if (e.target.closest(".hd-nav a")) { hd.classList.remove("open"); bt.setAttribute("aria-expanded", "false"); } });
    d.addEventListener("keydown", function (e) { if (e.key === "Escape") { hd.classList.remove("open"); bt.setAttribute("aria-expanded", "false"); } });
  }

  /* reveal: visible a los 1.6 s pase lo que pase */
  var els = [].slice.call(d.querySelectorAll("[data-reveal]"));
  if (!reduce && "IntersectionObserver" in window) {
    de.classList.add("rv");
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) { var el = en.target; io.unobserve(el); requestAnimationFrame(function () { el.classList.add("in"); }); }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
    els.forEach(function (el) { io.observe(el); });
    setTimeout(function () {
      els.forEach(function (el) { var r = el.getBoundingClientRect(); if (r.top < innerHeight * 1.05) el.classList.add("in"); });
    }, 1600);
    setTimeout(function () { els.forEach(function (el) { el.classList.add("in"); }); }, 6000);
  }

  /* abierto ahora, con la hora de Aguascalientes (lun y mié a dom 9:30 a 19:00, martes cerrado) */
  function mx() {
    var p = {};
    new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" })
      .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    var wd = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[p.weekday];
    return { wd: wd, min: (+p.hour) * 60 + (+p.minute) };
  }
  var OPEN = 9 * 60 + 30, CLOSE = 19 * 60, DN = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  function status() {
    var t = mx(), txt, open = false;
    if (t.wd === 2) txt = "Hoy martes cerrado. Abrimos mañana a las 9:30 am";
    else if (t.min >= OPEN && t.min < CLOSE) { open = true; txt = "Abierto ahora, cerramos a las 7:00 pm"; }
    else if (t.min < OPEN) txt = "Cerrado ahora. Abrimos hoy a las 9:30 am";
    else {
      var nx = (t.wd + 1) % 7;
      txt = nx === 2 ? "Cerrado ahora. Mañana martes no abrimos, volvemos el miércoles a las 9:30 am" : "Cerrado ahora. Abrimos mañana a las 9:30 am";
    }
    [].forEach.call(d.querySelectorAll("[data-open-status]"), function (el) {
      el.textContent = txt; el.classList.toggle("is-open", open); el.classList.toggle("is-closed", !open);
    });
    [].forEach.call(d.querySelectorAll("#hours li"), function (li) { li.classList.toggle("today", +li.dataset.d === t.wd); });
  }
  status(); setInterval(status, 60000);

  /* el flotante de Llamar se esconde cuando ya hay un botón Llamar a la vista */
  var fab = d.getElementById("fab"), hide = [].slice.call(d.querySelectorAll("[data-hide-fab]"));
  if (fab && hide.length && "IntersectionObserver" in window) {
    var vis = new Set();
    var io2 = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) vis.add(en.target); else vis.delete(en.target); });
      fab.classList.toggle("hide", vis.size > 0);
    }, { threshold: 0.2 });
    hide.forEach(function (el) { io2.observe(el); });
  }
})();
