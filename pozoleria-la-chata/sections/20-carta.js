/* Momento firma "El medallón se sirve" (HOJA §3), dentro de la primera tarjeta de la carta.
   Scrub de scroll SIN pin sobre 40 svh, reversible. 0 = medallón intacto (mascota);
   1 = el disco se abrió del todo (scale 0 y opacidad 0, sin dejar ninguna manchita sobre el
   plato) y queda la foto real del pozole rojo.
   El nombre y "Pregunta el precio" NO dependen de esto: van visibles desde el HTML en
   cualquier ancho. prefers-reduced-motion: el CSS ya deja el estado final puesto.
   El "+" de esta tarjeta y de todas las demás lo cablea site.js (carrito). */
(function () {
  "use strict";
  var el = document.getElementById("momento-medal");
  var card = document.getElementById("momento");
  if (!el || !card) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var disc = el.querySelector(".s-carta-medal-disc");
  var ring = el.querySelector(".s-carta-medal-ring");
  var ticking = false;

  function progressFor() {
    var r = card.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var span = Math.max(1, vh * 0.4); // 40 svh
    return Math.max(0, Math.min(1, (vh * 0.78 - r.top) / span));
  }
  function update() {
    ticking = false;
    var p = progressFor();
    var s = Math.max(0, 1 - p);
    disc.style.transform = "scale(" + s.toFixed(3) + ")";
    /* El último tercio se va en opacidad: nada de un disquito flotando sobre el pozole. */
    disc.style.opacity = s < 0.3 ? (s / 0.3).toFixed(3) : "1";
    ring.style.transform = "rotate(" + (p * 10).toFixed(2) + "deg)";
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
})();
