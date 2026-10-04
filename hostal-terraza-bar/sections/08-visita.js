(function () {
  var st = document.getElementById("vis-st"); if (!st) return;
  var d, h, m;
  try {
    var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" }).formatToParts(new Date());
    var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
    d = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(o.weekday); h = +o.hour % 24; m = +o.minute;
  } catch (e) { var n = new Date(); d = n.getDay(); h = n.getHours(); m = n.getMinutes(); }
  var row = document.querySelector('#hrs tr[data-d="' + d + '"]'); if (row) row.classList.add("today");
  var t = st.querySelector("span");
  if (h >= 13 || h < 2) { st.classList.add("open"); t.textContent = "Abierto ahora. Cierra a las 2 a.m."; }
  else { st.classList.add("closed"); t.textContent = "Cerrado ahora. Abre hoy a la 1 p.m."; }
})();
