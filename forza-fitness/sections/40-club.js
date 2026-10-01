/* 40-club: el rayo del logo se llena de rojo de abajo hacia arriba con el avance del scroll (rAF, reversible, sin pin).
   Al llenarse: destello unico de 250 ms ("bateria cargada") y el titular entra palabra por palabra.
   Blindaje: si el titular lleva 0.9 s a la vista y el rayo no termino, entra igual (nunca queda invisible). */
(function () {
  "use strict";
  var sec = document.getElementById("club");
  var bolt = document.getElementById("fz-bolt");
  if (!sec || !bolt) return;
  var head = document.getElementById("h-club");
  if (head && window.FZ && window.FZ.words) window.FZ.words(head);
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function showHead() { if (head) head.classList.add("is-in"); }
  if (reduce) { sec.classList.add("is-full"); showHead(); return; }
  var raf = null, full = false, seenAt = 0;
  function update() {
    raf = null;
    var vh = window.innerHeight || document.documentElement.clientHeight;
    /* avance ligado a la posicion REAL del rayo: arranca cuando su centro cruza el 80 % de la
       pantalla (ya se ve completo) y termina al 40 %, asi el llenado entero ocurre a la vista */
    var r = bolt.getBoundingClientRect();
    var c = r.top + r.height / 2;
    var p = (vh * 0.8 - c) / (vh * 0.4);
    p = Math.max(0, Math.min(1, p));
    bolt.style.setProperty("--p", p.toFixed(3));
    var now = p >= 0.97;
    if (now && !full) {
      bolt.classList.remove("is-flash"); void bolt.offsetWidth; bolt.classList.add("is-flash");
      showHead();
    }
    full = now;
    sec.classList.toggle("is-full", now);
    if (head && !head.classList.contains("is-in")) {
      var hr = head.getBoundingClientRect();
      if (hr.top < vh * 0.92 && hr.bottom > 0) { if (!seenAt) seenAt = Date.now(); }
      else seenAt = 0;
    }
  }
  function schedule() { if (!raf) raf = requestAnimationFrame(update); }
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  bolt.addEventListener("animationend", function () { bolt.classList.remove("is-flash"); });
  setInterval(function () {
    if (head && !head.classList.contains("is-in")) { update(); if (seenAt && Date.now() - seenAt >= 900) showHead(); }
  }, 200);
  update();
})();
