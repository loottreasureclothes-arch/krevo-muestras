/* LA GRÚA BAJA LA PLACA: la placa baja con el scroll hasta el piso; a los 1.6 s queda asentada pase lo que pase. */
(function () {
  "use strict";
  var TI = window.TI || (window.TI = {});
  var sec = document.getElementById("opiniones"), fig = document.getElementById("ti-grua-fig");
  var move = document.getElementById("gr-move"), chain = document.getElementById("gr-chainrect");
  if (!sec || !fig || !move || !chain) return;
  var Y0 = 826, Y1 = 1024, HOOK = 822;
  var shown = 1, forced = false, started = false, timer = null, raf = null, landed = true, swayT = null;

  /* letras de punzón dentro del SVG: cada glifo con su desfase y giro (listas dy y rotate) */
  function seeded(n) { var x = Math.sin(n * 12.9898 + 4.1414) * 43758.5453; return x - Math.floor(x); }
  Array.prototype.forEach.call(fig.querySelectorAll("text[data-t]"), function (t, ti) {
    var txt = t.getAttribute("data-t"), big = t.classList.contains("gr-big"), amp = big ? 2.6 : 1.5, dys = [], rots = [], prev = 0;
    for (var i = 0; i < txt.length; i++) {
      var d = (seeded(ti * 31 + i * 3 + 1) - .5) * amp; dys.push((d - prev).toFixed(2)); prev = d;
      rots.push(((seeded(ti * 17 + i * 5 + 2) - .5) * (big ? 3 : 4)).toFixed(2));
    }
    var ts = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    ts.setAttribute("dy", dys.join(" ")); ts.setAttribute("rotate", rots.join(" ")); ts.textContent = txt;
    t.textContent = ""; t.appendChild(ts);
  });

  function paint(p) {
    var e = p * (2 - p), y = Y0 + (Y1 - Y0) * e;
    move.setAttribute("transform", "translate(140 " + y.toFixed(1) + ")");
    chain.setAttribute("height", Math.max(0, y + 10 - HOOK).toFixed(1));
    var isLanded = p > .985;
    if (isLanded !== landed) {
      landed = isLanded; sec.classList.toggle("is-landed", landed);
      if (landed && !TI.reduce) { sec.classList.remove("is-swaying"); void sec.offsetWidth; sec.classList.add("is-swaying"); clearTimeout(swayT); swayT = setTimeout(function () { sec.classList.remove("is-swaying"); }, 900); }
    }
  }
  function scrollP() {
    var r = fig.getBoundingClientRect(), vh = window.innerHeight || document.documentElement.clientHeight;
    var start = vh * .9, end = vh * .12;
    return Math.min(1, Math.max(0, (start - r.top) / (start - end)));
  }
  function tick() {
    raf = null;
    var r = fig.getBoundingClientRect(), vh = window.innerHeight || document.documentElement.clientHeight;
    var near = r.bottom > -200 && r.top < vh + 200;
    if (!near) { if (forced) { forced = false; started = false; clearTimeout(timer); } if (shown !== 0 && r.top >= vh) { shown = 0; paint(0); } return; }
    if (!started && r.top < vh * .75) { started = true; timer = setTimeout(function () { forced = true; schedule(); }, 1600); }
    var target = forced ? 1 : scrollP();
    var diff = target - shown;
    shown = Math.abs(diff) < .004 ? target : shown + diff * .22;
    paint(shown);
    if (shown !== target) schedule();
  }
  function schedule() { if (!raf) raf = requestAnimationFrame(tick); }

  if (TI.reduce) { paint(1); return; }
  /* arranca arriba (la grúa la sostiene) solo cuando hay JS; sin JS la placa ya está asentada */
  landed = true; paint(0); shown = 0;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  schedule();
  /* red final: a los 5 s de cargar, si el visitante ya está en la sección, queda asentada */
  setTimeout(function () { var r = fig.getBoundingClientRect(), vh = window.innerHeight; if (r.top < vh * .8 && r.bottom > 0) { forced = true; schedule(); } }, 5000);
})();
