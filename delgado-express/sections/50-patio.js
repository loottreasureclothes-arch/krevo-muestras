/* 50 · estado "Abierto ahora" con la hora de America/Mexico_City */
(function () {
  "use strict";
  var st = document.getElementById("pt-status"), tx = document.getElementById("pt-status-t");
  if (!st || !tx) return;
  /* 0 = domingo. [abre, cierra] en minutos desde medianoche */
  var H = { 0: null, 1: [540, 1110], 2: [540, 1110], 3: [540, 1110], 4: [540, 1110], 5: [540, 1110], 6: [540, 930] };
  var DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  function hm(m) { return Math.floor(m / 60) + ":" + ("0" + (m % 60)).slice(-2); }
  function nowMx() {
    try {
      var parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" }).formatToParts(new Date());
      var o = {}; parts.forEach(function (p) { o[p.type] = p.value; });
      var wd = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[o.weekday];
      return { d: wd, m: (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10) };
    } catch (e) { var n = new Date(); return { d: n.getDay(), m: n.getHours() * 60 + n.getMinutes() }; }
  }
  function paint() {
    var n = nowMx(), h = H[n.d], rows = document.querySelectorAll(".pt-hr tr");
    for (var i = 0; i < rows.length; i++) rows[i].classList.toggle("is-today", (" " + rows[i].getAttribute("data-d") + " ").indexOf(" " + n.d + " ") > -1);
    st.classList.remove("is-open", "is-closed");
    if (h && n.m >= h[0] && n.m < h[1]) { st.classList.add("is-open"); tx.textContent = "Abierto ahora · cierra a las " + hm(h[1]); return; }
    st.classList.add("is-closed");
    var d = n.d, when = "", t = null;
    if (h && n.m < h[0]) { when = "hoy"; t = h[0]; }
    else { for (var k = 1; k <= 7; k++) { var dd = (n.d + k) % 7; if (H[dd]) { t = H[dd][0]; when = k === 1 ? "mañana" : "el " + DIAS[dd]; break; } } }
    tx.textContent = "Cerrado ahora · abre " + when + " " + hm(t);
  }
  paint(); setInterval(paint, 60000);
})();
