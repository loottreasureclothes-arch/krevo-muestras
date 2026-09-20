/* 60 Reseñas: el 4.7 cae desde arriba y pega, una sola vez (adaptado de closetdoor/sections/10-msi.js:
   resorte amortiguado muestreado en keyframes, WAAPI puro). Reposo en CSS = el número en su lugar;
   si algo se atora, la red de seguridad lo suelta a los 1.6 s. */
(function () {
  "use strict";
  var s = document.getElementById("resenas");
  if (!s) return;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var big = s.querySelector(".re-big"), flash = s.querySelector(".re-flash");
  if (reduce || !big || !big.animate || !("IntersectionObserver" in window)) { s.classList.add("re-done"); return; }

  var DROP = 560, BOUNCE = 480, done = false;

  // Resorte amortiguado muestreado: e^(-decay t) sin(turns 2π t)
  function spring(n, amp, turns, decay, fmt) {
    var k = [];
    for (var i = 0; i <= n; i++) {
      var t = i / n, v = i === n ? 0 : amp * Math.exp(-decay * t) * Math.sin(turns * Math.PI * 2 * t);
      k.push({ transform: fmt(v) });
    }
    return k;
  }

  function play() {
    if (done) return;
    done = true;
    s.classList.add("re-done");
    // 1) cae: acelera hasta su lugar (easeIn, imita gravedad)
    big.animate(
      [{ transform: "translateY(-0.55em)" }, { transform: "translateY(0)" }],
      { duration: DROP, easing: "cubic-bezier(0.55, 0.06, 0.68, 0.19)", fill: "backwards" }
    );
    // 2) pega: rebote de resorte con leve aplastón (scaleY)
    big.animate(
      spring(22, 15, 1.6, 4.4, function (v) { return "translateY(" + v.toFixed(2) + "px) scaleY(" + (1 - Math.min(0.09, Math.abs(v) * 0.006)).toFixed(3) + ")"; }),
      { duration: BOUNCE, delay: DROP, easing: "linear" }
    );
    // 3) destello dorado al pegar
    if (flash) flash.animate(
      [{ opacity: 0, transform: "scale(0.5)" }, { opacity: 1, transform: "scale(1)", offset: 0.3 }, { opacity: 0, transform: "scale(1.55)" }],
      { duration: 480, delay: Math.max(0, DROP - 40), easing: "cubic-bezier(0.23, 1, 0.32, 1)" }
    );
  }

  var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { io.disconnect(); play(); } }, { threshold: 0.4 });
  io.observe(big);
  // red de seguridad: si el observador principal no dispara, a 1.6 s de asomarse se suelta igual
  var sio = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { sio.disconnect(); setTimeout(play, 1600); } });
  sio.observe(s);
})();
