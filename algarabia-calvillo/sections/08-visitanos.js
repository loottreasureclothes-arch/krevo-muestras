/* Horario por dia y "Abierto ahora" calculado en hora de Calvillo (Mexico_City, UTC-6). */
(function () {
  "use strict";
  var DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  var ABRE = 10 * 60, CIERRA = 18 * 60, CERRADO = 3;
  function ahoraMX() {
    try {
      var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
      var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
      var d = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[o.weekday];
      return { d: d, m: parseInt(o.hour, 10) * 60 + parseInt(o.minute, 10) };
    } catch (e) { var n = new Date(); return { d: n.getDay(), m: n.getHours() * 60 + n.getMinutes() }; }
  }
  function proximoDia(d) { var n = (d + 1) % 7; if (n === CERRADO) n = (n + 1) % 7; return n; }
  var box = document.getElementById("ahora"), txt = document.getElementById("ahora-txt");
  if (!box || !txt) return;
  var t = ahoraMX();
  var li = document.querySelector('#horario li[data-d="' + t.d + '"]');
  if (li) li.classList.add("hoy");
  var abierto = t.d !== CERRADO && t.m >= ABRE && t.m < CIERRA;
  box.classList.remove("on", "off");
  if (abierto) { box.classList.add("on"); txt.textContent = "Abierto ahora. Cerramos a las 18:00."; }
  else {
    box.classList.add("off");
    if (t.d !== CERRADO && t.m < ABRE) txt.textContent = "Cerrado ahora. Abrimos hoy a las 10:00.";
    else if (t.d === 2) txt.textContent = "Cerrado ahora. Mañana es miércoles, descansamos. Abrimos el jueves a las 10:00.";
    else if (t.d === CERRADO) txt.textContent = "Hoy es miércoles, descansamos. Abrimos mañana a las 10:00.";
    else txt.textContent = "Cerrado ahora. Abrimos " + (proximoDia(t.d) === (t.d + 1) % 7 ? "mañana" : "el " + DIAS[proximoDia(t.d)]) + " a las 10:00.";
  }
})();
