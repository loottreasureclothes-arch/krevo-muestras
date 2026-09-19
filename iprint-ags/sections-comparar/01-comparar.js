/* comparar.html: pestañas Celular/Compu y slider con input range */
(function () {
  "use strict";
  var sec = document.getElementById("comparar");
  if (!sec) return;
  Array.prototype.forEach.call(sec.querySelectorAll(".s-cmp-ba"), function (ba) {
    var r = ba.querySelector(".s-cmp-range");
    function set() { ba.style.setProperty("--x", r.value + "%"); }
    r.addEventListener("input", set); set();
  });
  var tabs = sec.querySelectorAll(".s-cmp-tabs button");
  Array.prototype.forEach.call(tabs, function (t) {
    t.addEventListener("click", function () {
      var v = t.getAttribute("data-v");
      Array.prototype.forEach.call(tabs, function (x) { x.setAttribute("aria-selected", x === t ? "true" : "false"); });
      Array.prototype.forEach.call(sec.querySelectorAll(".s-cmp-ba"), function (b) { b.hidden = b.getAttribute("data-v") !== v; });
    });
  });
})();
