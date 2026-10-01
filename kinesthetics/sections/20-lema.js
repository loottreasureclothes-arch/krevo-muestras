/* Momento firma: MOVIMIENTO / SALUD / BELLEZA arrancan contraidas y el scroll las estira (ancho y peso de la letra).
   Reversible, sin pin. El estado base del CSS es el suelto: si esto no corre, todo se ve. */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var motionOk = window.matchMedia && window.matchMedia("(scripting: enabled)").matches;
  if (reduce || !motionOk) return;
  var words = Array.prototype.slice.call(document.querySelectorAll(".ks-word"));
  if (!words.length) return;
  var MIN = [233, 238, 236], TQ = [52, 180, 168];
  var st = words.map(function (w) { return { w: w, t: w.querySelector(".ks-word-t"), cur: 0, tgt: 0, forced: false, seen: false }; });
  var raf = null, ready = false;

  function measure(text) {
    var m = document.createElement("span");
    m.textContent = text;
    m.style.cssText = "position:absolute;left:-9999px;top:0;visibility:hidden;white-space:nowrap;text-transform:uppercase;font-size:100px;letter-spacing:.005em;font-family:'Encode Sans',sans-serif;font-stretch:125%;font-weight:250;font-variation-settings:'wdth' 125,'wght' 250";
    document.body.appendChild(m);
    var w = m.getBoundingClientRect().width;
    document.body.removeChild(m);
    return w;
  }
  function size() {
    var cont = st[0].w.parentNode.parentNode.getBoundingClientRect().width;
    cont = Math.min(cont, 1200);
    st.forEach(function (s) {
      var M = measure(s.t.textContent);
      /* ancho suelto de la palabra + hueco para su franja = ancho del contenedor */
      var fs = Math.floor((cont * 0.995) / (M / 100 + 0.62));
      s.w.style.setProperty("--fs", fs + "px");
    });
    ready = true;
  }
  function apply(s) {
    var p = s.cur;
    var wd = 75 + 50 * p, wt = 800 - 550 * p;
    s.t.style.fontVariationSettings = "'wdth' " + wd.toFixed(1) + ",'wght' " + Math.round(wt);
    s.t.style.fontStretch = wd.toFixed(1) + "%";
    /* contraida tambien aprieta el espacio entre letras: el gesto de soltarse se lee mas */
    s.t.style.letterSpacing = (-0.045 + 0.05 * p).toFixed(3) + "em";
    var k = Math.sin(Math.PI * p);
    var c = [0, 1, 2].map(function (i) { return Math.round(MIN[i] + (TQ[i] - MIN[i]) * k); });
    s.t.style.color = "rgb(" + c.join(",") + ")";
  }
  function target(s) {
    var vh = window.innerHeight || 800;
    var top = s.w.getBoundingClientRect().top;
    /* el renglon cruza del 85 % al 45 % de la altura de la pantalla */
    var p = (0.85 * vh - top) / (0.40 * vh);
    return Math.max(0, Math.min(1, p));
  }
  function frame() {
    raf = null;
    var moving = false;
    st.forEach(function (s) {
      var tgt = s.forced ? 1 : target(s);
      s.tgt = tgt;
      var d = tgt - s.cur;
      if (Math.abs(d) > 0.002) { s.cur += d * 0.2; moving = true; } else s.cur = tgt;
      apply(s);
    });
    if (moving) raf = requestAnimationFrame(frame);
  }
  function kick() { if (!raf) raf = requestAnimationFrame(frame); }
  function onScroll() { st.forEach(function (s) { s.forced = false; }); kick(); }

  function boot() {
    size();
    st.forEach(function (s) { s.cur = target(s); apply(s); });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", function () { size(); kick(); });
    /* red de seguridad: lo que esta a la vista 1.6 s despues sin que el visitante se mueva, queda resuelto */
    st.forEach(function (s) {
      var seenAt = null;
      (function poll() {
        var r = s.w.getBoundingClientRect(), vh = window.innerHeight || 800;
        if (r.top < vh * 0.98 && r.bottom > 0) {
          if (seenAt === null) seenAt = Date.now();
          if (Date.now() - seenAt >= 1600 && s.cur < 0.999) { s.forced = true; kick(); }
        } else seenAt = null;
        setTimeout(poll, 250);
      })();
    });
    kick();
  }
  function start() {
    if (document.fonts && document.fonts.load) {
      var done = false;
      var go = function () { if (done) return; done = true; boot(); };
      Promise.all([document.fonts.load("250 100px 'Encode Sans'"), document.fonts.load("800 100px 'Encode Sans'")]).then(go, go);
      setTimeout(go, 2500);
    } else boot();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
