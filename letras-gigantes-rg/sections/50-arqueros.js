(function () {
  "use strict";
  /* Renglón vivo: hora de America/Mexico_City contra el horario publicado en Google Maps */
  var H = { 0: [12 * 60, 14 * 60], 1: [11.5 * 60, 19 * 60], 2: [11.5 * 60, 19 * 60], 3: [11.5 * 60, 19 * 60], 4: [11.5 * 60, 19 * 60], 5: [11.5 * 60, 19 * 60], 6: [11.5 * 60, 15 * 60] };
  function fmt(m) { var h = Math.floor(m / 60), mm = Math.round(m % 60); return h + ":" + (mm < 10 ? "0" : "") + mm; }
  function now() {
    try {
      var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" }).formatToParts(new Date());
      var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
      var wd = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[o.weekday];
      return { d: wd, m: parseInt(o.hour, 10) % 24 * 60 + parseInt(o.minute, 10) };
    } catch (e) { var t = new Date(); return { d: t.getDay(), m: t.getHours() * 60 + t.getMinutes() }; }
  }
  function paint() {
    var el = document.getElementById("lg-hoy"); if (!el) return;
    var n = now(), h = H[n.d], txt;
    if (n.m < h[0]) txt = "Hoy abren a las " + fmt(h[0]) + ".";
    else if (n.m < h[1]) txt = "Hoy abren hasta las " + fmt(h[1]) + ".";
    else { var nd = (n.d + 1) % 7; txt = "Hoy ya cerraron; mañana abren " + fmt(H[nd][0]) + "."; }
    el.textContent = txt;
    Array.prototype.forEach.call(document.querySelectorAll(".lg-hr"), function (r) {
      var d = r.getAttribute("data-d"), on = false;
      if (d === "1-5") on = n.d >= 1 && n.d <= 5; else on = String(n.d) === d;
      r.classList.toggle("is-today", on);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", paint); else paint();
  setInterval(paint, 60000);
})();
