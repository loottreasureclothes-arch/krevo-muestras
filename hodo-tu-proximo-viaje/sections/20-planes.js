/* 20 · Planes: filtros de boleto, carrusel con snap y el filtro que manda el buscador del hero.
   Sin JS el carrusel igual se desliza y los links "Pregunta el precio" igual bajan al pase. */
(function () {
  "use strict";
  function init() {
    var carril = document.getElementById("hd-planes-carril");
    var filtros = document.getElementById("hd-planes-filtros");
    var estado = document.getElementById("hd-planes-estado");
    var fill = document.getElementById("hd-planes-fill");
    var num = document.getElementById("hd-planes-n");
    var tot = document.getElementById("hd-planes-tot");
    if (!carril) return;
    var planes = Array.prototype.slice.call(carril.querySelectorAll(".hd-plan"));
    if (!planes.length) return;

    function dos(n) { return (n < 10 ? "0" : "") + n; }
    function visibles() { return planes.filter(function (p) { return !p.hidden; }); }

    function marcarBoton(id) {
      if (!filtros) return;
      Array.prototype.forEach.call(filtros.querySelectorAll(".hd-filtro"), function (b) {
        b.setAttribute("aria-pressed", b.getAttribute("data-filtro") === id ? "true" : "false");
      });
    }
    function pintarEstado(html) {
      if (!estado) return;
      if (!html) { estado.hidden = true; estado.innerHTML = ""; return; }
      estado.innerHTML = html;
      estado.hidden = false;
      var limpia = estado.querySelector("[data-limpia]");
      if (limpia) limpia.addEventListener("click", function () { aplicar("todos"); });
    }
    function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

    function aplicar(modo, valor, etiqueta) {
      planes.forEach(function (p) {
        var ok = modo === "todos" ||
          (modo === "grupo" && p.getAttribute("data-grupo") === valor) ||
          (modo === "destino" && p.getAttribute("data-slug") === valor);
        p.hidden = !ok;
      });
      var n = visibles().length;
      if (!n) { planes.forEach(function (p) { p.hidden = false; }); modo = "todos"; n = planes.length; }
      marcarBoton(modo === "grupo" ? valor : (modo === "todos" ? "todos" : ""));
      if (modo === "destino") {
        pintarEstado('<span>Plan para ' + esc(etiqueta || "tu destino") + '.</span><button type="button" class="hd-planes-limpia" data-limpia>Ver los ' + planes.length + " planes</button>");
      } else if (modo === "grupo" && valor === "bodas") {
        pintarEstado('<span>' + n + (n === 1 ? " plan" : " planes") + ' de luna de miel y bodas.</span><a class="hd-planes-limpia" href="#bodas">Ver bodas en la playa</a>');
      } else if (modo === "grupo") {
        pintarEstado("<span>" + n + (n === 1 ? " plan" : " planes") + " en " + esc(etiqueta || valor) + ".</span>");
      } else {
        pintarEstado("");
      }
      if (tot) tot.textContent = dos(n);
      carril.scrollLeft = 0;
      avance();
    }

    if (filtros) {
      Array.prototype.forEach.call(filtros.querySelectorAll(".hd-filtro"), function (b) {
        b.addEventListener("click", function () {
          var f = b.getAttribute("data-filtro");
          if (f === "todos") aplicar("todos");
          else aplicar("grupo", f, b.textContent.trim());
        });
      });
    }

    /* El buscador del hero manda aquí lo que se buscó */
    window.addEventListener("hodo:filtro", function (e) {
      var d = e.detail || {};
      if (d.modo === "destino") aplicar("destino", d.slug, d.etiqueta);
      else if (d.modo === "grupo") aplicar("grupo", d.grupo, d.etiqueta);
      else aplicar("todos");
    });

    /* Indicador de avance (decorativo: sin JS el carrusel sigue sirviendo) */
    var raf = null;
    function avance() {
      raf = null;
      var vis = visibles();
      var n = vis.length || 1;
      var max = carril.scrollWidth - carril.clientWidth;
      var p = max > 4 ? Math.min(1, Math.max(0, carril.scrollLeft / max)) : 0;
      var i = Math.round(p * (n - 1));
      if (num) num.textContent = dos(i + 1);
      if (tot) tot.textContent = dos(n);
      if (fill) fill.style.width = (100 / n + p * (100 - 100 / n)) + "%";
    }
    function programa() { if (!raf) raf = requestAnimationFrame(avance); }
    carril.addEventListener("scroll", programa, { passive: true });
    window.addEventListener("resize", programa);
    avance();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
