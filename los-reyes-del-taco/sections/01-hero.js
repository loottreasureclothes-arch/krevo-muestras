/* Horario de la Central (Maps). Dia 0=domingo. Cierra de madrugada del dia siguiente. */
(function () {
  "use strict";
  var CIERRA = [3, 2, 2, 2, 3, 4, 4]; /* dom, lun, mar, mie, jue, vie, sab */
  var DIAS = ["dom", "lun", "mar", "mie", "jue", "vie", "sab"];
  function ahoraAgs() {
    try {
      var parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" }).formatToParts(new Date());
      var o = {};
      parts.forEach(function (p) { o[p.type] = p.value; });
      var d = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(o.weekday);
      return { dia: d, min: (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10) };
    } catch (e) {
      var n = new Date();
      return { dia: n.getDay(), min: n.getHours() * 60 + n.getMinutes() };
    }
  }
  function fmt(h) { return h + ":00"; }
  function estado() {
    var n = ahoraAgs();
    var ayer = (n.dia + 6) % 7;
    var abierto = n.min >= 540 || n.min < CIERRA[ayer] * 60;
    var cierra = n.min >= 540 ? CIERRA[n.dia] : CIERRA[ayer];
    var diaVentana = n.min >= 540 ? n.dia : ayer; /* dia cuyo horario aplica */
    return { abierto: abierto, cierra: cierra, dia: n.dia, diaVentana: diaVentana };
  }
  window.RT_estado = estado;
  function pintar() {
    var e = estado();
    var chip = document.querySelector("[data-abierto-chip]");
    var txt = document.querySelector("[data-abierto-txt]");
    if (chip && txt) {
      chip.classList.toggle("is-on", e.abierto);
      chip.classList.toggle("is-off", !e.abierto);
      txt.textContent = e.abierto ? "Abierto ahora" : "Cerrado, abre 9:00";
    }
    var big = document.querySelectorAll("[data-abierto-big]");
    for (var i = 0; i < big.length; i++) {
      big[i].classList.toggle("is-on", e.abierto);
      big[i].classList.toggle("is-off", !e.abierto);
      big[i].textContent = e.abierto ? "Abierto ahora, cierra a las " + fmt(e.cierra) + (e.cierra < 9 ? " de la madrugada" : "") : "Cerrado ahora, abre a las 9:00";
    }
    var rows = document.querySelectorAll("[data-dia]");
    for (var j = 0; j < rows.length; j++) rows[j].classList.toggle("is-hoy", parseInt(rows[j].getAttribute("data-dia"), 10) === e.dia);
  }
  window.RT_pintar = pintar;
  function init() { pintar(); setInterval(pintar, 60000); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
