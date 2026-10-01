/* Así llega, así queda: el scroll corre un barrido circular (clip-path: circle) sobre el contenedor .sw-reveal.
   rAF, reversible, sin pin, sin GSAP. Estado base CSS = final (así queda + miniatura).
   Remate: a los 1.6 s de asomarse, o si el visitante se queda quieto 1.6 s, el aro termina solo en "así queda" (≈500 ms).
   Si vuelve a subir, el aro se liga otra vez al scroll. */
(function () {
  "use strict";
  var fig = document.getElementById("sweep");
  if (!fig) return;
  var stage = fig.querySelector(".sweep-stage"), rev = fig.querySelector(".sw-reveal"), ring = fig.querySelector(".sw-ring");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return; /* se queda "así queda" con su miniatura */
  var CX = 0.47, CY = 0.55;                 /* el aro nace en el logo de la barra */
  var raf = null, shown = -1, resolved = false, lastY = window.scrollY || 0, idleT = null, firstT = null, seenAt = 0;
  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function scrollP() {
    var vh = window.innerHeight, r = stage.getBoundingClientRect();
    var start = vh * 0.92, end = vh * 0.22;
    return clamp((start - r.top) / (start - end));
  }
  function visible() { var r = stage.getBoundingClientRect(); return r.top < window.innerHeight && r.bottom > 0; }
  function paint(p) {
    var w = stage.clientWidth, h = stage.clientHeight;
    var max = Math.hypot(Math.max(CX, 1 - CX) * w, Math.max(CY, 1 - CY) * h) * 1.02, rad = p * max;
    rev.style.clipPath = "circle(" + rad.toFixed(1) + "px at " + CX * 100 + "% " + CY * 100 + "%)";
    ring.style.width = ring.style.height = (rad * 2).toFixed(1) + "px";
    ring.style.opacity = (p > 0.012 && p < 0.985) ? "1" : "0";
    fig.setAttribute("data-state", p > 0.5 ? "b" : "a");
  }
  function frame() {
    raf = null;
    var target = resolved ? 1 : scrollP();
    if (shown < 0) shown = target;
    var d = target - shown;
    /* al resolverse avanza ~500 ms; ligado al scroll sigue casi pegado */
    shown += Math.abs(d) < 0.004 ? d : d * (resolved ? 0.13 : 0.35);
    paint(shown);
    if (Math.abs(target - shown) > 0.0005) schedule();
  }
  function schedule() { if (!raf) raf = requestAnimationFrame(frame); }
  function resolve() { if (visible() || scrollP() > 0) { resolved = true; schedule(); } }
  function armIdle() { clearTimeout(idleT); idleT = setTimeout(resolve, 1600); }
  function onScroll() {
    var y = window.scrollY || 0;
    if (y < lastY - 2 && resolved && scrollP() < 1) resolved = false; /* sube: vuelve a mandar el scroll */
    lastY = y;
    if (!seenAt && visible()) { seenAt = Date.now(); firstT = setTimeout(resolve, 1600); }
    if (visible()) armIdle();
    schedule();
  }
  try {
    fig.classList.add("is-live");
    paint(scrollP()); shown = scrollP();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule);
    /* si ya está a la vista al cargar (o al llegar por ancla), arranca el reloj de 1.6 s */
    (function watch() {
      if (seenAt) return;
      if (visible()) { seenAt = Date.now(); firstT = setTimeout(resolve, 1600); armIdle(); }
      else requestAnimationFrame(watch);
    })();
  } catch (e) { fig.classList.remove("is-live"); rev.style.clipPath = ""; ring.style.opacity = "0"; }
})();
