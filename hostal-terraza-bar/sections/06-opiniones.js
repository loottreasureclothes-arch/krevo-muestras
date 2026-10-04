(function () {
  var ul = document.getElementById("rvs"); if (!ul) return;
  var bar = document.getElementById("rv-bar");
  function step() { var c = ul.querySelector(".rv"); return c ? c.getBoundingClientRect().width + 14 : 300; }
  function upd() {
    var max = ul.scrollWidth - ul.clientWidth, vis = ul.clientWidth / ul.scrollWidth;
    bar.style.width = (vis * 100) + "%";
    bar.style.transform = "translateX(" + (max > 0 ? (ul.scrollLeft / max) * ((1 - vis) / vis) * 100 : 0) + "%)";
  }
  document.getElementById("rv-prev").addEventListener("click", function () { ul.scrollBy({ left: -step() }); });
  document.getElementById("rv-next").addEventListener("click", function () { ul.scrollBy({ left: step() }); });
  ul.addEventListener("scroll", upd, { passive: true }); window.addEventListener("resize", upd); upd();
})();
