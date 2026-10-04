/* Burdo: abierto ahora con la hora de Aguascalientes (horario de Google: 24 h los 7 dias). */
(function () {
  var H = { 0: [0, 24], 1: [0, 24], 2: [0, 24], 3: [0, 24], 4: [0, 24], 5: [0, 24], 6: [0, 24] };
  var el = document.getElementById("bd-now"); if (!el) return;
  var p = {}; try {
    new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
  } catch (e) { return; }
  var d = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(p.weekday), h = (+p.hour % 24) + (+p.minute) / 60, r = H[d];
  var row = document.querySelector('.bd-hor tr[data-d="' + d + '"]'); if (row) row.classList.add("is-hoy");
  var s = el.querySelector("span");
  if (r && h >= r[0] && h < r[1]) s.textContent = r[1] === 24 && r[0] === 0 ? "Abierto ahora, las 24 h" : "Abierto ahora, cierra a las " + r[1] + ":00";
  else { el.classList.add("is-closed"); s.textContent = "Cerrado ahora"; }
})();
