/* 06-cierre — "Nos vemos, Canela." SOLO si ya hay placa (si no, ese renglón no existe). */
(function () {
  "use strict";
  function pintar() {
    var el = document.getElementById("cierre-canela");
    if (!el) return;
    var p = window.vetinnPlaca && window.vetinnPlaca();
    if (p && p.nombre) {
      el.textContent = "Nos vemos, " + p.nombre + ".";
      el.hidden = false;
    } else {
      el.hidden = true;
      el.textContent = "";
    }
  }
  function init() {
    pintar();
    window.addEventListener("vetinn:placa", pintar);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
