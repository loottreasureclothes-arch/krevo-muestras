(function () {
  "use strict";
  var t = document.getElementById("lp-revs"); if (!t) return;
  Array.prototype.forEach.call(document.querySelectorAll(".lp-revs-nav button"), function (b) {
    b.addEventListener("click", function () { t.scrollBy({ left: +b.getAttribute("data-dir") * t.clientWidth * 0.8, behavior: "smooth" }); });
  });
})();
