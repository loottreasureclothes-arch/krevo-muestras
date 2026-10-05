/* Momento firma: el mural de madera se destapa cubo por cubo al llegar y se vuelve a tapar al irse. */
(function () {
  "use strict";
  var fig = document.getElementById("mural-fig"), box = document.getElementById("mural-tiles");
  if (!fig || !box || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
  var COL = ["#c9a27a", "#8a5a3b", "#e8dcc3", "#5b3a26", "#a8794f", "#f1e7d0", "#74482e"];
  for (var i = 0; i < 48; i++) {
    var t = document.createElement("i");
    t.style.background = COL[(i * 5 + (i >> 2)) % COL.length];
    t.style.setProperty("--td", (((i * 17) % 48) / 48 * 0.45).toFixed(2) + "s");
    box.appendChild(t);
  }
  window.XamaWatch([fig], 0.8, function () { box.classList.add("is-open"); }, function () { box.classList.remove("is-open"); });
  /* respaldo: a los 1.6 s la foto queda a la vista si ya se está viendo */
  setTimeout(function () {
    var r = fig.getBoundingClientRect(), vh = window.innerHeight;
    if (r.top < vh && r.bottom > 0) box.classList.add("is-open");
  }, 1600);
})();
