/* 10 · Hero: "Pasarle otra vez" vuelve a correr la pasada del jalador */
(function () {
  "use strict";
  function init() {
    var btn = document.getElementById("s-hero-replay");
    var scene = document.getElementById("s-hero-scene");
    if (!btn || !scene || !window.LSJalador) return;
    btn.addEventListener("click", function () {
      window.LSJalador.reset(scene); // vuelve a empañar el vidrio
      /* dos cuadros de respiro para que se vea el vaho antes de la pasada */
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          setTimeout(function () { window.LSJalador.run(scene, 1150); }, 260);
        });
      });
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
