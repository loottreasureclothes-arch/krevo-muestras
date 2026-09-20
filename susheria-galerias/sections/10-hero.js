/* 10 Hero: si data-src-m / data-src-d traen ruta, pone el video de IA encima de la foto (elige por forma de pantalla).
   Se salta con ahorro de datos, 2g o reduced-motion y cae a la foto si play() falla. Sin rutas: se queda la foto. */
(function () {
  "use strict";
  var sec = document.getElementById("hero");
  if (!sec) return;
  var v = sec.querySelector(".hr-vid");
  if (!v) return;
  var wide = window.matchMedia && matchMedia("(min-aspect-ratio: 1/1)").matches;
  var src = v.getAttribute(wide ? "data-src-d" : "data-src-m") || v.getAttribute("data-src-m") || "";
  var c = navigator.connection;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!src || reduce || (c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || "")))) { v.remove(); return; }
  if (wide) v.poster = v.getAttribute("data-poster-d");
  v.src = src; v.preload = "auto"; v.autoplay = true;
  function kill() { v.classList.remove("is-on"); try { v.pause(); } catch (e) {} v.remove(); }
  function on() { v.classList.add("is-on"); }
  v.addEventListener("playing", on);
  v.addEventListener("error", kill, { once: true });
  function tryPlay() { var p = v.play(); if (p && p.catch) p.catch(function (e) { if (!e || e.name !== "AbortError") kill(); }); }
  if (v.readyState >= 2) tryPlay(); else v.addEventListener("canplay", tryPlay, { once: true });
  v.load();
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) {
      if (!v.isConnected) return;
      if (es[0].isIntersecting) { if (v.paused) tryPlay(); } else v.pause();
    }).observe(sec);
  }
  setTimeout(function () { sec.getAnimations && sec.getAnimations({ subtree: true }).forEach(function (a) { try { a.finish(); } catch (e) {} }); }, 1600);
})();

/* Caída del 2x1: cae desde arriba y pega, como la cinta métrica de closetdoor/10-msi (~1.1 s, una vez).
   El envoltorio .hr-drop cae con transición (easing de gravedad); al llegar, .hr-dos rebota con un
   resorte muestreado (WAAPI) en su propio transform, sin pelear con el de .hr-drop.
   Blindaje: la clase que esconde el 2x1 (hr-armed) solo la pone este script; si algo se atora, se fuerza
   el aterrizaje a los 1.6 s (misma red que el resto del sitio). */
(function () {
  "use strict";
  var sec = document.getElementById("hero");
  if (!sec) return;
  var drop = sec.querySelector(".hr-drop");
  var dos = sec.querySelector(".hr-dos");
  if (!drop || !dos) return;
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  sec.classList.add("hr-armed");
  var done = false;
  function land() {
    if (!dos.animate) return;
    var n = 22, amp = 9, decay = 4.4, turns = 1.55, kf = [];
    for (var i = 0; i <= n; i++) {
      var t = i / n, v2 = i === n ? 0 : amp * Math.exp(-decay * t) * Math.sin(turns * Math.PI * 2 * t);
      kf.push({ transform: "translateY(" + v2.toFixed(2) + "px)" });
    }
    dos.animate(kf, { duration: 560, easing: "linear" });
  }
  function play() {
    if (done) return; done = true;
    sec.classList.remove("hr-armed");
    sec.classList.add("hr-in");
    setTimeout(land, 520);
  }
  setTimeout(play, 240);
  setTimeout(play, 1600); // red de seguridad: si el primer disparo no corrió (pestaña en 2o plano, etc.), cae de todos modos
})();
