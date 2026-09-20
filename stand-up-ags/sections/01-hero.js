/* 01-hero: titulo por mascara, LINEA POR LINEA. No toca el HTML interno de
   cada .ln (solo lo envuelve en un .ln-i), asi que los <em> sobreviven y el
   titulo se queda a dos tonos: "TE LO ENTREGAMOS" y "DE PIE." en --brand.
   Blindaje: si no hay scripting o hay prefers-reduced-motion, el H1 se queda
   tal cual esta en el HTML; y si algo falla, el rescate de 1.2s lo destapa. */
(function () {
  "use strict";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;
  var h1 = document.querySelector(".s-hero-title");
  if (!h1) return;
  var lines = h1.querySelectorAll(".ln");
  if (!lines.length) return;

  Array.prototype.forEach.call(lines, function (ln, i) {
    if (ln.querySelector(".ln-i")) return;
    var inner = document.createElement("span");
    inner.className = "ln-i";
    while (ln.firstChild) inner.appendChild(ln.firstChild); // conserva los <em>
    ln.appendChild(inner);
    inner.style.transitionDelay = (i * 90) + "ms";
  });
  h1.classList.add("su-mask-lines");

  function show() { h1.classList.add("is-in"); }
  requestAnimationFrame(function () { requestAnimationFrame(show); });
  window.setTimeout(show, 1200); // red de seguridad: nada se queda en blanco
})();
