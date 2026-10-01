/* 40 · La pila de platos: los 30 platos se acomodan uno por uno, ligados al scroll.
   Blindaje: 1.6 s despues de entrar a la vista queda completa pase lo que pase y ya no se descose. */
(function () {
  "use strict";
  var host = document.getElementById("pilas");
  if (!host) return;
  var plates = Array.prototype.slice.call(host.querySelectorAll(".pt"));
  plates.sort(function (a, b) { return a.getAttribute("data-o") - b.getAttribute("data-o"); });
  var N = plates.length;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !N) return;
  var sec = document.getElementById("40-opiniones");
  var done = false, t0 = null, raf = null;

  function set(p) {
    var span = 3.2; /* cuantos platos "en el aire" a la vez */
    for (var i = 0; i < N; i++) {
      var q = (p * (N - 1 + span) - i) / span;
      q = q < 0 ? 0 : q > 1 ? 1 : q;
      q = 1 - Math.pow(1 - q, 2.2); /* asienta con ease-out */
      plates[i].style.setProperty("--q", q.toFixed(3));
    }
  }
  function finish() {
    if (done) return;
    done = true;
    set(1);
    window.removeEventListener("scroll", sched);
    window.removeEventListener("resize", sched);
  }
  function frame() {
    raf = null;
    if (done) return;
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var r = host.getBoundingClientRect();
    var visible = r.top < vh * 0.92 && r.bottom > 0;
    if (visible && t0 === null) { t0 = performance.now(); setTimeout(finish, 1650); }
    var pS = Math.max(0, Math.min(1, (vh * 0.92 - r.top) / (vh * 0.5)));
    var pT = 0;
    if (t0 !== null) pT = Math.max(0, Math.min(1, (performance.now() - t0 - 250) / 1250));
    var p = Math.max(pS, pT);
    set(p);
    if (p >= 1) { finish(); return; }
    if (t0 !== null) sched(); /* mientras corre el tiempo seguimos pintando */
  }
  function sched() { if (!raf && !done) raf = requestAnimationFrame(frame); }
  set(0);
  window.addEventListener("scroll", sched, { passive: true });
  window.addEventListener("resize", sched);
  sched();
})();
