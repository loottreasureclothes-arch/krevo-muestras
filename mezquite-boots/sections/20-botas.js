/* Botas: el asomo del carrusel marca el ojillo de la bota que se ve. */
(function () {
  "use strict";
  var track = document.getElementById("bt-track"), dots = document.querySelectorAll("#bt-dots li");
  if (!track || !dots.length) return;
  var raf = null;
  function update() {
    raf = null;
    var cards = track.children, mid = track.scrollLeft + track.clientWidth / 2, best = 0, bd = 1e9;
    for (var i = 0; i < cards.length; i++) { var c = cards[i], d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid); if (d < bd) { bd = d; best = i; } }
    for (var k = 0; k < dots.length; k++) dots[k].classList.toggle("is-on", k === best);
  }
  track.addEventListener("scroll", function () { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
  window.addEventListener("resize", update);
})();
