(function () {
  var t = document.getElementById("tks"), dots = document.getElementById("tk-dots");
  if (!t) return;
  var cards = [].slice.call(t.children);
  cards.forEach(function () { dots.appendChild(document.createElement("i")); });
  var ds = [].slice.call(dots.children);
  function cur() {
    var x = t.scrollLeft, best = 0, bd = 1e9;
    cards.forEach(function (c, i) { var d = Math.abs(c.offsetLeft - t.offsetLeft - x - parseInt(getComputedStyle(t).paddingLeft)); if (d < bd) { bd = d; best = i; } });
    return best;
  }
  function mark() { var c = cur(); ds.forEach(function (d, i) { d.classList.toggle("on", i === c); }); }
  t.addEventListener("scroll", function () { requestAnimationFrame(mark); }, { passive: true });
  [].forEach.call(document.querySelectorAll(".tk-b"), function (b) {
    b.addEventListener("click", function () {
      var i = Math.max(0, Math.min(cards.length - 1, cur() + +b.dataset.d));
      t.scrollTo({ left: cards[i].offsetLeft - cards[0].offsetLeft, behavior: "smooth" });
    });
  });
  mark();
})();
