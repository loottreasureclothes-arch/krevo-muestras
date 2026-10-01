/* 20-planes: elegir un plan lo guarda en el estado compartido (FZ.plan) y lo marca */
(function () {
  "use strict";
  var FZ = window.FZ;
  if (!FZ) return;
  var btns = document.querySelectorAll(".fz-pick");
  function paint() {
    Array.prototype.forEach.call(btns, function (b) {
      var on = FZ.plan === b.getAttribute("data-pick");
      b.setAttribute("aria-pressed", on ? "true" : "false");
      var s = b.querySelector("span");
      s.textContent = on ? "Elegido" : "Elegir";
      var li = b.closest(".fz-plan");
      if (li) li.classList.toggle("is-picked", on);
    });
  }
  Array.prototype.forEach.call(btns, function (b) {
    b.addEventListener("click", function () {
      var n = b.getAttribute("data-pick");
      FZ.set("plan", FZ.plan === n ? "" : n);
    });
  });
  FZ.on(paint);
  paint();
})();
