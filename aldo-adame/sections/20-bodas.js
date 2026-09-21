/* COMPONENTE FIRMA — el tablero de cada boda.
   Abrir un evento: se cambia el panel, la banda se repinta con la paleta medida
   de ESE evento y los cinco chips entran uno por uno.
   Blindaje: sin JS el primer panel se ve completo (los otros van con `hidden`) y
   los chips estan visibles porque el estado escondido solo existe bajo
   `@media (scripting: enabled)`. */
(function () {
  "use strict";

  var sec = document.getElementById("bodas");
  if (!sec) return;
  var tabs = [].slice.call(sec.querySelectorAll('[role="tab"]'));
  var paneles = [].slice.call(sec.querySelectorAll(".s-bod__panel"));
  if (!tabs.length || !paneles.length) return;

  var AA = window.AA || {};
  var mezcla = AA.mezcla || function (a) { return a; };
  var lum = AA.luminancia || function () { return 0.5; };
  var PAPEL = "#FAF7F2";

  function satura(hex) {
    var h = hex.replace("#", "");
    var r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
    return (Math.max(r, g, b) - Math.min(r, g, b)) / 255;
  }

  function pinta(panel) {
    var lista = (panel.getAttribute("data-pal") || "").split(",").filter(Boolean);
    if (!lista.length) return;
    var vivo = lista[0], oscuro = lista[0];
    for (var i = 1; i < lista.length; i++) {
      if (satura(lista[i]) > satura(vivo)) vivo = lista[i];
      if (lum(lista[i]) < lum(oscuro)) oscuro = lista[i];
    }
    // La banda se tiñe con el color mas vivo del evento, pero el fondo NUNCA
    // baja de 0.45 de luminancia: asi el texto azul marino se queda arriba de
    // 7:1 aunque la paleta venga oscura.
    var t = 0.22, fondo = mezcla(PAPEL, vivo, t);
    while (t > 0.04 && lum(hexDe(fondo)) < 0.45) { t -= 0.03; fondo = mezcla(PAPEL, vivo, t); }
    sec.style.setProperty("--fondo", fondo);
    sec.style.setProperty("--acento", oscuro);
  }

  function hexDe(rgb) {
    var m = /(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(rgb);
    if (!m) return "#FAF7F2";
    return "#" + [m[1], m[2], m[3]].map(function (v) {
      return ("0" + parseInt(v, 10).toString(16)).slice(-2);
    }).join("");
  }

  function chips(panel) {
    var ul = panel.querySelector("[data-chips]");
    if (!ul) return;
    var li = ul.children;
    for (var i = 0; i < li.length; i++) li[i].style.setProperty("--i", i);
    ul.classList.remove("is-in");
    // dos cuadros: hay que soltar la clase antes de volver a ponerla
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { ul.classList.add("is-in"); });
    });
  }

  function abre(idx, mueveFoco) {
    for (var i = 0; i < tabs.length; i++) {
      var on = i === idx;
      tabs[i].setAttribute("aria-selected", on ? "true" : "false");
      tabs[i].setAttribute("tabindex", on ? "0" : "-1");
      if (paneles[i]) {
        if (on) paneles[i].removeAttribute("hidden");
        else paneles[i].setAttribute("hidden", "");
        paneles[i].classList.toggle("is-on", on);
      }
    }
    if (mueveFoco) tabs[idx].focus();
    pinta(paneles[idx]);
    chips(paneles[idx]);
  }

  for (var i = 0; i < tabs.length; i++) {
    (function (n) {
      tabs[n].addEventListener("click", function () { abre(n, false); });
      tabs[n].addEventListener("keydown", function (e) {
        var k = e.key, d = 0;
        if (k === "ArrowRight" || k === "ArrowDown") d = 1;
        else if (k === "ArrowLeft" || k === "ArrowUp") d = -1;
        else if (k === "Home") { e.preventDefault(); abre(0, true); return; }
        else if (k === "End") { e.preventDefault(); abre(tabs.length - 1, true); return; }
        if (!d) return;
        e.preventDefault();
        abre((n + d + tabs.length) % tabs.length, true);
      });
    })(i);
  }

  // Estado inicial: el primer tablero ya esta abierto en el HTML; aqui solo se
  // pinta la banda y se sueltan sus chips cuando la seccion entra en pantalla.
  pinta(paneles[0]);
  function arranca() { chips(sec.querySelector(".s-bod__panel:not([hidden])")); }
  if (AA.reducido || !("IntersectionObserver" in window)) arranca();
  else {
    var io = new IntersectionObserver(function (e) {
      if (e[0].isIntersecting) { arranca(); io.disconnect(); }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    io.observe(sec);
    window.setTimeout(function () {
      var ul = sec.querySelector(".s-bod__panel:not([hidden]) [data-chips]");
      if (ul && !ul.classList.contains("is-in")) { arranca(); io.disconnect(); }
    }, 1600);
  }
})();
