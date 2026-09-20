/* 60 · Reseñas + Visítanos: entrada del 5.0 + copy (una vez) y la cinta métrica (cada vez que vuelve a la
   vista), adaptada de closetdoor/sections/10-msi.js. Cinta: sale del estuche y corre hasta el 5.0 acelerando
   (520 ms), PEGA: rebote de resorte con overshoot y regreso, sacudida del estuche y destello dorado. Total
   ~1.1 s. Solo transform/opacity (WAAPI). Su estado de reposo en CSS es "en el 5.0": si algo se atora, nunca
   queda en blanco. */
(function () {
  "use strict";
  var s = document.getElementById("resenas");
  if (!s) return;
  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (still || !("IntersectionObserver" in window)) { s.classList.add("res-in"); return; }
  s.classList.add("res-js");
  var io = new IntersectionObserver(function (es) {
    if (es[0].isIntersecting) { s.classList.add("res-in"); io.disconnect(); }
  }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
  io.observe(s);
  /* red de seguridad: a los 1.6 s de asomarse queda visible aunque el disparo se atore */
  var fio = new IntersectionObserver(function (es) {
    if (es[0].isIntersecting) { fio.disconnect(); setTimeout(function () { s.classList.add("res-in"); }, 1600); }
  }, { rootMargin: "0px 0px -25% 0px" });
  fio.observe(s);

  /* ---------- Cinta métrica ---------- */
  var rule = s.querySelector(".res-rule");
  var blade = s.querySelector(".res-blade");
  var bounce = s.querySelector(".res-bounce");
  var box = s.querySelector(".res-case");
  var flash = s.querySelector(".res-flash");
  var end = s.querySelector(".res-end b");
  if (!rule || !blade || !blade.animate) return;

  var RUN = 520, HIT = 500, anims = [];

  function spring(n, amp, turns, decay, fmt) {
    var k = [];
    for (var i = 0; i <= n; i++) {
      var t = i / n, v = i === n ? 0 : amp * Math.exp(-decay * t) * Math.sin(turns * Math.PI * 2 * t);
      k.push({ transform: fmt(v) });
    }
    return k;
  }
  function stopAll() { anims.forEach(function (a) { try { a.cancel(); } catch (e) {} }); anims = []; }

  function play() {
    stopAll();
    s.classList.remove("res-armed");
    var px = Math.max(6, Math.min(13, rule.offsetWidth * 0.012));
    anims.push(blade.animate(
      [{ transform: "translateX(-100%)" }, { transform: "translateX(0)" }],
      { duration: RUN, easing: "cubic-bezier(0.12, 0, 0.39, 0)", fill: "backwards" }
    ));
    anims.push(bounce.animate(
      spring(24, px, 1.5, 4.2, function (v) { return "translateX(" + v.toFixed(2) + "px)"; }),
      { duration: HIT, delay: RUN, easing: "linear" }
    ));
    if (box) anims.push(box.animate(
      spring(20, 1, 2, 5, function (v) { return "translate(" + (v * 2.4).toFixed(2) + "px," + (-Math.abs(v) * 1.4).toFixed(2) + "px) rotate(" + (-v * 5).toFixed(2) + "deg)"; }),
      { duration: 400, delay: RUN - 10, easing: "linear" }
    ));
    if (flash) anims.push(flash.animate(
      [{ opacity: 0, transform: "scale(0.4)" }, { opacity: 1, transform: "scale(1)", offset: 0.22 }, { opacity: 0, transform: "scale(1.6)" }],
      { duration: 500, delay: RUN, easing: "cubic-bezier(0.23, 1, 0.32, 1)" }
    ));
    if (end) anims.push(end.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.4)", offset: 0.25 }, { transform: "scale(0.95)", offset: 0.6 }, { transform: "scale(1)" }],
      { duration: 440, delay: RUN, easing: "cubic-bezier(0.23, 1, 0.32, 1)" }
    ));
    var a0 = anims[0];
    setTimeout(function () {
      if (a0 && a0.playState === "running" && (a0.currentTime || 0) < 60) stopAll();
    }, 1600);
  }

  var armed = true, shown = false;
  s.classList.add("res-armed");
  var tio = new IntersectionObserver(function (es) {
    var e = es[0];
    if (e.isIntersecting && e.intersectionRatio >= 0.6) {
      if (armed) { armed = false; shown = true; play(); }
    } else if (!e.isIntersecting && shown) {
      stopAll(); armed = true; s.classList.add("res-armed");
    }
  }, { threshold: [0, 0.6, 1] });
  tio.observe(rule);
  var sio = new IntersectionObserver(function (es) {
    if (es[0].isIntersecting) {
      setTimeout(function () { if (armed && !shown) { armed = false; shown = true; s.classList.remove("res-armed"); } }, 1600);
    }
  });
  sio.observe(rule);
})();
