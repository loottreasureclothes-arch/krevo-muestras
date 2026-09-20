/* 02 CINE: momento de cine. El comedor aparece recortado con la forma del arco de la hacienda y, al bajar,
   el arco se abre hasta llenar la pantalla; la mesa gira con el mismo scroll (24 cuadros reales por lado,
   Kling, en img/cine/mesa-m|d/01..24.webp: precarga 1 de cada 4 y luego el resto). Reversible.
   Compu: pin +=80% con barra de progreso. Celular: sin pin, scrub mientras la sección cruza la pantalla.
   Blindaje: el CSS/HTML base es el cuadro 01 completo; si GSAP no llega o hay movimiento reducido, se queda ahí. */
(function () {
  "use strict";
  var sec = document.getElementById("cine");
  if (!sec) return;
  var frame = sec.querySelector(".s-cine-frame");
  var N = 24;
  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  function folder(wide) { return "img/cine/mesa-" + (wide ? "d" : "m") + "/"; }

  /* precarga: primero 1 de cada 4 (cobertura rápida de toda la vuelta), luego el resto */
  var cached = {};
  function preloadSet(wide) {
    var f = folder(wide), first = [1, 5, 9, 13, 17, 21, 24], rest = [];
    for (var i = 1; i <= N; i++) if (first.indexOf(i) === -1) rest.push(i);
    function loadAll(list) {
      list.forEach(function (n) {
        var src = f + pad2(n) + ".webp";
        if (cached[src]) return;
        cached[src] = true;
        var im = new Image();
        im.decoding = "async";
        im.src = src;
      });
    }
    loadAll(first);
    setTimeout(function () { loadAll(rest); }, 60);
  }

  var curFrame = 1, curWide = null;
  function setFrame(n, wide) {
    n = Math.max(1, Math.min(N, Math.round(n)));
    if (n === curFrame && wide === curWide) return;
    curFrame = n; curWide = wide;
    frame.src = folder(wide) + pad2(n) + ".webp";
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
      preloadSet(true);
      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec, start: "top top", end: "+=80%", pin: true, scrub: 0.5, anticipatePin: 1,
          onUpdate: function (self) { setFrame(1 + self.progress * (N - 1), true); }
        }
      });
      tl.fromTo(arch, { clipPath: "inset(12% 34% 0% 34% round 50% 50% 0 0 / 34% 34% 0 0)" }, { clipPath: "inset(0% 0% 0% 0% round 0% 0% 0 0 / 0% 0% 0 0)", ease: "none" }, 0)
        .fromTo(copy, { opacity: 0.35, y: 24 }, { opacity: 1, y: 0, ease: "none" }, 0.1)
        .fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
      return function () { gsap.set([arch, copy, bar], { clearProps: "all" }); setFrame(1, true); };
    });
    mm.add("(max-width: 899px)", function () {
      preloadSet(false);
      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec, start: "top 85%", end: "top 5%", scrub: 0.6,
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
