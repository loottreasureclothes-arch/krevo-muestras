/* 60-cierre: la lámina muestra lo que la persona llenó en el formulario (estado compartido).
   Sin nada elegido, el cajetín dice PROYECTO: EL TUYO · LÁMINA 09 (tu obra es la lámina que sigue). */
(function () {
  "use strict";
  function init() {
    var sum = document.getElementById("cierre-sum");
    var tuyo = document.getElementById("cierre-tuyo");
    var edit = document.getElementById("cierre-edit-t");
    if (!sum || !window.Fedgar) return;
    var cells = {};
    Array.prototype.forEach.call(sum.querySelectorAll("dd[data-k]"), function (dd) { cells[dd.getAttribute("data-k")] = dd; });
    function paint(s) {
      var any = false;
      Object.keys(cells).forEach(function (k) {
        var v = s[k] ? String(s[k]).trim() : "";
        if (k === "m2" && v) v = v.replace(/[^0-9.,]/g, "") + " m²";
        if (k === "m2" && v === " m²") v = "";
        cells[k].textContent = v;
        cells[k].classList.toggle("is-set", !!v);
        if (v) any = true;
      });
      sum.hidden = !any;
      if (tuyo) tuyo.hidden = any;
      if (edit) edit.textContent = any ? "Cambiar mis datos" : "Llenar mi lámina";
    }
    window.Fedgar.on(paint); paint(window.Fedgar.state);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
