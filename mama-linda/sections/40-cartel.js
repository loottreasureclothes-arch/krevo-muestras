/* 4 · La columna de HOY se ilumina (misma regla que el pizarrón del header). */
(function () {
  "use strict";
  var ML = window.ML, ul = document.getElementById("ct-precios");
  if (!ML || !ul) return;
  var t = ML.ahora(), k = (t.dow >= 1 && t.dow <= 4) ? "sem" : "fin";
  var li = ul.querySelector('[data-d="' + k + '"]');
  if (li) li.classList.add("is-hoy");
  function pulso() { ul.classList.add("is-pulse"); }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { pulso(); io.disconnect(); } }); }, { threshold: 0.4 });
    io.observe(ul);
  } else pulso();
})();
