/* Carta por pestañas (sin JS se ven todas) + rayos que giran con el scroll (transform, reversible). */
(function () {
  "use strict";
  var sec = document.getElementById("menu-completo");
  if (!sec) return;
  var tabs = sec.querySelectorAll(".tab"), panels = sec.querySelectorAll(".panel");
  function show(slug) {
    Array.prototype.forEach.call(tabs, function (t) { t.setAttribute("aria-selected", t.getAttribute("data-tab") === slug ? "true" : "false"); });
    Array.prototype.forEach.call(panels, function (p) { p.classList.toggle("is-on", p.id === "p-" + slug); });
  }
  sec.classList.add("tabs-on");
  show("tacos");
  Array.prototype.forEach.call(tabs, function (t) { t.addEventListener("click", function () { show(t.getAttribute("data-tab")); }); });
  var rays = document.getElementById("rays");
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!rays || reduce) return;
  var raf = null;
  function upd() {
    raf = null;
    var r = sec.getBoundingClientRect(), vh = window.innerHeight;
    var p = (vh - r.top) / (vh + r.height); /* 0 al entrar, 1 al salir */
    rays.style.setProperty("--rot", ((p - 0.5) * 40).toFixed(2) + "deg");
  }
  function sch() { if (!raf) raf = requestAnimationFrame(upd); }
  window.addEventListener("scroll", sch, { passive: true });
  window.addEventListener("resize", sch);
  upd();
})();
