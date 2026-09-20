/* Momento firma "El medallón se sirve" (HOJA §3), dentro de la primera tarjeta de la carta.
   Scrub de scroll SIN pin sobre 40 svh, reversible. 0 = medallón intacto (mascota);
   1 = el disco se abrió en iris y queda la foto real del pozole rojo. A 0.75 caen el nombre
   y "Pregunta el precio". prefers-reduced-motion: el CSS ya deja el estado final puesto.
   El "+" de esta tarjeta y de todas las demás lo cablea site.js (carrito). */
(function () {
  "use strict";
  var el = document.getElementById("momento-medal");
  var card = document.getElementById("momento");
  if (!el || !card) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var disc = el.querySelector(".s-carta-medal-disc");
  var ring = el.querySelector(".s-carta-medal-ring");
  var texts = card.querySelectorAll("[data-momento-text]");
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
    disc.style.transform = "scale(" + Math.max(0.02, 1 - p).toFixed(3) + ")";
    ring.style.transform = "rotate(" + (p * 10).toFixed(2) + "deg)";
    for (var i = 0; i < texts.length; i++) texts[i].classList.toggle("is-in", p >= 0.75);
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  /* Blindaje: si algo falla arriba, a los 1.6 s el nombre y el precio quedan visibles igual. */
  setTimeout(function () {
    for (var i = 0; i < texts.length; i++) {
      if (card.getBoundingClientRect().top < (window.innerHeight || 800)) texts[i].classList.add("is-in");
    }
  }, 1600);
  update();
})();
