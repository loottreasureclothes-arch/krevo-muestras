/* 20 El horno: el scroll acerca la cámara al horno de leña (escala 1 a 1.55 en compu, 1 a 1.45 en celular).
 * Reversible: si subes, se aleja. Compu: el escenario está en sticky dentro de 180svh (pin de +80 %). Celular: sin pin,
 * el progreso es el paso de la sección por la pantalla. Sin JS o con reduced-motion: foto quieta y todo visible. */
(function () {
  "use strict";
  var sec = document.getElementById("horno");
  if (!sec) return;
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var ticking = false, on = false;
  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function ease(t) { return 1 - Math.pow(1 - t, 3); }
  function update() {
    ticking = false;
    var r = sec.getBoundingClientRect(), vh = window.innerHeight || 800;
    var desk = window.innerWidth >= 900, p;
    if (desk) p = clamp(-r.top / Math.max(1, r.height - vh));           // dentro del pin
    else p = clamp((vh - r.top) / (r.height + vh * .35));                 // paso por pantalla
    var e = ease(p), max = desk ? .55 : .45;
    sec.style.setProperty("--hn-s", (1 + e * max).toFixed(4));
    sec.style.setProperty("--hn-p", e.toFixed(4));
    sec.style.setProperty("--hn-tag", clamp((p - .25) / .3).toFixed(3));
    sec.style.setProperty("--hn-veil", (1 - e * .25).toFixed(3));
  }
  function onScroll() { if (on && !ticking) { ticking = true; requestAnimationFrame(update); } }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) { on = es[0].isIntersecting; if (on) onScroll(); }, { rootMargin: "20% 0px 20% 0px" }).observe(sec);
  } else on = true;
  sec.classList.add("hn-live");
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  on = true; update();
})();
