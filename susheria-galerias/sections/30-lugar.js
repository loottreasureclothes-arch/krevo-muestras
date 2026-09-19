/* 30 El lugar: la cámara entra a la terraza con el scroll (scrub corto, sin pin, reversible). Sin GSAP o con reduced-motion la foto queda quieta. */
(function () {
  "use strict";
  var sec = document.getElementById("lugar");
  if (!sec) return;
  var img = sec.querySelector(".lu-cam img");
  var n = 0;
  (function wait() {
    if (window.gsap && window.ScrollTrigger) return go();
    if (++n < 40) setTimeout(wait, 100);
  })();
  function go() {
    gsap.registerPlugin(ScrollTrigger);
    var mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", function () {
      gsap.fromTo(img, { scale: 1.02 }, { scale: 1.14, ease: "none",
        scrollTrigger: { trigger: sec.querySelector(".lu-cam"), start: "top 85%", end: "bottom 20%", scrub: 0.6 } });
    });
  }
})();
