/* 06 DESDE 1915: la línea del tiempo se dibuja con el scroll (reversible). Sin JS o con movimiento reducido
   la línea ya está completa y todos los años en color: nada se queda en blanco. */
(function () {
  "use strict";
  var t = document.querySelector("#nosotros .s-nos-time");
  if (!t || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var items = Array.prototype.slice.call(t.querySelectorAll(".s-nos-line > li")), q = false;
  t.classList.add("s-nos-js");
  function upd() {
    q = false;
    var r = t.getBoundingClientRect(), vh = window.innerHeight || 800;
    var p = (vh * 0.8 - r.top) / r.height; p = Math.max(0, Math.min(1, p));
    t.style.setProperty("--p", (p * 100).toFixed(1));
    items.forEach(function (li) { li.classList.toggle("is-on", p >= (li.offsetTop + 22) / r.height); });
  }
  function on() { if (!q) { q = true; requestAnimationFrame(upd); } }
  window.addEventListener("scroll", on, { passive: true });
  window.addEventListener("resize", on);
  upd(); setTimeout(upd, 400);
})();

/* Caidita: el 8 gigante entra cayendo y pegando (rebote de resorte muestreado, como la cinta de 10-msi.js),
   una sola vez. Blindaje: el reposo del CSS ya lo deja en su lugar; solo se levanta con JS y movimiento. */
(function () {
  "use strict";
  var sec = document.getElementById("nosotros");
  var num = sec && sec.querySelector(".s-nos-num");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!sec || !num || reduce || !num.animate || !("IntersectionObserver" in window)) return;
  sec.classList.add("s-nos-pre");

  // Resorte muestreado en keyframes (overshoot y regreso): e^(-z t) sin(w t), igual técnica que 10-msi.js
  function spring(n, amp, turns, decay, fmt) {
    var k = [];
    for (var i = 0; i <= n; i++) {
      var t = i / n, v = i === n ? 0 : amp * Math.exp(-decay * t) * Math.sin(turns * Math.PI * 2 * t);
      k.push({ transform: fmt(v) });
    }
    return k;
  }

  var done = false;
  function play() {
    if (done) return; done = true;
    sec.classList.remove("s-nos-pre");
    var h = num.offsetHeight || 300;
    var drop = Math.max(140, h * 0.62), px = Math.max(6, Math.min(16, h * 0.02));
    var RUN = 520, HIT = 560;
    var run = num.animate(
      [{ transform: "translateY(-" + drop.toFixed(0) + "px)", opacity: 0 },
       { transform: "translateY(-" + (drop * 0.12).toFixed(1) + "px)", opacity: 1, offset: 0.82 },
       { transform: "translateY(0)", opacity: 1 }],
      { duration: RUN, easing: "cubic-bezier(0.55,0,0.85,0.35)", fill: "backwards" }
    );
    num.animate(spring(22, px, 1.4, 4, function (v) { return "translateY(" + v.toFixed(2) + "px)"; }), { duration: HIT, delay: RUN, easing: "linear" });
    // red de seguridad: si la línea de tiempo se congela (navegadores in-app), el 8 queda en su lugar
    setTimeout(function () { if (run.playState === "running") run.finish(); }, RUN + HIT + 700);
  }

  var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { io.disconnect(); play(); } }, { threshold: 0.3, rootMargin: "0px 0px -10% 0px" });
  io.observe(sec);
  // si a los 1.6 s de asomarse el disparo no llegó, el 8 se queda en su lugar (nunca en blanco)
  var fio = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { fio.disconnect(); setTimeout(function () { if (!done) { done = true; sec.classList.remove("s-nos-pre"); } }, 1600); } }, { rootMargin: "0px 0px -25% 0px" });
  fio.observe(sec);
})();
