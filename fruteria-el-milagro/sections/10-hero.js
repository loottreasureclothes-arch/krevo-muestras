/* 10-hero: "El logo baja al toldo". Scrub reversible, SIN pin, desde el scroll 0 y sobre
   ~46svh (start: "top top" de #hero).
   0.00-0.70: el medallon (grande, centrado) viaja hasta encimarse con el logo real de
   la fachada (x 57.6%, y 14.7% del marco) y se encoge a 39.7% del ancho del marco.
   0.15-0.55: el marco con la fachada entra (opacity 0->1, scale .94->1).
   0.70-0.82: el medallon CSS se desvanece: queda el logo que ya trae la foto.
   0.82-1.00: cae el renglon "Tecuexe 201, Local 2. Lomas del Chapulín."
   Blindaje: sin GSAP (40x100ms) o con prefers-reduced-motion, nunca se agrega
   .firma-js y queda el estado final del CSS base (medallon chico arriba del marco). */
(function () {
  "use strict";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var sec = document.getElementById("hero");
  if (!sec || reduce) return;

  var tries = 0;
  (function wait() {
    if (window.gsap && window.ScrollTrigger) return start();
    if (++tries > 40) return; // sin GSAP: queda el estado final del CSS (blindaje)
    setTimeout(wait, 100);
  })();

  function start() {
    var firma = sec.querySelector("[data-firma]");
    var frame = sec.querySelector("[data-firma-frame]");
    var logo = sec.querySelector("[data-firma-logo]");
    var dir = sec.querySelector("[data-firma-dir]");
    if (!firma || !frame || !logo || !dir) return;

    document.documentElement.classList.add("firma-js");
    gsap.registerPlugin(ScrollTrigger);

    function targets() {
      var lr = logo.getBoundingClientRect();
      var fr = frame.getBoundingClientRect();
      var startCX = lr.left + lr.width / 2, startCY = lr.top + lr.height / 2, startW = lr.width || 1;
      var targetCX = fr.left + fr.width * 0.576, targetCY = fr.top + fr.height * 0.147, targetW = fr.width * 0.397;
      return { dx: targetCX - startCX, dy: targetCY - startCY, scale: targetW / startW };
    }

    gsap.set(logo, { x: 0, y: 0, scale: 1, opacity: 1 });
    gsap.set(frame, { opacity: 0, scale: 0.94 });
    gsap.set(dir, { opacity: 0, y: 10 });

    /* Cambio 2 de REVISION-1: el tramo arranca en el scroll 0 (antes se disparaba con
       [data-firma], que nace arriba del 78% del viewport, y al cargar el progreso ya iba
       en ~0.47: nadie veia el medallon grande ni el aterrizaje). */
    var tl = gsap.timeline({
      scrollTrigger: { trigger: "#hero", start: "top top", end: "+=46%", scrub: 0.5, invalidateOnRefresh: true }
    });

    tl.fromTo(logo, { x: 0, y: 0, scale: 1 }, {
      x: function () { return targets().dx; },
      y: function () { return targets().dy; },
      scale: function () { return targets().scale; },
      ease: "none", duration: 0.70
    }, 0)
      .fromTo(frame, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, ease: "none", duration: 0.40 }, 0.15)
      .to(logo, { opacity: 0, ease: "none", duration: 0.12 }, 0.70)
      .fromTo(dir, { opacity: 0, y: 10 }, { opacity: 1, y: 0, ease: "none", duration: 0.18 }, 0.82);
  }
})();
