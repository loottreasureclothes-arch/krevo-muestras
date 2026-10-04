/* Riel de comandas: cuenta 1/6 y flechas en celular */
(function () {
  var l = document.getElementById("lc-tix"), c = document.getElementById("lc-tix-c");
  if (!l || !c) return;
  var k = l.children, n = k.length, t = false;
  function idx() { var x = l.scrollLeft + l.clientWidth / 2, b = 0, d = 1e9; for (var i = 0; i < n; i++) { var m = k[i].offsetLeft + k[i].offsetWidth / 2, e = Math.abs(m - x); if (e < d) { d = e; b = i; } } return b; }
  function u() { t = false; c.textContent = (idx() + 1) + " / " + n; }
  l.addEventListener("scroll", function () { if (!t) { t = true; requestAnimationFrame(u); } }, { passive: true });
  var bs = document.querySelectorAll(".lc-tix-b");
  for (var i = 0; i < bs.length; i++) bs[i].addEventListener("click", function () {
    var j = Math.max(0, Math.min(n - 1, idx() + parseInt(this.getAttribute("data-d"), 10)));
    l.scrollTo({ left: k[j].offsetLeft - (l.clientWidth - k[j].offsetWidth) / 2, behavior: "auto" });
  });
})();
