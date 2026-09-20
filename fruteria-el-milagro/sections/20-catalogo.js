/* Los paquetes: el "+" de cada renglon agrega al pizarron (FEM.pizarron.add, en site.js).
   Blindaje (HOJA §4.5): cada "+" ES el link directo <a href="wa.me/...">, con su propio
   mensaje ya armado; si el JS no corre, se comporta como un link normal. Con JS, el click
   se intercepta y en vez de abrir WhatsApp por cada paquete, se escribe en el pizarron. */
(function () {
  "use strict";
  function init() {
    if (!window.FEM || !FEM.pizarron) return;
    var btns = document.querySelectorAll("#catalogo .s-cat-add[data-id]");
    Array.prototype.forEach.call(btns, function (b) {
      b.addEventListener("click", function (e) {
        e.preventDefault();
        var id = b.getAttribute("data-id");
        var name = b.getAttribute("data-name");
        var price = parseFloat(b.getAttribute("data-price")) || 0;
        if (FEM.pizarron.has(id)) { FEM.pizarron.open(); return; }
        FEM.pizarron.add({ id: id, name: name, price: price });
        b.classList.add("is-added");
        setTimeout(function () { b.classList.remove("is-added"); }, 700);
      });
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
