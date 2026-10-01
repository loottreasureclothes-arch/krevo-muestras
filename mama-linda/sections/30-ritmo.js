/* 3 · Cada plato llega bajo su toldo: avance ligado al scroll, reversible, con tope de 1.6 s por ventana. */
(function () {
  "use strict";
  var list = Array.prototype.slice.call(document.querySelectorAll("#rt-mesa [data-v]"));
  if (!list.length) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var vh = function () { return window.innerHeight || document.documentElement.clientHeight; };
  var st = list.map(function () { return { seen: 0, done: false, p: 0, tw: null }; });
  var raf = null;

  function set(i, p) { st[i].p = p; list[i].style.setProperty("--p", p.toFixed(3)); }
  function finish(i) {
    if (st[i].done) return;
    st[i].done = true;
    var from = st[i].p, t0 = null;
    function step(t) {
      if (t0 === null) t0 = t;
      var k = Math.min(1, (t - t0) / 380), e = 1 - Math.pow(1 - k, 3);
      set(i, from + (1 - from) * e);
      if (k < 1) requestAnimationFrame(step); else set(i, 1);
    }
    requestAnimationFrame(step);
  }
  function tick() {
    raf = null;
    var h = vh();
    for (var i = 0; i < list.length; i++) {
      if (st[i].done) continue;
      var r = list[i].getBoundingClientRect();
      if (r.bottom < 0) { finish(i); continue; }   /* ya quedó arriba: completa */
      var start = h * 0.85, span = Math.max(120, h * 0.26);
      var p = Math.max(0, Math.min(1, (start - r.top) / span));
      if (r.top < h && !st[i].seen) {
        st[i].seen = 1;
        (function (k) { st[k].tw = setTimeout(function () { finish(k); }, 1600); })(i);
      }
      set(i, p);
    }
  }
  function sch() { if (!raf) raf = requestAnimationFrame(tick); }
  /* armado: solo lo que está bajo el pliegue arranca recogido */
  list.forEach(function (el, i) {
    var r = el.getBoundingClientRect();
    if (r.top > vh() * 0.85) set(i, 0);
  });
  window.addEventListener("scroll", sch, { passive: true });
  window.addEventListener("resize", sch);
  sch();
})();
