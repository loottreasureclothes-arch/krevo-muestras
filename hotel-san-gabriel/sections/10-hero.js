/* 10 Hero: si data-src-m / data-src-d traen un mp4, elige por forma de pantalla y lo pone encima de la foto.
   Vacíos = se queda la foto. Se salta con ahorro de datos, 2g o reduced-motion; cae a la foto si play() falla. */
(function () {
  "use strict";
  var sec = document.getElementById("hero");
  if (!sec) return;
  /* Mini-reserva: pasa las fechas al formulario #rs-form y baja con SG.reservar. Sin JS, el botón solo baja a #reserva. */
  var bk = document.getElementById("hr-book");
  if (bk) {
    var bi = bk.elements["in"], bo = bk.elements.out;
    var pd = function (n) { return (n < 10 ? "0" : "") + n; }, iso = function (d) { return d.getFullYear() + "-" + pd(d.getMonth() + 1) + "-" + pd(d.getDate()); };
    var td = new Date(); bi.min = iso(td); bo.min = iso(new Date(td.getFullYear(), td.getMonth(), td.getDate() + 1));
    bi.addEventListener("change", function () { if (!bi.value) return; var p = bi.value.split("-"), m = new Date(+p[0], +p[1] - 1, +p[2] + 1); bo.min = iso(m); if (!bo.value || bo.value <= bi.value) bo.value = iso(m); });
    bk.addEventListener("submit", function (e) {
      var f = document.getElementById("rs-form");
      if (!f || !window.SG) return;
      e.preventDefault();
      var fi = f.elements["in"], fo = f.elements.out;
      if (bi.value) { fi.value = bi.value; fi.dispatchEvent(new Event("change")); }
      if (bo.value && bo.value > fi.value) { fo.value = bo.value; fo.dispatchEvent(new Event("change")); }
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
