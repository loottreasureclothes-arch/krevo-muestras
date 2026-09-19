/* 20 Cine: progreso del scroll -> zoom de la foto (1 a 1.28) + renglón activo + barra. Todo reversible, sin librerías. */
(function () {
  "use strict";
  var sec = document.getElementById("cine");
  if (!sec) return;
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  sec.classList.add("ci-js");
  var img = sec.querySelector(".ci-ph img"), lines = sec.querySelectorAll(".ci-lines li");
  var wide = matchMedia("(min-width: 900px)");
  var cur = 0, target = 0, raf = 0, last = -1;
  function prog() {
    var r = sec.getBoundingClientRect(), vh = window.innerHeight;
    if (wide.matches) { var run = r.height - vh; return run > 0 ? Math.min(1, Math.max(0, -r.top / run)) : 0; }
    return Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height * 0.6)));
  }
  function tick() {
    raf = 0;
    cur += (target - cur) * 0.18;
    if (Math.abs(target - cur) < 0.001) cur = target;
    sec.style.setProperty("--ci-s", (1 + cur * 0.28).toFixed(4));
    sec.style.setProperty("--ci-p", cur.toFixed(4));
    var k = Math.min(lines.length - 1, Math.floor(cur * lines.length * 1.05));
    if (k !== last) { last = k; for (var i = 0; i < lines.length; i++) lines[i].classList.toggle("is-on", i <= k); }
    if (cur !== target) raf = requestAnimationFrame(tick);
  }
  function onScroll() { target = prog(); if (!raf) raf = requestAnimationFrame(tick); }
  var on = false;
  function bind(v) { if (v === on) return; on = v; if (v) { window.addEventListener("scroll", onScroll, { passive: true }); onScroll(); } else window.removeEventListener("scroll", onScroll); }
  if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { bind(es[0].isIntersecting); }, { rootMargin: "200px 0px" }).observe(sec);
  else bind(true);
  window.addEventListener("resize", onScroll, { passive: true });
  if (img) img.style.transformOrigin = "50% 38%";
})();
