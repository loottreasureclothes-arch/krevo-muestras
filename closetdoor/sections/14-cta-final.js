/* 14 · CTA final: revela titulo y botones una sola vez al verse */
(function () {
  var s = document.getElementById("cta-final");
  if (!s) return;
  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (still || !("IntersectionObserver" in window)) { s.classList.add("is-in"); return; }
  s.classList.add("s-ctaf-js");
  var io = new IntersectionObserver(function (es) {
    if (es[0].isIntersecting) { s.classList.add("is-in"); io.disconnect(); }
  }, { threshold: 0.2 });
  io.observe(s);
  /* red de seguridad (FEEDBACK-2 #6): a los 1.6 s de asomarse queda visible aunque el disparo se atore */
  var fio = new IntersectionObserver(function (es) {
    if (es[0].isIntersecting) { fio.disconnect(); setTimeout(function () { s.classList.add("is-in"); }, 1600); }
  }, { rootMargin: "0px 0px -25% 0px" });
  fio.observe(s);
})();
