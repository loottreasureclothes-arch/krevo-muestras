/* 00 · Rotador de fotos (componente reutilizable: Incluye y Nosotros)
   - 3 fotos a la vez; cada ~1.2-1.8 s cambia UNA (slot 1, 2, 3, 1...), ritmo "psh, psh, psh".
   - Usa las 16 fotos reales HD de img/hd/, sin repetir en pantalla.
   - La siguiente foto se precarga y se decodifica ANTES del cambio: si no está lista, ese turno se salta.
     La nueva entra encima de la vieja y la vieja se quita al final: nunca aparece un hueco en blanco.
   - Pausa si no se ve (IntersectionObserver) o si la pestaña está oculta. Con reduced-motion: quieto.
   Uso: <div data-rot="4"> (el número = desde qué foto arranca la cola) con hijos [data-rot-slot],
        cada uno con una <img class="cd-rot-img" data-rot-src="img/hd/cdNN-1200.webp">. */
(function () {
  "use strict";
  var FOTOS = [
    ["cd10", "Vestidor walk-in de nogal con isla de cajones", 60],
    ["cd20", "Cocina con isla y techo de madera", 55],
    ["cd02", "Puerta de nogal con jaladera negra", 45],
    ["cd14", "Centro de entretenimiento de nogal con listones", 48],
    ["cd09", "Closet con luz LED y cajonera de nogal", 45],
    ["cd06", "Vestidor en L con repisas de nogal", 45],
    ["cd03", "Muro de madera con veta de nogal", 55],
    ["cd12", "Closet de piso a techo en nogal", 42],
    ["cd01", "Mueble de baño en nogal con cubierta de piedra", 35],
    ["cd11", "Puerta residencial de madera en franjas", 45],
    ["cd07", "Vestidor walk-in con repisas y cajones", 42],
    ["cd15", "Centro de TV de nogal con panel de listones", 40],
    ["cd05", "Celosía de madera en pasillo", 50],
    ["cd13", "Closet de piso a techo con jaladeras largas", 45],
    ["cd08", "Vestidor con repisas abiertas de nogal", 45],
    ["cd04", "Muro de madera de nogal con cajón", 55]
  ].map(function (f) { return { src: "img/hd/" + f[0] + "-1200.webp", alt: f[1] + ", proyecto real de Closet&Door", y: f[2] }; });
  /* f[2] = altura (%) donde está lo importante de cada foto: así se encuadra bien también en recuadros anchos */

  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var cache = {}; /* src -> "ok" | "cargando" | "error" */

  function preload(src) {
    if (cache[src]) return;
    cache[src] = "cargando";
    var im = new Image();
    im.decoding = "async";
    im.onload = function () {
      if (im.decode) im.decode().then(function () { cache[src] = "ok"; }, function () { cache[src] = "ok"; });
      else cache[src] = "ok";
    };
    im.onerror = function () { cache[src] = "error"; };
    im.src = src;
  }

  function Rot(root) {
    var slots = Array.prototype.slice.call(root.querySelectorAll("[data-rot-slot]"));
    if (slots.length < 2) return;
    var ptr = (parseInt(root.getAttribute("data-rot"), 10) || 0) % FOTOS.length;
    var turn = 0, timer = null, visible = false, busy = 0;

    function current(slot) { var a = slot.querySelectorAll(".cd-rot-img"); return a[a.length - 1]; }
    function showing() { return slots.map(function (s) { var c = current(s); return c && c.getAttribute("src"); }); }
    /* la próxima foto de la cola que no esté ya en pantalla */
    function peek() {
      var on = showing();
      for (var k = 0; k < FOTOS.length; k++) {
        var f = FOTOS[(ptr + k) % FOTOS.length];
        if (on.indexOf(f.src) === -1 && cache[f.src] !== "error") return { f: f, k: k };
      }
      return null;
    }
    function warm() { var n = peek(); if (n) preload(n.f.src); }

    function swap() {
      var slot = slots[turn % slots.length];
      var n = peek();
      if (!n) return;
      if (cache[n.f.src] !== "ok") { preload(n.f.src); return; } /* aún no está lista: se salta el turno */
      var old = current(slot);
      if (!old || busy) return;
      ptr = (ptr + n.k + 1) % FOTOS.length;
      turn++;
      var nu = old.cloneNode(false);
      nu.removeAttribute("srcset"); nu.removeAttribute("sizes"); nu.removeAttribute("loading");
      nu.src = n.f.src; nu.alt = n.f.alt;
      nu.style.objectPosition = "50% " + n.f.y + "%";
      nu.className = "cd-rot-img is-enter " + ["from-r", "from-l", "from-b"][turn % 3];
      old.parentNode.appendChild(nu);
      void nu.offsetWidth; /* confirma el estado inicial para que la transición corra (sin depender de rAF) */
      nu.classList.add("is-go");
      old.classList.add("is-leave");
      busy++;
      var done = false;
      function fin() {
        if (done) return; done = true; busy--;
        /* estado final forzado: aunque la transición se atore, la foto nueva queda completa y visible */
        nu.style.transition = "none";
        nu.className = "cd-rot-img";
        void nu.offsetWidth;
        nu.style.removeProperty("transition");
        if (old.parentNode) old.parentNode.removeChild(old);
      }
      nu.addEventListener("transitionend", function (e) { if (e.propertyName === "clip-path") fin(); });
      setTimeout(fin, 950);
      warm();
    }

    function tick() {
      timer = null;
      if (!visible || document.hidden) return;
      swap();
      schedule();
    }
    function schedule() {
      if (timer || !visible || document.hidden) return;
      timer = setTimeout(tick, 1200 + Math.random() * 600);
    }
    function stop() { if (timer) { clearTimeout(timer); timer = null; } }

    /* primero precarga la cola cercana; arranca cuando el bloque se ve (y tras su animación de entrada) */
    var started = false;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        visible = e.isIntersecting;
        if (visible) {
          warm();
          if (!started) { started = true; stop(); timer = setTimeout(tick, 1900); }
          else schedule();
        } else stop();
      });
    }, { threshold: 0.2 });
    io.observe(root);
    document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else schedule(); });
  }

  function init() {
    if (still || !("IntersectionObserver" in window)) return; /* reduced-motion o navegador viejo: collage fijo */
    Array.prototype.forEach.call(document.querySelectorAll("[data-rot]"), Rot);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
