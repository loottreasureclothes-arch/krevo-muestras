(function () {
  var d = document, root = d.documentElement;
  // hamburguesa
  var b = d.getElementById("v-burger"), nav = d.getElementById("v-nav");
  function cerrar() { root.classList.remove("v-menu"); b.setAttribute("aria-expanded", "false"); b.setAttribute("aria-label", "Abrir menú"); }
  b.addEventListener("click", function () {
    var on = root.classList.toggle("v-menu");
    b.setAttribute("aria-expanded", on ? "true" : "false");
    b.setAttribute("aria-label", on ? "Cerrar menú" : "Abrir menú");
  });
  nav.addEventListener("click", function (e) { if (e.target.tagName === "A") cerrar(); });
  d.addEventListener("keydown", function (e) { if (e.key === "Escape") cerrar(); });
  // anclas con compensacion del header
  d.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute("href").slice(1), el = id && d.getElementById(id);
    if (!el) return;
    e.preventDefault();
    var y = el.getBoundingClientRect().top + window.pageYOffset - 56;
    window.scrollTo(0, Math.max(0, y));
    if (history.replaceState) history.replaceState(null, "", "#" + id);
  });
  // reveal: visible a los 1.6 s pase lo que pase; reversible
  var calm = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!calm && "IntersectionObserver" in window) {
    root.classList.add("v-js");
    var els = d.querySelectorAll("[data-reveal]");
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (x) { x.target.classList.toggle("in", x.isIntersecting); });
    }, { threshold: 0.18 });
    els.forEach(function (e) { io.observe(e); });
    setTimeout(function () { els.forEach(function (e) { e.classList.add("in"); }); io.disconnect(); }, 1600);
  }
  // flotante: se oculta cuando ya hay botones de Llamar a la vista del pie
  var f = d.getElementById("v-float"), ft = d.querySelector("[data-hide-call]");
  if (f && ft && "IntersectionObserver" in window) {
    new IntersectionObserver(function (es) { f.classList.toggle("off", es[0].isIntersecting); }, { threshold: 0.3 }).observe(ft);
  }
})();
