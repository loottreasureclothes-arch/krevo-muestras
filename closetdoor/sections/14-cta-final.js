/* 14 · CTA final: revela titulo y botones una sola vez al verse */
(function () {
  var s = document.getElementById("cta-final");
  if (!s) return;
  if (!("IntersectionObserver" in window)) { s.classList.add("is-in"); return; }
  s.classList.add("s-ctaf-js");
  var io = new IntersectionObserver(function (es) {
    if (es[0].isIntersecting) { s.classList.add("is-in"); io.disconnect(); }
  }, { threshold: 0.2 });
  io.observe(s);
})();
