/* Tres tiempos: la carta doblada de María María. Encierras un plato por tiempo y se arma lo que dices al llamar. */
(function () {
  var pliego = document.getElementById("pliego"); if (!pliego) return;
  var hojas = pliego.querySelectorAll(".hoja"), vino = document.getElementById("vino");
  var txt = document.getElementById("nTxt"), nota = txt.parentNode, copiar = document.getElementById("nCopiar");
  var VACIO = "Elige arriba un plato de la carta.";

  function ventana(hoja, b) {
    var v = hoja.querySelector(".ventana"), img = v.querySelector("img"), t = v.querySelector(".v-txt");
    if (!b) return;
    var f = b.getAttribute("data-img");
    if (f) { img.src = "img/plato-" + f + ".webp"; img.hidden = false; v.classList.remove("txt"); }
    else { img.hidden = true; t.textContent = b.getAttribute("data-v") || ""; v.classList.add("txt"); }
    v.classList.remove("cambia"); void v.offsetWidth; v.classList.add("cambia");
  }
  function elegidos() {
    var r = [];
    Array.prototype.forEach.call(hojas, function (h) { var b = h.querySelector('.pl[aria-pressed="true"]'); if (b) r.push(b.getAttribute("data-dice")); });
    return r;
  }
  function junta(a) { return a.length < 2 ? a.join("") : a.slice(0, -1).join(", ") + " y " + a[a.length - 1]; }
  function frase() {
    var e = elegidos(), v = vino.getAttribute("aria-pressed") === "true";
    if (!e.length) return v ? "Hola, ¿tienen mesa? Queremos catar el vino y que nos lo decanten." : VACIO;
    return "Hola, ¿tienen mesa? Vamos por " + junta(e) + "." + (v ? " Y el vino, ¿nos lo dan a catar y lo decantan?" : "");
  }
  var ult = txt.textContent;
  function pinta() {
    var f = frase(); if (f === ult) return; ult = f; txt.textContent = f;
    nota.classList.remove("pop"); void nota.offsetWidth; nota.classList.add("pop");
    copiar.disabled = f === VACIO;
  }
  pliego.addEventListener("click", function (e) {
    var b = e.target.closest(".pl");
    if (b) {
      var hoja = b.closest(".hoja"), ya = b.getAttribute("aria-pressed") === "true";
      Array.prototype.forEach.call(hoja.querySelectorAll(".pl"), function (x) { x.setAttribute("aria-pressed", "false"); });
      if (!ya) { b.setAttribute("aria-pressed", "true"); ventana(hoja, b); }
      pinta(); return;
    }
    if (e.target.closest("#vino")) { vino.setAttribute("aria-pressed", vino.getAttribute("aria-pressed") === "true" ? "false" : "true"); pinta(); }
  });
  copiar.addEventListener("click", function () {
    var f = frase(), s = copiar.querySelector("span"), prev = "Copiar lo que diré";
    if (f === VACIO) return;
    function listo() { s.textContent = "Copiado, ahora llama"; setTimeout(function () { s.textContent = prev; }, 1800); }
    function viejo() { var t = document.createElement("textarea"); t.value = f; t.style.position = "fixed"; t.style.opacity = "0"; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); } catch (e) {} document.body.removeChild(t); listo(); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(f).then(listo, viejo); else viejo();
  });
  /* estado inicial de las ventanas según lo marcado en el HTML */
  Array.prototype.forEach.call(hojas, function (h) { var b = h.querySelector('.pl[aria-pressed="true"]'), v = h.querySelector(".ventana"); if (b && !b.getAttribute("data-img")) v.classList.add("txt"); });
})();
