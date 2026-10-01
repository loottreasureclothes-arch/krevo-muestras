/* Estado en vivo de Independencia (hora de America/Mexico_City). */
(function () {
  "use strict";
  var el = document.getElementById("sc-live"); if (!el) return;
  var span = el.querySelector("span");
  var H = { 0: [10, 15], 1: [10, 20], 2: [10, 20], 3: [10, 20], 4: [10, 20], 5: [10, 20], 6: [10, 20] }; // 0 = domingo
  function nowMx() {
    try {
      var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" }).formatToParts(new Date());
      var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
      var wd = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[o.weekday];
      return { d: wd, m: parseInt(o.hour, 10) * 60 + parseInt(o.minute, 10) };
    } catch (e) { return null; }
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function update() {
    var t = nowMx(); if (!t) return;
    var h = H[t.d], open = h[0] * 60, close = h[1] * 60, txt, cls;
    if (t.m >= open && t.m < close) { txt = "Abierta ahora, cierra a las " + h[1] + ":00"; cls = "is-open"; }
    else if (t.m < open) { txt = "Cerrada, abre hoy " + h[0] + ":00"; cls = "is-closed"; }
    else { txt = "Cerrada, abre mañana " + H[(t.d + 1) % 7][0] + ":00"; cls = "is-closed"; }
    span.textContent = txt; el.className = "sc-live " + cls; el.hidden = false;
  }
  update(); setInterval(update, 60000);
})();
