/* 04-firma: "Del plano al 3D". El plano en SVG (SU.plantaHTML, compartido con
   el catalogo del turno 2) se inclina y se levanta en volumen ligado al
   scroll (sin pin, reversible, sin libreria), y termina en cross-fade con el
   render real de Lapisa Agricola. Blindaje: el HTML ya trae el render
   visible por defecto; esto SOLO se activa con scripting + sin
   prefers-reduced-motion. */
(function () {
  "use strict";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;
  var stage = document.querySelector("[data-firma-stage]");
  var planWrap = document.querySelector("[data-firma-plan]");
  var photo = document.querySelector("[data-firma-photo]");
  var tag = document.querySelector("[data-firma-tag]");
  if (!stage || !planWrap || !photo || !tag || !window.SU) return;

  setup();

  function setup() {
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
      /* el que queda en 0 se esconde de verdad: no ocupa foco ni sale como bloque invisible */
      photo.style.visibility = cross <= 0 ? "hidden" : "visible";
      planWrap.style.visibility = cross >= 1 ? "hidden" : "visible";
      tag.textContent = cross > 0.5 ? TAG_3D : TAG_PLAN;
    }
    /* Avance ligado al scroll SIN libreria (antes GSAP + ScrollTrigger, 110 KB
       para esta sola animacion; NOTA GLOBAL 2). Mismo recorrido que tenia:
       empieza cuando el borde de arriba de la caja cruza el 78 % de la
       pantalla y termina en el 22 %. El listener de scroll SOLO vive mientras
       la caja esta cerca de la pantalla (IntersectionObserver), asi no corre
       nada en el resto de la pagina. */
    var ticking = false, listening = false;
    function progress() {
      var r = stage.getBoundingClientRect(), vh = window.innerHeight || 1;
      var p = (vh * 0.78 - r.top) / (vh * 0.56);
      return p < 0 ? 0 : p > 1 ? 1 : p;
    }
    function tick() { ticking = false; render(progress()); }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(tick); } }
    function listen(on) {
      if (on === listening) return;
      listening = on;
      window[on ? "addEventListener" : "removeEventListener"]("scroll", onScroll, { passive: true });
      window[on ? "addEventListener" : "removeEventListener"]("resize", onScroll, { passive: true });
      if (on) onScroll();
    }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        listen(es[es.length - 1].isIntersecting);
        if (!listening) render(progress()); /* al salir, deja el estado que toca (0 o 1) */
      }, { rootMargin: "30% 0px 30% 0px" }).observe(stage);
    } else { listen(true); }
    render(progress());
  }
})();
