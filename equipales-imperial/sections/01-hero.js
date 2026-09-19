/* 01 HERO: entrada (foto que sale del blur + título por máscara), parallax suave, video opcional y hoja por línea. */
(function () {
  "use strict";
  var hero = document.getElementById("hero");
  if (!hero) return;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- entrada con blindaje: clase s-pre, se quita en el siguiente frame o a los 1.6 s pase lo que pase ---- */
  Array.prototype.forEach.call(hero.querySelectorAll(".s-l > span"), function (s, i) { s.style.setProperty("--i", i); });
  var seq = [".s-hero-eye", ".s-hero-sub", ".s-hero-actions"], t0 = 420;
  seq.forEach(function (sel, i) { var el = hero.querySelector(sel); if (el) el.style.setProperty("--d", (t0 + i * 90) + "ms"); });
  Array.prototype.forEach.call(hero.querySelectorAll(".s-hero-chips li"), function (li, i) { li.style.setProperty("--d", (700 + i * 60) + "ms"); });
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

  /* ---- hoja por línea (piezas reales del catálogo) ---- */
  var sheetEl = hero.querySelector(".s-hero-sheet");
  if (!sheetEl || !window.EQ) return;
  var sh = EQ.sheet(sheetEl, "hero-linea");
  var NAMES = { asientos: "Asientos", cantineros: "Cantineros", salas: "Salas", comedores: "Comedores", mesas: "Mesas", barras: "Barras", complementos: "Complementos" };
  var car = sheetEl.querySelector(".s-hs-car"), tt = sheetEl.querySelector(".eq-sheet-t"), dd = sheetEl.querySelector(".s-hs-d");
  var goBtn = sheetEl.querySelector(".s-hs-go"), all = sheetEl.querySelector(".s-hs-all");
  var cur = "";
  function fill(linea) {
    var data = (window.EQ_CATALOGO || []).filter(function (x) { return x.c === linea; });
    cur = linea;
    tt.textContent = NAMES[linea] || linea;
    var mins = data.map(function (x) { return x.p[0]; }), maxs = data.map(function (x) { return x.p[x.p.length - 1]; });
    dd.textContent = data.length + " piezas de " + EQ.money(Math.min.apply(null, mins)) + " a " + EQ.money(Math.max.apply(null, maxs)) + " + IVA.";
    car.innerHTML = "";
    data.filter(function (x) { return x.img; }).slice(0, 12).forEach(function (x) {
      var d = document.createElement("div"); d.className = "s-hs-item";
      d.innerHTML = '<img src="' + x.img + '" alt="' + x.n + ' de Equipales Imperial" width="600" height="600" loading="lazy" decoding="async"><b></b><span></span>';
      d.querySelector("b").textContent = x.n;
      d.querySelector("span").textContent = EQ.priceTxt(x.p) + " + IVA";
      car.appendChild(d);
    });
    var msg = "Hola Equipales Imperial, quiero cotizar de la línea " + (NAMES[linea] || linea) + ".";
    goBtn.href = EQ.waUrl(msg);
    goBtn.querySelector("span").textContent = "Cotizar " + (NAMES[linea] || linea).toLowerCase();
    car.scrollLeft = 0;
  }
  hero.addEventListener("click", function (e) {
    var b = e.target.closest(".s-hero-chips button[data-linea]");
    if (!b) return;
    fill(b.getAttribute("data-linea"));
    sh.open();
  });
  all.addEventListener("click", function (e) {
    e.preventDefault();
    sh.close();
    setTimeout(function () { if (window.EQcatalogo) window.EQcatalogo.show(cur, true); }, 340);
  });
})();
