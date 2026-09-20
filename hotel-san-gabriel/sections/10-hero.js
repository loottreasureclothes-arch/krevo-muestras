/* 10 Hero: si data-src-m / data-src-d traen un mp4, elige por forma de pantalla y lo pone encima de la foto.
   Vacíos = se queda la foto. Se salta con ahorro de datos, 2g o reduced-motion; cae a la foto si play() falla. */
(function () {
  "use strict";
  var sec = document.getElementById("hero");
  if (!sec) return;
  /* Mini-reserva: fechas con máscara de diagonales (00/00/0000); pasa las fechas al formulario #rs-form
     y baja con SG.reservar. Sin JS, el botón solo baja a #reserva. */
  var bk = document.getElementById("hr-book");
  if (bk && window.SG) {
    var bi = bk.elements["in"], bo = bk.elements.out;
    SG.maskDate(bi); SG.maskDate(bo);
    function hoy() { var t = new Date(); return new Date(t.getFullYear(), t.getMonth(), t.getDate()); }
    bi.addEventListener("input", function () {
      var din = SG.parseDMY(bi.value);
      if (!din || bi.value.length !== 10 || din < hoy()) return;
      var m = new Date(din); m.setDate(m.getDate() + 1);
      var dout = SG.parseDMY(bo.value);
      if (!dout || dout <= din) bo.value = SG.formatDMY(m);
    });
    bk.addEventListener("submit", function (e) {
      var f = document.getElementById("rs-form");
      if (!f) return;
      e.preventDefault();
      var fi = f.elements["in"], fo = f.elements.out;
      if (bi.value) { fi.value = bi.value; fi.dispatchEvent(new Event("input")); }
      var din = SG.parseDMY(fi.value), dout = SG.parseDMY(bo.value);
      if (dout && din && dout > din) { fo.value = bo.value; fo.dispatchEvent(new Event("input")); }
      SG.reservar("");
    });
  }
  setTimeout(function () { if (sec.getAnimations) sec.getAnimations({ subtree: true }).forEach(function (a) { try { a.finish(); } catch (e) {} }); }, 1600);
  var v = sec.querySelector(".hr-vid");
  if (!v) return;
  var wide = window.matchMedia && matchMedia("(min-aspect-ratio: 1/1)").matches;
  var src = v.getAttribute(wide ? "data-src-d" : "data-src-m") || v.getAttribute(wide ? "data-src-m" : "data-src-d");
  var c = navigator.connection;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!src || reduce || (c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || "")))) { v.remove(); return; }
  v.poster = v.getAttribute(wide ? "data-poster-d" : "data-poster-m");
  function kill() { try { v.pause(); } catch (e) {} v.remove(); }
  function on() { v.classList.add("is-on"); }
  v.addEventListener("playing", on);
  v.addEventListener("error", kill, { once: true });
  v.preload = "auto"; v.src = src;
  function tryPlay() { var p = v.play(); if (p && p.catch) p.catch(function (e) { if (!e || e.name !== "AbortError") kill(); }); }
  v.addEventListener("canplay", tryPlay, { once: true });
  v.load();
  if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { if (!v.isConnected) return; if (es[0].isIntersecting) { if (v.paused) tryPlay(); } else v.pause(); }).observe(sec);
})();
