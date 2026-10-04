(function () {
  "use strict";
  var box = document.getElementById("ter-box"); if (!box) return;
  if (CDA.reduce) return;
  var raf = null;
  function up() {
    raf = null;
    var r = box.getBoundingClientRect(), vh = innerHeight;
    var prog = (vh - r.top) / (vh + r.height);
    var t = Math.min(1, Math.max(0, (prog - 0.28) / 0.42));
    box.style.setProperty("--p", (100 - t * 100).toFixed(1) + "%");
  }
  function sch() { if (!raf) raf = requestAnimationFrame(up); }
  addEventListener("scroll", sch, { passive: true }); addEventListener("resize", sch); sch();
})();
