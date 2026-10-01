/* Resumen de lo elegido (lee el estado en memoria de "Dilo sin escribirlo"; no guarda nada). */
(function () {
  "use strict";
  function init() {
    if (!window.PC) return;
    var m = document.getElementById("sum-motivo"), c = document.getElementById("sum-consultorio"), w = document.getElementById("sum-cuando");
    if (!m) return;
    function cap(t) { return t ? t.charAt(0).toUpperCase() + t.slice(1) : t; }
    function put(el, text) { el.textContent = text || "Sin elegir"; el.classList.toggle("is-set", !!text); }
    PC.on(function (s) {
      put(m, s.motivoLibre ? "No se manda (en consulta)" : cap(s.motivo));
      put(c, cap(s.consultorio));
      put(w, cap(s.cuando));
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
