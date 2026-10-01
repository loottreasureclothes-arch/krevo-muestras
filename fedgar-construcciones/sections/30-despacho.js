/* 30-despacho: el arco de medio punto se ensancha con el scroll hasta volverse foto a todo el ancho.
   rAF + scroll, reversible, sin pin. Abierto con reduced-motion; el titular cae a los 1.6 s de asomarse pase lo que pase. */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function init() {
    var arco = document.getElementById("arco");
    var clip = document.getElementById("arco-clip");
    var title = document.getElementById("despacho-title");
    if (!arco || !clip) return;
    var img = clip.querySelector("img");
    var titleOn = false, firstSeen = 0, raf = null;
    function showTitle() { if (!titleOn && title) { titleOn = true; title.classList.add("is-in"); } }
    function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
    function paint(p) {
      var W = arco.clientWidth;
      var w0 = W < 700 ? 0.62 : 0.38;
      var e = ease(p);
      var w = W * (w0 + (1 - w0) * e);
      var r = (w / 2) * (1 - e);
      clip.style.width = w + "px";
      clip.style.borderRadius = r + "px " + r + "px 0 0";
      if (img) img.style.transform = "scale(" + (1.16 - 0.16 * e).toFixed(4) + ")";
      if (p > 0.62) showTitle();
    }
    function update() {
      raf = null;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var rect = arco.getBoundingClientRect();
      var visible = rect.top < vh && rect.bottom > 0;
      if (visible && !firstSeen) {
        firstSeen = Date.now();
        setTimeout(showTitle, 1600);
      }
      paint(Math.min(1, Math.max(0, p0(rect, vh))));
    }
    /* se abre mientras el borde alto del arco sube del 92% al 30% de la pantalla */
    function p0(rect, vh) { return (vh * 0.92 - rect.top) / (vh * 0.62); }
    /* rAF con respaldo por temporizador: en pestañas ocultas el rAF se pausa y el arco no debe quedarse a medias */
    function schedule() {
      if (raf) return;
      raf = requestAnimationFrame(update);
      setTimeout(function () { if (raf) { cancelAnimationFrame(raf); update(); } }, 90);
    }
    if (reduce) { paint(1); showTitle(); return; }
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
