/* 13 · Visítanos: el marco de madera se arma (4 largueros a inglete), el mapa aparece y el pin cae con un rebote sutil.
   GSAP timeline (gsap.matchMedia para movimiento reducido), disparado una vez al entrar en pantalla. Sin GSAP o con movimiento reducido todo queda visible y quieto. */
(function () {
  "use strict";
  var sec = document.getElementById("visitanos");
  if (!sec) return;
  var fig = sec.querySelector(".vs-map");
  var box = sec.querySelector(".vs-map-in");
  var view = sec.querySelector(".vs-map-view");
  var frame = sec.querySelector(".vs-map iframe");
  var pin = sec.querySelector(".vs-pin");
  if (!fig || !box || !view || !pin) return;
  var rails = {
    t: sec.querySelector(".vs-rail--t"), r: sec.querySelector(".vs-rail--r"),
    b: sec.querySelector(".vs-rail--b"), l: sec.querySelector(".vs-rail--l")
  };

  // el iframe es lazy: anotamos cuándo termina de cargar para soltar el pin encima del de Google
  var loaded = false, onLoaded = null;
  if (frame) frame.addEventListener("load", function () { loaded = true; if (onLoaded) onLoaded(); }, { once: true });

  function withGsap(cb, tries) {
    if (window.gsap && window.IntersectionObserver) { cb(window.gsap); return; }
    if ((tries || 0) > 40) return; // sin GSAP: se queda estático y visible
    setTimeout(function () { withGsap(cb, (tries || 0) + 1); }, 100);
  }

  withGsap(function (gsap) {
    var mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", function () {
      // Todo el armado cabe en ~0.9 s (regla de Emanuel: < 1.2 s). Solo transform y opacity.
      var tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out", duration: 0.46 } });
      tl.addLabel("marco", 0)
        // opacity y no autoAlpha: con visibility:hidden el iframe lazy del mapa no se pide (FEEDBACK-2 #6)
        .from(box, { opacity: 0, y: 22, duration: 0.5 }, "marco")
        // cada larguero entra a lo largo de su ranura, en el sentido del reloj, y cierra en el inglete
        .from(rails.t, { xPercent: -101 }, "marco+=0.05")
        .from(rails.r, { yPercent: -101 }, "marco+=0.14")
        .from(rails.b, { xPercent: 101 }, "marco+=0.23")
        .from(rails.l, { yPercent: 101 }, "marco+=0.32")
        .from(view, { opacity: 0, scale: 0.97, duration: 0.55 }, "marco+=0.36");

      // Pin: cae, asienta con un rebote corto y a los segundos le cede el lugar al pin real de Google.
      var ptl = gsap.timeline({ paused: true });
      var svg = pin.querySelector("svg"), ring = pin.querySelector(".vs-pin-ring");
      ptl.set(pin, { visibility: "visible" })
        .fromTo(pin, { y: -46, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.34, ease: "power2.in" })
        .addLabel("toca")
        .to(svg, { scaleY: 0.88, scaleX: 1.08, transformOrigin: "50% 100%", duration: 0.08, ease: "power1.out" }, "toca")
        .fromTo(ring, { scale: 0.4, autoAlpha: 0.9 }, { scale: 1.7, autoAlpha: 0, duration: 0.6, ease: "power2.out" }, "toca")
        .to(pin, { y: -8, duration: 0.15, ease: "power2.out" }, "toca+=0.08")
        .to(svg, { scaleY: 1, scaleX: 1, duration: 0.18, ease: "power2.out" }, "toca+=0.08")
        .to(pin, { y: 0, duration: 0.14, ease: "power2.in" }, "toca+=0.23")
        .to(pin, { autoAlpha: 0, duration: 0.35, ease: "power1.out" }, "+=1.2");

      var framed = false, dropped = false;
      function drop() {
        if (dropped || !framed || !loaded) return;
        dropped = true;
        ptl.play();
      }
      onLoaded = drop;
      // si el iframe aún no carga, el pin espera: nunca cae sobre un mapa vacío
      tl.eventCallback("onComplete", function () { framed = true; drop(); });

      // Disparo con IntersectionObserver: arriba hay masonry e imágenes lazy que mueven el layout después de cargar,
      // y así no dependemos de ScrollTrigger.refresh() (gsap-performance: refrescar solo cuando hace falta).
      var io = new IntersectionObserver(function (en) {
        if (en[0].isIntersecting) { io.disconnect(); tl.play(); }
      }, { rootMargin: "0px 0px -18% 0px" });
      io.observe(fig);
      // Red de seguridad: si el disparo o el reloj de GSAP se atoran (WhatsApp/Instagram), a los 1.6 s de
      // asomarse el marco y el mapa quedan completos (el pin es adorno: se queda escondido).
      var fio = new IntersectionObserver(function (en) {
        if (!en[0].isIntersecting) return;
        fio.disconnect();
        setTimeout(function () {
          if (tl.progress() >= 1) return;
          tl.progress(1); tl.kill();
          [box, view, rails.t, rails.r, rails.b, rails.l].forEach(function (el) {
            if (el) ["opacity", "visibility", "transform", "translate", "rotate", "scale"].forEach(function (p) { el.style.removeProperty(p); });
          });
        }, 1600);
      }, { rootMargin: "0px 0px -25% 0px" });
      fio.observe(fig);
      return function () { io.disconnect(); fio.disconnect(); onLoaded = null; }; // matchMedia revierte los tweens solo
    });
  });
})();
