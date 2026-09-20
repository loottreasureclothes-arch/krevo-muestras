/* 40 El lugar: la cámara entra a la terraza con el scroll (scrub corto, sin pin, reversible) y las 4 fotos
   del collage entran desde blur al cargar (catalogo-motion.md receta 14). Blindaje: el CSS nunca aplica blur;
   solo lo pone este script un instante antes de animarlo a 0, así que sin GSAP las fotos se ven nítidas
   desde el primer pintado. */
(function () {
  "use strict";
  var sec = document.getElementById("lugar");
  if (!sec) return;
  var camImg = sec.querySelector(".lu-cam img");
  var imgs = sec.querySelectorAll(".lu-blur");
  var n = 0;
  (function wait() {
    if (window.gsap && window.ScrollTrigger) return go();
    if (++n < 40) setTimeout(wait, 100);
  })();
  function go() {
    gsap.registerPlugin(ScrollTrigger);
    var mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", function () {
      if (camImg) {
        gsap.fromTo(camImg, { scale: 1.02 }, { scale: 1.14, ease: "none",
          scrollTrigger: { trigger: sec.querySelector(".lu-cam"), start: "top 85%", end: "bottom 20%", scrub: 0.6 } });
      }
      imgs.forEach(function (img) {
        function reveal() {
          var big = img === camImg;
          var from = big ? { filter: "blur(16px)", opacity: 0.6 } : { filter: "blur(16px)", scale: 1.06, opacity: 0.6 };
          var to = big
            ? { filter: "blur(0px)", opacity: 1, duration: 1.1, ease: "power2.out", clearProps: "filter,willChange" }
            : { filter: "blur(0px)", scale: 1, opacity: 1, duration: 1.1, ease: "power2.out", clearProps: "filter,willChange" };
          gsap.fromTo(img, from, to);
        }
        if (img.complete) reveal();
        else if (img.decode) img.decode().then(reveal, reveal);
        else img.addEventListener("load", reveal, { once: true });
      });
    });
  }
})();
