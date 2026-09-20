/* 02 CINE: momento de cine. El comedor aparece recortado con la forma del arco de la hacienda y, al bajar,
   el arco se abre hasta llenar la pantalla; la mesa gira con el mismo scroll (24 cuadros reales por lado,
   Kling, en img/cine/mesa-m|d/01..24.webp). Reversible.

   Tres cosas que antes estaban mal y aquí están resueltas:
   1) La foto es UN SOLO <img> (sin <picture>): dentro de un <picture> el <source> le gana al src que
      cambia este JS y la mesa se quedaba congelada en el cuadro 01 en compu.
   2) La carpeta (mesa-d / mesa-m) la elige matchMedia aquí, y se vuelve a elegir si cambia el ancho.
   3) Carga perezosa de verdad: al arrancar solo existe el cuadro 01 (y con loading="lazy", ni ese se baja
      hasta acercarse). Los otros 23 se precargan cuando la sección está a pantalla y media: primero 1 de
      cada 4 (cobertura de toda la vuelta) y, al terminar esos, el resto.
   Compu: pin corto +=80% con barra de progreso. Celular: sin pin, la vuelta dura lo que la sección está
   en pantalla (asoma -> sale). Blindaje: el HTML base ya es el cuadro 01; si GSAP no llega o hay
   movimiento reducido, se queda ahí. */
(function () {
  "use strict";
  var sec = document.getElementById("cine");
  if (!sec) return;
  var frame = sec.querySelector(".s-cine-frame");
  if (!frame) return;
  var N = 24;
  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  function wideNow() { return !!(window.matchMedia && window.matchMedia("(min-width: 900px)").matches); }
  function folder(wide) { return "img/cine/mesa-" + (wide ? "d" : "m") + "/"; }
  function srcOf(n, wide) { return folder(wide) + pad2(n) + ".webp"; }

  /* Un solo <img>: en compu apuntamos ya al cuadro 01 de mesa-d (sigue siendo loading="lazy",
     así que no se baja hasta acercarse). En celular se queda el de mesa-m del HTML. */
  var curWide = wideNow();
  if (curWide) frame.src = srcOf(1, true);

  /* ---- precarga perezosa: NO al cargar la página, sino a pantalla y media de la sección ---- */
  var cache = {};           /* src -> Image (para saber si ya está listo antes de pintarlo) */
  var preloaded = {};       /* "d"/"m" -> true */
  function grab(src, done) {
    var im = cache[src];
    if (im) { if (done) done(); return im; }
    im = new Image();
    im.decoding = "async";
    if (done) { im.addEventListener("load", done, { once: true }); im.addEventListener("error", done, { once: true }); }
    im.src = src;
    cache[src] = im;
    return im;
  }
  function preloadSet(wide) {
    var key = wide ? "d" : "m";
    if (preloaded[key]) return;
    preloaded[key] = true;
    var first = [1, 5, 9, 13, 17, 21, 24], rest = [], i;
    for (i = 1; i <= N; i++) if (first.indexOf(i) === -1) rest.push(i);
    var left = first.length;
    function next() { if (--left > 0) return; rest.forEach(function (n) { grab(srcOf(n, wide)); }); }
    first.forEach(function (n) { grab(srcOf(n, wide), next); });
  }
  /* dispara la precarga cuando #cine está a 1.5 pantallas (rootMargin 150%) */
  (function armPreload() {
    function go() { preloadSet(wideNow()); }
    if (!("IntersectionObserver" in window)) { window.addEventListener("load", function () { setTimeout(go, 1200); }); return; }
    var io = new IntersectionObserver(function (es) {
      if (!es.some(function (e) { return e.isIntersecting; })) return;
      io.disconnect();
      go();
    }, { rootMargin: "150% 0px" });
    io.observe(sec);
  })();

  /* ---- pintar un cuadro: solo si ya está descargado (si no, se queda el anterior: nunca un hueco) ---- */
  var curFrame = 1;
  function setFrame(n, wide) {
    n = Math.max(1, Math.min(N, Math.round(n)));
    if (n === curFrame && wide === curWide) return;
    var src = srcOf(n, wide);
    var im = cache[src];
    if (n !== 1 && !(im && im.complete && im.naturalWidth)) { preloadSet(wide); grab(src); return; } /* aún no llega: sin parpadeo */
    curFrame = n; curWide = wide;
    if (frame.getAttribute("src") !== src) frame.src = src;
  }

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return; /* el cuadro 01 ya está puesto: nada que hacer */

  var tries = 0;
  (function wait() {
    if (!(window.gsap && window.ScrollTrigger)) { if (tries++ < 40) setTimeout(wait, 100); return; }
    gsap.registerPlugin(ScrollTrigger);
    var arch = sec.querySelector(".s-cine-arch"), copy = sec.querySelector(".s-cine-copy"), bar = sec.querySelector(".s-cine-bar i");
    var mm = gsap.matchMedia();
    mm.add("(min-width: 900px)", function () {
      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec, start: "top top", end: "+=80%", pin: true, scrub: 0.5, anticipatePin: 1,
          onUpdate: function (self) { setFrame(1 + self.progress * (N - 1), true); }
        }
      });
      tl.fromTo(arch, { clipPath: "inset(12% 34% 0% 34% round 50% 50% 0 0 / 34% 34% 0 0)" }, { clipPath: "inset(0% 0% 0% 0% round 0% 0% 0 0 / 0% 0% 0 0)", ease: "none" }, 0)
        /* el bloque de texto NO se desvanece: con opacity 0.35 scrubeada, "LA MESA YA ESTÁ PUESTA"
           se leía gris apagado casi toda la sección (era el punto 17 de la revisión). Solo sube. */
        .fromTo(copy, { y: 26 }, { y: 0, ease: "none" }, 0.1)
        .fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
      return function () { gsap.set([arch, copy, bar], { clearProps: "all" }); setFrame(1, true); };
    });
    mm.add("(max-width: 899px)", function () {
      /* la vuelta dura lo que la sección está en pantalla: de cuando asoma a cuando se va */
      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec, start: "top 85%", end: "bottom 15%", scrub: 0.6,
          onUpdate: function (self) { setFrame(1 + self.progress * (N - 1), false); }
        }
      });
      tl.fromTo(arch, { clipPath: "inset(8% 16% 18% 16% round 50% 50% 0 0 / 26% 26% 0 0)" }, { clipPath: "inset(0% 0% 0% 0% round 0% 0% 0 0 / 0% 0% 0 0)", ease: "none" }, 0);
      return function () { gsap.set([arch], { clearProps: "all" }); setFrame(1, false); };
    });
  })();
})();

/* Collage fijo de 3 fotos reales (sin rotador): solo les quita el blur de entrada al decodificar. */
(function () {
  "use strict";
  var root = document.querySelector("#cine .s-cine-collage");
  if (!root || !window.EQ || !window.EQ.blurIn) return;
  Array.prototype.forEach.call(root.querySelectorAll(".eq-blurin"), window.EQ.blurIn);
})();
