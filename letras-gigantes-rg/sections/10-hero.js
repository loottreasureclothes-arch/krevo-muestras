(function () {
  "use strict";
  function init() {
    var LG = window.LG;
    var inp = document.getElementById("lg-hero-nombre");
    var form = document.getElementById("lg-hero-form");
    if (!LG || !inp || !form) return;
    inp.value = LG.state.nombre;
    inp.addEventListener("input", function () {
      var c = LG.clean(inp.value);
      if (c !== inp.value) inp.value = c;
      LG.setNombre(c, "hero");
    });
    LG.on("nombre", function (d) { if (d.from !== "hero" && inp.value !== d.value) inp.value = d.value; });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var t = document.getElementById("nombre");
      if (t) LG.go(t);
      if (history.replaceState) history.replaceState(null, "", "#nombre");
    });
  }
  if (window.LG) init(); else document.addEventListener("DOMContentLoaded", init);
})();
