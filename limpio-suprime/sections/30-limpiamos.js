/* 30 · Esto limpiamos: cada renglón preselecciona el cotizador y sube (como ya hacía).
   Además: la foto grande de arriba (compu: sticky a la derecha) cambia con un crossfade simple
   al renglón activo/tocado (celular) o pasado con el cursor (compu). Es un componente propio,
   NO la pasada del jalador (esa sigue solo en hero, cotizador y cierre). */
(function () {
  "use strict";
  function init() {
    var rows = document.querySelectorAll(".s-limpiamos-row");
    var scene = document.getElementById("lm-foto");
    var img = document.getElementById("lm-foto-img");
    if (!rows.length) return;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var hover = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    var actual = "oficina"; // coincide con la foto que ya trae el HTML al cargar

    function setActiva(row) {
      Array.prototype.forEach.call(rows, function (r) {
        var on = r === row;
        r.classList.toggle("is-activa", on);
        r.setAttribute("aria-pressed", on ? "true" : "false");
      });
    }
    function setFoto(row) {
      if (!scene || !img) return;
      var foto = row.getAttribute("data-foto");
      var txt = row.querySelector(".s-limpiamos-txt");
      var alt = (txt ? txt.textContent : "Limpio Suprime") + ", imagen ilustrativa";
      if (!foto || foto === actual) return;
      actual = foto;
      var ancho = window.matchMedia && window.matchMedia("(min-width: 720px)").matches;
      var src = "img/fotos/" + foto + "-" + (ancho ? "d" : "m") + ".webp";
      if (reduce) { img.src = src; img.alt = alt; return; }
      var pre = new Image();
      var hecho = false;
      function aplicar() {
        if (hecho) return;
        hecho = true;
        scene.classList.add("is-cambiando");
        setTimeout(function () {
          img.src = src; img.alt = alt;
          requestAnimationFrame(function () { scene.classList.remove("is-cambiando"); });
        }, 180);
      }
      pre.onload = aplicar; pre.onerror = aplicar;
      pre.src = src;
      setTimeout(aplicar, 500); // pase lo que pase, se termina de cambiar
    }
    Array.prototype.forEach.call(rows, function (b) {
      b.addEventListener("click", function () {
        setActiva(b);
        setFoto(b);
        window.dispatchEvent(new CustomEvent("ls:espacio", {
          detail: { tipo: b.getAttribute("data-tipo") || "", necesita: b.getAttribute("data-necesita") || "" }
        }));
        if (window.LSScroll) window.LSScroll("cotiza");
      });
      if (hover) {
        b.addEventListener("mouseenter", function () { setActiva(b); setFoto(b); });
      }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
