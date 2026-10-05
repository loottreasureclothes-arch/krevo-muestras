/* La comanda: presupuesto + Agregar de la carta -> ticket -> WhatsApp con el pedido literal. */
(function () {
  "use strict";
  var WA = "524499409499";
  var ITEMS = {
    pastor: ["Taco de pastor", 14], bisteck: ["Taco de bisteck", 14], gringo: ["Taquigringo", 18],
    lengua: ["Taco de lengua", 17], arrachera: ["Taco de arrachera", 45], harina: ["Taco de harina", 52],
    torta: ["Torta de bisteck", 55], orden: ["Orden de arrachera", 220], agua: ["Agua fresca", 21]
  };
  var SG = { pastor: "taco de pastor", bisteck: "taco de bisteck", gringo: "taquigringo", lengua: "taco de lengua", arrachera: "taco de arrachera", harina: "taco de harina", torta: "torta de bisteck", orden: "orden de arrachera", agua: "agua fresca" };
  var PL = { pastor: "tacos de pastor", bisteck: "tacos de bisteck", gringo: "taquigringos", lengua: "tacos de lengua", arrachera: "tacos de arrachera", harina: "tacos de harina", torta: "tortas de bisteck", orden: "órdenes de arrachera", agua: "aguas frescas" };
  var ORDEN = ["pastor", "bisteck", "gringo", "lengua", "arrachera", "harina", "torta", "orden", "agua"];
  var sel = {};
  var $ = function (id) { return document.getElementById(id); };
  var lista = $("ticket-l"), vacio = $("ticket-vacio"), totalEl = $("ticket-total"), med = $("medidor").parentNode, barra = $("medidor"),
      nota = $("ticket-n"), envia = $("envia"), presu = $("presu"), presuV = $("presu-v");
  if (!lista) return;
  function presupuesto() { return parseInt(presu.value, 10) || 0; }
  function total() { var t = 0; for (var k in sel) t += ITEMS[k][1] * sel[k]; return t; }
  function cuenta() { var n = 0; for (var k in sel) n += sel[k]; return n; }
  function mensaje() {
    var partes = [];
    ORDEN.forEach(function (k) { if (sel[k]) partes.push(sel[k] + " " + (sel[k] > 1 ? PL[k] : SG[k])); });
    if (!partes.length) return "Hola Los Reyes del Taco, quiero hacer un pedido para llevar en la Central. ¿Qué me recomiendan?";
    return "Hola Los Reyes del Taco, quiero para llevar en la Central: " + partes.join(", ") + ". Total aprox. $" + total() + " (precios de su carta). ¿En cuánto tiempo estaría?";
  }
  function pinta() {
    lista.innerHTML = "";
    ORDEN.forEach(function (k) {
      if (!sel[k]) return;
      var li = document.createElement("li");
      li.innerHTML = '<span class="lt"><span class="nm"></span></span><span class="st"><button type="button" data-menos="' + k + '" aria-label="Quitar uno">−</button><span>' + sel[k] + '</span><button type="button" data-mas="' + k + '" aria-label="Agregar uno">+</button></span><span class="pr">$' + (ITEMS[k][1] * sel[k]) + '</span>';
      li.querySelector(".nm").textContent = ITEMS[k][0];
      lista.appendChild(li);
    });
    var t = total(), p = presupuesto();
    vacio.hidden = cuenta() > 0;
    totalEl.textContent = "$" + t;
    var pasa = t > p;
    med.classList.toggle("pasa", pasa);
    nota.classList.toggle("pasa", pasa);
    barra.style.transform = "scaleX(" + Math.min(1, p ? t / p : 0) + ")";
    nota.textContent = t === 0 ? "Precios de nuestra carta, pueden cambiar." : (pasa ? "Te pasas $" + (t - p) + " de lo que traes." : "Te sobran $" + (p - t) + " de lo que traes.");
    envia.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(mensaje());
    envia.target = "_blank"; envia.rel = "noopener";
    var n = cuenta();
    document.querySelectorAll("[data-cuenta]").forEach(function (e) { e.textContent = n ? n : ""; });
    document.querySelectorAll(".plato .add").forEach(function (b) {
      var k = b.getAttribute("data-add"), on = !!sel[k];
      b.classList.toggle("on", on);
      b.textContent = on ? "En tu comanda ×" + sel[k] : "Agregar";
    });
  }
  function agrega(k, d) {
    sel[k] = Math.max(0, (sel[k] || 0) + d);
    if (!sel[k]) delete sel[k];
    pinta();
  }
  function llena() {
    sel = {};
    var r = presupuesto();
    if (r >= 60) { sel.agua = 1; r -= 21; }
    var ciclo = ["pastor", "bisteck", "gringo", "pastor", "bisteck", "lengua"], i = 0;
    while (r >= 14 && i < 60) {
      var k = ciclo[i % ciclo.length];
      if (ITEMS[k][1] > r) k = "pastor";
      sel[k] = (sel[k] || 0) + 1; r -= ITEMS[k][1]; i++;
    }
    pinta();
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("[data-add],[data-mas],[data-menos]") : null;
    if (!t) return;
    if (t.hasAttribute("data-add")) agrega(t.getAttribute("data-add"), 1);
    else if (t.hasAttribute("data-mas")) agrega(t.getAttribute("data-mas"), 1);
    else agrega(t.getAttribute("data-menos"), -1);
  });
  $("llenar").addEventListener("click", llena);
  presu.addEventListener("input", function () { presuV.textContent = "$" + presupuesto(); pinta(); });
  pinta();
})();
