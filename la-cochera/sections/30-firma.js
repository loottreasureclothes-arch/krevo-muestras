/* Momento firma: máscara que "suelta" la salsa, ligada al scroll con GSAP
   ScrollTrigger si está disponible. Blindaje: si GSAP no cargó, o hay
   prefers-reduced-motion, o scripting está apagado, la foto se queda
   completa desde el CSS base (nunca en blanco, nunca a medio camino). */
(function () {
  "use strict";
  var sec = document.getElementById("momento");
  if (!sec) return;
  var img = sec.querySelector(".s-firma-img");

  var reduced = false;
  try { reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}

  function ready() {
    return !!(window.gsap && window.ScrollTrigger && !reduced && img);
  }

  var tries = 0;
  function boot() {
    if (reduced || !img) return; // estado final ya está en el CSS base
    if (!(window.gsap && window.ScrollTrigger)) {
      tries++;
      if (tries < 40) { window.setTimeout(boot, 100); }
      return; // sin GSAP: se queda la foto completa (blindaje)
    }
    try {
      sec.classList.add("s-firma-armed");
      gsap.set(img, { clipPath: "inset(46% 0% 0% 0%)", scale: 1.06, transformOrigin: "center 30%" });
      ScrollTrigger.create({
        trigger: sec,
        start: "top 70%",
        end: "top 20%",
        scrub: 0.5,
        onUpdate: function (self) {
          var p = self.progress;
          gsap.set(img, { clipPath: "inset(" + (46 * (1 - p)) + "% 0% 0% 0%)", scale: 1.06 - 0.06 * p });
        },
        onLeaveBack: function () {
          gsap.set(img, { clipPath: "inset(46% 0% 0% 0%)", scale: 1.06 });
        }
      });
    } catch (e) {
      sec.classList.remove("s-firma-armed");
      try { gsap.set(img, { clearProps: "clipPath,scale,transformOrigin" }); } catch (e2) {}
    }
  }
  boot();

  // Red de seguridad: si algo se atora, la foto completa de todos modos.
  window.setTimeout(function () {
    if (!ready()) {
      sec.classList.remove("s-firma-armed");
      if (img) img.style.clipPath = "inset(0 0 0 0)";
    }
  }, 2400);
})();
