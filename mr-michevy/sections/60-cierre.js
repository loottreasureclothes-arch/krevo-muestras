/* El cierre repite el resumen del vaso (sessionStorage via window.MV). */
(function () {
  "use strict";
  var root = document.getElementById("ci-resumen");
  if (!root) return;
  var full = document.querySelector(".ci-h--full"), empty = document.querySelector(".ci-h--empty");
  var llenar = document.querySelector(".ci-llenar");
  function set(dd, t) { var v = t || dd.getAttribute("data-ph") || ""; if (dd.textContent !== v) dd.textContent = v; dd.classList.toggle("is-empty", !t); }
  function show(h, on) { h.hidden = !on; if (on) { h.classList.add("m-split", "is-in"); } }
  function update() {
    if (!window.MV) return;
    var d = window.MV.get();
    Array.prototype.forEach.call(root.querySelectorAll("[data-r]"), function (dd) { set(dd, d[dd.getAttribute("data-r")]); });
    show(full, d.complete); show(empty, !d.complete);
    if (llenar) llenar.hidden = d.complete;
  }
  if (window.MV) { window.MV.on(update); update(); }
})();
