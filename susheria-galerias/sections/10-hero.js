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
