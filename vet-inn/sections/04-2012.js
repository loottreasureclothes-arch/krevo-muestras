/* 04-2012 — contador del numero gigante: 0 -> 2012 una sola vez, 0.9s power3.out, solo si
   arranca con la seccion (IntersectionObserver). Blindaje: el HTML ya trae "0" visible y el
   CSS no esconde nada; si JS no corre o prefers-reduced-motion, el numero simplemente no
   cuenta y hay que forzarlo al valor final a los 1.6s (igual que el resto del sitio). */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function easePower3Out(t) { return 1 - Math.pow(1 - t, 3); }

  function contar(el, final) {
    var start = null;
    var dur = 900;
    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / dur);
      var val = Math.round(easePower3Out(p) * final);
      el.textContent = val;
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = final;
    }
    requestAnimationFrame(frame);
  }

  function init() {
    var el = document.getElementById("s2012-num");
    if (!el) return;
    var final = parseInt(el.getAttribute("data-final"), 10) || 2012;
    if (reduce) { el.textContent = final; return; }
    var ran = false;
    function go() { if (ran) return; ran = true; contar(el, final); }

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { go(); io.unobserve(el); } });
      }, { rootMargin: "0px 0px -20% 0px", threshold: 0.2 });
      io.observe(el);
    } else {
      go();
    }
    setTimeout(function () { if (!ran) { ran = true; el.textContent = final; } }, 1600);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
