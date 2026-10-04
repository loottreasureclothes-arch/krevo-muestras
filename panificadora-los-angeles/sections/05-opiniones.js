(function () {
  var rail = document.getElementById("tkRail"); if (!rail) return;
  var n = document.getElementById("tkN"), items = rail.querySelectorAll(".tk"), tot = items.length;
  function cur() {
    var c = rail.scrollLeft + rail.clientWidth / 2, best = 0, bd = 1e9;
    for (var i = 0; i < tot; i++) { var it = items[i], m = it.offsetLeft + it.offsetWidth / 2, d = Math.abs(m - c); if (d < bd) { bd = d; best = i; } }
    return best;
  }
  function upd() { n.textContent = (cur() + 1) + " / " + tot; }
  rail.addEventListener("scroll", upd, { passive: true });
  document.querySelectorAll(".tk-arr").forEach(function (b) {
    b.addEventListener("click", function () {
      var i = Math.max(0, Math.min(tot - 1, cur() + +b.getAttribute("data-d"))), it = items[i];
      rail.scrollTo({ left: it.offsetLeft - (rail.clientWidth - it.offsetWidth) / 2, behavior: "smooth" });
    });
  });
  upd();
})();
