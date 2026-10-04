(function () {
  "use strict";
  var d = document, de = d.documentElement;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  /* reveal: visible a los 1.6 s pase lo que pase */
  var els = [].slice.call(d.querySelectorAll("[data-reveal]"));
  function show(e) { e.classList.add("in"); }
  if (!reduce && "IntersectionObserver" in window) {
    de.classList.add("rv");
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (x) { if (x.isIntersecting) { show(x.target); io.unobserve(x.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
    setTimeout(function () { els.forEach(show); }, 1600);
  }
  /* menu */
  var b = d.getElementById("hdr-btn"), m = d.getElementById("hdr-menu");
  function setMenu(o) {
    m.hidden = !o; b.setAttribute("aria-expanded", o); de.classList.toggle("menu-open", o);
    b.querySelector(".hdr-btn-l").textContent = o ? "Cerrar" : "Menú";
  }
  b.addEventListener("click", function () { setMenu(m.hidden); });
  m.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  d.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  /* flotante de WhatsApp: se esconde donde ya hay un verde */
  var f = d.getElementById("wa-float"), zones = [].slice.call(d.querySelectorAll("[data-hide-wa]")), vis = {};
  if ("IntersectionObserver" in window) {
    var io2 = new IntersectionObserver(function (es) {
      es.forEach(function (x) { vis[x.target.id] = x.isIntersecting; });
      f.classList.toggle("hide", Object.keys(vis).some(function (k) { return vis[k]; }));
    }, { threshold: 0.01 });
    zones.forEach(function (z) { io2.observe(z); });
  }
  window.MZ = { wa: function (msg) { return "https://wa.me/524499159302?text=" + encodeURIComponent(msg); } };
})();
