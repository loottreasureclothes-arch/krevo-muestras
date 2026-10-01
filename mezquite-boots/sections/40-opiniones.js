/* EL BORDADO SE COSE: cada puntada aparece cuando le toca (rAF, sin pin).
   - El scroll lo va cosiendo; además, desde que cualquier parte se asoma, un reloj lo completa a los 1.6 s pase lo que pase.
   - El avance que se ve es continuo (nunca brinca: máx. todo el bordado en 0.6 s, en ambos sentidos).
   - Ya completo no se descose al seguir bajando; solo se reinicia si el usuario sube por encima de donde empieza.
   - El 4.9 de abajo aparece desde el 60 %. */
(function () {
  "use strict";
  var fig = document.getElementById("bd"), svg = document.getElementById("bd-svg"); if (!fig || !svg) return;
  var st = svg.querySelectorAll(".st"), n = st.length, needle = document.getElementById("bd-needle"), score = document.getElementById("bd-score");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var shown = n, disp = 0, t0 = null, last = 0, raf = null;
  function paint(count) {
    var i;
    if (count > shown) { for (i = shown; i < count; i++) st[i].classList.remove("is-off"); }
    else if (count < shown) { for (i = count; i < shown; i++) st[i].classList.add("is-off"); }
    shown = count;
    if (needle) {
      if (count > 0 && count < n) { var l = st[count - 1]; needle.setAttribute("cx", l.getAttribute("x2")); needle.setAttribute("cy", l.getAttribute("y2")); needle.style.opacity = 1; }
      else needle.style.opacity = 0;
    }
    if (score) score.style.setProperty("--sc-o", Math.max(0, Math.min(1, (count / n - .5) / .1)).toFixed(2));
  }
  if (reduce) { paint(n); return; }
  paint(0);
  function frame(now) {
    raf = null;
    var r = fig.getBoundingClientRect(), vh = window.innerHeight || document.documentElement.clientHeight;
    if (r.top >= vh) t0 = null;                                  // volvió arriba del inicio: se reinicia
    else if (t0 === null && r.bottom > 0) t0 = now;              // cualquier parte a la vista: arranca el reloj de 1.6 s
    var byScroll = Math.max(0, Math.min(1, (vh * .94 - r.top) / (r.height * .85 + vh * .04)));
    var byClock = t0 === null ? 0 : Math.min(1, (now - t0) / 1600);
    var target = Math.max(byScroll, byClock) * n;
    var dt = last ? Math.min(64, now - last) : 16; last = now;
    var step = n * dt / 600;
    disp += Math.max(-step, Math.min(step, target - disp));
    paint(Math.round(disp));
    var onScreen = r.top < vh && r.bottom > 0;
    if (Math.abs(target - disp) > .5 || (onScreen && byClock < 1)) raf = requestAnimationFrame(frame); else last = 0;
  }
  function sch() { if (!raf) raf = requestAnimationFrame(frame); }
  window.addEventListener("scroll", sch, { passive: true });
  window.addEventListener("resize", sch);
  sch();
})();
