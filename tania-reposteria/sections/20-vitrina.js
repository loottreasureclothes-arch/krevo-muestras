/* 20-vitrina: chips de categoría + carrito (barra fija "Mi pedido · N" + hoja con cantidades,
   forma de pago y botón verde a WhatsApp). Precio real o null ("Pregunta el precio"); total nunca
   inventa un número si falta algún precio. */
(function () {
  "use strict";
  var sec = document.getElementById("vitrina");
  if (!sec) return;

  var chips = sec.querySelectorAll(".tr-vit-chip");
  var cards = sec.querySelectorAll(".tr-vit-card");
  var bar = document.getElementById("vitCartBar");
  var barLabel = document.getElementById("vitCartLabel");
  var barBtn = document.getElementById("vitCartBtn");
  var sheet = document.getElementById("vitCartSheet");
  var scrim = sheet ? sheet.querySelector(".tr-cart-scrim") : null;
  var closeBtn = document.getElementById("vitCartClose");
  var linesBox = document.getElementById("vitCartLines");
  var totalBox = document.getElementById("vitCartTotal");
  var sendBtn = document.getElementById("vitCartSend");
  var payRadios = sec.querySelectorAll('input[name="vitPago"]');

  /* ---- Chips: filtra por categoría ---- */
  Array.prototype.forEach.call(chips, function (chip) {
    chip.addEventListener("click", function () {
      Array.prototype.forEach.call(chips, function (c) { c.classList.remove("is-on"); });
      chip.classList.add("is-on");
      var cat = chip.getAttribute("data-cat");
      Array.prototype.forEach.call(cards, function (card) {
        card.hidden = cat !== "todos" && card.getAttribute("data-cat") !== cat;
      });
    });
  });

  /* ---- Riel de chips: el degradado del borde derecho se apaga al llegar al final ---- */
  (function () {
    var rail = document.getElementById("vitChipsRail");
    var strip = document.getElementById("vitChips");
    if (!rail || !strip) return;
    function edge() {
      var fin = strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 2;
      rail.classList.toggle("tr-is-end", fin);
    }
    strip.addEventListener("scroll", edge, { passive: true });
    window.addEventListener("resize", edge);
    edge();
    setTimeout(edge, 1200); /* despues de que carguen las tipografias */
  })();

  /* ---- Carrito ---- */
  var qty = {}; // id -> cantidad

  function productos() {
    var map = {};
    Array.prototype.forEach.call(cards, function (card) {
      var id = card.getAttribute("data-id");
      var priceRaw = card.getAttribute("data-price");
      map[id] = {
        id: id,
        name: card.getAttribute("data-name"),
        price: priceRaw && priceRaw.length ? parseInt(priceRaw, 10) : null
      };
    });
    return map;
  }
  var PROD = productos();

  function totalQty() {
    var n = 0;
    for (var id in qty) if (qty[id] > 0) n += qty[id];
    return n;
  }

  function money(n) { return "$" + n.toLocaleString("es-MX"); }

  function updateBar() {
    var n = totalQty();
    if (barLabel) barLabel.textContent = "Mi pedido · " + n;
    if (bar) bar.hidden = n === 0;
    /* La barra "Mi pedido" y el WhatsApp flotante ocupan el mismo rincón: se esconde el
       flotante mientras la barra está puesta (misma técnica que site.js: visibility, no opacity). */
    try { document.body.classList.toggle("tr-cart-bar-on", n > 0); } catch (e) {}
  }

  function pagoElegido() {
    for (var i = 0; i < payRadios.length; i++) if (payRadios[i].checked) return payRadios[i].value;
    return "Efectivo en el local";
  }

  function renderLines() {
    if (!linesBox) return;
    linesBox.innerHTML = "";
    var ids = Object.keys(qty).filter(function (id) { return qty[id] > 0; });
    if (!ids.length) {
      linesBox.innerHTML = '<p class="tr-cart-empty">Todavía no agregas nada de la vitrina.</p>';
      return;
    }
    ids.forEach(function (id) {
      var p = PROD[id];
      if (!p) return;
      var row = document.createElement("div");
      row.className = "tr-cart-line";
      var priceTxt = p.price ? money(p.price) + " c/u" : "Pregunta el precio";
      row.innerHTML =
        '<span class="tr-cart-line-name">' + p.name + "</span>" +
        '<span class="tr-cart-line-price">' + priceTxt + "</span>" +
        '<span class="tr-cart-qty">' +
        '<button type="button" data-dec="' + id + '" aria-label="Quitar uno">&minus;</button>' +
        "<span>" + qty[id] + "</span>" +
        '<button type="button" data-inc="' + id + '" aria-label="Agregar uno">+</button>' +
        "</span>";
      linesBox.appendChild(row);
    });
  }

  function renderTotal() {
    if (!totalBox) return;
    var ids = Object.keys(qty).filter(function (id) { return qty[id] > 0; });
    var falta = false, suma = 0;
    ids.forEach(function (id) {
      var p = PROD[id];
      if (!p) return;
      if (p.price == null) falta = true; else suma += p.price * qty[id];
    });
    totalBox.innerHTML = falta || !ids.length
      ? "Total: <strong>Te lo confirmamos por WhatsApp</strong>"
      : "Total: <strong>" + money(suma) + "</strong>";
  }

  function renderSend() {
    if (!sendBtn) return;
    var ids = Object.keys(qty).filter(function (id) { return qty[id] > 0; });
    var lineas = [], falta = false, suma = 0;
    ids.forEach(function (id) {
      var p = PROD[id];
      if (!p) return;
      if (p.price == null) { falta = true; lineas.push(qty[id] + "x " + p.name + " (Pregunta el precio)"); }
      else { suma += p.price * qty[id]; lineas.push(qty[id] + "x " + p.name + " (" + money(p.price) + " c/u)"); }
    });
    var totalTxt = (falta || !ids.length) ? "te lo confirmamos por WhatsApp" : money(suma);
    var msg = ids.length
      ? "Hola Tania, quiero pedir de tu vitrina:\n" + lineas.join("\n") +
        "\nForma de pago: " + pagoElegido() + "\nTotal: " + totalTxt
      : "Hola Tania, quiero pedir de tu vitrina. \u00bfMe pasas precios?";
    sendBtn.setAttribute("data-wa", msg);
    sendBtn.href = window.TR ? window.TR.waUrl(msg) : sendBtn.href;
  }

  function renderAll() { renderLines(); renderTotal(); renderSend(); updateBar(); }

  Array.prototype.forEach.call(sec.querySelectorAll("[data-add]"), function (btn) {
    btn.addEventListener("click", function () {
      var card = btn.closest(".tr-vit-card");
      if (!card) return;
      var id = card.getAttribute("data-id");
      qty[id] = (qty[id] || 0) + 1;
      renderAll();
    });
  });

  if (linesBox) {
    linesBox.addEventListener("click", function (e) {
      var inc = e.target.closest("[data-inc]");
      var dec = e.target.closest("[data-dec]");
      if (inc) { var i = inc.getAttribute("data-inc"); qty[i] = (qty[i] || 0) + 1; renderAll(); }
      if (dec) { var d = dec.getAttribute("data-dec"); qty[d] = Math.max(0, (qty[d] || 0) - 1); renderAll(); }
    });
  }

  Array.prototype.forEach.call(payRadios, function (r) { r.addEventListener("change", renderSend); });

  function openSheet() {
    if (!sheet) return;
    sheet.classList.add("is-open");
    sheet.setAttribute("aria-hidden", "false");
    try { history.pushState({ trCart: 1 }, ""); } catch (e) {}
  }
  function closeSheet(fromPop) {
    if (!sheet || !sheet.classList.contains("is-open")) return;
    sheet.classList.remove("is-open");
    sheet.setAttribute("aria-hidden", "true");
    if (!fromPop) { try { history.back(); } catch (e) {} }
  }
  window.addEventListener("popstate", function () { closeSheet(true); });
  if (barBtn) barBtn.addEventListener("click", openSheet);
  if (closeBtn) closeBtn.addEventListener("click", function () { closeSheet(false); });
  if (scrim) scrim.addEventListener("click", function () { closeSheet(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sheet && sheet.classList.contains("is-open")) closeSheet(false);
  });

  renderAll();
})();
