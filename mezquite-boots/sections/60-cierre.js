/* CIERRE: repite la nota de "Arma tu pinta". */
(function () {
  "use strict";
  var MZ = window.MZ; if (!MZ) return;
  var note = document.getElementById("cz-note"); if (!note) return;
  var l1 = document.getElementById("cz-l1"), l2 = document.getElementById("cz-l2"), edit = document.getElementById("cz-edit");
  var busco = document.getElementById("cz-busco"), num = document.getElementById("cz-num"), suc = document.getElementById("cz-suc"), nm = document.getElementById("cz-name");
  function row(id) { return document.querySelector('.cz-row[data-row="' + id + '"]'); }
  function render() {
    var L = MZ.lines(), has = !MZ.empty();
    l1.textContent = has ? "Tu pinta" : "Falta elegir"; l2.textContent = has ? "ya está anotada." : "la primera prenda.";
    if (has) { busco.textContent = L.busco; } else { busco.innerHTML = '<span class="cz-none">Todavía nada. Toca una prenda del maniquí.</span>'; }
    num.textContent = L.num; row("num").hidden = !L.num;
    suc.textContent = L.suc; row("suc").hidden = !L.suc;
    nm.textContent = L.name; row("name").hidden = !L.name;
    if (edit) edit.firstChild.textContent = has ? "Cambiar mi pinta" : "Ir al maniquí";
  }
  MZ.on(render); window.addEventListener("mz-name", render); render();
})();
