/* 40 · Cine de la terraza: progreso de scroll -> marco que se abre, zoom de 2 capas (foto + enredadera), texto al final.
   Reversible. La sección ahora también carga, debajo, la galería fusionada (cn-mesa: 3 fotos desde blur), así que
   el alto real de #terraza pasa de 180svh; H se topa a 1.8*vh (lo que de verdad dura el pin en compu) para que el
   cine no se sienta lento por el contenido extra. */
(function () {
  "use strict";
  var sec = document.getElementById("terraza");
  if (!sec) return;
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var root = document.documentElement;
  root.classList.add("ts-cine-on");
  var st = sec.style, ticking = false;
  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function ease(x) { return 1 - Math.pow(1 - x, 3); }
  function frame() {
    ticking = false;
    var r = sec.getBoundingClientRect(), vh = window.innerHeight || 800;
    var cssPin = window.innerWidth >= 900;
    var H = cssPin ? vh * 1.8 : sec.offsetHeight, pinned = cssPin;
    var p = pinned ? clamp((vh - r.top) / H) : clamp((vh - r.top) / vh);
    var e = ease(p);
    st.setProperty("--cn-p", p.toFixed(3));
    st.setProperty("--cn-ci", ((1 - e) * 14).toFixed(2) + "%");
    st.setProperty("--cn-cx", ((1 - e) * 9).toFixed(2) + "%");
    st.setProperty("--cn-r", ((1 - e) * 3).toFixed(1) + "px");
    st.setProperty("--cn-s1", (1 + e * 0.16).toFixed(4));
    st.setProperty("--cn-s2", (1.02 + e * 0.3).toFixed(4));
    st.setProperty("--cn-y2", (-e * 6).toFixed(1) + "svh");
    var t = clamp((p - 0.12) / 0.28);
    st.setProperty("--cn-o", ease(t).toFixed(3));
    st.setProperty("--cn-ty", ((1 - ease(t)) * 28).toFixed(1) + "px");
  }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  window.addEventListener("scroll", req, { passive: true });
  window.addEventListener("resize", req);
  frame();
  /* blindaje: si algo falla y el texto queda escondido con la sección a la vista, se muestra */
  setInterval(function () {
    var r = sec.getBoundingClientRect();
    if (r.top < 0 && r.bottom > (window.innerHeight || 800) * 0.6 && parseFloat(st.getPropertyValue("--cn-o") || "1") < 0.05) { st.setProperty("--cn-o", "1"); st.setProperty("--cn-ty", "0px"); }
  }, 1600);

  /* Galería fusionada "Así llega a tu mesa" (antes sección aparte): sus 3 fotos entran desde blur. */
  if (window.TS) {
    Array.prototype.forEach.call(sec.querySelectorAll(".cn-shots img[data-blur]"), function (img, i) {
      TS.reveal(img, "is-blur-in", "0px 0px -10% 0px");
    });
  }
})();
