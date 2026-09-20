/* La carta a la vista + El pedido (turno 2). Motor de carrito propio sobre window.PETRA
   (interruptor de casa del site.js). Usado tambien por 30-mesa (data-mesa-add) y
   40-martes (data-add-suizas). Todo en try/catch de storage por L16. */
(function () {
  "use strict";

  var cart = {};
  try {
    var raw = sessionStorage.getItem("petraCart");
    if (raw) cart = JSON.parse(raw) || {};
  } catch (e) {}

  function save() {
    try { sessionStorage.setItem("petraCart", JSON.stringify(cart)); } catch (e) {}
  }

  function addItem(id, name, price, qty) {
    qty = qty || 1;
    if (cart[id]) cart[id].qty += qty;
    else cart[id] = { name: name, price: price, qty: qty };
    save();
    render();
  }
  function setQty(id, qty) {
    if (!cart[id]) return;
    if (qty <= 0) delete cart[id];
    else cart[id].qty = qty;
    save();
    render();
  }

  function count() {
    var n = 0;
    for (var k in cart) n += cart[k].qty;
    return n;
  }
  function total() {
    var t = 0;
    for (var k in cart) t += cart[k].qty * cart[k].price;
    return t;
  }
  function money(n) { return "$" + n.toLocaleString("es-MX"); }

  var modo = "Para llevar";
  var pago = "Efectivo";

  function buildMessage() {
    var P = window.PETRA;
    var house = P ? P.house : "jardin";
    var houseData = P ? P.houses[house] : null;
    var lines = [houseData ? houseData.waLine + ":" : "Pedido para Petra:"];
    for (var k in cart) {
      var it = cart[k];
      lines.push(it.qty + "x " + it.name + " - " + money(it.qty * it.price));
    }
    lines.push("");
    lines.push("Total: " + money(total()));
    lines.push(modo + " · " + pago);
    lines.push("El restaurante confirma el total por WhatsApp.");
    return lines.join("\n");
  }

  /* ============ Render ============ */
  var cartbar, cartbarN, cartbarT, sheet, sheetList, sheetEmpty, sheetTotal, sheetTotalRow, sheetSend, sheetFor, sheetForName, sheetNote;
  function renderCartbar() {
    if (!cartbar) return;
    var n = count();
    if (n <= 0) { cartbar.hidden = true; cartbar.classList.remove("is-shown"); return; }
    cartbar.hidden = false;
    requestAnimationFrame(function () { cartbar.classList.add("is-shown"); });
    cartbarN.textContent = "Mi pedido · " + n;
    cartbarT.textContent = money(total());
  }

  /* La hoja dice a que casa va el pedido ANTES de mandarlo (el mensaje ya lo traia,
     pero el visitante no lo veia). "cambiar" mueve el mismo interruptor del header. */
  function renderFor() {
    if (!sheetFor) return;
    var P = window.PETRA;
    var h = P ? P.houses[P.house] : null;
    if (!h) { sheetFor.hidden = true; return; }
    if (sheetForName) sheetForName.textContent = h.nombre + " (" + h.corta + ")";
    sheetFor.hidden = false;
    if (sheetNote) sheetNote.textContent = pago.indexOf("Tarjeta") === 0 ? "Tarjeta en línea: te mandamos el link." : "El restaurante confirma el total por WhatsApp.";
  }
  function renderSheet() {
    if (!sheetList) return;
    sheetList.innerHTML = "";
    var ids = Object.keys(cart);
    sheetEmpty.hidden = ids.length > 0;
    ids.forEach(function (id) {
      var it = cart[id];
      var li = document.createElement("li");
      li.className = "pt-sheet-item";
      li.innerHTML =
        '<span class="pt-sheet-item-name">' + it.name + '<b>' + money(it.price) + ' c/u</b></span>' +
        '<span class="pt-sheet-qty"><button type="button" data-qty="-1" aria-label="Quitar uno">&minus;</button><span>' + it.qty + '</span><button type="button" data-qty="1" aria-label="Agregar uno">+</button></span>' +
        '<span class="pt-sheet-item-price">' + money(it.qty * it.price) + '</span>';
      li.querySelectorAll("[data-qty]").forEach(function (btn) {
        btn.addEventListener("click", function () { setQty(id, it.qty + parseInt(btn.getAttribute("data-qty"), 10)); });
      });
      sheetList.appendChild(li);
    });
    var n = count();
    if (sheetTotalRow) sheetTotalRow.hidden = n <= 0;
    sheetTotal.textContent = n > 0 ? money(total()) : "";
    renderFor();
    if (sheetSend) {
      sheetSend.setAttribute("aria-disabled", n <= 0 ? "true" : "false");
      var msg = buildMessage();
      sheetSend.href = window.PETRA ? window.PETRA.waUrl(msg) : "#";
    }
  }
  function render() { renderCartbar(); renderSheet(); }

  /* ============ Hoja abre / cierra ============ */
  function openSheet() {
    if (!sheet) return;
    sheet.hidden = false;
    requestAnimationFrame(function () { sheet.classList.add("is-open"); });
    try { history.pushState({ ptSheet: true }, "", location.hash || location.pathname); } catch (e) {}
    document.documentElement.classList.add("pt-lock");
  }
  function closeSheet(skipHistory) {
    if (!sheet || sheet.hidden) return;
    sheet.classList.remove("is-open");
    document.documentElement.classList.remove("pt-lock");
    setTimeout(function () { sheet.hidden = true; }, 260);
    if (!skipHistory) { try { if (history.state && history.state.ptSheet) history.back(); } catch (e) {} }
  }
  window.addEventListener("popstate", function () { closeSheet(true); });

  /* ============ Chips (crossfade, sin repintar mas de una categoria) ============ */
  function initChips() {
    var chips = document.querySelectorAll("[data-chip]");
    var cardsWrap = document.querySelector("[data-cards]");
    if (!chips.length || !cardsWrap) return;
    var cards = cardsWrap.querySelectorAll(".pt-card");
    function paint(cat, animate) {
      var current = cardsWrap.querySelectorAll(".pt-card.is-cat");
      var next = [];
      cards.forEach(function (c) { if (c.getAttribute("data-cat") === cat) next.push(c); });
      if (!animate) {
        cards.forEach(function (c) { c.classList.remove("is-cat", "is-in"); });
        next.forEach(function (c) { c.classList.add("is-cat"); requestAnimationFrame(function () { c.classList.add("is-in"); }); });
        return;
      }
      current.forEach(function (c) { c.classList.remove("is-in"); });
      setTimeout(function () {
        cards.forEach(function (c) { c.classList.remove("is-cat", "is-in"); });
        next.forEach(function (c) {
          c.classList.add("is-cat");
          requestAnimationFrame(function () { c.classList.add("is-in"); });
        });
      }, 180);
    }
    paint(chips[0].getAttribute("data-chip"), false);
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        if (chip.classList.contains("is-on")) return;
        chips.forEach(function (c) { c.classList.remove("is-on"); });
        chip.classList.add("is-on");
        paint(chip.getAttribute("data-chip"), true);
      });
    });
  }

  /* ============ Botones "+ Agregar" de tarjetas y lista ============ */
  function flashAdded(btn) {
    var was = btn.textContent;
    btn.classList.add("is-added");
    if (btn.classList.contains("pt-card-add")) btn.textContent = "Agregado";
    setTimeout(function () { btn.classList.remove("is-added"); btn.textContent = was; }, 900);
  }
  function initAddButtons() {
    document.querySelectorAll("[data-add]").forEach(function (btn) {
      var row = btn.closest("[data-id]");
      if (!row) return;
      btn.addEventListener("click", function () {
        addItem(row.getAttribute("data-id"), row.getAttribute("data-name"), parseFloat(row.getAttribute("data-price")), 1);
        flashAdded(btn);
      });
    });
  }

  function initSeg() {
    document.querySelectorAll("[data-seg]").forEach(function (group) {
      var kind = group.getAttribute("data-seg");
      group.querySelectorAll(".pt-seg-opt").forEach(function (opt) {
        opt.addEventListener("click", function () {
          group.querySelectorAll(".pt-seg-opt").forEach(function (o) { o.classList.remove("is-on"); });
          opt.classList.add("is-on");
          var val = opt.getAttribute("data-val");
          if (kind === "modo") modo = val; else pago = val;
          renderSheet();
        });
      });
    });
  }

  function initMesaYMartes() {
    var mesaBtn = document.querySelector("[data-mesa-add]");
    if (mesaBtn) mesaBtn.addEventListener("click", function () {
      addItem("pozole-verde-mediano", "Pozole Verde Mediano", 179, 1);
      addItem("agua-de-horchata", "Agua de Horchata", 49, 1);
    });
    var suizasBtn = document.querySelector("[data-add-suizas]");
    if (suizasBtn) suizasBtn.addEventListener("click", function () {
      addItem("enchiladas-suizas", "Enchiladas Suizas", 211, 1);
      flashAdded(suizasBtn);
    });
  }

  function init() {
    cartbar = document.querySelector("[data-cartbar]");
    cartbarN = document.querySelector("[data-cartbar-n]");
    cartbarT = document.querySelector("[data-cartbar-total]");
    sheet = document.querySelector("[data-sheet]");
    sheetList = document.querySelector("[data-sheet-list]");
    sheetEmpty = document.querySelector("[data-sheet-empty]");
    sheetTotal = document.querySelector("[data-sheet-total]");
    sheetTotalRow = document.querySelector("[data-sheet-total-row]");
    sheetSend = document.querySelector("[data-sheet-send]");
    sheetFor = document.querySelector("[data-sheet-for]");
    sheetForName = document.querySelector("[data-sheet-for-name]");
    sheetNote = document.querySelector("[data-sheet-note]");

    var houseBtn = document.querySelector("[data-sheet-house]");
    if (houseBtn) houseBtn.addEventListener("click", function () {
      var P = window.PETRA;
      if (!P) return;
      P.setHouse(P.house === "jardin" ? "maravillas" : "jardin");
    });
    window.addEventListener("petra:house", function () { renderSheet(); });

    initChips();
    initAddButtons();
    initSeg();
    initMesaYMartes();

    if (cartbar) cartbar.addEventListener("click", openSheet);
    document.querySelectorAll("[data-sheet-close]").forEach(function (el) { el.addEventListener("click", function () { closeSheet(); }); });

    render();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
