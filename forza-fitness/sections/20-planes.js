/* 20-planes: elegir un plan lo guarda en el estado compartido (FZ.plan) y lo marca.
   "Otros paquetes" no tiene boton Elegir: su link "Pregunta el precio" lo elige y baja al cierre (#cierre), sin abrir WhatsApp */
(function () {
  "use strict";
  var FZ = window.FZ;
  if (!FZ) return;
  var btns = document.querySelectorAll(".fz-pick");
  var asks = document.querySelectorAll("[data-ask]");
  function paint() {
    Array.prototype.forEach.call(btns, function (b) {
      var on = FZ.plan === b.getAttribute("data-pick");
      b.setAttribute("aria-pressed", on ? "true" : "false");
      var s = b.querySelector("span");
      s.textContent = on ? "Elegido" : "Elegir";
      var li = b.closest(".fz-plan");
      if (li) li.classList.toggle("is-picked", on);
    });
    Array.prototype.forEach.call(asks, function (a) {
      var li = a.closest(".fz-plan");
      if (li) li.classList.toggle("is-picked", FZ.plan === a.getAttribute("data-pick"));
    });
  }
  Array.prototype.forEach.call(btns, function (b) {
    b.addEventListener("click", function () {
      var n = b.getAttribute("data-pick");
      FZ.set("plan", FZ.plan === n ? "" : n);
    });
  });
  Array.prototype.forEach.call(asks, function (a) {
    /* sin preventDefault: el navegador baja al cierre por el href */
    a.addEventListener("click", function () { FZ.set("plan", a.getAttribute("data-pick")); });
  });
  FZ.on(paint);
  paint();
})();
