/* 03 · ¿Qué incluye? · GSAP + ScrollTrigger
   Momento: la foto se abre como puerta, la regla se apoya y los 4 íconos se dibujan
   trazo por trazo, renglón tras renglón (una sola coreografía < 1.2 s, se dispara sola).
   Después, parallax sutil de la foto con el scroll. Sin GSAP o con reduced-motion todo queda visible. */
(function () {
  "use strict";

  function run() {
    var sec = document.getElementById("incluye");
    var gsap = window.gsap, ST = window.ScrollTrigger;
    if (!sec || !gsap || !ST) return;
    gsap.registerPlugin(ST);

    var photo = sec.querySelector(".s-incluye-photo");
    /* el zoom y el parallax van en el envoltorio: el rotador (00-rotador.js) cambia las <img> de adentro */
    var img = photo && (photo.querySelector(".s-incluye-photo-in") || photo.querySelector("img"));
    var ruler = sec.querySelector(".s-incluye-ruler");
    var cap = sec.querySelector(".s-incluye-fig figcaption");
    var insets = gsap.utils.toArray(sec.querySelectorAll(".s-incluye-inset"));
    var items = gsap.utils.toArray(sec.querySelectorAll(".s-incluye-item"));
    var cta = sec.querySelector(".s-incluye-cta");
    var mm = gsap.matchMedia();

    mm.add({ ok: "(prefers-reduced-motion: no-preference)", wide: "(min-width: 900px)" }, function (ctx) {
      if (!ctx.conditions.ok) return;
      var r = ctx.conditions.wide ? 18 : 14;

      /* 1. La foto: se abre desde el centro con clip-path y la imagen se asienta */
      var tlFig = gsap.timeline({
        defaults: { ease: "expo.out" },
        scrollTrigger: { trigger: photo, start: "top 82%", once: true }
      });
      tlFig
        .fromTo(photo, { clipPath: "inset(12% 10% 12% 10% round " + r + "px)" },
                       { clipPath: "inset(0% 0% 0% 0% round " + r + "px)", duration: 1.0 }, 0)
        .fromTo(img, { scale: 1.16 }, { scale: 1.06, duration: 1.1 }, 0)
        .fromTo(ruler, { autoAlpha: 0, x: -36, rotation: -7 },
                       { autoAlpha: 1, x: 0, rotation: -2.2, duration: 0.8, ease: "back.out(1.4)" }, 0.28)
        /* collage: las fotos chicas caen encima de la grande, una tras otra */
        .fromTo(insets, { autoAlpha: 0, y: 28, scale: 0.92 },
                        { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: "back.out(1.3)" }, 0.22)
        .fromTo(cap, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.5);

      /* 2. Parallax de la foto dentro de su marco (scrub, solo transform) */
      gsap.fromTo(img, { yPercent: -2.5 }, {
        yPercent: 2.5, ease: "none",
        scrollTrigger: { trigger: photo, start: "top bottom", end: "bottom top", scrub: 0.6 }
      });

      /* 3. Íconos: cada trazo se dibuja; los renglones entran escalonados */
      var tlList = gsap.timeline({
        defaults: { ease: "expo.out" },
        scrollTrigger: { trigger: sec.querySelector(".s-incluye-list"), start: "top 80%", once: true }
      });
      items.forEach(function (li, i) {
        var at = i * 0.11;
        var strokes = li.querySelectorAll(".s-incluye-ico path:not(.s-incluye-dash):not(.s-incluye-acc)");
        var acc = li.querySelectorAll(".s-incluye-ico .s-incluye-acc");
        var dash = li.querySelectorAll(".s-incluye-ico .s-incluye-dash");
        var txt = li.querySelector(".s-incluye-txt");
        tlList
          .fromTo(li, { "--inc-line": 0 }, { "--inc-line": 1, duration: 0.7 }, at)
          .fromTo(strokes, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.55, stagger: 0.05, ease: "power2.inOut" }, at)
          .fromTo(acc, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.35, ease: "power2.out" }, at + 0.34)
          .fromTo(dash, { autoAlpha: 0 }, { autoAlpha: 0.7, duration: 0.4 }, at + 0.3)
          .fromTo(txt, { autoAlpha: 0, y: 16, filter: "blur(6px)" },
                       { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.7, clearProps: "filter" }, at + 0.06);
      });
      if (cta) tlList.fromTo(cta, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.5);

      /* Red de seguridad (FEEDBACK-2 #6): fromTo esconde desde que carga; si ScrollTrigger mide mal o el
         reloj de GSAP se atora (WhatsApp/Instagram), a los 1.6 s de asomarse queda el estado final.
         El CSS ya trae el estado final (regla girada, trazos completos): basta con quitar lo que puso GSAP. */
      var ALL = ["opacity", "visibility", "transform", "translate", "rotate", "scale", "clip-path", "stroke-dashoffset", "filter", "--inc-line"];
      function force(tl, els) {
        if (tl.progress() < 1) { tl.progress(1); tl.kill(); }
        els.forEach(function (el) { if (el) ALL.forEach(function (p) { el.style.removeProperty(p); }); });
      }
      var sio = null;
      if ("IntersectionObserver" in window) {
        sio = new IntersectionObserver(function (es) {
          es.forEach(function (e) {
            if (!e.isIntersecting) return;
            sio.unobserve(e.target);
            var isFig = e.target === photo;
            setTimeout(function () {
              if (isFig) force(tlFig, [photo, ruler, cap].concat(insets));
              else force(tlList, items.concat(gsap.utils.toArray(sec.querySelectorAll(".s-incluye-ico path, .s-incluye-txt")), [cta]));
            }, 1600);
          });
        }, { rootMargin: "0px 0px -25% 0px" });
        sio.observe(photo);
        sio.observe(sec.querySelector(".s-incluye-list"));
      }
      return function () { if (sio) sio.disconnect(); };
    });
  }

  if (window.gsap) run();
  else window.addEventListener("load", run, { once: true });
})();
