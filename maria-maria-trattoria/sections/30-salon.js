(function () {
  var f = document.getElementById("salonFoto");
  if (!f || !("IntersectionObserver" in window) || !document.documentElement.classList.contains("rv")) { if (f) f.classList.add("abierto"); return; }
  var t;
  new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      clearTimeout(t);
      if (e.isIntersecting) { f.classList.add("abierto"); t = setTimeout(function () { f.classList.add("abierto"); }, 1600); }
      else f.classList.remove("abierto");
    });
  }, { threshold: 0.3 }).observe(f.parentNode);
})();
