(function () {
  "use strict";
  function init() {
    var LG = window.LG;
    var root = document.getElementById("lg-mont");
    if (!root || !LG) return;
    var photo = root.querySelector(".lg-mont-photo");
    var strips = Array.prototype.slice.call(root.querySelectorAll(".lg-strip"));
    var lis = Array.prototype.slice.call(root.querySelectorAll(".lg-rail li"));
    if (LG.reduce) return; /* foto completa y riel encendido */
    var n = strips.length, t0 = null, done = false, raf = null, lastP = -1;
    function ease(t) { return 1 - Math.pow(1 - t, 4); }
    function apply(p) {
      var H = photo.clientHeight || photo.getBoundingClientRect().height;
      var all = true;
      for (var i = 0; i < n; i++) {
        var t = Math.max(0, Math.min(1, (p - i * 0.12) / 0.28));
        var e = ease(t);
        var y = -(1 - e) * H * 1.02 + 3 * Math.sin(Math.PI * t) * (t < 1 ? 1 : 0);
        strips[i].style.transform = t >= 1 ? "none" : "translate3d(0," + y.toFixed(1) + "px,0)";
        var lit = t >= 0.999;
        if (lit !== lis[i].classList.contains("is-lit")) lis[i].classList.toggle("is-lit", lit);
        if (!lit) all = false;
      }
      if (all !== done) { done = all; root.classList.toggle("is-done", all); }
    }
    function progress() {
      var r = photo.getBoundingClientRect(), vh = window.innerHeight || document.documentElement.clientHeight;
      var now = performance.now();
      var visible = r.top < vh * 0.96 && r.bottom > 0;
      if (r.top >= vh) { t0 = null; } /* la foto volvió a quedar debajo: se reinicia */
      if (visible && t0 === null) t0 = now;
      var scrollP = Math.max(0, Math.min(1, (vh - r.top) / (vh / 2 + r.height / 2)));
      var timeP = t0 === null ? 0 : Math.max(0, Math.min(1, (now - t0) / 1500));
      return Math.max(scrollP, timeP);
    }
    function tick() {
      raf = null;
      var p = progress();
      if (Math.abs(p - lastP) > 0.0005) { lastP = p; apply(p); }
      var r = photo.getBoundingClientRect(), vh = window.innerHeight;
      var visible = r.top < vh && r.bottom > 0;
      if (visible && (t0 !== null && performance.now() - t0 < 1700 || lastP < 1)) schedule();
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(tick); }
    root.setAttribute("data-ready", "");
    apply(0); lastP = 0;
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", function () { lastP = -1; schedule(); });
    schedule();
    /* red de seguridad: pase lo que pase, a los 4 s de cargar la página la foto queda completa si ya se asomó */
    setTimeout(function () { var r = photo.getBoundingClientRect(); if (r.top < window.innerHeight && r.bottom > 0 && !done) { t0 = performance.now() - 1500; schedule(); } }, 4000);
  }
  if (window.LG) init(); else document.addEventListener("DOMContentLoaded", init);
})();
