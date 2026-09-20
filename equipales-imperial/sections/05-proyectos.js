/* 03 PROYECTOS: flechas y contador del carrusel nativo (scroll-snap). Sin autoplay. */
(function () {
  "use strict";
  var sec = document.getElementById("proyectos");
  if (!sec) return;
  var track = sec.querySelector(".s-pr-track"), cards = sec.querySelectorAll(".s-pr-card"), count = sec.querySelector(".s-pr-count");
  var n = cards.length;
  function idx() {
    var x = track.scrollLeft, best = 0, bd = 1e9;
    for (var i = 0; i < n; i++) { var d = Math.abs(cards[i].offsetLeft - pl() - x); if (d < bd) { bd = d; best = i; } }
    return best;
  }
  function pl() { return parseFloat(getComputedStyle(track).paddingLeft) || 0; }
  function pad(k) { return (k < 10 ? "0" : "") + k; }
  var raf = 0;
  track.addEventListener("scroll", function () { if (raf) return; raf = requestAnimationFrame(function () { raf = 0; count.textContent = pad(idx() + 1) + " / " + pad(n); }); }, { passive: true });
  sec.addEventListener("click", function (e) {
    var b = e.target.closest(".s-pr-btn"); if (!b) return;
    var i = Math.max(0, Math.min(n - 1, idx() + parseInt(b.getAttribute("data-dir"), 10)));
    track.scrollTo({ left: cards[i].offsetLeft - pl(), behavior: "smooth" });
  });
})();
