/* Estado en vivo del horario (lunes a viernes, 7:30 a 17:00, hora de Aguascalientes). */
(function () {
  "use strict";
  var el = document.getElementById("cp-estado");
  if (!el) return;
  var OPEN = 7 * 60 + 30, CLOSE = 17 * 60;
  function paint() {
    var t = CP.mx(CP.now()), min = t.h * 60 + t.mi, wd = t.dow >= 1 && t.dow <= 5;
    var txt, open = false;
    if (wd && min >= OPEN && min < CLOSE) { txt = "Abierto ahora"; open = true; }
    else if (wd && min < OPEN) txt = "Abre hoy 7:30";
    else if (t.dow >= 1 && t.dow <= 4) txt = "Abre mañana 7:30";
    else if (t.dow === 0) txt = "Abre mañana 7:30";
    else txt = "Abre el lunes 7:30";
    el.textContent = txt;
    el.classList.toggle("is-open", open);
  }
  paint();
  setInterval(paint, 60000);
})();
