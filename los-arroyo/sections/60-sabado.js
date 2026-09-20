/* 60 · Sábado en Los Arroyo: collage vivo (rotador de fotos reales).
   Motor copiado de closetdoor/sections/00-rotador.js, adaptado con prefijo #sabado / .sb-:
   - 4 fotos a la vez en el marco; cada ~1.2-1.8 s cambia UNA (slot 1, 2, 3, 4, 1...).
   - Fotos reales de img/foto/ e img/menu/ (research/hechos.md y catálogo real, nada de IA).
   - La siguiente foto se precarga y decodifica ANTES del cambio: si no está lista, ese turno se salta.
     La nueva entra encima de la vieja y la vieja se quita al final: nunca aparece un hueco en blanco.
   - Pausa si no se ve (IntersectionObserver) o si la pestaña está oculta. Con reduced-motion: quieto. */
(function () {
  "use strict";
  var FOTOS = [
    ["img/foto/salsas-1200.webp", "Salsas en molcajete, cebolla, cilantro y limón, Los Arroyo", 45],
    ["img/foto/consome-tlacoyo-1600.webp", "Consomé de borrego y tlacoyo azul con salsas, Los Arroyo", 40],
    ["img/foto/comedor-1600.webp", "Comedor de Los Arroyo Chicahuales con papel picado de colores", 45],
    ["img/foto/santa-anita-1200.webp", "Interior de Los Arroyo Santa Anita con mesas de madera", 45],
    ["img/foto/chicahuales-1200.webp", "Fachada de Los Arroyo Chicahuales", 45],
    ["img/foto/poniente-1200.webp", "Fachada de Los Arroyo sobre Avenida López Mateos Poniente", 45],
    ["img/foto/barbacoa-kilo-1200.webp", "Barbacoa de borrego con tortillas hechas a mano, Los Arroyo", 40],
    ["img/menu/tlacoyo.webp", "Tlacoyo azul con salsa verde y roja, Los Arroyo", 50],
    ["img/menu/quesadilla.webp", "Quesadilla dorada en plato de talavera, Los Arroyo", 50]
  ].map(function (f) { return { src: f[0], alt: f[1], y: f[2] }; });
  /* f[2] = altura (%) donde está lo importante de cada foto, para encuadrarla bien en recuadros distintos */

  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var cache = {};

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
      if (cache[n.f.src] !== "ok") { preload(n.f.src); return; }
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
      void nu.offsetWidth;
      nu.classList.add("is-go");
      old.classList.add("is-leave");
      busy++;
      var done = false;
      function fin() {
        if (done) return; done = true; busy--;
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
    if (still || !("IntersectionObserver" in window)) return;
    Array.prototype.forEach.call(document.querySelectorAll("#sabado [data-rot]"), Rot);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

/* Las 4 fotos del collage entran desde blur la primera vez que se ven (catalogo-motion.md #14).
   Solo las fotos que ya están en el HTML al cargar; el rotador (arriba) trae su propio clip-path para los cambios. */
(function () {
  "use strict";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var imgs = document.querySelectorAll("#sabado .sb-slot > img.cd-rot-img");
  if (!imgs.length || reduce || !("IntersectionObserver" in window)) return;
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      var img = e.target;
      var run = function () {
        if (!img.animate || !img.isConnected) return;
        img.animate(
          [{ filter: "blur(16px)", transform: "scale(1.06)", opacity: 0.6 }, { filter: "blur(0px)", transform: "scale(1)", opacity: 1 }],
          { duration: 1100, easing: "cubic-bezier(.23,1,.32,1)" }
        );
      };
      if (img.complete) { img.decode ? img.decode().then(run, run) : run(); }
      else img.addEventListener("load", function () { img.decode ? img.decode().then(run, run) : run(); }, { once: true });
    });
  }, { threshold: 0.15 });
  Array.prototype.forEach.call(imgs, function (im) { io.observe(im); });
})();

/* Cortina guinda de sucursales a "Sábado en Los Arroyo": dispara cada vez que #sabado cruza al asomar (reversible). */
(function () {
  "use strict";
  var sec = document.getElementById("sabado");
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!sec || reduce || !("IntersectionObserver" in window)) return;
  var last = 0;
  var io = new IntersectionObserver(function (es) {
    if (!es[0].isIntersecting) return;
    var now = Date.now();
    if (now - last < 900) return;
    last = now;
    if (window.LM && typeof window.LM.curtain === "function") window.LM.curtain();
  }, { threshold: 0 });
  io.observe(sec);
})();
