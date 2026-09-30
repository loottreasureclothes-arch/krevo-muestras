/* 60-cierre: refleja lo que la persona armo en el cotizador (o "Falta elegir el tipo"). */
(function () {
  "use strict";
  function init() {
    var sum = document.getElementById("cierre-sum");
    var wa = document.getElementById("wa-cierre");
    var elegir = document.getElementById("cierre-elegir");
    if (!sum || !wa || !window.JasCotiza) return;
    var h = document.getElementById("h-cierre"), cur = null;
    var TXT = { off: ["Falta elegir", "el tipo."], on: ["Tu cotización", "ya tiene medidas."] };
    var GEN = "Hola JAS INOX, quiero cotizar un mueble en acero inoxidable.";
    /* el titulo dice la verdad: cambia con el estado del cotizador (palabras que caen, como los demas) */
    function title(key) {
      if (!h || key === cur) return;
      cur = key;
      var n = 0;
      Array.prototype.forEach.call(h.querySelectorAll(".ln"), function (ln, i) {
        ln.textContent = "";
        TXT[key][i].split(" ").forEach(function (w, j, all) {
          var s = document.createElement("span");
          s.className = "w"; s.style.setProperty("--i", n++); s.textContent = w;
          ln.appendChild(s);
          if (j < all.length - 1) ln.appendChild(document.createTextNode(" "));
        });
      });
    }
    window.JasCotiza.on(function (g) {
      title(g.armed ? "on" : "off");
      sum.textContent = g.armed ? g.summary : "Dinos qué necesitas y sus medidas.";
      var m = g.armed ? g.message : GEN;
      wa.setAttribute("data-wa", m);
      wa.href = window.JAS && window.JAS.waUrl ? window.JAS.waUrl(m) : wa.href;
      if (elegir) elegir.hidden = g.armed;
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
