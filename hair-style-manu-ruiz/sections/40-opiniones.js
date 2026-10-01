/* El balayage: 10 grupos de 9 hebras; cada grupo comparte UN degradado cuyo corte sube con el scroll
   (punta -> raiz, con su propio desfase). rAF, reversible, sin pin. Actualiza 3 stops por grupo, no 90 atributos. */
(function () {
  "use strict";
  var sec = document.getElementById("opiniones"), svg = document.getElementById("mr-bal");
  if (!sec || !svg) return;
  var grads = Array.prototype.slice.call(svg.querySelectorAll("linearGradient")).map(function (g) {
    var st = g.querySelectorAll("stop");
    return { phase: parseFloat(g.getAttribute("data-phase")) || 0, a: st[1], b: st[2] };
  });
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var last = -1, updates = 0, forced = false, raf = null;
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function apply(p) {
    p = clamp(p);
    if (Math.abs(p - last) < 0.0015 && p !== 1 && p !== 0) return;
    last = p;
    for (var i = 0; i < grads.length; i++) {
      var g = grads[i];
      /* p=0: todo castano oscuro (corte pasado el final del trazo); p=1: rubio miel con raiz oscura */
      var c = clamp(1.06 - 0.80 * p + g.phase);
      g.a.setAttribute("offset", c.toFixed(3));
      g.b.setAttribute("offset", clamp(c + 0.14).toFixed(3));
    }
  }
  function progress() {
    var r = sec.getBoundingClientRect(), vh = window.innerHeight || document.documentElement.clientHeight;
    return (vh * 0.9 - r.top) / (r.height * 0.55 + vh * 0.45);
  }
  function frame() { raf = null; updates++; if (forced) { apply(1); return; } apply(progress()); }
  function schedule() { if (!raf) raf = requestAnimationFrame(frame); }
  if (reduce) { apply(1); return; }
  apply(progress());
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  /* red de seguridad: si 1.6 s despues de asomarse la banda no hubo un solo cuadro (rAF pausado, captura sin scroll),
     el balayage queda terminado */
  var seenAt = 0, poll = setInterval(function () {
    var r = sec.getBoundingClientRect(), vh = window.innerHeight;
    if (r.top < vh && r.bottom > 0) {
      if (!seenAt) { seenAt = Date.now(); updates = 0; return; }
      if (Date.now() - seenAt > 1600) { clearInterval(poll); if (updates === 0) { forced = true; apply(1); } }
    }
  }, 250);
  schedule();
})();
