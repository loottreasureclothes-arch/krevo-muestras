/* 04-firma: "Del plano al 3D". El plano en SVG (SU.plantaHTML, compartido con
   el catalogo del turno 2) se inclina y se levanta en volumen ligado al
   scroll (scrub .5, sin pin, reversible), y termina en cross-fade de 320ms
   con el render real de Lapisa Agricola. Blindaje: el HTML ya trae el render
   visible por defecto; esto SOLO se activa con scripting + sin
   prefers-reduced-motion, y si GSAP no carga en 4s se deja tal cual esta. */
(function () {
  "use strict";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;
  var stage = document.querySelector("[data-firma-stage]");
  var planWrap = document.querySelector("[data-firma-plan]");
  var photo = document.querySelector("[data-firma-photo]");
  var tag = document.querySelector("[data-firma-tag]");
  if (!stage || !planWrap || !photo || !tag || !window.SU) return;

  var tries = 0;
  (function waitGsap() {
    if (window.gsap && window.ScrollTrigger) return setup();
    if (++tries > 40) return; // 4s: si no cargo GSAP, se queda el estado final (blindaje)
    setTimeout(waitGsap, 100);
  })();

  function setup() {
    gsap.registerPlugin(ScrollTrigger);
    planWrap.innerHTML = SU.plantaHTML(6, 3, "cabecera");
    planWrap.hidden = false;
    planWrap.setAttribute("data-firma-ready", "");
    var planEl = planWrap.querySelector(".su-plan-3d");
    var walls = planWrap.querySelectorAll(".su-wall");
    var TAG_PLAN = "01 / PLANTA · 6×3 CABECERA";
    var TAG_3D = "02 / PROPUESTA 3D";

    /* Fase A (0 a 45%): la planta se inclina Y las paredes suben, las dos
       terminan juntas. De 45% a 72% el volumen se queda QUIETO de pie: antes
       la inclinacion acababa en .7 y el cross-fade arrancaba en .72, asi que
       el stand de pie solo existia el 12% del recorrido y no se alcanzaba a
       ver en ninguna captura. Fase B (72% a 100%): cross-fade al render.
       La etiqueta la manda el cross-fade, no un corte aparte: asi nunca dice
       "PROPUESTA 3D" mientras todavia se ve el plano. */
    function render(p) {
      var raise = Math.min(1, p / 0.45);
      planEl.style.transform = "rotateX(" + (raise * 58) + "deg)";
      for (var i = 0; i < walls.length; i++) {
        walls[i].style.setProperty("--wx", (-58 * raise) + "deg");
        walls[i].style.setProperty("--wk", String(raise));
      }
      var cross = Math.max(0, Math.min(1, (p - 0.72) / 0.28));
      photo.style.opacity = String(cross);
      planWrap.style.opacity = String(1 - cross);
      tag.textContent = cross > 0.5 ? TAG_3D : TAG_PLAN;
    }
    render(0);

    ScrollTrigger.create({
      trigger: stage,
      start: "top 78%",
      end: "top 22%",
      scrub: 0.5,
      onUpdate: function (self) { render(self.progress); },
    });
  }
})();
