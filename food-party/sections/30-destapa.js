(function () {
  "use strict";
  var grid = document.getElementById("fp-dest-grid");
  if (!grid || FP.reduce) return;
  var items = Array.prototype.slice.call(grid.querySelectorAll(".fp-dest"));
  grid.classList.add("is-armed");
  var t0 = 0, done = false, raf = null;
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function cols() { var n = getComputedStyle(grid).gridTemplateColumns.split(" ").length; return n || 2; }
  function paint(el, q) {
    var r = clamp((q - 0.78) / 0.22);
    el.style.setProperty("--ly", (-26 * q).toFixed(2));
    el.style.setProperty("--lr", (64 * q).toFixed(2));
    el.style.setProperty("--lo", (1 - clamp((q - 0.55) / 0.4)).toFixed(3));
    el.style.setProperty("--sr", (90 * (1 - r)).toFixed(2));
    el.style.setProperty("--so", clamp(r * 4).toFixed(3));
  }
  function frame() {
    raf = null;
    var vh = window.innerHeight || document.documentElement.clientHeight, nc = cols(), allDone = true, now = performance.now();
    var gr = grid.getBoundingClientRect();
    if (!t0 && gr.top < vh * 0.9 && gr.bottom > 0) t0 = now;
    var el = t0 ? now - t0 : -1;
    items.forEach(function (it, i) {
      var col = i % nc, top = it.getBoundingClientRect().top - (it.getAttribute("data-dy") ? 0 : 0);
      var qs = clamp((vh * 0.9 - top) / (vh * 0.5) - col * 0.14);
      var qa = el < 0 ? 0 : clamp((el - 600) / 600 - col * 0.12);
      var q = Math.max(qs, qa);
      paint(it, q);
      if (q < 1) allDone = false;
    });
    done = allDone && el >= 0;
    if (t0 && !done) schedule();
  }
  function schedule() { if (!raf) raf = requestAnimationFrame(frame); }
  schedule();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  /* red de seguridad: pase lo que pase, a los 3.5 s de la carga todo queda destapado si la sección ya se asomó */
  setTimeout(function () { if (t0) items.forEach(function (it) { paint(it, 1); }); }, 3500);
})();
