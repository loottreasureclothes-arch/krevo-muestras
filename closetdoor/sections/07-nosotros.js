/* 07 NOSOTROS
   - El 40: dos rodillos de numeros (decenas 0 a 4, unidades dan la vuelta completa 0..9..0),
     la regla de carpintero se mide al mismo ritmo y al final se "cepilla" la veta real encima.
   - La foto: el marco de nogal se arma tabla por tabla y luego se abre la foto.
   - Los bloques de texto entran con IntersectionObserver (CSS).
   Skills: GSAP timeline con position parameter y defaults, ScrollTrigger once, matchMedia para
   reduced motion; Emil ease-out fuerte (power4.out ~ cubic-bezier(0.23,1,0.32,1)) para entradas e
   in-out para las tablas que se deslizan; Impeccable: sin JS todo queda visible y quieto. */
(function () {
  var sec = document.getElementById("nosotros");
  if (!sec) return;
  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- bloques de texto ---------- */
  var blocks = sec.querySelectorAll(".s-nos-h, .s-nos-40, .s-nos-copy");
  if (still || !("IntersectionObserver" in window)) {
    Array.prototype.forEach.call(blocks, function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { threshold: 0.2, rootMargin: "0px 0px -8% 0px" });
    Array.prototype.forEach.call(blocks, function (el) { io.observe(el); });
  }

  /* ---------- red de seguridad (FEEDBACK-2 #6) ----------
     Si un observador o un tween se atora (rAF pausado en el navegador de WhatsApp/Instagram),
     a los 1.6 s de asomarse cada bloque queda en su estado final. */
  var CLR = ["opacity", "visibility", "transform", "translate", "rotate", "scale", "clip-path"];
  function clr(els) {
    Array.prototype.forEach.call(els, function (el) { if (el) CLR.forEach(function (p) { el.style.removeProperty(p); }); });
  }
  var safety = [];
  var sio = ("IntersectionObserver" in window) ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      safety.forEach(function (x) { if (x.el === e.target && !x.armed) { x.armed = true; setTimeout(x.fn, 1600); } });
    });
  }, { rootMargin: "0px 0px -25% 0px" }) : null;
  function onSeen(el, fn) {
    if (!el) return;
    if (!sio) { fn(); return; }
    safety.push({ el: el, fn: fn });
    sio.unobserve(el); sio.observe(el); /* re-observar entrega el estado actual */
  }
  if (!still) Array.prototype.forEach.call(blocks, function (el) { onSeen(el, function () { el.classList.add("is-in"); }); });

  /* ---------- rodillos del 40 ---------- */
  var odo = sec.querySelector(".s-nos-odo");
  var reels = [];
  function buildReels() {
    var digs = odo.querySelectorAll(".s-nos-dig");
    Array.prototype.forEach.call(digs, function (d, i) {
      var target = parseInt(d.textContent, 10) || 0;
      /* decenas: 0..4 ; unidades: vuelta completa 0..9 y cae en 0 (mas recorrido = mas drama) */
      var seq = [];
      if (i === 0) { for (var n = 0; n <= target; n++) seq.push(n); }
      else { for (var m = 0; m <= 9; m++) seq.push(m); seq.push(target); }
      d.innerHTML = '<span class="s-nos-reel">' + seq.map(function (v) { return "<span>" + v + "</span>"; }).join("") + "</span>";
      reels.push({ el: d.firstChild, steps: seq.length - 1 });
    });
  }

  function run(gsap) {
    var mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", function () {
      buildReels();
      var grain = sec.querySelector(".s-nos-grain");
      var rule = sec.querySelector(".s-nos-rule");
      var num = sec.querySelector(".s-nos-num");

      gsap.set(reels.map(function (r) { return r.el; }), { yPercent: 0 });
      gsap.set(grain, { clipPath: "inset(0% 100% 0% 0%)" });
      gsap.set(rule, { scaleX: 0, transformOrigin: "0 50%" });
      gsap.set(num, { autoAlpha: 0, y: 24 });

      var tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        scrollTrigger: { trigger: sec.querySelector(".s-nos-40"), start: "top 80%", once: true }
      });
      tl.to(num, { autoAlpha: 1, y: 0, duration: 0.5, clearProps: "transform" }, 0)
        /* cada rodillo sube tantas "filas" como pasos tiene; yPercent del rodillo completo */
        .to(reels[0].el, { yPercent: -100 * reels[0].steps / (reels[0].steps + 1), duration: 0.9 }, 0.05)
        .to(reels[1].el, { yPercent: -100 * reels[1].steps / (reels[1].steps + 1), duration: 1.05 }, 0.05)
        .to(rule, { scaleX: 1, duration: 1.05, ease: "power4.out" }, 0.05)
        /* la veta se cepilla de izquierda a derecha al asentarse los numeros */
        .to(grain, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.55, ease: "power2.inOut" }, 0.6);
      onSeen(sec.querySelector(".s-nos-40"), function () {
        if (tl.progress() >= 1) return;
        tl.progress(1); tl.kill();
        clr([num, rule, grain]);
      });
      return function () { reels.length = 0; };
    });

    /* ---------- marco que se arma ---------- */
    mm.add("(prefers-reduced-motion: no-preference)", function () {
      var fig = sec.querySelector(".s-nos-fig");
      var t = fig.querySelector(".s-nos-bar--t"), r = fig.querySelector(".s-nos-bar--r"),
          b = fig.querySelector(".s-nos-bar--b"), l = fig.querySelector(".s-nos-bar--l");
      /* el zoom va en el contenedor de las 3 fotos: el rotador (00-rotador.js) cambia las <img> de adentro */
      var img = fig.querySelector(".s-nos-rot") || fig.querySelector("img"), tag = fig.querySelector(".s-nos-tag");
      gsap.set([t, b], { scaleX: 0 });
      gsap.set([r, l], { scaleY: 0 });
      /* la foto NO se recorta (lazy + clip-path al 100% = Safari/WhatsApp no la descargan):
         una cortina crema encima se recoge hacia arriba y la destapa de abajo hacia arriba */
      var veil = document.createElement("span");
      veil.className = "s-nos-veil"; veil.setAttribute("aria-hidden", "true");
      img.parentNode.insertBefore(veil, img.nextSibling);
      gsap.set(img, { scale: 1.08 });
      gsap.set(tag, { autoAlpha: 0, y: 8 });

      var tl = gsap.timeline({
        defaults: { ease: "power3.inOut", duration: 0.34 },
        scrollTrigger: { trigger: fig, start: "top 82%", once: true }
      });
      tl.addLabel("marco", 0)
        .to(t, { scaleX: 1 }, "marco")
        .to(r, { scaleY: 1 }, "marco+=0.16")
        .to(b, { scaleX: 1 }, "marco+=0.32")
        .to(l, { scaleY: 1 }, "marco+=0.48")
        .addLabel("foto", 0.3)
        .to(veil, { scaleY: 0, duration: 0.75, ease: "power4.inOut", onComplete: function () { veil.remove(); } }, "foto")
        .to(img, { scale: 1, duration: 0.9, ease: "power4.out", clearProps: "transform" }, "foto")
        .to(tag, { autoAlpha: 1, y: 0, duration: 0.3, ease: "power3.out", clearProps: "transform" }, "foto+=0.55");
      onSeen(fig, function () {
        if (tl.progress() >= 1) return;
        tl.progress(1); tl.kill();
        veil.remove();
        clr([t, r, b, l, img, tag]);
      });
      return function () { veil.remove(); };
    });
  }

  if (still) return; /* reduced motion: el 40, la regla y el marco ya estan completos en el HTML/CSS */
  var tries = 0;
  (function boot() {
    if (window.gsap && window.ScrollTrigger) { window.gsap.registerPlugin(window.ScrollTrigger); run(window.gsap); return; }
    if (++tries < 40) setTimeout(boot, 100);
  })();
})();
