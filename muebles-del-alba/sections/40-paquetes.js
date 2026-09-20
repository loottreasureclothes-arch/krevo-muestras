/* 40-paquetes: "Agregar a mi casa" en cada paquete real */
(function () {
  "use strict";
  var sec = document.getElementById("paquetes");
  if (!sec) return;
  sec.addEventListener("click", function (e) {
    var b = e.target.closest("[data-add]");
    if (!b) return;
    window.MDA && MDA.sel.add({
      id: b.getAttribute("data-add"),
      name: b.getAttribute("data-name"),
      price: Number(b.getAttribute("data-price")) || 0,
      img: b.getAttribute("data-img") || ""
    });
    if (window.MDA && MDA.sel && MDA.sel.open) {
      b.classList.add("is-added");
      setTimeout(function () { b.classList.remove("is-added"); }, 700);
    }
  });
})();
