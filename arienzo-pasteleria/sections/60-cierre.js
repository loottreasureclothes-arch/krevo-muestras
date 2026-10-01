(function () {
  "use strict";
  var A = window.Arienzo;
  var l1 = document.getElementById("cierre-l1"), l2 = document.getElementById("cierre-l2");
  var vacio = document.getElementById("cierre-vacio"), pedido = document.getElementById("pedido"), ul = document.getElementById("pedido-ul");
  var wa = document.getElementById("cierre-wa");
  if (!l1 || !wa) return;
  function li(txt, small) {
    var e = document.createElement("li"); e.textContent = txt;
    if (small) { var s = document.createElement("small"); s.textContent = small; e.appendChild(s); }
    return e;
  }
  function paint() {
    var s = A.state(), has = A.hayPedido();
    l1.textContent = has ? "Tu pedido" : "Elige qué";
    l2.textContent = has ? "empieza aquí." : "se te antoja.";
    vacio.hidden = has; pedido.hidden = !has;
    while (ul.firstChild) ul.removeChild(ul.firstChild);
    var hayPastel = !!(s.size || s.sabor);
    if (s.q && !(s.q === "pasteles" && hayPastel)) ul.appendChild(li(A.CUARTELES[s.q].nombre));
    if (hayPastel) {
      var d = (s.ded || "").trim();
      ul.appendChild(li(A.resumenPastel() + (s.size ? "" : ""), d ? "Dedicatoria: " + d : "*Precio de su historia de Instagram. Confirma el vigente."));
    }
    A.setWa(wa, A.mensajeCierre());
  }
  window.addEventListener("arienzo:cambio", paint);
  paint();
})();
