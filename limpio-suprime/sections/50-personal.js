/* 50 · "Pedir personal de limpieza": preselecciona el cotizador y sube */
(function () {
  "use strict";
  function init() {
    var btn = document.getElementById("pe-btn");
    if (!btn) return;
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("ls:espacio", { detail: { necesita: "Personal de limpieza" } }));
      if (window.LSScroll) window.LSScroll("cotiza");
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
