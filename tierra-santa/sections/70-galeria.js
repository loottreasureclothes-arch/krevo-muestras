/* 70 · Lightbox: se mueve a <body>, Atrás lo cierra, swipe, flechas y "Pedir algo así" por WhatsApp. */
(function () {
  "use strict";
  var sec = document.getElementById("galeria");
  if (!sec) return;
  var btns = Array.prototype.slice.call(sec.querySelectorAll(".gal-grid button"));
  if (!btns.length) return;
  var lb = document.createElement("div");
  lb.className = "gal-lb"; lb.hidden = true;
  lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true"); lb.setAttribute("aria-label", "Foto ampliada");
  lb.innerHTML = '<button class="gal-lb-x" type="button" aria-label="Cerrar">&times;</button><figure><img alt=""></figure>' +
    '<div class="gal-lb-bar"><p class="gal-lb-cap"></p><div class="gal-lb-acts"><button type="button" data-d="-1" aria-label="Anterior">&#8249;</button>' +
    '<a class="ts-btn ts-btn--wa gal-lb-wa" href="#" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-wa"/></svg>Quiero esto</a>' +
    '<button type="button" data-d="1" aria-label="Siguiente">&#8250;</button></div></div>';
  document.body.appendChild(lb);
  var img = lb.querySelector("img"), cap = lb.querySelector(".gal-lb-cap"), wa = lb.querySelector(".gal-lb-wa"), i = 0, last = null;
  function show(k) {
    i = (k + btns.length) % btns.length;
    var b = btns[i], src = b.querySelector("img");
    img.src = src.currentSrc || src.src; img.alt = src.alt;
    cap.textContent = b.getAttribute("data-cap");
    wa.href = window.TS ? TS.waUrl("Hola, vi en su página: " + b.getAttribute("data-cap") + ". Quiero reservar para probarlo.") : "https://wa.me/524493894792";
  }
  function open(k) {
    last = document.activeElement; show(k); lb.hidden = false;
    document.documentElement.classList.add("ts-mm-lock");
    if (window.tsLayer) tsLayer.open("galeria", function () { close(true); });
    setTimeout(function () { lb.querySelector(".gal-lb-x").focus({ preventScroll: true }); }, 30);
  }
  function close(fromPop) {
    if (lb.hidden) return;
    if (fromPop !== true && window.tsLayer) tsLayer.close("galeria");
    lb.hidden = true; document.documentElement.classList.remove("ts-mm-lock");
    if (last && last.focus) last.focus({ preventScroll: true });
  }
  btns.forEach(function (b, k) { b.addEventListener("click", function () { open(k); }); });
  lb.querySelector(".gal-lb-x").addEventListener("click", close);
  lb.querySelectorAll("[data-d]").forEach(function (b) { b.addEventListener("click", function () { show(i + (+b.getAttribute("data-d"))); }); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") close(); else if (e.key === "ArrowRight") show(i + 1); else if (e.key === "ArrowLeft") show(i - 1);
  });
  var x0 = null;
  lb.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) show(i + (dx < 0 ? 1 : -1)); x0 = null; });
})();
