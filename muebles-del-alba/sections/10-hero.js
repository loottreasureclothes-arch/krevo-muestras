/* 10-hero: los botones "Compra ahora" del slider mandan directo al chip de esa
   categoria en #catalogo (mda:cat, ya lo escucha 20-catalogo.js). */
(function () {
  "use strict";
  document.addEventListener("click", function (ev) {
    var a = ev.target.closest("[data-cat-jump]");
    if (!a) return;
    var cat = a.getAttribute("data-cat-jump");
    if (cat) document.dispatchEvent(new CustomEvent("mda:cat", { detail: cat }));
  });
})();
