/* 10 · MSI: entrada del 12 + copy (una vez) y la cinta métrica (cada vez que vuelve a la vista).
   Cinta: sale del estuche y corre hasta el 12 acelerando (540 ms), PEGA: rebote de resorte con
   overshoot y regreso, sacudida del estuche y destello en el 12. Total ~1.1 s. Solo transform/opacity (WAAPI).
   Su estado de reposo en CSS es "en el 12": si algo se atora, nunca queda en blanco. */
(function () {
  var s = document.getElementById("msi");
  if (!s) return;
  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (still || !("IntersectionObserver" in window)) { s.classList.add("is-in"); return; }
  s.classList.add("s-msi-js");
  var io = new IntersectionObserver(function (es) {
    if (es[0].isIntersecting) { s.classList.add("is-in"); io.disconnect(); }
  }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
  io.observe(s);
  /* red de seguridad (FEEDBACK-2 #6): a los 1.6 s de asomarse queda visible aunque el disparo se atore */
  var fio = new IntersectionObserver(function (es) {
    if (es[0].isIntersecting) { fio.disconnect(); setTimeout(function () { s.classList.add("is-in"); }, 1600); }
  }, { rootMargin: "0px 0px -25% 0px" });
  fio.observe(s);

  /* ---------- Cinta métrica ---------- */
  var rule = s.querySelector(".s-msi-rule");
  var blade = s.querySelector(".s-msi-blade");
  var bounce = s.querySelector(".s-msi-bounce");
  var box = s.querySelector(".s-msi-case");
  var flash = s.querySelector(".s-msi-flash");
  var twelve = s.querySelector(".s-msi-end b");
  if (!rule || !blade || !blade.animate) return;

  var RUN = 540;   // de estuche al 12
  var HIT = 520;   // rebote después del golpe
  var anims = [];

  // Resorte amortiguado muestreado en keyframes (overshoot y regreso): e^(-z t) sin(w t)
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
    s.classList.remove("s-msi-armed");
    var px = Math.max(6, Math.min(14, rule.offsetWidth * 0.012)); // tamaño del golpe según el ancho
    // 1) corre: acelera hasta el 12 (easeInSine: llega con velocidad para que el golpe se sienta)
    anims.push(blade.animate(
      [{ transform: "translateX(-100%)" }, { transform: "translateX(0)" }],
      { duration: RUN, easing: "cubic-bezier(0.12, 0, 0.39, 0)", fill: "backwards" }
    ));
    // 2) pega: overshoot + regreso tipo resorte
    anims.push(bounce.animate(
      spring(24, px, 1.5, 4.2, function (v) { return "translateX(" + v.toFixed(2) + "px)"; }),
      { duration: HIT, delay: RUN, easing: "linear" }
    ));
    // 3) el estuche da un jalón
    if (box) anims.push(box.animate(
      spring(20, 1, 2, 5, function (v) { return "translate(" + (v * 2.5).toFixed(2) + "px," + (-Math.abs(v) * 1.5).toFixed(2) + "px) rotate(" + (-v * 5).toFixed(2) + "deg)"; }),
      { duration: 420, delay: RUN - 10, easing: "linear" }
    ));
    // 4) destello en el 12
    if (flash) anims.push(flash.animate(
      [{ opacity: 0, transform: "scale(0.4)" }, { opacity: 1, transform: "scale(1)", offset: 0.22 }, { opacity: 0, transform: "scale(1.6)" }],
      { duration: 520, delay: RUN, easing: "cubic-bezier(0.23, 1, 0.32, 1)" }
    ));
    if (twelve) anims.push(twelve.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.45)", offset: 0.25 }, { transform: "scale(0.94)", offset: 0.6 }, { transform: "scale(1)" }],
      { duration: 460, delay: RUN, easing: "cubic-bezier(0.23, 1, 0.32, 1)" }
    ));
    // red de seguridad: si la línea de tiempo se congela (navegadores in-app), la cinta queda en el 12
    var a0 = anims[0];
    setTimeout(function () {
      if (a0 && a0.playState === "running" && (a0.currentTime || 0) < 60) stopAll();
    }, 1600);
  }

  var armed = true, shown = false;
  s.classList.add("s-msi-armed");
  var tio = new IntersectionObserver(function (es) {
    var e = es[0];
    if (e.isIntersecting && e.intersectionRatio >= 0.6) {
      if (armed) { armed = false; shown = true; play(); }
    } else if (!e.isIntersecting && shown) {
      // salió por completo: se vuelve a armar (fuera de la vista, nadie ve el cambio)
      stopAll(); armed = true; s.classList.add("s-msi-armed");
    }
  }, { threshold: [0, 0.6, 1] });
  tio.observe(rule);
  // si la cinta asoma y el observador no dispara en 1.6 s, se queda en el 12 (nunca en blanco)
  var sio = new IntersectionObserver(function (es) {
    if (es[0].isIntersecting) {
      setTimeout(function () { if (armed && !shown) { armed = false; shown = true; s.classList.remove("s-msi-armed"); } }, 1600);
    }
  });
  sio.observe(rule);
})();
