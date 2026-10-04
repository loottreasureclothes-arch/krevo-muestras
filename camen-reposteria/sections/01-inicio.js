/* Abierto ahora, con el horario real de las dos fichas de Maps (hora de Aguascalientes) */
(function () {
  var el = document.getElementById("hora"), t = document.getElementById("hora-txt");
  if (!el || !t || !window.Intl) return;
  try {
    var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
    var d = {}; p.forEach(function (x) { d[x.type] = x.value; });
    var h = (parseInt(d.hour, 10) % 24) + parseInt(d.minute, 10) / 60;
    var w = d.weekday;
    var hor = w === "Sun" ? [12, 14.5, "Domingo 12 a 14:30 h"] : w === "Sat" ? [9, 19.5, "Sábado 9 a 19:30 h"] : [9, 20, "Lunes a viernes 9 a 20 h"];
    var open = h >= hor[0] && h < hor[1];
    t.textContent = (open ? "Abierto ahora. " : "Cerrado ahora. ") + hor[2];
    el.classList.toggle("open", open);
  } catch (e) {}
})();
