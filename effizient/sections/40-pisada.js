/* 40 pisada: al entrar a la vista la huella se imprime de talón a dedos en 1.2 s (umbral de presión que baja).
   Reversible: al salir por completo la hoja se limpia. Queda completa a los 1.6 s pase lo que pase. Sin pin, sin scrub. */
(function () {
  "use strict";
  var sheet = document.getElementById("sheet");
  var foot = document.getElementById("sole");
  var lines = document.getElementById("pie-lines");
  if (!sheet || !foot) return;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var dots = Array.prototype.slice.call(foot.querySelectorAll("circle"));
  if (!dots.length || reduce) return;
  var R0 = dots.map(function (c) { return parseFloat(c.getAttribute("r")); });
  var T = dots.map(function (c) { return parseInt(c.getAttribute("data-t"), 10) || 0; });
  var DUR = 120, TOTAL = 1200;
  var state = "idle"; /* idle | printing | done */
  var raf = null, t0 = 0, safety = null, linesTimer = null;
  var last = new Array(dots.length);

  function setAll(f) {
    for (var i = 0; i < dots.length; i++) {
      var r = R0[i] * f;
      dots[i].setAttribute("r", r.toFixed(2));
      dots[i].style.opacity = f;
      last[i] = f;
    }
  }
  function showLines(on) { if (lines) lines.classList.toggle("is-hold", !on); }
  function finish() {
    if (raf) { cancelAnimationFrame(raf); raf = null; }
    setAll(1);
    state = "done";
    showLines(true);
  }
  function frame(now) {
    var el = now - t0;
    for (var i = 0; i < dots.length; i++) {
      var p = (el - T[i]) / DUR;
      p = p < 0 ? 0 : p > 1 ? 1 : p;
      var e = 1 - Math.pow(1 - p, 3);
      if (e !== last[i]) { dots[i].setAttribute("r", (R0[i] * e).toFixed(2)); dots[i].style.opacity = e; last[i] = e; }
    }
    if (el >= TOTAL) { finish(); return; }
    raf = requestAnimationFrame(frame);
  }
  function start() {
    if (state !== "idle") return;
    state = "printing";
    t0 = performance.now();
    raf = requestAnimationFrame(function (n) { t0 = n; frame(n); });
    clearTimeout(safety);
    safety = setTimeout(function () { if (state === "printing") finish(); }, 1600);
    clearTimeout(linesTimer);
    linesTimer = setTimeout(function () { showLines(true); }, 1200);
  }
  function clear() {
    if (state === "idle") return;
    if (raf) { cancelAnimationFrame(raf); raf = null; }
    clearTimeout(safety); clearTimeout(linesTimer);
    setAll(0); showLines(false);
    state = "idle";
  }
  var ticking = false;
  function check() {
    ticking = false;
    var r = sheet.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    if (r.bottom < 0 || r.top > vh) { clear(); return; }
    if (r.top < vh * 0.75) start();
  }
  function schedule() { if (!ticking) { ticking = true; requestAnimationFrame(check); } }
  /* estado inicial: hoja limpia solo si todavia no esta a la vista; si ya esta, se imprime de inmediato */
  var r0 = sheet.getBoundingClientRect(), vh0 = window.innerHeight || 800;
  if (r0.top >= vh0 * 0.75) { setAll(0); showLines(false); }
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  schedule();
  /* red final: si nada la disparo en 8 s con la hoja a la vista, queda impresa */
  setTimeout(function () { var r = sheet.getBoundingClientRect(); if (state === "idle" && r.top < (window.innerHeight || 800) && r.bottom > 0) { setAll(1); showLines(true); state = "done"; } }, 8000);
})();
