/* 10-hero: Beat A (el rotulo REAL se prende, una vez, 700 ms) + Beat B (la camara baja por la
   fachada, ligada al scroll, reversible, sin pin — 0 a 60% del alto del hero, scrub .5).

   Beat A sin recuadro: la capa .os-hero-sign-img es la MISMA fachada que el fondo, con el mismo
   object-fit/object-position/scale. Aqui se calcula, en pixeles y en cada cuadro, donde cae la zona
   real del rotulo dentro del encuadre (cover + object-position + scale) y se le pone:
     - clip-path: el barrido de izquierda a derecha (eso es el "se prende")
     - mask: una elipse suave, para que el brillo se funda con el azulejo y NO quede ningun borde
     - filter: brightness/saturate que suben con el barrido
   Como se recalcula junto con Beat B, el brillo sigue pegado al letrero mientras la camara baja.

   ZONA DEL ROTULO, medida a mano sobre cada archivo (no de memoria; ver build_img.py):
     fachada-m.webp  900 x 1740  -> x  72-406, y 570-764
     fachada-d.webp 2000 x 1581  -> x 314-631, y 482-667 */
(function () {
  "use strict";
  var hero = document.getElementById("hero");
  if (!hero) return;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var media = hero.querySelector(".os-hero-media");
  var bg = hero.querySelector(".os-hero-bg");
  var sign = document.getElementById("os-hero-sign");
  var signImg = sign && sign.querySelector(".os-hero-sign-img");

  var ZONAS = {
    900: { x0: 72, y0: 570, x1: 406, y1: 764 },
    2000: { x0: 314, y0: 482, x1: 631, y1: 667 }
  };

  /* Beat B: --hp-y 28% -> 86%, --hp-s 1.06 -> 1.00, sobre el 60% del alto del hero. scrub .5. */
  var Y0 = 28, Y1 = 86, S0 = 1.06, S1 = 1.00;
  var hpY = Y0, hpS = S0;
  var lit = 0;

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  /* ------- Beat A: donde cae el rotulo, en pixeles de la caja del hero ------- */
  function pintarLetrero() {
    if (!signImg || !media) return;
    var W = media.clientWidth, H = media.clientHeight;
    var nw = signImg.naturalWidth, nh = signImg.naturalHeight;
    var z = ZONAS[nw];
    if (!W || !H || !nw || !nh || !z) return;

    /* object-fit: cover + object-position (50% hpY). El transform scale() se aplica DESPUES del
       clip-path, asi que aqui se trabaja en la caja sin escalar y la escala la pone el navegador. */
    var s = Math.max(W / nw, H / nh);
    var px = parseFloat(getComputedStyle(media).getPropertyValue("--hp-x")) / 100;
    if (isNaN(px)) px = 0.5;
    var ox = (W - nw * s) * px;
    var oy = (H - nh * s) * (hpY / 100);

    var x0 = ox + z.x0 * s, x1 = ox + z.x1 * s;
    var y0 = oy + z.y0 * s, y1 = oy + z.y1 * s;
    var cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    var rx = (x1 - x0) / 2 * 1.34;   /* aire a los lados: el brillo se apaga antes del borde */
    var ry = (y1 - y0) / 2 * 1.62;

    /* el recorte va un poco MAS afuera que la mascara, para que sus filos caigan donde la mascara
       ya es transparente: asi el unico filo que se ve es el del barrido mientras corre */
    var cx0 = cx - rx * 1.06, cx1 = cx + rx * 1.06;
    var cy0 = cy - ry * 1.06, cy1 = cy + ry * 1.06;
    var e = easeOut(lit);
    var barrido = cx0 + (cx1 - cx0) * e;

    signImg.style.clipPath = "inset(" + Math.round(cy0) + "px " + Math.round(W - barrido) + "px " +
      Math.round(H - cy1) + "px " + Math.round(cx0) + "px)";
    var mascara = "radial-gradient(ellipse " + Math.round(rx) + "px " + Math.round(ry) + "px at " +
      Math.round(cx) + "px " + Math.round(cy) + "px, #000 0%, #000 46%, rgba(0,0,0,0) 100%)";
    signImg.style.webkitMaskImage = mascara;
    signImg.style.maskImage = mascara;
    signImg.style.filter = "brightness(" + (1 + 0.55 * e).toFixed(3) + ") saturate(" + (1 + 0.18 * e).toFixed(3) + ")";
    sign.classList.add("is-ready");
  }

  function aplicarFondo() {
    if (media) {
      media.style.setProperty("--hp-y", hpY.toFixed(2) + "%");
      media.style.setProperty("--hp-s", hpS.toFixed(4));
    }
    pintarLetrero();
  }

  /* ------- Beat A: el barrido, una sola vez ------- */
  function prender() {
    if (reduce) { lit = 1; aplicarFondo(); return; }
    var t0 = null;
    function paso(t) {
      if (t0 === null) t0 = t;
      lit = Math.min(1, (t - t0) / 700);
      aplicarFondo();
      if (lit < 1) requestAnimationFrame(paso);
    }
    requestAnimationFrame(paso);
  }

  function arrancarLetrero() {
    if (!signImg) return;
    function listo() { window.setTimeout(prender, reduce ? 0 : 500); }
    if (signImg.complete && signImg.naturalWidth) listo();
    else signImg.addEventListener("load", listo, { once: true });
    /* blindaje: pase lo que pase, a los 1.6 s el rotulo queda prendido y la capa visible */
    window.setTimeout(function () { if (lit < 1) { lit = 1; aplicarFondo(); } }, 1600);
  }

  aplicarFondo();
  arrancarLetrero();
  window.addEventListener("resize", aplicarFondo, { passive: true });

  /* ------- Beat B ------- */
  if (reduce || !bg) return;
  var target = 0, current = 0, raf = null;

  function progress() {
    var r = hero.getBoundingClientRect();
    var span = r.height * 0.6;
    if (span <= 0) return 0;
    var p = -r.top / span;
    return p < 0 ? 0 : p > 1 ? 1 : p;
  }
  function loop() {
    raf = null;
    current += (target - current) * 0.5; /* scrub .5 */
    if (Math.abs(target - current) < 0.001) current = target;
    hpY = Y0 + (Y1 - Y0) * current;
    hpS = S0 + (S1 - S0) * current;
    aplicarFondo();
    if (current !== target) raf = requestAnimationFrame(loop);
  }
  function onScroll() {
    target = progress();
    if (!raf) raf = requestAnimationFrame(loop);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();
})();
