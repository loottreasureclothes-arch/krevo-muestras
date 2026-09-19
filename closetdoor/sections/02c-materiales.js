/* 02c · Materiales: las muestras se reparten como un muestrario que se abre (una vez, <1 s) */
(function () {
  var sec = document.getElementById("materiales");
  if (!sec) return;

  // Si ya eligió materiales en el catálogo, se lo recordamos junto al botón
  try {
    var sel = JSON.parse(localStorage.getItem("cd_materiales") || "[]");
    if (Array.isArray(sel) && sel.length) {
      var foot = sec.querySelector(".s-mat-foot");
      var a = document.createElement("a");
      a.className = "s-mat-sel";
      a.href = "materiales.html#mi-seleccion";
      a.innerHTML = "Mi selección <b>" + sel.length + "</b>";
      foot.insertBefore(a, foot.querySelector(".s-mat-note"));
    }
  } catch (e) {}

  var chips = sec.querySelectorAll(".s-mat-item");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;

  /* Blindaje: contenido visible por defecto (el CSS no esconde nada). Solo se preparan las muestras si
     están abajo de la pantalla; un IntersectionObserver nativo dispara la animación y un setTimeout de 1.6 s,
     que no depende de GSAP ni de rAF (se congelan en los navegadores de WhatsApp/Instagram), fuerza el final. */
  function finish() {
    sec.setAttribute("data-mat", "done");
    if (window.gsap) { try { window.gsap.killTweensOf(chips); } catch (e) {} }
    Array.prototype.forEach.call(chips, function (c) {
      ["opacity", "transform", "translate", "rotate", "scale", "visibility"].forEach(function (p) { c.style.removeProperty(p); });
      if (c._gsap) c._gsap.uncache = 1;
      if (c.getAnimations) c.getAnimations().forEach(function (a) { a.cancel(); });
    });
  }
  function run() {
    sec.setAttribute("data-mat", "run");
    setTimeout(finish, 1600);
    var g = window.gsap;
    try {
      if (g) {
        g.fromTo(chips,
          { opacity: 0, y: 28, rotation: function (i) { return i % 2 ? 2.5 : -2.5; }, transformOrigin: "10% 10%" },
          { opacity: 1, y: 0, rotation: 0, duration: 0.6, ease: "power3.out", stagger: 0.05, clearProps: "transform,opacity" });
      } else {
        Array.prototype.forEach.call(chips, function (c, i) {
          c.style.removeProperty("opacity");
          c.animate([{ opacity: 0, transform: "translateY(28px)" }, { opacity: 1, transform: "none" }],
            { duration: 600, delay: i * 50, easing: "cubic-bezier(0.23, 1, 0.32, 1)", fill: "backwards" });
        });
      }
    } catch (e) { finish(); }
  }
  var grid = sec.querySelector(".s-mat-grid");
  var vh = window.innerHeight || document.documentElement.clientHeight;
  if (grid.getBoundingClientRect().top < vh * 0.95) return; /* ya visible: no se toca */
  Array.prototype.forEach.call(chips, function (c) { c.style.opacity = "0"; });
  var done = false;
  function trigger() {
    if (done) return;
    done = true;
    if (io) io.disconnect();
    window.removeEventListener("scroll", onScroll);
    run();
  }
  function onScroll() {
    var r = grid.getBoundingClientRect();
    if (r.top < (window.innerHeight || vh) * 0.9 && r.bottom > 0) trigger();
  }
  var io = new IntersectionObserver(function (es) {
    if (es.some(function (e) { return e.isIntersecting; })) trigger();
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0 });
  io.observe(grid);
  // respaldo nativo por si el observer llega tarde (vistas web de apps)
  window.addEventListener("scroll", onScroll, { passive: true });
})();
