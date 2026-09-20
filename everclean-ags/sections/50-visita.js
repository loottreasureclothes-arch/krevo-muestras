/* Armar visita: pinta el carrito y reescribe el href del <a> verde. Nunca window.open. */
(function () {
  "use strict";
  var caja = document.getElementById("s-vis-carrito");
  var send = document.getElementById("s-vis-send");
  var zona = document.getElementById("s-vis-zona");
  var atajos = document.getElementById("s-vis-atajos");
  if (!caja || !send) return;

  var estado = { dia: "Entre semana", freq: "Una sola vez", items: [] };

  /* Ojo: el id empieza con digito, no se puede pasar a querySelector. Va por getElementById. */
  var sec = document.getElementById("50-visita");

  function grupos(sel, campo) {
    var btns = Array.prototype.slice.call(sec ? sec.querySelectorAll(sel) : []);
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        btns.forEach(function (o) { o.classList.remove("is-on"); o.setAttribute("aria-pressed", "false"); });
        b.classList.add("is-on"); b.setAttribute("aria-pressed", "true");
        estado[campo] = b.getAttribute("data-" + campo);
        arma();
      });
    });
  }
  grupos("[data-dia]", "dia");
  grupos("[data-freq]", "freq");
  if (zona) zona.addEventListener("input", arma);

  function pinta() {
    caja.textContent = "";
    if (!estado.items.length) {
      var p = document.createElement("p");
      p.className = "s-vis-vacio";
      p.textContent = "Todavía no agregas nada. Toca una pieza aquí abajo o súbele a “Qué lavamos”.";
      caja.appendChild(p);
      if (atajos) atajos.hidden = false;
      return;
    }
    if (atajos) atajos.hidden = false;
    estado.items.forEach(function (it) {
      var fila = document.createElement("div"); fila.className = "s-vis-item";
      var n = document.createElement("span"); n.className = "s-vis-item-n"; n.textContent = it.n;
      var nom = document.createElement("span"); nom.className = "s-vis-item-nom";
      nom.appendChild(document.createTextNode(it.pieza));
      var pr = document.createElement("span"); pr.className = "s-vis-item-precio";
      pr.textContent = "Pregunta el precio"; nom.appendChild(pr);
      var menos = document.createElement("button");
      menos.type = "button"; menos.className = "s-vis-item-btn";
      menos.setAttribute("data-ec-add", it.pieza); menos.setAttribute("data-ec-resta", "");
      menos.setAttribute("aria-label", "Quitar un " + it.pieza); menos.textContent = "−";
      var mas = document.createElement("button");
      mas.type = "button"; mas.className = "s-vis-item-btn";
      mas.setAttribute("data-ec-add", it.pieza);
      mas.setAttribute("aria-label", "Agregar otro " + it.pieza); mas.textContent = "+";
      fila.appendChild(n); fila.appendChild(nom); fila.appendChild(menos); fila.appendChild(mas);
      caja.appendChild(fila);
    });
  }

  function arma() {
    var l = ["Hola Everclean, vi su página y quiero apartar una visita."];
    if (estado.items.length) {
      l.push("");
      l.push("Lo que quiero lavar:");
      estado.items.forEach(function (it) { l.push("· " + it.pieza + " x" + it.n); });
    }
    var z = zona && zona.value.trim();
    l.push("");
    if (z) l.push("Zona: " + z);
    l.push("Día que me queda: " + estado.dia);
    l.push("Cada cuándo: " + estado.freq);
    l.push("");
    l.push("¿Me pasan el precio?");
    send.href = window.ECWa ? window.ECWa.url(l.join("\n"))
      : "https://wa.me/524491925369?text=" + encodeURIComponent(l.join("\n"));
  }

  window.addEventListener("ec:visita", function (e) {
    estado.items = e.detail.items;
    pinta(); arma();
  });
  pinta(); arma();
})();
