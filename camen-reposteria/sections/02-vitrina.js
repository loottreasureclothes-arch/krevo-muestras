/* Agregar: lleva extras al pedido de "Arma tu pastel" */
(function () {
  window.CamenExtras = window.CamenExtras || [];
  var nota = document.getElementById("vit-nota"), tm = null;
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".add");
    if (!b) return;
    var it = b.getAttribute("data-item"), i = window.CamenExtras.indexOf(it), on = i < 0;
    if (on) window.CamenExtras.push(it); else window.CamenExtras.splice(i, 1);
    b.setAttribute("aria-pressed", on ? "true" : "false");
    b.textContent = on ? "Agregado" : "Agregar";
    window.dispatchEvent(new CustomEvent("camen:extras"));
    if (nota && on) { nota.hidden = false; clearTimeout(tm); tm = setTimeout(function () { nota.hidden = true; }, 2600); }
  });
})();
