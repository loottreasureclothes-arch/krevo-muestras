/* Los Casitos: header, reveal, WhatsApp flotante, "Abierto ahora". */
(function () {
  "use strict";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  function watchVisible(list, frac, cb) {
    var pend = Array.prototype.slice.call(list), raf = null;
    if (!pend.length) return;
    function tick() {
      raf = null;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = pend.length - 1; i >= 0; i--) {
        var r = pend[i].getBoundingClientRect();
        if (r.top < vh * frac && r.bottom > 0) { var el = pend[i]; pend.splice(i, 1); cb(el); }
      }
      if (pend.length) sch();
    }
    function sch() { if (!raf) raf = requestAnimationFrame(tick); }
    sch();
    addEventListener("scroll", sch, { passive: true });
    addEventListener("resize", sch);
  }

  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (reduce) { for (var i = 0; i < els.length; i++) els[i].classList.add("is-in"); return; }
    watchVisible(els, 0.92, function (el) { el.classList.add("is-in"); });
  }

  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa]");
    if (!zones.length) return;
    var raf = null;
    function upd() {
      raf = null;
      var vh = window.innerHeight, on = false;
      for (var i = 0; i < zones.length; i++) {
        var r = zones[i].getBoundingClientRect();
        if (r.top < vh * 0.75 && r.bottom > vh * 0.25) { on = true; break; }
      }
      document.body.classList.toggle("wa-off", on);
    }
    function sch() { if (!raf) raf = requestAnimationFrame(upd); }
    sch(); addEventListener("scroll", sch, { passive: true }); addEventListener("resize", sch);
  }

  /* Horario: lunes, miércoles a domingo 10:00 a 16:00; martes cerrado. Hora de Aguascalientes. */
  function initAbierto() {
    var estado = document.getElementById("estado"), txt = document.getElementById("estado-t"), horas = document.getElementById("horas");
    if (!estado || !txt) return;
    var now = new Date(), dia = now.getDay(), min = now.getHours() * 60 + now.getMinutes();
    try {
      var parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(now);
      var o = {}; parts.forEach(function (p) { o[p.type] = p.value; });
      dia = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[o.weekday];
      min = (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10);
    } catch (e) {}
    var abierto = dia !== 2 && min >= 600 && min < 960;
    estado.className = "estado " + (abierto ? "on" : "off");
    if (abierto) txt.textContent = "Abierto ahora · cierra a las 4 pm";
    else if (dia === 2) txt.textContent = "Cerrado hoy · abren mañana a las 10";
    else if (min < 600) txt.textContent = "Cerrado ahora · abren hoy a las 10";
    else txt.textContent = "Cerrado ahora · " + (dia === 1 ? "mañana es martes, abren el miércoles" : "abren mañana a las 10");
    if (horas) { var li = horas.querySelector('[data-d="' + dia + '"]'); if (li) li.classList.add("hoy"); }
  }

  function init() { initReveal(); initWaHide(); initAbierto(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
