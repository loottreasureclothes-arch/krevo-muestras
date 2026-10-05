(function () {
  "use strict";
  var qs = document.querySelectorAll("#preguntas .lp-q"); if (!qs.length) return;
  function set(q, open) {
    var b = q.querySelector("button"), a = q.querySelector(".lp-a");
    q.classList.toggle("is-open", open); b.setAttribute("aria-expanded", open ? "true" : "false"); a.hidden = !open;
  }
  Array.prototype.forEach.call(qs, function (q) {
    q.querySelector("button").addEventListener("click", function () {
      var open = !q.classList.contains("is-open");
      Array.prototype.forEach.call(qs, function (o) { if (o !== q) set(o, false); });
      set(q, open);
    });
  });
})();
