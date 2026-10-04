/* Pozole de hoy: la banderita del día se marca y la palabra gigante cambia según el día. */
(function(){
  "use strict";
  var d = new Date().getDay();
  var DIAS = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
  var tipo = d === 5 ? "verde" : d === 6 ? "blanco" : "rojo";
  var flag = document.querySelector('.flag[data-tipo="' + tipo + '"]');
  if (flag) flag.classList.add("hoy");
  var big = document.getElementById("hoy-big"), sub = document.getElementById("hoy-sub"), dia = document.getElementById("hoy-dia");
  if (!big) return;
  dia.textContent = "Hoy es " + DIAS[d].toLowerCase() + ", en el caldero";
  big.textContent = tipo === "rojo" ? "Rojo" : tipo === "verde" ? "Verde" : "Blanco";
  sub.textContent = tipo === "rojo" ? "Pozole rojo, el de todos los días." : tipo === "verde" ? "Hoy hay verde, solo viernes. El rojo también está." : "Hoy hay blanco, solo sábado. El rojo también está.";
})();
