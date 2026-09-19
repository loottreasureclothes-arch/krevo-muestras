/* 01b Mueble: el scroll mueve una cámara. La foto arranca dentro de un marco y se abre a sangre mientras
   la cámara entra (zoom 1 -> 1.18); la isla recortada se acerca un poco más (parallax de 2 capas).
   Compu: la sección se sostiene +=80% de pantalla para que el recorrido se vea completo.
   Celular: sin pin, la cámara entra mientras la sección cruza la pantalla. Las dos son reversibles.
   Sin GSAP o con movimiento reducido no se hace nada: el CSS ya deja la foto a sangre con el texto. */
(function () {
  "use strict";
  var sec = document.getElementById("mueble");
  if (!sec) return;
  var gsap = window.gsap, ST = window.ScrollTrigger;
  if (!gsap || !ST) return;
  gsap.registerPlugin(ST);

  var frame = sec.querySelector(".mb-frame"),
      cam = sec.querySelector(".mb-cam"),
      fg = sec.querySelector(".mb-fg");
  if (!frame || !cam || !fg) return;

  var INSET_V = 7, INSET_H = 7, RADIUS = 16;   // el marco de arranque (la foto se ve lejos)

  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function seg(p, a, b) { return clamp01((p - a) / (b - a)); }
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  var state = { p: 0 }, cfg = null, on = false, lastClip = "", lastCam = "", lastFg = "";

  function render() {
    var p = state.p;
    var open = easeOut(seg(p, cfg.o0, cfg.o1));
    var v = (INSET_V * (1 - open)).toFixed(2), h = (INSET_H * (1 - open)).toFixed(2),
        r = (RADIUS * (1 - open)).toFixed(1);
    var clip = "inset(" + v + "% " + h + "% round " + r + "px)";
    if (clip !== lastClip) { frame.style.clipPath = lastClip = clip; }

    var t = seg(p, cfg.z0, cfg.z1);
    var z = cfg.s0 + (cfg.s1 - cfg.s0) * t;
    var camT = "scale(" + z.toFixed(4) + ")";
    if (camT !== lastCam) { cam.style.transform = lastCam = camT; }

    var fgT = "scale(" + (1 + cfg.fg * t).toFixed(4) + ")";
    if (fgT !== lastFg) { fg.style.transform = lastFg = fgT; }

    if (p >= cfg.on && !on) { on = true; sec.classList.add("mb-on"); }
    else if (p < cfg.off && on) { on = false; sec.classList.remove("mb-on"); }
  }

  function start(conf, trigger) {
    cfg = conf;
    cam.style.transformOrigin = conf.camO;
    fg.style.transformOrigin = conf.fgO;
    sec.classList.add("mb-live");
    var tl = gsap.timeline({ scrollTrigger: trigger });
    tl.to(state, { p: 1, duration: 1, ease: "none", onUpdate: render });
    render();
    return function () {
      state.p = 0; on = false;
      sec.classList.remove("mb-live", "mb-on");
      frame.style.clipPath = ""; cam.style.transform = ""; fg.style.transform = "";
      lastClip = lastCam = lastFg = "";
    };
  }

  var mm = gsap.matchMedia();

  // compu: se sostiene y la cámara hace todo el recorrido a pantalla completa
  mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", function () {
    return start(
      { o0: 0, o1: 0.34, z0: 0, z1: 1, s0: 0.88, s1: 1.32, fg: 0.12,
        on: 0.42, off: 0.34, camO: "60% 46%", fgO: "30% 100%" },
      { trigger: sec, start: "top top", end: "+=80%", scrub: 0.5, pin: true, pinSpacing: true,
        anticipatePin: 1, invalidateOnRefresh: true, fastScrollEnd: true }
    );
  });

  // celular: sin pin, el recorrido pasa mientras la sección cruza la pantalla
  mm.add("(max-width: 899px) and (prefers-reduced-motion: no-preference)", function () {
    return start(
      { o0: 0.1, o1: 0.42, z0: 0.06, z1: 0.96, s0: 0.9, s1: 1.26, fg: 0.1,
        on: 0.46, off: 0.38, camO: "54% 46%", fgO: "32% 100%" },
      { trigger: sec, start: "top bottom", end: "bottom top", scrub: 0.6,
        invalidateOnRefresh: true, fastScrollEnd: true }
    );
  });
})();

/* Video de IA: carga la versión correcta y solo se muestra cuando ya puede reproducirse; se pausa fuera de vista */
(function () {
  var v = document.querySelector("#mueble .mb-vid");
  if (!v || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
  var wide = window.matchMedia("(min-width: 900px)").matches;
  var loaded = false;
  function load() {
    if (loaded) return; loaded = true;
    v.src = wide ? v.dataset.srcD : v.dataset.srcM;
    v.addEventListener("canplay", function () { v.classList.add("is-ready"); var p = v.play(); if (p && p.catch) p.catch(function () {}); }, { once: true });
    v.addEventListener("error", function () { v.remove(); }, { once: true });
    v.load();
  }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { load(); if (v.classList.contains("is-ready")) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } }
        else if (loaded) v.pause();
      });
    }, { rootMargin: "300px 0px" }).observe(v);
  } else load();
})();
