(function () {
  var bs = [].slice.call(document.querySelectorAll(".fq-b"));
  bs.forEach(function (b) {
    b.addEventListener("click", function () {
      var o = b.getAttribute("aria-expanded") === "true";
      bs.forEach(function (x) { x.setAttribute("aria-expanded", "false"); document.getElementById(x.getAttribute("aria-controls")).hidden = true; });
      if (!o) { b.setAttribute("aria-expanded", "true"); document.getElementById(b.getAttribute("aria-controls")).hidden = false; }
    });
  });
})();
