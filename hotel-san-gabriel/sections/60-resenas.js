/* 60 Reseñas: las 5 estrellas (4.7 de 5, la quinta al 70%) se encienden una por una, una sola vez, al asomar.
   Reposo en CSS = todas encendidas; si algo se atora, la red de seguridad las suelta a los 1.6 s. */
(function () {
  "use strict";
  var s = document.getElementById("resenas");
  if (!s) return;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var box = s.querySelector(".re-stars");
  var stars = box ? Array.prototype.slice.call(box.children) : [];
  if (reduce || !stars.length || !stars[0].animate || !("IntersectionObserver" in window)) { if (box) box.classList.add("rs-done"); return; }

  var STEP = 120, DUR = 260, done = false;
  function play() {
    if (done) return;
    done = true;
    box.classList.add("rs-done");
    stars.forEach(function (st, i) {
      st.animate(
        [{ opacity: 0.15, transform: "scale(0.4)" }, { opacity: 1, transform: "scale(1.18)", offset: 0.7 }, { opacity: 1, transform: "scale(1)" }],
        { duration: DUR, delay: i * STEP, easing: "cubic-bezier(0.3, 1.4, 0.5, 1)", fill: "backwards" }
      );
    });
  }
  var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { io.disconnect(); play(); } }, { threshold: 0.4 });
  io.observe(box);
  var sio = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { sio.disconnect(); setTimeout(play, 1600); } });
  sio.observe(s);
})();
