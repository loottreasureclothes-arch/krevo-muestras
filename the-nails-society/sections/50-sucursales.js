/* Mapa con dos pestañas: cambia la búsqueda del iframe. */
(function () {
  "use strict";
  function start() {
    var tabs = document.querySelectorAll(".ns-tab"), map = document.getElementById("ns-map");
    if (!tabs.length || !map) return;
    [].forEach.call(tabs, function (t) {
      t.addEventListener("click", function () {
        [].forEach.call(tabs, function (x) { var on = x === t; x.classList.toggle("is-on", on); x.setAttribute("aria-selected", on ? "true" : "false"); });
        map.src = "https://www.google.com/maps?q=" + t.getAttribute("data-q") + "&z=16&output=embed";
      });
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
