/* Momento firma: el plato se destapa con el scroll (circulo que crece). Reversible. */
(function () {
  var sec = document.querySelector(".sangre");
  if (!sec) return;
  var ph = sec.querySelector(".sangre-ph");
  if (!document.documentElement.classList.contains("motion")) return;
  var raf = 0;
  function ease(t) { return t < 0 ? 0 : t > 1 ? 1 : 1 - Math.pow(1 - t, 2); }
  function update() {
    raf = 0;
    var r = sec.getBoundingClientRect(), vh = window.innerHeight;
    var t = (vh - r.top) / (vh * 0.85);
    ph.style.setProperty("--p", ease(t).toFixed(3));
  }
  function sched() { if (!raf) raf = requestAnimationFrame(update); }
  window.addEventListener("scroll", sched, { passive: true });
  window.addEventListener("resize", sched);
  update();
})();
