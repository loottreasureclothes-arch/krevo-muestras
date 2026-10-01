/* 60-cierre: resume el plan y la clase elegidos y cambia el titular ("Tu plan ya está listo.") */
(function () {
  "use strict";
  var FZ = window.FZ;
  var plan = document.getElementById("fz-sum-plan");
  if (!FZ || !plan) return;
  var clase = document.getElementById("fz-sum-clase");
  var c1 = document.getElementById("fz-c1");
  var c2 = document.getElementById("fz-c2");
  var link = document.getElementById("fz-pick-link");
  function paint() {
    if (FZ.plan) { plan.textContent = FZ.plan; plan.classList.add("is-set"); FZ.setLine(c1, "Tu plan"); FZ.setLine(c2, "ya está listo."); if (link) link.hidden = true; }
    else { plan.textContent = "Sin elegir"; plan.classList.remove("is-set"); FZ.setLine(c1, "Falta elegir"); FZ.setLine(c2, "plan."); if (link) link.hidden = false; }
    if (FZ.clase) { clase.textContent = "CrossFit " + FZ.clase.label + " con " + FZ.clase.coach; clase.classList.add("is-set"); }
    else { clase.textContent = "Sin elegir"; clase.classList.remove("is-set"); }
  }
  FZ.on(paint);
  paint();
})();
