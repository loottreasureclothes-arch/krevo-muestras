(function () {
  var el = document.getElementById("vv-abierto"); if (!el) return;
  function ahora() {
    var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date()), o = {};
    p.forEach(function (x) { o[x.type] = x.value; });
    var dias = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return { d: dias[o.weekday], m: (+o.hour % 24) * 60 + (+o.minute) };
  }
  try {
    var n = ahora(), abre = n.d === 0 ? 570 : 540, cierra = 960;
    var li = document.querySelector('#vv-horas li[data-dia="' + n.d + '"]'); if (li) li.classList.add("hoy");
    var si = n.m >= abre && n.m < cierra;
    el.textContent = si ? "Abierto ahora, cierra a las 16:00" : (n.m < abre ? "Cerrado, abre hoy a las " + (n.d === 0 ? "9:30" : "9:00") : "Cerrado, abre mañana a las " + (n.d === 6 ? "9:30" : "9:00"));
    el.className = "vv-abierto " + (si ? "si" : "no");
  } catch (e) { el.textContent = "Lun a sáb 9:00 a 16:00 · Dom 9:30 a 16:00"; }
})();
