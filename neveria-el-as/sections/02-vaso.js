(function () {
  var SAB = [["Vainilla","#f3e6b8"],["Chocochips","#8a6a55"],["Pistache","#b5cf8b"],["Almendra","#e2c9a0"],["Galleta","#d9b27c"],["Jamaica","#a3243f"],["Cajeta","#c28030"],["Coco","#f6f1e4"],["Café","#7a5238"],["Chocolate","#5a3425"],["Guayaba","#f08a8a"],["Fresa","#e8506e"],["Melón","#f4b86a"],["Mango","#f6a623"],["Limón","#cfe05a"],["Piña","#f3d95a"],["Sandía","#ee5a6a"],["Tuna","#c2305f"],["Uva","#6c3f8f"],["Nuez","#b08a62"],["Romperope","#f0d9a0"]];
  var chips = document.getElementById("chips"); if (!chips) return;
  var sel = [0], cola = false;
  var slots = [document.getElementById("slotA"), document.getElementById("slotB")];
  var bolas = [document.getElementById("bolaA"), document.getElementById("bolaB")];
  var svg = document.getElementById("copa");
  var res = document.getElementById("resumen"), wa = document.getElementById("vasoWa"), waT = document.getElementById("vasoWaT");
  var btnCola = document.getElementById("colaBtn");
  SAB.forEach(function (s, i) {
    var b = document.createElement("button"); b.type = "button"; b.className = "chip"; b.setAttribute("aria-pressed", "false"); b.dataset.i = i;
    b.innerHTML = '<i style="--c:' + s[1] + '"></i>' + s[0];
    chips.appendChild(b);
  });
  function lista(a) { return a.length < 2 ? a.join("") : a.join(" y "); }
  function render() {
    Array.prototype.forEach.call(chips.children, function (b) { b.setAttribute("aria-pressed", sel.indexOf(+b.dataset.i) > -1 ? "true" : "false"); });
    [0, 1].forEach(function (k) {
      var on = sel[k] !== undefined; slots[k].classList.toggle("on", on);
      if (on) bolas[k].setAttribute("fill", SAB[sel[k]][1]);
    });
    svg.classList.toggle("on-cola", cola);
    btnCola.setAttribute("aria-pressed", cola ? "true" : "false");
    var names = sel.map(function (i) { return SAB[i][0].toLowerCase(); });
    var msg, txt;
    if (!names.length) {
      msg = "Hola, quiero ir a la nevería El As de la Alameda. ¿Qué sabores hay hoy?"; txt = "Pregunta qué hay hoy";
      res.textContent = cola ? "Con Coca Cola. Falta escoger sabor." : "Aún no escoges. Toca un sabor.";
      if (cola) msg = "Hola, quiero ir a la nevería El As de la Alameda. ¿Tienen nieve con Coca Cola? ¿Qué sabores hay hoy?";
    } else {
      res.textContent = lista(sel.map(function (i) { return SAB[i][0]; })) + (cola ? ", con Coca Cola" : "");
      msg = "Hola, voy para la nevería El As de la Alameda. ¿Hay hoy nieve de " + lista(names) + "?" + (cola ? " La quiero con Coca Cola." : "");
      txt = "Pregunta por " + (names.length === 2 ? "mis dos" : "este") + " sabor" + (names.length === 2 ? "es" : "");
    }
    wa.setAttribute("data-wa", msg); wa.href = window.ElAs.waUrl(msg); waT.textContent = txt;
  }
  chips.addEventListener("click", function (e) {
    var b = e.target.closest(".chip"); if (!b) return; var i = +b.dataset.i, p = sel.indexOf(i);
    if (p > -1) sel.splice(p, 1); else { if (sel.length >= 2) sel.shift(); sel.push(i); }
    render();
  });
  btnCola.addEventListener("click", function () { cola = !cola; render(); });
  render();
})();
