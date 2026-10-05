(function () {
  var g = document.querySelector("[data-gigante]");
  if (!g || !("IntersectionObserver" in window)) { if (g) g.classList.add("in"); return; }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { e.target.classList.toggle("in", e.isIntersecting); });
  }, { threshold: 0.35 });
  io.observe(g);
  setTimeout(function () {
    var r = g.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) g.classList.add("in");
  }, 1600);
})();
