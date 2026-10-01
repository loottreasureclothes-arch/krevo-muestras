/* Así llega, así queda: el scroll corre un barrido circular (clip-path: circle) sobre el contenedor .sw-reveal.
   rAF, reversible, sin pin, sin GSAP. Estado base CSS = final (así queda + miniatura). */
(function () {
  "use strict";
  var fig = document.getElementById("sweep");
  if (!fig) return;
  var stage = fig.querySelector(".sweep-stage"), rev = fig.querySelector(".sw-reveal"), ring = fig.querySelector(".sw-ring");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return; /* se queda "así queda" con su miniatura */
  var framed = false, raf = null, seen = false;
  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function update() {
    raf = null;
    var vh = window.innerHeight, r = stage.getBoundingClientRect();
    var start = vh * 0.92, end = vh * 0.18;
    var p = clamp((start - r.top) / (start - end));
    var w = stage.clientWidth, h = stage.clientHeight;
    var max = Math.hypot(w / 2, h * 0.56) * 1.03, rad = p * max;
    rev.style.clipPath = "circle(" + rad.toFixed(1) + "px at 50% 56%)";
    ring.style.width = ring.style.height = (rad * 2).toFixed(1) + "px";
    ring.style.opacity = (p > 0.012 && p < 0.985) ? "1" : "0";
    fig.setAttribute("data-state", p > 0.5 ? "b" : "a");
    framed = true;
  }
  function schedule() { if (!raf) raf = requestAnimationFrame(update); }
  function live() {
    fig.classList.add("is-live");
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }
  function toStatic() { fig.classList.remove("is-live"); rev.style.clipPath = ""; ring.style.opacity = "0"; }
  try { live(); } catch (e) { toStatic(); return; }
  /* blindaje: si a los 1.6 s de asomarse el barrido no pintó ni un cuadro, queda resuelto en "así queda" */
  function watch() {
    if (seen) return;
    var r = fig.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      seen = true;
      setTimeout(function () { if (!framed) toStatic(); }, 1600);
    } else requestAnimationFrame(watch);
  }
  watch();
})();
