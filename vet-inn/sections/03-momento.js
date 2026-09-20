/* 03-momento — "La luz de las doce": clip-path ligado al scroll, reversible, sin GSAP.
   Compu: el pin es CSS puro (position:sticky sobre un wrapper alto, ver 03-momento.css);
   aqui solo se calcula 0..1 segun cuanto se ha recorrido ese wrapper alto.
   Celular: sin pin, 0..1 segun cuanto ha cruzado la seccion la pantalla (scrub). */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var pinMQ = window.matchMedia("(min-width: 900px)");

  function initMomento() {
    var pin = document.querySelector(".s-momento-pin");
    var scene = document.getElementById("momento-scene");
    var bar = document.getElementById("momento-bar");
    if (!pin || !scene) return;
    if (reduce) { scene.style.setProperty("--vi-p", 1); return; }

    var target = 0, shown = 0, raf = 0, ranOnce = false;

    function clamp01(n) { return Math.max(0, Math.min(1, n)); }

    function computeTarget() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      if (pinMQ.matches) {
        var r = pin.getBoundingClientRect();
        var runway = pin.offsetHeight - vh;
        if (runway <= 0) return 1;
        return clamp01(-r.top / runway);
      }
      var rs = scene.getBoundingClientRect();
      var start = vh * 0.9, end = vh * 0.2;
      return clamp01((start - rs.top) / (start - end));
    }

    function loop() {
      raf = 0;
      target = computeTarget();
      shown += (target - shown) * 0.22; // scrub con un poco de rezago (sensacion de "mano")
      if (Math.abs(target - shown) < 0.002) shown = target;
      scene.style.setProperty("--vi-p", shown.toFixed(4));
      if (bar) bar.style.width = (shown * 100) + "%";
      if (enPantalla()) ranOnce = true;
      if (shown !== target || enPantalla()) raf = requestAnimationFrame(loop);
    }
    function enPantalla() {
      var r = scene.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      return r.bottom > 0 && r.top < vh;
    }
    function kick() { if (!raf) raf = requestAnimationFrame(loop); }

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick, { passive: true });
    kick();
    /* blindaje: si por lo que sea nunca corrio y la seccion ya se ve, se enciende sola */
    setTimeout(function () { if (!ranOnce && enPantalla()) scene.style.setProperty("--vi-p", 1); }, 1600);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initMomento);
  else initMomento();
})();
