(function () {
  "use strict";
  var fr = document.querySelector(".fp-hero-img");
  if (!fr) return;
  var img = fr.querySelector("img");
  var done = false;
  function go() { if (done) return; done = true; fr.classList.add("is-in"); }
  function start() {
    if (FP.reduce) { go(); return; }
    if (img && img.decode) img.decode().then(go, go); else go();
    setTimeout(go, 1200);
  }
  start();
})();
