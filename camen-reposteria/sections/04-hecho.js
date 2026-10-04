/* Momento firma: las puertas de la vitrina se abren al entrar y se cierran al salir (reversible). */
(function () {
  var s = document.getElementById("hecho");
  if (!s || !("IntersectionObserver" in window) || !window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
  var f = s.querySelector(".hecho-foto");
  if (f.getBoundingClientRect().top > window.innerHeight) s.classList.add("pre");
  new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) s.classList.remove("pre");
      else if (e.boundingClientRect.top > 0) s.classList.add("pre");
    });
  }, { threshold: 0.3 }).observe(f);
})();
