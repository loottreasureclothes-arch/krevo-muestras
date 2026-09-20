/* 01 HERO: entrada (foto que sale del blur + título por máscara), parallax suave y video opcional.
   El índice de líneas (.s-hero-idx) son links planos con data-linea; el click global de 02-catalogo.js
   los agarra y abre esa línea del catálogo, así que aquí no hace falta más JS para ellos. */
(function () {
  "use strict";
  var hero = document.getElementById("hero");
  if (!hero) return;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- entrada con blindaje: clase s-pre, se quita en el siguiente frame o a los 1.6 s pase lo que pase ---- */
  Array.prototype.forEach.call(hero.querySelectorAll(".s-l > span"), function (s, i) { s.style.setProperty("--i", i); });
  var seq = [".s-hero-eye", ".s-hero-sub", ".s-hero-actions", ".s-hero-slider-head"], t0 = 420;
  seq.forEach(function (sel, i) { var el = hero.querySelector(sel); if (el) el.style.setProperty("--d", (t0 + i * 90) + "ms"); });
  Array.prototype.forEach.call(hero.querySelectorAll(".s-hero-track > li"), function (li, i) { li.style.setProperty("--d", (760 + i * 45) + "ms"); });
  var note = hero.querySelector(".s-hero-note"); if (note) note.style.setProperty("--d", "1300ms");
  if (!reduce) {
    hero.classList.add("s-pre");
    var img = hero.querySelector(".s-hero-img");
    var go = function () { requestAnimationFrame(function () { requestAnimationFrame(function () { hero.classList.remove("s-pre"); }); }); };
    if (img && img.decode) img.decode().then(go, go); else go();
    setTimeout(function () { hero.classList.remove("s-pre"); }, 1600);
  }

  /* ---- video de cine: NO durante la primera carga ----
     El <video> del HTML va sin poster y con preload="none" (si no, el navegador se bajaba el póster de
     compu, 270 KB, también en celular). Aquí se le pone el póster que toca, se le da src y se arranca
     hasta DESPUÉS del load, en un hueco libre del hilo (requestIdleCallback). Sin saveData/2g.
     Si play() falla o no hay src, queda la foto real del hero. */
  (function () {
    var v = hero.querySelector(".s-hero-video");
    if (!v || reduce) return;
    var wide = matchMedia("(min-aspect-ratio: 1/1)").matches;
    var src = v.getAttribute(wide ? "data-src-d" : "data-src-m");
    var c = navigator.connection;
    if (!src || (c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || "")))) return;
    function start() {
      v.poster = v.getAttribute(wide ? "data-poster-d" : "data-poster-m") || "";
      v.preload = "auto";
      v.src = src; v.hidden = false;
      var p = v.play();
      if (p && p.catch) p.catch(function () { v.hidden = true; v.removeAttribute("src"); });
    }
    function later() {
      if (window.requestIdleCallback) requestIdleCallback(start, { timeout: 2500 });
      else setTimeout(start, 900);
    }
    if (document.readyState === "complete") later();
    else window.addEventListener("load", later, { once: true });
  })();

  /* ---- parallax corto de la foto al bajar (GSAP, espera hasta 4 s) ---- */
  var tries = 0;
  (function wait() {
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      if (!reduce) gsap.to(hero.querySelector(".s-hero-par"), { yPercent: 8, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
      return;
    }
    if (tries++ < 40) setTimeout(wait, 100);
  })();

  /* ---- slider "Lo más pedido": scroll-snap nativo (swipe) + flechas en compu + Agregar/abrir detalle ---- */
  (function () {
    var track = hero.querySelector(".s-hero-track");
    if (!track) return;
    Array.prototype.forEach.call(hero.querySelectorAll(".s-hero-arrow"), function (b) {
      b.addEventListener("click", function () {
        var card = track.querySelector("li");
        var step = card ? card.getBoundingClientRect().width + 14 : track.clientWidth * 0.8;
        track.scrollBy({ left: step * parseInt(b.getAttribute("data-dir"), 10), behavior: "smooth" });
      });
    });
    track.addEventListener("click", function (e) {
      var add = e.target.closest(".eq-pcard-add");
      if (add) {
        e.preventDefault();
        var i = +add.getAttribute("data-i");
        if (window.EQpedido) window.EQpedido.add(i);
        if (window.EQ && window.EQ.toast) {
          var n = add.closest("li").querySelector(".eq-pcard-name");
          window.EQ.toast("Agregado a tu pedido" + (n ? ": " + n.textContent : ""), function () { window.EQpedido.open(); });
        }
        return;
      }
      var card = e.target.closest("li[data-i]");
      if (card && window.EQcatalogo) {
        e.preventDefault();
        var idx = +card.getAttribute("data-i"), line = card.getAttribute("data-c");
        window.EQcatalogo.show(line, true);
        setTimeout(function () { window.EQcatalogo.open(idx); }, 260);
      }
    });
  })();
})();
