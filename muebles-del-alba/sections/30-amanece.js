/* 30-amanece: el sol de su logo abre la nave completa. Scrub reversible, SIN pin
   (ni celular ni compu), +=60% de tramo. Blindaje: si GSAP no llega en 4s (40x100ms)
   o hay prefers-reduced-motion, no se toca nada y queda el estado final del CSS base. */
(function () {
  "use strict";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var sec = document.getElementById("amanece");
  if (!sec || reduce) return;

  var tries = 0;
  (function wait() {
    if (window.gsap && window.ScrollTrigger) return start();
    if (++tries > 40) return; // sin GSAP: se queda el estado final del CSS (blindaje)
    setTimeout(wait, 100);
  })();

  function start() {
    var arc = sec.querySelector("[data-amanece-arc]");
    var img = sec.querySelector("[data-amanece-img]");
    var veil = sec.querySelector(".s-amanece-veil");
    var sun = sec.querySelector("[data-amanece-sun]");
    var rays = sec.querySelectorAll(".s-amanece-ray");
    if (!arc || !img || !sun) return;

    gsap.registerPlugin(ScrollTrigger);

    var tl = gsap.timeline({
      scrollTrigger: { trigger: sec, start: "top 75%", end: "+=60%", scrub: 0.6 }
    });

    tl.fromTo(arc, { width: "42%" }, { width: "100%", ease: "none", duration: 1 }, 0)
      .fromTo(arc, { borderTopLeftRadius: 220, borderTopRightRadius: 220 }, { borderTopLeftRadius: 0, borderTopRightRadius: 0, ease: "none", duration: 1 }, 0)
      .fromTo(img, { filter: "saturate(.55) brightness(.72) contrast(1.05)" }, { filter: "saturate(1) brightness(1) contrast(1)", ease: "none", duration: 1 }, 0)
      .fromTo(veil, { opacity: 1 }, { opacity: 0, ease: "none", duration: 1 }, 0)
      .fromTo(sun, { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.5 }, 0)
      .to(sun, { opacity: 0, ease: "none", duration: 0.5 }, 0.5)
      .fromTo(rays, { strokeDashoffset: 40 }, { strokeDashoffset: 0, ease: "none", stagger: 0.02, duration: 0.5 }, 0);
  }
})();
