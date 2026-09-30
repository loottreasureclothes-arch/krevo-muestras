/* 40-ruta: la linea Aguascalientes -> Tijuana y el contador 0 -> 1,900 km avanzan con el mismo p del scroll
   (sin pin, reversible). Sin JS o con movimiento reducido: linea completa y "1,900 km". */
(function () {
  "use strict";
  function init() {
    var sec = document.getElementById("ruta");
    var map = document.getElementById("ruta-map");
    var line = document.getElementById("ruta-line");
    var head = document.getElementById("ruta-head");
    var km = document.getElementById("ruta-km");
    if (!sec || !map || !line || !head) return;
    if (window.JAS && window.JAS.reduce) return;
    sec.classList.add("is-live");
    var total = line.getTotalLength();
    var ticking = false, last = -1;
    function fmt(n) { var s = String(n); return s.length > 3 ? s.slice(0, -3) + "," + s.slice(-3) : s; }
    function update() {
      ticking = false;
      var r = map.getBoundingClientRect(), vh = window.innerHeight || document.documentElement.clientHeight;
      var p = (vh * 0.85 - r.top) / (vh * 0.6);
      p = Math.max(0, Math.min(1, p));
      if (p === last) return;
      last = p;
      line.style.strokeDashoffset = String(1 - p);
      var pt = line.getPointAtLength(total * p);
      head.setAttribute("transform", "translate(" + pt.x.toFixed(1) + " " + pt.y.toFixed(1) + ") rotate(45)");
      if (km) km.textContent = fmt(Math.round(p * 1900 / 10) * 10) + " km";
    }
    function sched() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener("scroll", sched, { passive: true });
    window.addEventListener("resize", sched);
    update();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
