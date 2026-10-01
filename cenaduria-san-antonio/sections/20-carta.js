/* 20 · La carta: los "+" suman a LA CUENTA compartida; la barra de abajo dice cuanto va. */
(function () {
  "use strict";
  var CS = window.CS;
  if (!CS) return;
  var C = CS.Cuenta;
  var btns = Array.prototype.slice.call(document.querySelectorAll(".carta [data-add]"));
  var bar = document.getElementById("cb-v");
  var atoleD = document.getElementById("it-atole-d");

  btns.forEach(function (b) {
    b.addEventListener("click", function () { C.addX(b.getAttribute("data-add"), 1); });
  });

  function paint() {
    var S = C.get();
    btns.forEach(function (b) {
      var q = S.x[b.getAttribute("data-add")] || 0;
      if (q) b.setAttribute("data-q", q); else b.removeAttribute("data-q");
    });
    if (bar) {
      if (C.vacia()) bar.textContent = "Aún vacía";
      else {
        var t = C.total();
        bar.textContent = t > 0 ? "Aprox. " + CS.money(t) + (C.haySinPrecio() ? " y lo que pregunten" : "") : "Pregunta el precio";
      }
    }
  }
  if (atoleD) {
    var a = CS.atole();
    if (a.nombre) atoleD.textContent = "Atole de " + a.nombre.toLowerCase() + (a.cuando === "MAÑANA" ? " (mañana)" : " (hoy)") + ". Un sabor distinto cada día.";
    else if (a.k === "cerrado") {
      atoleD.textContent = "Hoy descansan. Un sabor distinto cada día.";
      var ab = document.querySelector('[data-add="atole"]');
      if (ab) { ab.disabled = true; ab.setAttribute("aria-label", "Hoy descansan, no hay atole"); }
    }
    else atoleD.textContent = "Un sabor distinto cada día. Pregunta el de hoy.";
  }
  C.on(paint);
  paint();
})();
