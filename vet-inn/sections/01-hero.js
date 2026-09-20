/* 01-hero — foto desde blur + LA PLACA DE CANELA (componente firma de toda la página).
   Contrato (ver build.py y site.js):
     sessionStorage["vetinn-placa"] = {"nombre":"Canela","especie":"gato"}  (try/catch)
     window.vetinnPlaca() -> {nombre, especie} | null
     evento window "vetinn:placa" con detail {nombre, especie} cuando se completa o cambia. */
(function () {
  "use strict";

  var ESPECIE_LABEL = { perro: "perro", gato: "gato", pez: "pez", ave: "ave", reptil: "reptil", roedor: "roedor" };

  /* ---------- Foto desde blur (tras img.decode()) ---------- */
  function initHeroFoto() {
    var scene = document.getElementById("hero-scene");
    if (!scene) return;
    var img = scene.querySelector("img");
    if (!img) return;
    function show() { img.classList.add("is-loaded"); }
    if (img.complete && img.naturalWidth) { show(); return; }
    if (img.decode) { img.decode().then(show).catch(show); }
    else img.addEventListener("load", show);
    setTimeout(show, 1600); // blindaje: nunca se queda en blur
  }

  /* ---------- La placa de Canela ---------- */
  function initPlaca() {
    var input = document.getElementById("placa-nombre");
    var botones = document.querySelectorAll(".s-hero-especie");
    var render = document.getElementById("placa-render");
    if (!input || !render) return;

    var state = { nombre: "", especie: "" };
    var dibujada = false;

    function guardar() {
      try { sessionStorage.setItem("vetinn-placa", JSON.stringify(state)); } catch (e) { /* modo privado: no pasa nada */ }
    }
    function avisar() {
      window.dispatchEvent(new CustomEvent("vetinn:placa", { detail: { nombre: state.nombre, especie: state.especie } }));
    }
    function dibujar() {
      render.textContent = ""; // limpio, sin innerHTML con texto de usuario
      var shape = document.createElement("span");
      shape.className = "s-placa-shape";
      if (state.especie) {
        var iconWrap = document.createElement("span");
        iconWrap.className = "s-placa-icon";
        var svgNS = "http://www.w3.org/2000/svg";
        var svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("aria-hidden", "true");
        var use = document.createElementNS(svgNS, "use");
        use.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#i-" + state.especie);
        use.setAttribute("href", "#i-" + state.especie);
        svg.appendChild(use);
        iconWrap.appendChild(svg);
        shape.appendChild(iconWrap);
      }
      var nombreSpan = document.createElement("span");
      nombreSpan.className = "s-placa-nombre";
      nombreSpan.textContent = state.nombre || "Tu mascota";
      shape.appendChild(nombreSpan);
      render.appendChild(shape);
      render.hidden = false;
      // fuerza reflow para que la transicion de clip-path corra desde el estado inicial
      void shape.offsetWidth;
      requestAnimationFrame(function () { shape.classList.add("is-drawn"); });
    }
    function actualizar() {
      /* basta el NOMBRE para que la placa mande (la especie es opcional): el campo del
         nombre ahora también vive dentro de la solicitud de cita (REVISION-2, cambio 5) y
         desde allá casi nadie vuelve arriba a tocar la silueta. */
      if (state.nombre) {
        guardar();
        avisar();
        dibujar();
        dibujada = true;
      } else if (dibujada) {
        // se borro el nombre despues de ya haber placa: se esconde y deja de mandar
        dibujada = false;
        render.hidden = true;
        render.textContent = "";
        guardar();
        avisar();
      }
    }

    /* Contrato para 02-servicios: el campo de la cita escribe aquí y la placa se arma sola. */
    window.vetinnSetNombre = function (n) {
      var v = String(n == null ? "" : n).trim().slice(0, 24);
      if (v === state.nombre) return;
      state.nombre = v;
      if (input.value.trim() !== v) input.value = v;
      actualizar();
    };

    input.addEventListener("input", function () {
      state.nombre = input.value.trim().slice(0, 24);
      actualizar();
    });
    botones.forEach(function (b) {
      b.addEventListener("click", function () {
        var ya = b.getAttribute("aria-pressed") === "true";
        botones.forEach(function (o) { o.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", ya ? "false" : "true");
        state.especie = ya ? "" : (b.getAttribute("data-especie") || "");
        actualizar();
      });
    });

    /* restaurar si ya habia placa en esta sesion (sin re-jugar la animacion de dibujo) */
    try {
      var raw = sessionStorage.getItem("vetinn-placa");
      if (raw) {
        var p = JSON.parse(raw);
        if (p && p.nombre) {
          state = { nombre: p.nombre, especie: p.especie || "" };
          input.value = p.nombre;
          if (p.especie) {
            botones.forEach(function (b) {
              if (b.getAttribute("data-especie") === p.especie) b.setAttribute("aria-pressed", "true");
            });
          }
          dibujar(); dibujada = true;
        }
      }
    } catch (e) { /* modo privado: arranca vacio, sin tronar */ }
  }

  function init() { initHeroFoto(); initPlaca(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
