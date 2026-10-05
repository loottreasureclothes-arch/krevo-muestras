(function () {
  var tabs = document.querySelectorAll(".carta-tabs button"), cats = document.querySelectorAll(".carta-grid .cat");
  Array.prototype.forEach.call(tabs, function (b) {
    b.setAttribute("aria-pressed", b.classList.contains("is-on") ? "true" : "false");
    b.addEventListener("click", function () {
      var g = b.getAttribute("data-g");
      Array.prototype.forEach.call(tabs, function (t) { var on = t === b; t.classList.toggle("is-on", on); t.setAttribute("aria-pressed", on ? "true" : "false"); });
      Array.prototype.forEach.call(cats, function (c) { c.classList.toggle("is-on", c.getAttribute("data-g") === g); });
    });
  });
})();
