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
  var seq = [".s-hero-eye", ".s-hero-sub", ".s-hero-actions"], t0 = 420;
  seq.forEach(function (sel, i) { var el = hero.querySelector(sel); if (el) el.style.setProperty("--d", (t0 + i * 90) + "ms"); });
  Array.prototype.forEach.call(hero.querySelectorAll(".s-hero-idx li"), function (li, i) { li.style.setProperty("--d", (700 + i * 45) + "ms"); });
  var note = hero.querySelector(".s-hero-note"); if (note) note.style.setProperty("--d", "1100ms");
  if (!reduce) {
    hero.classList.add("s-pre");
    var img = hero.querySelector(".s-hero-img");
    var go = function () { requestAnimationFrame(function () { requestAnimationFrame(function () { hero.classList.remove("s-pre"); }); }); };
    if (img && img.decode) img.decode().then(go, go); else go();
    setTimeout(function () { hero.classList.remove("s-pre"); }, 1600);
  }

  /* ---- video de cine (cuando exista): solo si hay src, sin saveData/2g; si play() falla, queda la foto ---- */
  (function () {
    var v = hero.querySelector(".s-hero-video");
    if (!v || reduce) return;
    var wide = matchMedia("(min-aspect-ratio: 1/1)").matches;
    var src = v.getAttribute(wide ? "data-src-d" : "data-src-m");
    var c = navigator.connection;
    if (!src || (c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || "")))) return;
    v.poster = v.getAttribute(wide ? "data-poster-d" : "data-poster-m") || v.poster;
    v.src = src; v.hidden = false;
    var p = v.play();
    if (p && p.catch) p.catch(function () { v.hidden = true; v.removeAttribute("src"); });
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
})();
