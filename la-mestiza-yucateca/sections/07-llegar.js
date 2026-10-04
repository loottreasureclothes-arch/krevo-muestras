(function () {
  var el = document.getElementById("ll-ya"); if (!el) return;
  var p = {};
  try { new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; }); } catch (e) { return; }
  var dias = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }, d = dias[p.weekday], m = (+p.hour % 24) * 60 + +p.minute;
  var li = document.querySelector('#ll-dias li[data-d="' + d + '"]'); if (li) li.classList.add("hoy");
  var ab = 480, ci = 810, t = el.querySelector("span");
  if (m >= ab && m < ci) { el.classList.add("abierto"); t.textContent = "Abierto ahora · cierra a las 13:30"; }
  else { el.classList.add("cerrado"); t.textContent = "Cerrado · abre " + (m < ab ? "hoy" : "mañana") + " a las 8:00"; }
})();
