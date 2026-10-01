/* 60-cierre: la ficha refleja lo elegido arriba y el título cambia a "Tu casa ya tiene plano." */
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
    cM.textContent = m ? m.etiqueta : (st.modelo === "nose" ? "Todavía no sé" : "Falta elegir");
    cD.textContent = m ? m.medida : "Las ves en Modelos";
    cC.textContent = st.credito || "Falta elegir";
    if (ph) ph.setAttribute("data-show", m ? st.modelo : "none");
    if (pick) pick.textContent = m ? "Cambiar modelo" : "Elegir modelo";
    var key = m ? "1" : "0";
    if (key !== last) { last = key; if (m) setLines("Tu casa", "ya tiene plano."); else setLines("Falta elegir", "modelo."); }
  }
  SJ.on(paint);
  paint();
})();
