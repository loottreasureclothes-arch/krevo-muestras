/* 15 Hoy en Susheria: marca el día de hoy (hora de Aguascalientes), esconde mochis si no es miércoles o viernes y arma el mensaje */
(function () {
  "use strict";
  var sec = document.getElementById("hoy");
  if (!sec) return;
  var d = window.LM && window.LM.today ? window.LM.today() : new Date().getDay();
  var names = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  var mochi = d === 3 || d === 5;
  var day = sec.querySelector("[data-hoy-day]");
  if (day) day.textContent = names[d];
  var m = sec.querySelector("[data-hoy-mochi]");
  if (m && !mochi) m.classList.add("is-off");
  var a = sec.querySelector("[data-hoy-wa]");
  if (a && window.LM) a.href = window.LM.waUrl("Hola, hoy es " + names[d] + ". Quiero pedir con la promo 2x1 en rollos" + (mochi ? " y los mochis 2x1" : "") + " en Sushería Galerías.");
})();
