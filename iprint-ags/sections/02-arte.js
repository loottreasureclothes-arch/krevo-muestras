/* 02 momento de cine: compu = pin +=100 % con scrub; celular = sin pin, scrub al pasar. Reversible.
   Blindaje: si GSAP no llega en 4 s, se queda la foto completa (estado final del CSS). */
(function () {
  "use strict";
  var sec = document.getElementById("arte");
  if (!sec || (window.IP && IP.reduce)) return;
  var tries = 0;
  (function wait() {
    if (window.gsap && window.ScrollTrigger) return go();
    if (++tries < 40) setTimeout(wait, 100);
  })();
  function go() {
    gsap.registerPlugin(ScrollTrigger);
    var photo = sec.querySelector(".s-arte-photo"), head = sec.querySelector(".s-arte-head"), bar = sec.querySelector(".s-arte-prog i");
    var mm = gsap.matchMedia();
    function tl(trig) {
      var t = gsap.timeline({ scrollTrigger: trig });
      t.fromTo(photo, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", duration: 1 }, 0)
       .fromTo(head, { top: "0%", opacity: 1 }, { top: "100%", opacity: 1, ease: "none", duration: 1 }, 0)
       .to(head, { opacity: 0, duration: 0.08 }, 0.95);
      if (bar) t.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 1 }, 0);
      return t;
    }
    mm.add("(min-width: 900px)", function () {
      tl({ trigger: sec, start: "top top", end: "+=100%", pin: sec.querySelector(".s-arte-pin"), scrub: 0.5, anticipatePin: 1 });
    });
    mm.add("(max-width: 899px)", function () {
      tl({ trigger: sec.querySelector(".s-arte-stage"), start: "top 78%", end: "bottom 45%", scrub: 0.6 });
    });
  }
})();
