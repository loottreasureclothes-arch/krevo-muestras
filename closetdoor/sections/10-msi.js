/* 10 · MSI: dispara la entrada (12 + regla) una sola vez al verse */
(function () {
  var s = document.getElementById("msi");
  if (!s) return;
  Array.prototype.forEach.call(s.querySelectorAll(".s-msi-ticks li"), function (li, i) { li.style.setProperty("--i", i); });
  if (!("IntersectionObserver" in window)) { s.classList.add("is-in"); return; }
  s.classList.add("s-msi-js");
  var io = new IntersectionObserver(function (es) {
    if (es[0].isIntersecting) { s.classList.add("is-in"); io.disconnect(); }
  }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
  io.observe(s);
})();
