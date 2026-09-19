/* 30 La cantina: la cámara entra con el scroll (marco que se abre + zoom), reversible, sin pin y sin librerías.
   Sin JS o con movimiento reducido: foto a sangre con texto y bloques visibles (CSS base). */
(function () {
  "use strict";
  var sec = document.getElementById("cantina");
  if (!sec) return;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;
  var scene = sec.querySelector(".ct-scene"), frame = sec.querySelector(".ct-frame"), cam = sec.querySelector(".ct-cam");
  var img = cam.querySelector("img");
  if (img) img.loading = "eager";
  sec.classList.add("ct-live-on");
  var on = false, raf = 0, last = "";
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function ease(t) { return 1 - Math.pow(1 - t, 3); }
  function render() {
    raf = 0;
    var r = scene.getBoundingClientRect(), vh = window.innerHeight || 800;
    var p = clamp((vh - r.top) / (vh + r.height));       /* 0 cuando asoma, 1 cuando se va */
    var open = ease(clamp((p - 0.08) / 0.34));
    var ins = (8 * (1 - open)).toFixed(2), rad = (10 * (1 - open)).toFixed(1);
    var z = (1.0 + 0.24 * clamp((p - 0.05) / 0.9)).toFixed(4);
    var key = ins + "|" + z;
    if (key !== last) {
      last = key;
      frame.style.clipPath = "inset(" + ins + "% " + ins + "% round " + rad + "px)";
      cam.style.transform = "scale(" + z + ")";
    }
    if (p >= 0.4 && !on) { on = true; sec.classList.add("ct-on"); }
    else if (p < 0.3 && on) { on = false; sec.classList.remove("ct-on"); }
  }
  function q() { if (!raf) raf = requestAnimationFrame(render); }
  window.addEventListener("scroll", q, { passive: true });
  window.addEventListener("resize", q);
  render();
  /* blindaje: si algo congela rAF, el texto se enciende igual al asomarse */
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) {
      if (es[0].isIntersecting) setTimeout(function () { if (!on) { sec.classList.add("ct-on"); } }, 1600);
    }, { rootMargin: "0px 0px -25% 0px" }).observe(scene);
  }
})();
