/* 05 · Servicios · GSAP + ScrollTrigger
   - Entrada: una cortina color crema se recoge hacia arriba sobre cada foto (transform, no clip-path) y el texto
     sale renglón por renglón; las tarjetas que entran juntas se escalonan 80 ms. Una sola vez, con red de seguridad.
   - Compu con mouse: la tarjeta se inclina hacia el puntero (profundidad), la foto se mueve al revés,
     y una etiqueta verde "Cotizar" acompaña al puntero (quickTo). El cursor del sistema no se oculta.
   Sin GSAP o con reduced-motion todo queda visible y quieto. */
(function () {
  "use strict";
  /* limpia estilos en línea sin depender de GSAP (si su reloj se atora, gsap.set tampoco corre) */
  function clr(els, props) {
    if (!els) return;
    if (els.nodeType) els = [els];
    Array.prototype.forEach.call(els, function (el) {
      props.forEach(function (p) { el.style.removeProperty(p); });
      if (el._gsap) { el._gsap.uncache = 1; }
    });
  }

  function run() {
    var sec = document.getElementById("servicios");
    var gsap = window.gsap, ST = window.ScrollTrigger;
    if (!sec || !gsap || !ST) return;
    gsap.registerPlugin(ST);

    var cards = gsap.utils.toArray(sec.querySelectorAll(".s-serv-card"));
    var mm = gsap.matchMedia();

    mm.add({
      ok: "(prefers-reduced-motion: no-preference)",
      mouse: "(hover: hover) and (pointer: fine) and (min-width: 900px)"
    }, function (ctx) {
      if (!ctx.conditions.ok) return;
      sec.classList.add("is-gsap");

      /* ---------- Entrada a prueba de fallas (FEEDBACK-2 #6: "se quedaron en blanco") ----------
         Causa probable: antes cada foto arrancaba con clip-path: inset(100%) desde que cargaba la página y
         solo se abría con ScrollTrigger. En Safari/WebKit la carga diferida (loading="lazy") mide la
         imagen DESPUÉS del recorte del padre: con el recorte al 100% la foto nunca "está en pantalla",
         no se descarga, y la tarjeta queda beige vacía; si además el tween se atora (rAF pausado en el
         navegador de WhatsApp/Instagram) nunca se descubre.
         Ahora: (1) nada lleva clip-path; una cortina (span encima de la foto) se encoge con transform,
         así la foto carga normal debajo; (2) el disparo lo da un IntersectionObserver nativo;
         (3) solo se preparan las tarjetas que están abajo de la pantalla al iniciar; (4) setTimeout
         de seguridad: 1.6 s después del disparo todo queda visible pase lo que pase. */
      var LINES = ".s-serv-name, .s-serv-desc, .s-serv-cta, .s-serv-idea-t, .s-serv-idea-d, .s-serv-btn";
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var pending = [];
      var queue = [], qTimer = 0;

      function finish(c) {
        if (c.__done) return; c.__done = true;
        var veil = c.querySelector(".s-serv-veil");
        var img = c.querySelector(".s-serv-media img");
        var lines = c.querySelectorAll(LINES);
        gsap.killTweensOf([veil, img, lines]);
        if (veil) veil.remove();
        clr(img, ["transform", "translate", "rotate", "scale"]);
        clr(lines, ["opacity", "visibility", "transform", "translate", "rotate", "scale"]);
      }

      function reveal(batch) {
        var tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        batch.forEach(function (c, i) {
          var at = i * 0.08;
          var veil = c.querySelector(".s-serv-veil");
          var img = c.querySelector(".s-serv-media img");
          var lines = c.querySelectorAll(LINES);
          if (veil) tl.to(veil, { scaleY: 0, duration: 0.8 }, at);
          if (img) tl.to(img, { scale: 1, yPercent: 0, duration: 1.0, clearProps: "transform" }, at);
          tl.to(lines, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.05, clearProps: "opacity,visibility,transform" }, at + 0.2);
          tl.call(finish, [c], at + 1.05);
          setTimeout(function () { finish(c); }, 1600 + i * 80);
        });
      }

      cards.forEach(function (c) {
        if (c.getBoundingClientRect().top < vh * 0.95) return; /* ya visible: no se toca */
        c.__done = false;
        var media = c.querySelector(".s-serv-media");
        var img = c.querySelector(".s-serv-media img");
        if (media) {
          var veil = document.createElement("span");
          veil.className = "s-serv-veil"; veil.setAttribute("aria-hidden", "true");
          media.appendChild(veil);
        }
        if (img) gsap.set(img, { scale: 1.12, yPercent: 4 });
        gsap.set(c.querySelectorAll(LINES), { autoAlpha: 0, y: 16 });
        pending.push(c);
      });

      var io = null;
      if (pending.length) {
        if (!("IntersectionObserver" in window)) pending.forEach(finish);
        else {
          var flush = function () {
            qTimer = 0; var b = queue.splice(0);
            if (!b.length) return;
            b.sort(function (a, b2) { return a.getBoundingClientRect().top - b2.getBoundingClientRect().top; });
            reveal(b);
          };
          io = new IntersectionObserver(function (es) {
            es.forEach(function (e) {
              if (!e.isIntersecting) return;
              io.unobserve(e.target);
              queue.push(e.target);
              /* red de seguridad independiente de rAF: si el cuadro nunca llega (WhatsApp/Instagram), igual queda visible */
              var c = e.target; setTimeout(function () { finish(c); }, 1800);
            });
            if (queue.length && !qTimer) {
              qTimer = requestAnimationFrame(flush);
              setTimeout(function () { if (queue.length) flush(); }, 100); /* rAF pausado: el lote sale igual */
            }
          }, { rootMargin: "0px 0px -10% 0px" });
          pending.forEach(function (c) { io.observe(c); });
        }
      }
      var revertEntrance = function () { if (io) io.disconnect(); pending.forEach(finish); };

      if (!ctx.conditions.mouse) return revertEntrance;

      /* ---------- Profundidad al pasar el mouse ---------- */
      var cleanups = [];
      sec.querySelectorAll(".s-serv-link").forEach(function (link) {
        var img = link.querySelector(".s-serv-media img");
        var copy = link.querySelector(".s-serv-copy");
        gsap.set(link, { transformPerspective: 1100 });
        var rx = gsap.quickTo(link, "rotationX", { duration: 0.5, ease: "power3.out" });
        var ry = gsap.quickTo(link, "rotationY", { duration: 0.5, ease: "power3.out" });
        var ix = gsap.quickTo(img, "x", { duration: 0.7, ease: "power3.out" });
        var iy = gsap.quickTo(img, "y", { duration: 0.7, ease: "power3.out" });
        var cx = gsap.quickTo(copy, "x", { duration: 0.6, ease: "power3.out" });
        function move(e) {
          var r = link.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width - 0.5;
          var py = (e.clientY - r.top) / r.height - 0.5;
          ry(px * 5); rx(-py * 4);
          ix(-px * 14); iy(-py * 10);
          cx(px * 6);
        }
        function enter() { gsap.to(img, { scale: 1.07, duration: 0.7, ease: "power3.out", overwrite: "auto" }); }
        function leave() {
          rx(0); ry(0); ix(0); iy(0); cx(0);
          gsap.to(img, { scale: 1, duration: 0.6, ease: "power3.out", overwrite: "auto" });
        }
        link.addEventListener("pointermove", move);
        link.addEventListener("pointerenter", enter);
        link.addEventListener("pointerleave", leave);
        cleanups.push(function () {
          link.removeEventListener("pointermove", move);
          link.removeEventListener("pointerenter", enter);
          link.removeEventListener("pointerleave", leave);
        });
      });

      /* ---------- Etiqueta "Cotizar" que sigue al puntero ---------- */
      var chip = document.createElement("span");
      chip.className = "s-serv-chip";
      chip.setAttribute("aria-hidden", "true");
      chip.innerHTML = '<svg aria-hidden="true"><use href="#i-wa"/></svg>Cotizar';
      sec.appendChild(chip);
      gsap.set(chip, { autoAlpha: 0, scale: 0.6, transformOrigin: "0% 0%" });
      var chx = gsap.quickTo(chip, "x", { duration: 0.35, ease: "power3.out" });
      var chy = gsap.quickTo(chip, "y", { duration: 0.35, ease: "power3.out" });
      var shown = false;
      function track(e) {
        var over = e.target.closest && e.target.closest(".s-serv-link");
        chx(e.clientX); chy(e.clientY);
        if (over && !shown) {
          shown = true;
          gsap.set(chip, { x: e.clientX, y: e.clientY });
          gsap.to(chip, { autoAlpha: 1, scale: 1, duration: 0.22, ease: "power3.out", overwrite: "auto" });
        } else if (!over && shown) {
          shown = false;
          gsap.to(chip, { autoAlpha: 0, scale: 0.6, duration: 0.16, ease: "power2.out", overwrite: "auto" });
        }
      }
      function hide() { if (shown) { shown = false; gsap.to(chip, { autoAlpha: 0, scale: 0.6, duration: 0.16, overwrite: "auto" }); } }
      var grid = sec.querySelector(".s-serv-grid");
      grid.addEventListener("pointermove", track);
      grid.addEventListener("pointerleave", hide);
      ST.addEventListener("scrollStart", hide);

      return function () {
        revertEntrance();
        cleanups.forEach(function (f) { f(); });
        grid.removeEventListener("pointermove", track);
        grid.removeEventListener("pointerleave", hide);
        ST.removeEventListener("scrollStart", hide);
        chip.remove();
        sec.classList.remove("is-gsap");
      };
    });
  }

  if (window.gsap) run();
  else window.addEventListener("load", run, { once: true });
})();
