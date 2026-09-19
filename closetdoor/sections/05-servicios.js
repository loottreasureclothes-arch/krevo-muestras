/* 05 · Servicios · GSAP + ScrollTrigger
   - Entrada: cada foto sube como panel detrás de una máscara (clip-path) y el texto sale renglón por renglón;
     las tarjetas que entran juntas se escalonan (ScrollTrigger.batch), una sola vez.
   - Compu con mouse: la tarjeta se inclina hacia el puntero (profundidad), la foto se mueve al revés,
     y una etiqueta verde "Cotizar" acompaña al puntero (quickTo). El cursor del sistema no se oculta.
   Sin GSAP o con reduced-motion todo queda visible y quieto. */
(function () {
  "use strict";

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

      /* ---------- Entrada por máscara ---------- */
      cards.forEach(function (c) {
        var media = c.querySelector(".s-serv-media");
        var img = c.querySelector(".s-serv-media img");
        var lines = c.querySelectorAll(".s-serv-name, .s-serv-desc, .s-serv-cta, .s-serv-idea-t, .s-serv-idea-d, .s-serv-btn");
        if (media) gsap.set(media, { clipPath: "inset(100% 0% 0% 0%)" });
        if (img) gsap.set(img, { scale: 1.18, yPercent: 6 });
        if (c.classList.contains("s-serv-idea")) gsap.set(c, { clipPath: "inset(100% 0% 0% 0% round 14px)" });
        gsap.set(lines, { autoAlpha: 0, y: 18 });
      });

      ST.batch(cards, {
        start: "top 86%",
        once: true,
        interval: 0.08,
        onEnter: function (batch) {
          var tl = gsap.timeline({ defaults: { ease: "expo.out" } });
          batch.forEach(function (c, i) {
            var at = i * 0.08;
            var media = c.querySelector(".s-serv-media");
            var img = c.querySelector(".s-serv-media img");
            var lines = c.querySelectorAll(".s-serv-name, .s-serv-desc, .s-serv-cta, .s-serv-idea-t, .s-serv-idea-d, .s-serv-btn");
            if (media) tl.to(media, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.95, clearProps: "clipPath" }, at);
            if (img) tl.to(img, { scale: 1, yPercent: 0, duration: 1.1, clearProps: "transform" }, at);
            if (c.classList.contains("s-serv-idea")) tl.to(c, { clipPath: "inset(0% 0% 0% 0% round 14px)", duration: 0.95, clearProps: "clipPath" }, at);
            tl.to(lines, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.05, clearProps: "transform" }, at + 0.22);
          });
        }
      });

      if (!ctx.conditions.mouse) return;

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
