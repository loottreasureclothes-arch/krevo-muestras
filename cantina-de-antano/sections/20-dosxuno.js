(function () {
  "use strict";
  function init() {
    var C = window.Cantina, live = document.getElementById("dos-live");
    var hh = document.getElementById("cl-h"), mm = document.getElementById("cl-m");
    if (!C || !live) return;
    var A = 810, B = 1260; /* 1:30 p.m. a 9:00 p.m. */
    function unidad(n, w) { return (n === 60 || n === 1 ? w[0] : w[1]) + " " + C.dur(n) + "."; }
    function tick() {
      var t = C.ahora(), m = t.min;
      var h = ((m / 60) % 12) * 30, mi = (m % 60) * 6;
      if (hh) hh.setAttribute("transform", "rotate(" + h.toFixed(1) + " 160 160)");
      if (mm) mm.setAttribute("transform", "rotate(" + mi + " 160 160)");
      var txt, on = false;
      if (m >= A && m < B) { on = true; txt = "Ahorita hay 2x1 en bebidas. " + unidad(B - m, ["Queda", "Quedan"]); }
      else if (m < A) txt = "El 2x1 empieza a la 1:30 p.m. " + unidad(A - m, ["Falta", "Faltan"]);
      else txt = "El 2x1 ya cerró por hoy. Mañana a la 1:30 p.m.";
      if (live.textContent !== txt) live.textContent = txt;
      live.classList.toggle("is-on", on);
    }
    tick(); setInterval(tick, 15000);
    var add = document.getElementById("dos-add");
    if (add) add.addEventListener("click", function () {
      C.add({ id: add.dataset.id, name: add.dataset.name, label: add.dataset.label, price: +add.dataset.price }, 1);
      var t = add.querySelector(".lnk-t"); t.textContent = "Agregado · ya está en tu mesa";
      clearTimeout(add._t); add._t = setTimeout(function () { t.textContent = "Agregar a mi mesa"; }, 2200);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
