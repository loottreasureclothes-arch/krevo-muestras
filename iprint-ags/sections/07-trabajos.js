/* 07 galería: filtros y visor (IP.sheet) con "Cotizar uno así" */
(function () {
  "use strict";
  var sec = document.getElementById("trabajos");
  if (!sec) return;
  var chips = sec.querySelectorAll(".s-tj-chips button"), items = sec.querySelectorAll(".s-tj-item");
  Array.prototype.forEach.call(chips, function (c) {
    c.addEventListener("click", function () {
      var f = c.getAttribute("data-f");
      Array.prototype.forEach.call(chips, function (x) { x.setAttribute("aria-pressed", x === c ? "true" : "false"); });
      Array.prototype.forEach.call(items, function (it) { it.hidden = f !== "all" && it.getAttribute("data-g") !== f; });
    });
  });
  Array.prototype.forEach.call(sec.querySelectorAll(".s-tj-item button"), function (b) {
    b.addEventListener("click", function () {
      var k = b.getAttribute("data-k"), n = b.getAttribute("data-n");
      IP.sheet({ t: n, d: b.getAttribute("data-d") + ". Trabajo real de iPrint.",
        fotos: [{ src: "img/hd/" + k + "-2400.webp", alt: b.getAttribute("data-alt") }],
        cta: { txt: "Cotizar uno así", wa: "Hola iPrint, vi el trabajo de " + n + " en su página y quiero cotizar algo así." } });
    });
  });
})();
