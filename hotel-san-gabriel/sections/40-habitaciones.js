/* 40 Habitaciones: contador de la galería al deslizar; en compu, clic en la foto avanza */
(function () {
  "use strict";
  var sec = document.getElementById("habitaciones");
  if (!sec) return;
  Array.prototype.forEach.call(sec.querySelectorAll(".hb-gal"), function (g) {
    var tr = g.querySelector(".hb-track"), b = g.querySelector(".hb-count b"), figs = tr.querySelectorAll("figure"), t = 0;
    function idx() { var best = 0, bd = 1e9, L = tr.getBoundingClientRect().left; for (var i = 0; i < figs.length; i++) { var d = Math.abs(figs[i].getBoundingClientRect().left - L); if (d < bd) { bd = d; best = i; } } return best; }
    tr.addEventListener("scroll", function () { cancelAnimationFrame(t); t = requestAnimationFrame(function () { if (b) b.textContent = idx() + 1; }); }, { passive: true });
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      tr.style.cursor = "pointer";
      tr.addEventListener("click", function () { var i = (idx() + 1) % figs.length; tr.scrollTo({ left: figs[i].offsetLeft - figs[0].offsetLeft, behavior: "smooth" }); });
    }
  });
})();
