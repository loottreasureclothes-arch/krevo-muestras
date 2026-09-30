/* Estado en vivo: abierto o cerrado, con la hora real de Aguascalientes (centro de Mexico, sin horario de verano). */
(function () {
  "use strict";
  function init() {
    var box = document.getElementById("bi-open"), txt = document.getElementById("bi-open-txt");
    if (!box || !txt) return;
    var dow, mins;
    try {
      var parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
      var o = {}; parts.forEach(function (p) { o[p.type] = p.value; });
      dow = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 0 }[o.weekday];
      mins = (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10);
      if (dow === undefined || isNaN(mins)) return;
    } catch (e) { return; }
    var OPEN = 7 * 60, CLOSE = 17 * 60, t, open = false;
    if (dow >= 1 && dow <= 5) {
      if (mins >= OPEN && mins < CLOSE) { open = true; t = "Abierto ahora. Cerramos a las 17:00"; }
      else if (mins < OPEN) t = "Cerrado ahora. Abrimos hoy a las 7:00";
      else t = dow === 5 ? "Cerrado ahora. Abrimos el lunes a las 7:00" : "Cerrado ahora. Abrimos mañana a las 7:00";
    } else t = "Cerrado hoy. Abrimos el lunes a las 7:00";
    txt.textContent = t;
    box.classList.toggle("is-open", open);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
