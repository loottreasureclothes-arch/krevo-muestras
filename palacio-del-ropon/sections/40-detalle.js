/* Momento firma: los querubines traen el ropón. Avance --p del scroll (rAF, sin pin, reversible);
   a los 1.6 s de asomarse el conjunto queda armado pase lo que pase. */
(function () {
  "use strict";
  var stage = document.getElementById("pr-stage");
  var txt = document.getElementById("pr-det-txt");
  if (!stage) return;
  var reduce = window.PR && window.PR.reduce;
  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function outCubic(t) { return 1 - Math.pow(1 - t, 3); }
  function inOut(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  if (reduce) { stage.classList.add("is-in"); if (txt) txt.classList.add("is-in"); return; }

  var floor = 0, floorTimer = null, floorRaf = 0, seen = false, last = -1, ended = false;
  function paint(p) {
    var pc = outCubic(clamp(p / .55));
    var pl = inOut(clamp((p - .35) / .40));
    var q = clamp((p - .70) / .30), kd;
    if (q <= 0) kd = 1;
    else if (q < .867) { var u = q / .867; kd = 1 - u * u; }
    else kd = -0.025 * Math.sin(Math.PI * (q - .867) / .133);
    if (p > .12) stage.classList.add("is-in");
    var s = stage.style;
    s.setProperty("--pc", pc.toFixed(4)); s.setProperty("--pl", pl.toFixed(4)); s.setProperty("--kd", kd.toFixed(4)); s.setProperty("--pb", clamp(p).toFixed(4));
    if (p > .93 && txt && !ended) { ended = true; txt.classList.add("is-in"); }
  }
  function scrollP() {
    var r = stage.getBoundingClientRect(), vh = window.innerHeight || document.documentElement.clientHeight;
    var tTop = Math.max(70, vh * .5 - r.height / 2);
    var start = vh * .9;
    return clamp((start - r.top) / Math.max(120, start - tTop));
  }
  function tickFloor(t0) {
    var t = clamp((performance.now() - t0) / 800);
    floor = outCubic(t); update();
    if (t < 1) floorRaf = requestAnimationFrame(function () { tickFloor(t0); });
  }
  function update() {
    var p = Math.max(scrollP(), floor);
    if (Math.abs(p - last) > .0005) { last = p; paint(p); }
  }
  var raf = 0;
  function onScroll() {
    if (raf) return;
    raf = requestAnimationFrame(function () {
      raf = 0;
      var r = stage.getBoundingClientRect(), vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top > vh) {            /* la visitante subió por encima del inicio: se vuelve a abrir */
        seen = false; floor = 0; ended = false; clearTimeout(floorTimer); cancelAnimationFrame(floorRaf);
      } else if (!seen && r.top < vh * .92 && r.bottom > 0) {
        seen = true; clearTimeout(floorTimer);
        floorTimer = setTimeout(function () { tickFloor(performance.now()); }, 1600);
      }
      update();
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  paint(0); last = 0; onScroll();
})();
