/* 02 "Enciende": pin corto (+=90 %) con scrub reversible. Sin GSAP o con movimiento reducido se queda encendido (CSS). */
(function () {
  "use strict";
  var sec = document.getElementById("enciende");
  if (!sec || (window.IP && IP.reduce)) return;
  var tries = 0;
  (function wait() {
    if (window.gsap && window.ScrollTrigger) return go();
    if (++tries < 40) setTimeout(wait, 100);
  })();
  function go() {
    gsap.registerPlugin(ScrollTrigger);
    var img = sec.querySelector(".s-on-bg img"), lit = sec.querySelector(".s-on-lit"), proof = sec.querySelectorAll(".s-on-proof li");
    var mm = gsap.matchMedia();
    function build(end) {
      var t = gsap.timeline({ scrollTrigger: { trigger: sec, start: "top top", end: end, pin: sec.querySelector(".s-on-pin"), scrub: 0.5, anticipatePin: 1 } });
      t.fromTo(img, { scale: 1.3, filter: "brightness(0.22) saturate(0.2)" }, { scale: 1, filter: "brightness(1.08) saturate(1.15)", ease: "none", duration: 1 }, 0)
       .fromTo(lit, { clipPath: "inset(-20% 100% -20% 0%)" }, { clipPath: "inset(-20% 0% -20% 0%)", ease: "none", duration: 0.8 }, 0.1)
       .fromTo(proof, { y: 40, opacity: 0.35 }, { y: 0, opacity: 1, stagger: 0.08, ease: "none", duration: 0.4 }, 0.5);
      return function () { t.scrollTrigger && t.scrollTrigger.kill(); t.kill(); gsap.set([img, lit, proof], { clearProps: "all" }); };
    }
    mm.add("(min-width: 900px)", function () { return build("+=90%"); });
    mm.add("(max-width: 899px)", function () { return build("+=70%"); });
  }
})();
