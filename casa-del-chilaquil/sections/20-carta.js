(function () {
  "use strict";
  var list = document.getElementById("cc-lista"); if (!list) return;
  var sel = [];
  var n = document.getElementById("cc-tray-n"), l = document.getElementById("cc-tray-l"), a = document.getElementById("cc-tray-wa");
  function paint() {
    var msg;
    if (!sel.length) {
      n.textContent = "Tu pedido está vacío"; l.textContent = "Toca Agregar y te armamos el mensaje.";
      msg = "Hola, vi su página y quiero hacer un pedido.";
    } else {
      n.textContent = sel.length === 1 ? "1 platillo en tu pedido" : sel.length + " platillos en tu pedido";
      l.textContent = sel.join(", ");
      msg = "Hola, vi su página y quiero pedir: " + sel.join(", ") + ". ¿Me confirman precio y tiempo?";
    }
    a.setAttribute("data-wa", msg); a.href = CC.waUrl(msg);
  }
  list.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".cc-add"); if (!b) return;
    var name = b.getAttribute("data-item"), i = sel.indexOf(name);
    if (i < 0) { sel.push(name); b.setAttribute("aria-pressed", "true"); b.textContent = "Quitar"; }
    else { sel.splice(i, 1); b.setAttribute("aria-pressed", "false"); b.textContent = "Agregar"; }
    paint();
  });
})();
