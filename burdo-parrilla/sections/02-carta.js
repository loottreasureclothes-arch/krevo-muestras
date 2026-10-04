(function () {
  "use strict";
  function init() {
    var bs = document.querySelectorAll(".bd-add");
    [].forEach.call(bs, function (b) { b.addEventListener("click", function () { window.Burdo.toggle(b.getAttribute("data-key")); }); });
    function paint() { [].forEach.call(bs, function (b) { var on = window.Burdo.has(b.getAttribute("data-key")); b.setAttribute("aria-pressed", on); b.textContent = on ? "En tu mesa" : "Agregar a mi mesa"; }); }
    window.Burdo.on(paint);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
