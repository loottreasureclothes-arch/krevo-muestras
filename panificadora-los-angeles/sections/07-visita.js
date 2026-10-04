(function () {
  var el = document.getElementById("estado"); if (!el) return;
  var p = {};
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false })
      .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
  } catch (e) { return; }
  var dmap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }, d = dmap[p.weekday], m = (+p.hour % 24) * 60 + +p.minute;
  var open = 480, close = 1230, t = el.querySelector("span");
  if (m >= open && m < close) { el.className = "estado on"; t.textContent = "Abierto ahora · cierra a las 20:30"; }
  else { el.className = "estado off"; t.textContent = "Cerrado ahora · abre " + (m < open ? "hoy" : "mañana") + " a las 8:00"; }
  var li = document.querySelector('#horas li[data-d="' + d + '"]'); if (li) li.classList.add("hoy");
})();
