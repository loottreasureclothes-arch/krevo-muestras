/* 50-taller: "Abierto ahora" contra el horario real (hora de Aguascalientes). */
(function () {
  "use strict";
  var HORARIO = { 1: [8, 18], 2: [8, 18], 3: [8, 18], 4: [8, 18], 5: [8, 17] }; /* 1 = lunes ... 5 = viernes */
  var MAP = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 0 };
  function ahora() {
    try {
      var f = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false });
      var o = {};
      f.formatToParts(new Date()).forEach(function (p) { o[p.type] = p.value; });
      return { d: MAP[o.weekday], m: (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10) };
    } catch (e) { return null; }
  }
  function pinta() {
    var box = document.getElementById("live"), txt = document.getElementById("live-txt");
    if (!box || !txt) return;
    var t = ahora();
    if (!t) return;
    var h = HORARIO[t.d], msg, state = "cerrado";
    if (h && t.m >= h[0] * 60 && t.m < h[1] * 60) { msg = "Abierto ahora · cierra " + h[1] + ":00"; state = "abierto"; }
    else if (h && t.m < h[0] * 60) msg = "Cerrado, abre hoy " + h[0] + ":00";
    else if (t.d >= 1 && t.d <= 3 || t.d === 4) msg = "Cerrado, abre mañana 8:00";
    else if (t.d === 0) msg = "Cerrado, abre mañana 8:00";
    else msg = "Cerrado, abre el lunes 8:00";
    box.setAttribute("data-state", state);
    txt.textContent = msg;
  }
  function init() { pinta(); setInterval(pinta, 60000); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
