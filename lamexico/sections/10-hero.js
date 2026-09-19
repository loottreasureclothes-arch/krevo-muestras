/* 10 Hero: elige video por forma de pantalla, poster correcto, se salta con ahorro de datos y cae a la foto si play() falla */
(function () {
  "use strict";
  var sec = document.getElementById("hero");
  if (!sec) return;
  var v = sec.querySelector(".hr-vid");
  if (!v) return;
  var wide = window.matchMedia && matchMedia("(min-aspect-ratio: 1/1)").matches;
  var c = navigator.connection;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || (c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || "")))) { v.pause(); v.remove(); return; }
  if (wide) v.poster = v.getAttribute("data-poster-d");
  var sources = v.querySelectorAll("source");
  var want = wide ? sources[0].getAttribute("src") : sources[1].getAttribute("src");
  if (!v.currentSrc || v.currentSrc.indexOf(want) < 0) { v.src = want; v.load(); }
  function kill() { v.classList.remove("is-on"); try { v.pause(); } catch (e) {} v.remove(); }
  function on() { v.classList.add("is-on"); }
  v.addEventListener("playing", on);
  v.addEventListener("timeupdate", function t() { if (v.currentTime > 0) { on(); v.removeEventListener("timeupdate", t); } });
  if (!v.paused && v.currentTime > 0) on();
  v.addEventListener("error", kill, { once: true });
  function tryPlay() { var p = v.play(); if (p && p.catch) p.catch(function (e) { if (!e || e.name !== "AbortError") kill(); }); }
  if (v.readyState >= 2) tryPlay(); else v.addEventListener("canplay", tryPlay, { once: true });
  /* pausa fuera de vista */
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) {
      if (!v.isConnected) return;
      if (es[0].isIntersecting) { if (v.paused) tryPlay(); } else v.pause();
    }).observe(sec);
  }
  /* blindaje: si a los 1.6 s el texto no terminó de entrar, se termina */
  setTimeout(function () { sec.getAnimations && sec.getAnimations({ subtree: true }).forEach(function (a) { try { a.finish(); } catch (e) {} }); }, 1600);
})();
