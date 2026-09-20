/* Everclean — la herramienta: resumen editable del carrito compartido (window.ECCart), zona, día
   y el botón verde que arma el WhatsApp con todo. Sin barra, sin manija: solo -/+ en cian. */
(function () {
  "use strict";
  var dia = "Domingo";

  function render(items) {
    var box = document.getElementById("s-visita-resumen");
    if (!box) return;
    box.innerHTML = "";
    if (!items.length) {
      var p = document.createElement("p");
      p.className = "s-visita-empty";
      p.innerHTML = 'Elige arriba lo que quieres lavar. <a href="#20-catalogo">Ver qué lavamos</a>';
      box.appendChild(p);
      return;
    }
    items.forEach(function (it) {
      var row = document.createElement("div");
      row.className = "s-visita-item";
      var nombre = document.createElement("span");
      nombre.className = "s-visita-item-nombre";
      nombre.textContent = it.nombre;
      var qty = document.createElement("div");
      qty.className = "s-visita-qty";
      var less = document.createElement("button");
      less.type = "button"; less.textContent = "−";
      less.setAttribute("aria-label", "Quitar una " + it.nombre);
      less.addEventListener("click", function () { window.ECCart.setQty(it.nombre, it.qty - 1); });
      var n = document.createElement("span");
      n.textContent = String(it.qty);
      var more = document.createElement("button");
      more.type = "button"; more.textContent = "+";
      more.setAttribute("aria-label", "Agregar una " + it.nombre + " más");
      more.addEventListener("click", function () { window.ECCart.setQty(it.nombre, it.qty + 1); });
      qty.appendChild(less); qty.appendChild(n); qty.appendChild(more);
      row.appendChild(nombre); row.appendChild(qty);
      box.appendChild(row);
    });
  }

  function initDias() {
    var btns = document.querySelectorAll(".s-visita-dia-btn");
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        dia = b.getAttribute("data-dia");
        btns.forEach(function (x) { x.classList.toggle("is-active", x === b); x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      });
    });
  }

  function mensaje() {
    var items = window.ECCart ? window.ECCart.get() : [];
    var zonaEl = document.getElementById("s-visita-zona");
    var zona = zonaEl && zonaEl.value.trim() ? zonaEl.value.trim() : "sin especificar";
    var piezas = items.length
      ? items.map(function (it) { return it.qty > 1 ? (it.qty + " " + it.nombre.toLowerCase()) : it.nombre; }).join(", ")
      : "se las digo por aquí";
    return "Hola Everclean, quiero apartar una visita a domicilio. Piezas: " + piezas + ". Zona: " + zona + ". Día: " + dia.toLowerCase() + ". ¿Me pasan el precio?";
  }

  function initSend() {
    var btn = document.getElementById("s-visita-send");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var url = window.ECWa ? window.ECWa.url(mensaje()) : "https://wa.me/524491925369";
      var w = window.open(url, "_blank", "noopener");
      if (!w) location.href = url;
    });
  }

  function init() {
    if (window.ECCart) { window.ECCart.subscribe(render); render(window.ECCart.get()); }
    initDias();
    initSend();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
