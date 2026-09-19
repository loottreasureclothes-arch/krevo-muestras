/* 11 · FAQ: acordeon (uno abierto a la vez) + entrada al verse */
(function () {
  var s = document.getElementById("faq");
  if (!s) return;
  var items = Array.prototype.slice.call(s.querySelectorAll(".s-faq-item"));

  function set(item, open) {
    var b = item.querySelector(".s-faq-q");
    item.classList.toggle("is-open", open);
    b.setAttribute("aria-expanded", open ? "true" : "false");
  }
  items.forEach(function (item) {
    item.querySelector(".s-faq-q").addEventListener("click", function () {
      var open = !item.classList.contains("is-open");
      items.forEach(function (o) { if (o !== item && o.classList.contains("is-open")) set(o, false); });
      set(item, open);
    });
  });
  // teclado: flechas, Inicio y Fin entre preguntas
  s.addEventListener("keydown", function (e) {
    var btns = items.map(function (i) { return i.querySelector(".s-faq-q"); });
    var k = btns.indexOf(document.activeElement);
    if (k < 0) return;
    var n = null;
    if (e.key === "ArrowDown") n = (k + 1) % btns.length;
    else if (e.key === "ArrowUp") n = (k - 1 + btns.length) % btns.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = btns.length - 1;
    if (n !== null) { e.preventDefault(); btns[n].focus(); }
  });

  var anim = [s.querySelector(".s-faq-head")].concat(items, [s.querySelector(".s-faq-more")]);
  anim.forEach(function (el, i) { if (el) el.style.setProperty("--i", i); });
  if (!("IntersectionObserver" in window)) return;
  s.classList.add("s-faq-js");
  var io = new IntersectionObserver(function (es) {
    if (es[0].isIntersecting) { s.classList.add("is-in"); io.disconnect(); }
  }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });
  io.observe(s);
})();
