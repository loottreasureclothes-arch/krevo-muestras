/* La Cochera — el carrito (vive en <body>, no es una sección). Vanilla, sin
   dependencias, todo en try/catch (L16: localStorage puede fallar en modo
   privado). Arma el mensaje de WhatsApp con lo que traiga la hoja y nunca
   dice "$0": si algo no tiene precio, el total dice que se confirma por
   WhatsApp (HOJA-DIRECCION §6, sección 02 y "fuera de las 7"). */
(function () {
  "use strict";

  var WA_NUMBER = "524494682926";
  var STORAGE_KEY = "lc_cart_v1";
  var items = []; // {name, price(number|null), qty}

  function load() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) items = JSON.parse(raw) || [];
    } catch (e) { items = []; }
  }
  function persist() {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch (e) {}
  }

  function fmt(n) { return "$" + n.toLocaleString("es-MX"); }

  function totalQty() {
    var n = 0;
    for (var i = 0; i < items.length; i++) n += items[i].qty;
    return n;
  }

  function hasUnpriced() {
    for (var i = 0; i < items.length; i++) if (items[i].price === null) return true;
    return false;
  }

  function totalMoney() {
    var t = 0;
    for (var i = 0; i < items.length; i++) if (items[i].price !== null) t += items[i].price * items[i].qty;
    return t;
  }

  function add(name, price) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].name === name) { items[i].qty++; persist(); render(); return; }
    }
    items.push({ name: name, price: (typeof price === "number" && !isNaN(price)) ? price : null, qty: 1 });
    persist();
    render();
  }

  function setQty(name, qty) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].name === name) {
        if (qty <= 0) items.splice(i, 1); else items[i].qty = qty;
        break;
      }
    }
    persist();
    render();
  }

  function render() {
    try {
      var bar = document.getElementById("lc-cart-bar");
      var barCount = document.getElementById("lc-cart-bar-count");
      var n = totalQty();
      if (bar) {
        if (n > 0) { bar.hidden = false; if (barCount) barCount.textContent = n; }
        else bar.hidden = true;
      }

      var list = document.getElementById("lc-cart-items");
      if (list) {
        if (!items.length) {
          list.innerHTML = '<p class="lc-sheet-empty">Todavía no agregas nada. Ve a la carta y toca el "+".</p>';
        } else {
          list.innerHTML = items.map(function (it) {
            var priceTxt = it.price === null ? "Pregunta el precio" : fmt(it.price);
            return (
              '<div class="lc-cart-item" data-name="' + encodeURIComponent(it.name) + '">' +
                '<div class="lc-cart-item-info"><b>' + it.name + '</b><span>' + priceTxt + '</span></div>' +
                '<div class="lc-cart-item-qty">' +
                  '<button type="button" data-act="minus" aria-label="Quitar uno de ' + it.name + '">–</button>' +
                  '<span>' + it.qty + '</span>' +
                  '<button type="button" data-act="plus" aria-label="Agregar uno más de ' + it.name + '">+</button>' +
                '</div>' +
              '</div>'
            );
          }).join("");
        }
      }

      var totalEl = document.getElementById("lc-cart-total");
      if (totalEl) {
        totalEl.textContent = (!items.length || hasUnpriced())
          ? "Te lo confirmamos por WhatsApp"
          : fmt(totalMoney());
      }

      var sendBtn = document.getElementById("lc-cart-send");
      if (sendBtn) sendBtn.href = buildWaLink();
    } catch (e) {}
  }

  function buildWaLink() {
    try {
      if (!items.length) return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent("Hola, quiero hacer un pedido en La Cochera.");
      var lines = ["Hola, quiero hacer este pedido en La Cochera:"];
      items.forEach(function (it) {
        var priceTxt = it.price === null ? "pregunto el precio" : fmt(it.price) + " c/u";
        lines.push("• " + it.qty + "x " + it.name + " (" + priceTxt + ")");
      });
      var pagoEl = document.querySelector('input[name="lc-pago"]:checked');
      var pago = pagoEl ? pagoEl.value : "efectivo";
      lines.push("");
      lines.push(hasUnpriced() ? "Total: me lo confirman por WhatsApp." : "Total: " + fmt(totalMoney()) + ".");
      lines.push(pago === "tarjeta" ? "Pago: tarjeta en línea, me mandan el link." : "Pago: efectivo en La Cochera.");
      var msg = encodeURIComponent(lines.join("\n"));
      return "https://wa.me/" + WA_NUMBER + "?text=" + msg;
    } catch (e) {
      return "https://wa.me/" + WA_NUMBER;
    }
  }

  /* ---------- Abrir / cerrar la hoja (L12, L13: pushState + back de Android) ---------- */
  var sheet, open = false, pushed = false;
  function paint(v) {
    if (!sheet) return;
    open = v;
    sheet.setAttribute("aria-hidden", v ? "false" : "true");
    document.documentElement.style.overflow = v ? "hidden" : "";
    if (v) render();
  }
  function setOpen(v) {
    if (!sheet) return;
    if (v) {
      paint(true);
      try { history.pushState({ lcCart: true }, ""); pushed = true; } catch (e) { pushed = false; }
      return;
    }
    // Cerrar: si nosotros metimos la entrada, la sacamos con back() para que
    // el boton "atras" de Android siga sirviendo para salir de la pagina.
    if (pushed) {
      pushed = false;
      try { history.back(); return; } catch (e) {}
    }
    paint(false);
  }

  function initSheetUi() {
    sheet = document.getElementById("lc-cart");
    if (!sheet) return;
    var closers = sheet.querySelectorAll("[data-cart-close]");
    closers.forEach(function (el) { el.addEventListener("click", function () { setOpen(false); }); });

    var list = document.getElementById("lc-cart-items");
    if (list) {
      list.addEventListener("click", function (e) {
        var btn = e.target.closest("button[data-act]");
        if (!btn) return;
        var row = btn.closest(".lc-cart-item");
        var name = decodeURIComponent(row.getAttribute("data-name"));
        var cur = items.find(function (it) { return it.name === name; });
        if (!cur) return;
        setQty(name, btn.getAttribute("data-act") === "plus" ? cur.qty + 1 : cur.qty - 1);
      });
    }

    document.querySelectorAll('input[name="lc-pago"]').forEach(function (r) {
      r.addEventListener("change", render);
    });

    var sendBtn = document.getElementById("lc-cart-send");
    if (sendBtn) {
      sendBtn.addEventListener("click", function (e) {
        e.preventDefault();
        var url = buildWaLink();
        var win = null;
        try { win = window.open(url, "_blank"); } catch (err) { win = null; }
        if (!win) { try { window.location.href = url; } catch (err2) {} }
      });
    }

    window.addEventListener("popstate", function () { if (open) { pushed = false; paint(false); } });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && open) setOpen(false); });

    var bar = document.getElementById("lc-cart-bar");
    if (bar) {
      var trigger = bar.querySelector("button");
      if (trigger) trigger.addEventListener("click", function () { setOpen(true); });
    }
  }

  function init() {
    load();
    initSheetUi();
    render();
  }

  window.LCCart = { add: add, setQty: setQty, open: function () { setOpen(true); } };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
