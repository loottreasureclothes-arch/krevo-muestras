/* sucursales: estado en vivo (America/Mexico_City) y "Pedir en X" que elige la sucursal en la charola */
(function () {
  "use strict";
  /* [abre, cierra] en horas; clave 0=domingo..6=sabado; null = no se afirma */
  var H = {
    centro: { 0: [14, 23], 1: null, 2: [14, 24], 3: [14, 24], 4: [14, 24], 5: [14, 24], 6: [14, 24] },
    norte: { 0: [14, 23], 1: [14, 23], 2: [14, 23], 3: [14, 23], 4: [14, 23], 5: [14, 23], 6: [14, 23] }
  };
  function now() {
    try {
      var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" }).formatToParts(new Date());
      var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
      var dias = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      return { d: dias[o.weekday], t: (+o.hour % 24) + (+o.minute) / 60 };
    } catch (e) { return null; }
  }
  function hora(h) { return h === 24 ? "12 a.m." : (h > 12 ? h - 12 : h) + " p.m."; }
  function live() {
    var n = now(); if (!n) return;
    Array.prototype.forEach.call(document.querySelectorAll("[data-live]"), function (el) {
      var h = H[el.getAttribute("data-live")][n.d];
      if (!h) { el.textContent = ""; return; }
      var s, cls = "tq-mk";
      if (n.t >= h[0] && n.t < h[1]) s = "Abierto ahora, cierra a las " + hora(h[1]);
      else if (n.t < h[0]) { s = "Cerrado, abre hoy a las " + hora(h[0]); cls = "is-off"; }
      else { s = "Cerrado por hoy"; cls = "is-off"; }
      el.innerHTML = ""; var sp = document.createElement("span"); sp.className = cls; sp.textContent = s; el.appendChild(sp);
    });
  }
  function init() {
    live(); setInterval(live, 60000);
    document.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest("[data-pick]") : null;
      if (!b || !window.Tq) return;
      Tq.set("suc", b.getAttribute("data-pick"));
      var ch = document.getElementById("charola"); if (ch) Tq.go(ch);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
