/* Armar visita: pinta el carrito y reescribe el href del <a> verde. Nunca window.open.
   El tamano NO es un precio ni un dato del negocio: es una pregunta que viaja en el
   mensaje ("Sala (Seccional)") para que ellos coticen. Si no se elige, no se escribe. */
(function () {
  "use strict";
  var caja = document.getElementById("s-vis-carrito");
  var send = document.getElementById("s-vis-send");
  var zona = document.getElementById("s-vis-zona");
  var atajos = document.getElementById("s-vis-atajos");
  if (!caja || !send) return;

  var TAM = {
    "Salas y sillones": { rotulo: "¿De cuántas plazas?", ops: ["2 plazas", "3 plazas", "Seccional"] },
    "Colchones": { rotulo: "¿De qué medida?", ops: ["Individual", "Matrimonial", "King size"] }
  };
  var tam = {};

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

  /* Tamano: un solo listener sobre el carrito (los botones se repintan). */
  caja.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-ec-tam]");
    if (!b) return;
    var pieza = b.getAttribute("data-pieza");
    var valor = b.getAttribute("data-ec-tam");
    tam[pieza] = (tam[pieza] === valor) ? "" : valor;
    pinta(); arma();
  });

  function filaTam(pieza) {
    var cfg = TAM[pieza];
    if (!cfg) return null;
    var wrap = document.createElement("div");
    wrap.className = "s-vis-tam";
    var rot = document.createElement("p");
    rot.className = "s-vis-tam-rot"; rot.textContent = cfg.rotulo;
    wrap.appendChild(rot);
    var fila = document.createElement("div");
    fila.className = "s-vis-tam-ops";
    fila.setAttribute("role", "group");
    fila.setAttribute("aria-label", cfg.rotulo + " " + pieza);
    cfg.ops.forEach(function (o) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "s-vis-tam-btn" + (tam[pieza] === o ? " is-on" : "");
      b.setAttribute("data-ec-tam", o);
      b.setAttribute("data-pieza", pieza);
      b.setAttribute("aria-pressed", tam[pieza] === o ? "true" : "false");
      b.textContent = o;
      fila.appendChild(b);
    });
    wrap.appendChild(fila);
    return wrap;
  }

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
      var bloque = document.createElement("div"); bloque.className = "s-vis-bloque";
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
      bloque.appendChild(fila);
      var t = filaTam(it.pieza);
      if (t) bloque.appendChild(t);
      caja.appendChild(bloque);
    });
  }

  function arma() {
    var l = ["Hola Everclean, vi su página y quiero apartar una visita."];
    if (estado.items.length) {
      l.push("");
      l.push("Lo que quiero lavar:");
      estado.items.forEach(function (it) {
        var t = tam[it.pieza] ? " (" + tam[it.pieza] + ")" : "";
        l.push("· " + it.pieza + t + " x" + it.n);
      });
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
