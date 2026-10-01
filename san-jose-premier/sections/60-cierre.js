/* 60-cierre: la ficha refleja lo elegido arriba; sin elegir, "Elige una planta o dos." con las dos casas como botones */
(function () {
  "use strict";
  var h = document.getElementById("sj-h-cierre");
  var box = document.getElementById("sj-choice");
  if (!h || !box || !window.SJ) return;
  var cM = document.getElementById("sj-c-modelo"), cD = document.getElementById("sj-c-medidas"), cC = document.getElementById("sj-c-credito");
  var ph = document.getElementById("sj-choice-ph"), pick = document.getElementById("sj-choice-pick");
  var last = null;
  function setLines(a, b) {
    var lines = h.querySelectorAll(".sj-ln");
    [a, b].forEach(function (txt, li) {
      var ln = lines[li]; if (!ln) return;
      ln.setAttribute("aria-label", txt); ln.textContent = "";
      txt.split(" ").forEach(function (w, i, arr) {
        var s = document.createElement("span"); s.className = "sj-w"; s.setAttribute("aria-hidden", "true"); s.style.setProperty("--i", li * 2 + i); s.textContent = w;
        ln.appendChild(s); if (i < arr.length - 1) ln.appendChild(document.createTextNode(" "));
      });
    });
  }
  function paint() {
    var st = SJ.state, m = st.modelo && SJ.MODELOS[st.modelo] && st.modelo !== "nose" ? SJ.MODELOS[st.modelo] : null;
    box.setAttribute("data-has", m ? "1" : "0");
    cM.textContent = m ? m.etiqueta : (st.modelo === "nose" ? "Todavía no sé" : "Por elegir");
    cD.textContent = m ? m.medida : "Las ves en Modelos";
    cC.textContent = st.credito || "Lo vemos por WhatsApp";
    if (ph) ph.setAttribute("data-show", m ? st.modelo : "none");
    if (pick) pick.textContent = m ? "Cambiar modelo" : "Elegir modelo";
    var key = m ? "1" : "0";
    if (key !== last) { last = key; if (m) setLines("Tu casa", "ya tiene plano."); else setLines("Elige una planta", "o dos."); }
  }
  /* sin elegir: tocar una de las dos casas elige el modelo ahí mismo (y deja el interruptor de Modelos igual) */
  Array.prototype.forEach.call(document.querySelectorAll(".sj-pick"), function (b) {
    b.addEventListener("click", function () {
      var k = b.getAttribute("data-pick"), r = document.getElementById(k === "dos" ? "sj-pl-2" : "sj-pl-1");
      if (r && !r.checked) { r.checked = true; r.dispatchEvent(new Event("change", { bubbles: true })); }
      SJ.set("modelo", k);
    });
  });
  SJ.on(paint);
  paint();
})();
