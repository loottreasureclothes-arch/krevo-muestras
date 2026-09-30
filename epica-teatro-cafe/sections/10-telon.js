/* 10 · El telón: línea "HOY EN ÉPICA" calculada con el día y la HORA reales del visitante.
   Mié a dom: antes de las 16:00 "Abrimos a las 16:00."; de 16:00 a 23:59 "Abiertos hasta las 00:00.".
   Lun y mar: "Descansamos, nos vemos el miércoles." */
(function () {
  "use strict";
  function run() {
    var el = document.getElementById("ep-hoy-v");
    if (!el) return;
    var now = new Date(), d = now.getDay(); /* 0 dom ... 6 sáb */
    var prog = { 0: "Teatro infantil y música", 3: "Stand-up", 4: "Teatro experimental y arte urbano", 5: "Teatro", 6: "Teatro" };
    if (d === 1 || d === 2) { el.textContent = "Descansamos, nos vemos el miércoles."; return; }
    el.textContent = prog[d] + (now.getHours() < 16 ? ". Abrimos a las 16:00." : ". Abiertos hasta las 00:00.");
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
})();
