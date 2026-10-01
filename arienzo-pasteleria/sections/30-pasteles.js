(function () {
  "use strict";
  var A = window.Arienzo;
  var sec = document.getElementById("30-pasteles");
  if (!sec) return;
  var szs = [].slice.call(sec.querySelectorAll(".sz")), sabs = [].slice.call(sec.querySelectorAll(".sab"));
  var res = document.getElementById("res-t"), ded = document.getElementById("ded"), prev = document.getElementById("ded-prev"), prevT = document.getElementById("ded-t");
  var wa = document.getElementById("pas-wa");
  function paint(fromInput) {
    var s = A.state();
    szs.forEach(function (b) { b.setAttribute("aria-pressed", String(+b.getAttribute("data-size") === s.size)); });
    sabs.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-sabor") === s.sabor)); });
    var r = A.resumenPastel();
    res.textContent = r ? (s.size ? r : r + ". Elige un tamaño.") : "Elige un tamaño y, si quieres, un sabor.";
    if (!fromInput && ded.value !== (s.ded || "")) ded.value = s.ded || "";
    var d = (s.ded || "").trim();
    prev.hidden = !d; prevT.textContent = d;
    A.setWa(wa, A.mensajePastel());
  }
  szs.forEach(function (b) { b.addEventListener("click", function () { var n = +b.getAttribute("data-size"); A.set("size", A.state().size === n ? null : n); }); });
  sabs.forEach(function (b) { b.addEventListener("click", function () { var v = b.getAttribute("data-sabor"); A.set("sabor", A.state().sabor === v ? null : v); }); });
  ded.addEventListener("input", function () { A.set("ded", ded.value.slice(0, 28)); });
  window.addEventListener("arienzo:cambio", function () { paint(document.activeElement === ded); });
  paint(false);
})();
