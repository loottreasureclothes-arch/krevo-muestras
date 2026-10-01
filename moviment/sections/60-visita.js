/* El remate repite la visita armada en las tres puertas (vive en memoria de la página). */
(function () {
  "use strict";
  var a = document.getElementById("mv-wa-remate"), box = document.getElementById("mv-remate-res");
  if (!a || !box) return;
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function paint() {
    var V = window.MVVisita; if (!V) return;
    var rows = V.filas(), h = "";
    rows.forEach(function (r) { h += '<p class="mv-rr"><span class="mv-rr-a">' + esc(r.area) + '</span> ' + esc(r.txt) + '</p>'; });
    box.innerHTML = h; box.hidden = !rows.length;
    if (window.MVwaUrl) a.href = window.MVwaUrl(V.msg());
  }
  window.addEventListener("mv:visita", paint);
  paint();
})();
