/* 20 Estrella: los clips en loop solo se bajan y corren cuando se ven; si fallan queda el poster */
(function () {
  "use strict";
  var vids = document.querySelectorAll("#bebidas .es-vid");
  if (!vids.length) return;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var c = navigator.connection;
  if (reduce || (c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || "")))) return;
  function play(v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
  if (!("IntersectionObserver" in window)) return;
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      var v = e.target;
      if (e.isIntersecting) {
        if (!v.src) { v.src = v.getAttribute("data-src"); v.addEventListener("error", function () { v.removeAttribute("src"); v.load(); }, { once: true }); }
        play(v);
      } else if (v.src) v.pause();
    });
  }, { rootMargin: "150px 150px", threshold: 0.2 });
  Array.prototype.forEach.call(vids, function (v) { io.observe(v); });
})();
