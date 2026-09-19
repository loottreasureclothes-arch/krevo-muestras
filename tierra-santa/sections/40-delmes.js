/* 40 · Del mes: sello que cae (una vez, con rescate) y "Agregar a mi pedido" al carrito del menú. */
(function () {
  "use strict";
  var sec = document.getElementById("delmes");
  if (!sec) return;
  function show() { sec.classList.add("is-in"); }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { show(); io.disconnect(); } }, { rootMargin: "0px 0px -25% 0px" });
    io.observe(sec);
    setTimeout(function () { var r = sec.getBoundingClientRect(); if (r.top < innerHeight) show(); }, 1600);
    window.addEventListener("scroll", function chk() { if (sec.getBoundingClientRect().top < innerHeight * 0.5) { setTimeout(show, 1600); window.removeEventListener("scroll", chk); } }, { passive: true });
  } else show();
  var b = sec.querySelector(".mes-add");
  if (b) b.addEventListener("click", function () {
    if (!window.tsPedido) return;
    if (b.classList.contains("is-done")) { tsPedido.open(); return; }
    tsPedido.add({ id: "chile-nogada", name: "Chile en nogada", price: 0 }, 1);
    b.classList.add("is-done");
    b.firstChild.nodeValue = "Agregado. Ver mi pedido";
  });
})();
