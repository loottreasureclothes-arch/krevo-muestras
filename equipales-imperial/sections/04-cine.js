/* 02 CINE: momento de cine. El comedor aparece recortado con la forma del arco de la hacienda y, al bajar,
   el arco se abre hasta llenar la pantalla mientras la cámara avanza (scrub, reversible).
   Compu: pin +=80% con barra de progreso. Celular: sin pin, scrub mientras la sección cruza la pantalla.
   Blindaje: el CSS base es la foto completa; si GSAP no llega, se ve completa. */
(function () {
  "use strict";
  var sec = document.getElementById("cine");
  if (!sec) return;
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var tries = 0;
  (function wait() {
    if (!(window.gsap && window.ScrollTrigger)) { if (tries++ < 40) setTimeout(wait, 100); return; }
    gsap.registerPlugin(ScrollTrigger);
    var arch = sec.querySelector(".s-cine-arch"), img = sec.querySelector(".s-cine-arch img"), copy = sec.querySelector(".s-cine-copy"), bar = sec.querySelector(".s-cine-bar i");
    var mm = gsap.matchMedia();
    mm.add("(min-width: 900px)", function () {
      var tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: "top top", end: "+=80%", pin: true, scrub: 0.5, anticipatePin: 1 } });
      tl.fromTo(arch, { clipPath: "inset(12% 34% 0% 34% round 50% 50% 0 0 / 34% 34% 0 0)" }, { clipPath: "inset(0% 0% 0% 0% round 0% 0% 0 0 / 0% 0% 0 0)", ease: "none" }, 0)
        .fromTo(img, { scale: 1.28 }, { scale: 1.02, ease: "none" }, 0)
        .fromTo(copy, { opacity: 0.35, y: 24 }, { opacity: 1, y: 0, ease: "none" }, 0.1)
        .fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
      return function () { gsap.set([arch, img, copy, bar], { clearProps: "all" }); };
    });
    mm.add("(max-width: 899px)", function () {
      var tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: "top 85%", end: "top 5%", scrub: 0.6 } });
      tl.fromTo(arch, { clipPath: "inset(8% 16% 18% 16% round 50% 50% 0 0 / 26% 26% 0 0)" }, { clipPath: "inset(0% 0% 0% 0% round 0% 0% 0 0 / 0% 0% 0 0)", ease: "none" }, 0)
        .fromTo(img, { scale: 1.26 }, { scale: 1.02, ease: "none" }, 0);
      return function () { gsap.set([arch, img], { clearProps: "all" }); };
    });
  })();
})();
