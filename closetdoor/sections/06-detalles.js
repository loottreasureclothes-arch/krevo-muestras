/* 06 · Los detalles tambien cuentan
   - Entrada "lupa": cada foto se abre como un lente (circulo que crece) y la foto baja de 1.4x a 1x.
   - Lupa con mouse o dedo. Con mouse: la lupa sigue al cursor con inercia, la foto de fondo
     hace parallax interno y una etiqueta con el nombre viaja pegada a la lupa.
   Skills: Emil (transform directo en el elemento, sin variable en el padre; seguimiento con
   interpolacion; hover solo con puntero fino; salida mas rapida que la entrada),
   GSAP (gsap.ticker para el seguimiento, ScrollTrigger once, matchMedia para reduced motion),
   Taste 5.D (sin listener de scroll: IntersectionObserver). */
(function () {
  "use strict";
  var sec = document.getElementById("detalles");
  if (!sec) return;
  var list = sec.querySelector(".s-det-list");
  var medias = sec.querySelectorAll("[data-det-zoom]");
  var mq = function (q) { return !!(window.matchMedia && window.matchMedia(q).matches); };
  var reduced = mq("(prefers-reduced-motion: reduce)");

  /* texto de la pista segun el puntero real (en celular nunca dice "mouse") */
  var hint = sec.querySelector(".s-det-hint");
  /* el texto de mouse solo con puntero fino, sin ningun puntero tactil y en pantalla ancha */
  if (hint && mq("(hover: hover) and (pointer: fine) and (min-width: 700px)") && !mq("(any-pointer: coarse)")) hint.textContent = "Pasa el mouse sobre una foto para acercarte.";

  /* ---------------- Entrada ---------------- */
  function entrance(gsap) {
    var mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", function () {
      var ms = gsap.utils.toArray(medias);
      var imgs = ms.map(function (m) { return m.querySelector("img"); });
      var caps = gsap.utils.toArray(sec.querySelectorAll(".s-det-tile figcaption"));
      gsap.set(ms, { clipPath: "circle(12% at 50% 50%)" });
      gsap.set(imgs, { scale: 1.4 });
      gsap.set(caps, { autoAlpha: 0, y: 8 });
      var tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        scrollTrigger: { trigger: list, start: "top 82%", once: true }
      });
      tl.to(ms, { clipPath: "circle(75% at 50% 50%)", duration: 0.8, stagger: 0.06, clearProps: "clipPath" }, 0)
        .to(imgs, { scale: 1, duration: 0.9, stagger: 0.06, clearProps: "transform" }, 0)
        .to(caps, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.06, clearProps: "transform" }, 0.25);
    });
  }

  /* ---------------- Lupa ---------------- */
  var MAXZ = 2.4, MINZ = 1.6;
  var active = null;
  var ticking = false;

  function geo(m) {
    var img = m.querySelector("img");
    var r = m.getBoundingClientRect();
    var nw = img.naturalWidth || +img.getAttribute("width");
    var nh = img.naturalHeight || +img.getAttribute("height");
    var s = Math.max(r.width / nw, r.height / nh); /* object-fit: cover */
    var dw = nw * s, dh = nh * s;
    var z = Math.max(MINZ, Math.min(MAXZ, (nw * 1.15) / dw)); /* no pasar de la resolucion real */
    return { r: r, dw: dw, dh: dh, ox: (r.width - dw) / 2, oy: (r.height - dh) / 2, z: z, src: img.currentSrc || img.src };
  }

  function state(m) {
    if (!m._s) {
      var lens = m.querySelector(".s-det-lens");
      var tag = m.querySelector(".s-det-tag");
      var cap = m.parentNode.querySelector("figcaption");
      if (tag && cap && !tag.textContent) tag.textContent = cap.textContent.trim();
      m._s = { lens: lens, tag: tag, img: m.querySelector("img"), x: 0, y: 0, tx: 0, ty: 0, mouse: false };
    }
    return m._s;
  }

  /* pinta la lupa en (x, y) relativo a la foto: transform directo en cada elemento */
  function render(m) {
    var s = state(m), g = m._g || (m._g = geo(m));
    var L = s.lens.offsetWidth || 132;
    var u = (s.x - g.ox) / g.dw, v = (s.y - g.oy) / g.dh;
    if (!s.lens._set) { s.lens.style.backgroundImage = 'url("' + g.src + '")'; s.lens._set = true; }
    s.lens.style.backgroundSize = (g.dw * g.z) + "px " + (g.dh * g.z) + "px";
    s.lens.style.backgroundPosition = (L / 2 - u * g.dw * g.z) + "px " + (L / 2 - v * g.dh * g.z) + "px";
    s.lens.style.transform = "translate3d(" + s.x + "px," + s.y + "px,0) scale(" + (s.sc == null ? 1 : s.sc) + ")";
    if (s.mouse && s.tag) {
      /* la etiqueta cuelga debajo de la lupa; si no cabe, se sube arriba */
      var below = s.y + L / 2 + 10;
      var ty = below + 30 > g.r.height ? s.y - L / 2 - 38 : below;
      var tw = s.tag.offsetWidth;
      var tx = Math.max(6, Math.min(g.r.width - tw - 6, s.x - tw / 2));
      s.tag.style.transform = "translate3d(" + tx + "px," + ty + "px,0)";
    }
    if (s.mouse && !reduced) {
      /* parallax interno: la foto de fondo se mueve al reves del cursor, maximo 8px */
      var px = (s.x / g.r.width - 0.5) * -16, py = (s.y / g.r.height - 0.5) * -16;
      s.img.style.transform = "translate3d(" + px.toFixed(2) + "px," + py.toFixed(2) + "px,0) scale(1.06)";
    }
  }

  /* interpolacion con el ticker de GSAP (o rAF): la lupa llega al cursor con inercia corta */
  function tick() {
    if (!active) { stopTick(); return; }
    var s = state(active);
    var k = s.mouse && !reduced ? 0.22 : 1;
    s.x += (s.tx - s.x) * k; s.y += (s.ty - s.y) * k;
    if (Math.abs(s.tx - s.x) < 0.1 && Math.abs(s.ty - s.y) < 0.1) { s.x = s.tx; s.y = s.ty; }
    render(active);
  }
  function startTick() {
    if (ticking) return; ticking = true;
    if (window.gsap) window.gsap.ticker.add(tick);
    else (function loop() { if (!ticking) return; tick(); requestAnimationFrame(loop); })();
  }
  function stopTick() { if (window.gsap) window.gsap.ticker.remove(tick); ticking = false; }

  function aim(m, cx, cy) {
    var s = state(m), g = m._g = geo(m); /* medida fresca: la rueda del mouse mueve la pagina */
    s.tx = Math.max(0, Math.min(g.r.width, cx - g.r.left));
    s.ty = Math.max(0, Math.min(g.r.height, cy - g.r.top));
  }

  function fade(el, show, dur) {
    if (!el) return;
    var g = window.gsap;
    if (g) g.to(el, { autoAlpha: show ? 1 : 0, duration: dur, ease: "power2.out", overwrite: "auto" });
    else { el.style.visibility = show ? "visible" : "hidden"; el.style.opacity = show ? 1 : 0; }
  }

  function open(m, cx, cy, mouse) {
    if (active && active !== m) close(active);
    var s = state(m);
    m._g = null; s.mouse = !!mouse;
    aim(m, cx, cy); s.x = s.tx; s.y = s.ty;
    s.img.style.transition = "filter 0.3s cubic-bezier(0.23, 1, 0.32, 1)"; /* el seguimiento ya interpola */
    m.classList.add("is-zoom"); active = m;
    /* entrada 180ms ease-out desde 0.9 (nunca desde 0) */
    var g = window.gsap;
    if (g && !reduced) { s.sc = 0.9; g.to(s, { sc: 1, duration: 0.18, ease: "power3.out", overwrite: "auto", onUpdate: function () { render(m); } }); }
    else s.sc = 1;
    render(m);
    fade(s.lens, true, 0.18);
    if (s.mouse) fade(s.tag, true, 0.2);
    startTick();
  }

  function close(m) {
    var s = state(m);
    m.classList.remove("is-zoom");
    /* salida mas rapida que la entrada (Emil: asimetria) */
    fade(s.lens, false, 0.12);
    fade(s.tag, false, 0.1);
    /* la foto regresa a su lugar con transicion CSS (interrumpible si el mouse vuelve a entrar) */
    s.img.style.transition = "transform 350ms cubic-bezier(0.23, 1, 0.32, 1), filter 0.3s cubic-bezier(0.23, 1, 0.32, 1)";
    s.img.style.transform = "";
    if (active === m) active = null;
  }

  Array.prototype.forEach.call(medias, function (m) {
    var downAt = null;
    m.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") open(m, e.clientX, e.clientY, true); });
    m.addEventListener("pointerleave", function (e) { if (e.pointerType === "mouse") close(m); });
    m.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "mouse") return;
      downAt = { x: e.clientX, y: e.clientY, t: Date.now(), was: m.classList.contains("is-zoom") };
      if (downAt.was) { aim(m, e.clientX, e.clientY); try { m.setPointerCapture(e.pointerId); } catch (_) {} }
    });
    m.addEventListener("pointermove", function (e) {
      if (!m.classList.contains("is-zoom")) return;
      if (e.pointerType === "mouse" || downAt) aim(m, e.clientX, e.clientY);
    });
    m.addEventListener("pointerup", function (e) {
      if (e.pointerType === "mouse" || !downAt) return;
      var moved = Math.abs(e.clientX - downAt.x) + Math.abs(e.clientY - downAt.y);
      if (!downAt.was && moved < 10) open(m, e.clientX, e.clientY, false);          /* toque: abre la lupa ahi */
      else if (downAt.was && moved < 6 && Date.now() - downAt.t < 250) close(m);    /* toque rapido: la cierra */
      downAt = null;
    });
    m.addEventListener("pointercancel", function () { downAt = null; });
  });

  /* tocar fuera cierra la lupa */
  document.addEventListener("pointerdown", function (e) { if (active && !active.contains(e.target)) close(active); });
  /* bajar la pagina la cierra: IntersectionObserver en vez de escuchar scroll (Taste 5.D) */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.target === active && en.intersectionRatio < 0.6) close(active); });
    }, { threshold: [0.6] });
    Array.prototype.forEach.call(medias, function (m) { io.observe(m); });
  }
  window.addEventListener("resize", function () { Array.prototype.forEach.call(medias, function (m) { m._g = null; }); });

  /* GSAP lo carga FUNDACION con defer antes de este archivo; si tarda, se espera un poco */
  var tries = 0;
  (function boot() {
    if (window.gsap && window.ScrollTrigger) { window.gsap.registerPlugin(window.ScrollTrigger); entrance(window.gsap); return; }
    if (++tries < 40) setTimeout(boot, 100); /* hasta 4 s; si no llega, las fotos ya estan visibles */
  })();
})();
