/* Momento firma: el plato se abre como iris a foto completa; reversible. */
(function () {
  "use strict";
  var s = document.getElementById("plato");
  if (!s || (window.RAME && window.RAME.reduce)) return;
  s.classList.add("iris-on");
  function upd() {
    var r = s.getBoundingClientRect(), vh = innerHeight;
    s.classList.toggle("is-open", r.top < vh * 0.72 && r.bottom > vh * 0.2);
  }
  var q = null; function sch() { if (!q) q = requestAnimationFrame(function () { q = null; upd(); }); }
  addEventListener("scroll", sch, { passive: true }); addEventListener("resize", sch);
  upd(); setTimeout(upd, 1600);
})();
