/* 40 Galería: lightbox simple (va en <body>, "atrás" de Android lo cierra con window.lmLayer) */
(function () {
  "use strict";
  var sec = document.getElementById("galeria");
  if (!sec) return;
  var lb = document.createElement("div");
  lb.className = "ga-lb"; lb.hidden = true;
  lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true"); lb.setAttribute("aria-label", "Foto");
  lb.innerHTML = '<button type="button" class="ga-lb-x">Cerrar</button><img alt="">';
  document.body.appendChild(lb);
  var im = lb.querySelector("img"), x = lb.querySelector(".ga-lb-x"), last = null;
  function open(b) {
    last = b;
    var t = b.querySelector("img");
    im.src = b.getAttribute("data-full"); im.alt = t ? t.alt : "";
    lb.hidden = false;
    document.documentElement.classList.add("lm-mm-lock");
    if (window.lmLayer) window.lmLayer.open("foto", function () { close(true); });
    x.focus({ preventScroll: true });
  }
  function close(fromPop) {
    if (lb.hidden) return;
    if (fromPop !== true && window.lmLayer) window.lmLayer.close("foto");
    lb.hidden = true;
    document.documentElement.classList.remove("lm-mm-lock");
    if (last) last.focus({ preventScroll: true });
  }
  sec.querySelectorAll(".ga-b").forEach(function (b) { b.addEventListener("click", function () { open(b); }); });
  x.addEventListener("click", close);
  lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
})();
