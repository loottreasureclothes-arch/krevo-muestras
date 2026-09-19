/* 90 Cierre: la foto se asienta al entrar (una vez); sin JS o con reduced-motion queda quieta */
(function () {
  "use strict";
  var s = document.getElementById("cierre");
  if (!s) return;
  if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) { s.classList.add("is-in"); return; }
  var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { s.classList.add("is-in"); io.disconnect(); } }, { rootMargin: "0px 0px -25% 0px" });
  io.observe(s);
  setTimeout(function () { if (s.getBoundingClientRect().top < innerHeight) s.classList.add("is-in"); }, 1600);
})();
