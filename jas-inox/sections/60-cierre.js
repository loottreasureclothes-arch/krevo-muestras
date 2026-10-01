/* 60-cierre: el remate del cotizador. Titulo con la pieza elegida, resumen, el mismo mensaje de WhatsApp
   y una copia viva del dibujo isometrico (se copia el <g> que 30-medida.js redibuja en cada render). */
(function () {
  "use strict";
  /* palabra corta de cada tipo para el titulo ("Tu carrito, a un mensaje.") */
  var PAL = { "Mesa de trabajo": "mesa", "Mesa con tarja": "mesa", "Carrito": "carrito", "Campana": "campana", "Estante o rack": "estante" };
  function init() {
    var sum = document.getElementById("cierre-sum");
    var wa = document.getElementById("wa-cierre");
    var h = document.getElementById("h-cierre");
    var dims = document.getElementById("cierre-dims");
    if (!sum || !wa || !window.JasCotiza) return;
    var cur = "";
    /* el titulo dice la verdad y nunca regaña: la mesa de arranque cuenta como pieza */
    function title(lines) {
      var key = lines.join("|");
      if (!h || key === cur) return;
      cur = key;
      var n = 0;
      Array.prototype.forEach.call(h.querySelectorAll(".ln"), function (ln, i) {
        ln.textContent = "";
        lines[i].split(" ").forEach(function (w, j, all) {
          var s = document.createElement("span");
          s.className = "w"; s.style.setProperty("--i", n++); s.textContent = w;
          ln.appendChild(s);
          if (j < all.length - 1) ln.appendChild(document.createTextNode(" "));
        });
      });
    }
    window.JasCotiza.on(function (g) {
      var p = PAL[g.name] || "pieza";
      title(g.armed ? ["Tu " + p, "ya tiene medidas."] : ["Tu " + p + ",", "a un mensaje."]);
      sum.textContent = g.name;
      if (dims) dims.textContent = [g.dims].concat(g.opts).join(" · ") + (g.armed ? "" : " · ajústala arriba");
      wa.setAttribute("data-wa", g.message);
      wa.href = window.JAS && window.JAS.waUrl ? window.JAS.waUrl(g.message) : wa.href;
    });
    /* FIG. 08: copia viva del dibujo del cotizador */
    var src = document.getElementById("med-g"), dst = document.getElementById("cierre-g");
    if (src && dst) {
      var copy = function () { dst.innerHTML = src.innerHTML; };
      copy();
      if (window.MutationObserver) new MutationObserver(copy).observe(src, { childList: true });
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
