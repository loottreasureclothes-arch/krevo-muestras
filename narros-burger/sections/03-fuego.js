(function () {
  var st = document.getElementById("fu-stage"); if (!st) return;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;
  document.documentElement.classList.add("js-fu");
  new IntersectionObserver(function (es) { es.forEach(function (e) { st.classList.toggle("is-in", e.isIntersecting && e.intersectionRatio > 0.3); }); }, { threshold: [0, 0.3, 0.6] }).observe(st);
  setTimeout(function () { var r = st.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) st.classList.add("is-in"); }, 1600);
})();
