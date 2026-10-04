/* El plato de a tres: tres tacos, carne por taco, extras, platos y sucursal; termina en un wa.me armado. */
(function () {
  "use strict";
  var root = document.getElementById("plato"); if (!root) return;
  var slots = root.querySelectorAll(".slot"), carnes = {}, extras = {}, n = 1, suc = "Ferrocarril", act = 0, sel = ["asada", "adobada", "chorizo"];
  var NOM = { asada: "asada", adobada: "adobada", chorizo: "chorizo" };
  var EXN = { papa: "papa", frijoles: "frijoles", cebollitas: "cebollitas", guacamole: "guacamole", limon: "limón", salsas: "salsas de la barra" };
  var $ = function (s) { return root.querySelector(s); };
  function pintar() {
    var cuenta = { asada: 0, adobada: 0, chorizo: 0 }, lleno = 0;
    Array.prototype.forEach.call(slots, function (s, i) {
      var c = sel[i], nm = s.querySelector(".nom"); if (c) { s.setAttribute("data-c", c); cuenta[c]++; lleno++; } else s.removeAttribute("data-c"); if (nm) nm.textContent = c ? NOM[c] : "elige";
      s.classList.toggle("activo", i === act);
    });
    Array.prototype.forEach.call(root.querySelectorAll("[data-carne]"), function (b) {
      var k = b.getAttribute("data-carne"), bn = b.querySelector("b"), pres = sel[act] === k;
      b.setAttribute("aria-pressed", pres ? "true" : "false"); bn.textContent = cuenta[k] || ""; bn.setAttribute("data-n", cuenta[k]);
    });
    Array.prototype.forEach.call(root.querySelectorAll("button[data-ex]"), function (b) {
      var k = b.getAttribute("data-ex"), on = !!extras[k]; b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    Array.prototype.forEach.call(root.querySelectorAll("g.ex"), function (g) { g.classList.toggle("on", !!extras[g.getAttribute("data-ex")]); });
    $("[data-taco-n]").textContent = act + 1;
    $("[data-cant]").textContent = n + (n === 1 ? " plato" : " platos");
    var partes = []; ["asada", "adobada", "chorizo"].forEach(function (k) { if (cuenta[k]) partes.push(cuenta[k] + " de " + NOM[k]); });
    var ex = Object.keys(extras).filter(function (k) { return extras[k]; }).map(function (k) { return EXN[k]; });
    var total = n * 3, t = lleno ? partes.join(", ") : "";
    var resumen = lleno ? (n > 1 ? n + " platos de a tres. Cada uno: " : "Un plato de a tres: ") + t + (lleno < 3 ? " (faltan " + (3 - lleno) + " por escoger)" : "") + "." + (ex.length ? " Con " + ex.join(", ") + "." : "") : "Escoge la carne de tus tres tacos.";
    $("[data-resumen]").textContent = resumen;
    $("[data-tacos]").textContent = (lleno ? total : 0) + " tacos";
    var msg = "Hola Tacos San Juan, quiero hacer un pedido en la sucursal " + suc + ". ";
    if (lleno) msg += (n > 1 ? n + " platos de a tres, cada uno con: " : "Un plato de a tres con: ") + t + "." + (ex.length ? " Con " + ex.join(", ") + "." : "") + " Son " + total + " tacos en total. Paso por ellos. ¿Cuánto es?";
    else msg += "¿Me pasan la carta con precios?";
    var a = $("[data-comanda]"); a.href = (window.TSJ ? window.TSJ.waUrl(msg) : a.href); a.target = "_blank"; a.rel = "noopener";
    a.setAttribute("data-msg", msg);
  }
  function elige(i) { act = i; pintar(); }
  Array.prototype.forEach.call(slots, function (s, i) {
    s.addEventListener("click", function () { elige(i); });
    s.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); elige(i); } });
  });
  root.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("button") : null; if (!b) return;
    if (b.hasAttribute("data-carne")) { sel[act] = (sel[act] === b.getAttribute("data-carne")) ? null : b.getAttribute("data-carne"); if (sel[act]) { for (var k = 1; k <= 3; k++) { var j = (act + k) % 3; if (!sel[j]) { act = j; break; } } } pintar(); }
    else if (b.hasAttribute("data-ex")) { var x = b.getAttribute("data-ex"); extras[x] = !extras[x]; pintar(); }
    else if (b.hasAttribute("data-mas")) { n = Math.min(6, n + 1); pintar(); }
    else if (b.hasAttribute("data-menos")) { n = Math.max(1, n - 1); pintar(); }
    else if (b.hasAttribute("data-s")) { suc = b.getAttribute("data-s"); Array.prototype.forEach.call(root.querySelectorAll("[data-s]"), function (c) { c.setAttribute("aria-pressed", c === b ? "true" : "false"); }); pintar(); }
    else if (b.hasAttribute("data-limpiar")) { sel = [null, null, null]; extras = {}; n = 1; act = 0; pintar(); }
  });
  /* botones "Agregar" de la carta: llenan el siguiente taco vacío y bajan al plato */
  Array.prototype.forEach.call(document.querySelectorAll("[data-agrega]"), function (b) {
    b.addEventListener("click", function () {
      var c = b.getAttribute("data-agrega"), j = sel.indexOf(null);
      if (j < 0) { j = act; }
      sel[j] = c; var nx = sel.indexOf(null); act = nx < 0 ? j : nx; pintar();
      b.textContent = "Agregado"; setTimeout(function () { b.textContent = "Agregar"; }, 1200);
      if (window.TSJ && TSJ.ir) { /* no saltamos: se ve el contador en el plato */ }
    });
  });
  pintar();
})();
