/* Reseñas: carril de comandas con flechas y contador. */
(function () {
  "use strict";
  var r = document.getElementById("rv-rail"); if (!r) return;
  var s = r.querySelectorAll(".rv-slip"), n = document.getElementById("rv-i"), raf = null;
  function idx() {
    var x = r.getBoundingClientRect().left, b = 0, bd = 1e9;
    for (var i = 0; i < s.length; i++) { var d = Math.abs(s[i].getBoundingClientRect().left - x - 18); if (d < bd) { bd = d; b = i; } }
    return b;
  }
  r.addEventListener("scroll", function () { if (!raf) raf = requestAnimationFrame(function () { raf = null; n.textContent = idx() + 1; }); }, { passive: true });
  document.querySelectorAll(".rv-b").forEach(function (b) {
    b.addEventListener("click", function () {
      var i = Math.max(0, Math.min(s.length - 1, idx() + (+b.getAttribute("data-d"))));
      r.scrollTo({ left: s[i].offsetLeft - 18, behavior: "smooth" });
    });
  });
})();
