/* ALDO ADAME — base del sitio. Vanilla, sin librerias.
   1) la linea de avance del header
   2) los titulos que caen (con red de seguridad a los 1.6 s: nada se queda en blanco)
   No hay boton de WhatsApp: este negocio no tiene numero publico. */
(function () {
  "use strict";

  var reducido = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Linea de avance bajo el header ---------- */
  function avance() {
    var barra = document.querySelector(".aa-progress i");
    if (!barra) return;
    var pedido = false;
    function pinta() {
      pedido = false;
      var doc = document.documentElement;
      var alto = (doc.scrollHeight - window.innerHeight) || 1;
      var p = (window.scrollY || window.pageYOffset) / alto;
      barra.style.setProperty("--p", Math.max(0, Math.min(1, p)).toFixed(4));
    }
    window.addEventListener("scroll", function () {
      if (!pedido) { pedido = true; requestAnimationFrame(pinta); }
    }, { passive: true });
    window.addEventListener("resize", pinta, { passive: true });
    pinta();
  }

  /* ---------- Titulos que caen ---------- */
  function caer() {
    var titulos = document.querySelectorAll("[data-caer]");
    if (!titulos.length) return;
    var i, j;
    for (i = 0; i < titulos.length; i++) {
      var lineas = titulos[i].querySelectorAll(".l");
      for (j = 0; j < lineas.length; j++) lineas[j].style.setProperty("--i", j);
    }
    // Ademas de la clase, se fuerza el estilo en linea: si por lo que sea la
    // regla `.aa-js [data-caer].is-in .l i { transform: none }` no aplicara, el
    // titulo se quedaria escondido detras del overflow y nadie lo cazaria (el
    // detector de bloques invisibles mira opacity, no transform).
    function aLaFuerza(el) {
      var p = el.querySelectorAll(".l i");
      for (var n = 0; n < p.length; n++) p[n].style.transform = "none";
    }
    function mostrar(el) { el.classList.add("is-in"); }
    if (reducido || !("IntersectionObserver" in window)) {
      for (i = 0; i < titulos.length; i++) mostrar(titulos[i]);
      return;
    }
    var io = new IntersectionObserver(function (e) {
      for (var k = 0; k < e.length; k++) {
        if (e[k].isIntersecting) { mostrar(e[k].target); io.unobserve(e[k].target); }
      }
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.2 });
    for (i = 0; i < titulos.length; i++) io.observe(titulos[i]);

    // Red de seguridad: si algo sigue escondido a los 1.6 s y ya esta en pantalla,
    // se muestra a la fuerza. Nada se queda en blanco.
    window.setTimeout(function () {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var faltan = document.querySelectorAll("[data-caer]:not(.is-in)");
      for (var k = 0; k < faltan.length; k++) {
        var c = faltan[k].getBoundingClientRect();
        if (c.bottom > 0 && c.top < vh * 1.25) { mostrar(faltan[k]); aLaFuerza(faltan[k]); }
      }
    }, 1600);
  }

  /* ---------- Utilidad compartida: mezclar dos colores ---------- */
  function aRgb(hex) {
    hex = String(hex).replace("#", "");
    return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
  }
  function mezcla(hexA, hexB, t) {
    var a = aRgb(hexA), b = aRgb(hexB);
    return "rgb(" + a.map(function (v, i) { return Math.round(v + (b[i] - v) * t); }).join(",") + ")";
  }
  function luminancia(hex) {
    var c = aRgb(hex).map(function (v) {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }

  window.AA = { mezcla: mezcla, luminancia: luminancia, reducido: reducido };

  function init() { avance(); caer(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
