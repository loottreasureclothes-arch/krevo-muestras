/* 20-tienda: el carrito "Mi encargo" (la barra vive en el header, template.html) + la hoja del
   encargo. API para otras secciones: window.OSCart.add(nombre, precio).
   NUNCA un total en cero: sin precio va "Pregunta el precio" en la tarjeta y el total se confirma
   por WhatsApp.

   Ronda 3 (FEEDBACK-2, 20 sep 2026): la pagina es una tienda. Cada pieza YA trae su propio
   <a href="https://wa.me/...?text=Hola, te encargo ..."> escrito en el HTML por build_tienda.py;
   este archivo NO los toca. Solo maneja el "+", el contador y la hoja del encargo, que es la que
   junta varias piezas en un solo mensaje con su total.
   Cero listeners de scroll (NOTA GLOBAL 2: menos animacion, pagina mas ligera). */
(function () {
  "use strict";
  var root = document.documentElement;

  function saludo() { return "Hola, vi la tienda en la página"; }
  function actualizarFlotante() {
    var a = document.querySelector(".k-wa");
    if (!a) return;
    var msg = saludo() + " y quiero encargar una pieza.";
    a.setAttribute("data-wa", msg);
    a.href = window.OS ? window.OS.waUrl(msg) : ("https://wa.me/524491371706?text=" + encodeURIComponent(msg));
  }

  /* ---------------- Carrito "Mi encargo" ---------------- */
  var CART = []; /* {id, name, price:number|null, qty} */

  function money(n) { return "$" + Math.round(n).toLocaleString("es-MX"); }

  function findItem(id) {
    for (var i = 0; i < CART.length; i++) if (CART[i].id === id) return CART[i];
    return null;
  }

  function addItem(name, price) {
    var id = name;
    var it = findItem(id);
    if (it) { it.qty++; }
    else CART.push({ id: id, name: name, price: (price === "" || price == null || isNaN(price)) ? null : Number(price), qty: 1 });
    renderCart();
  }
  function setQty(id, qty) {
    var it = findItem(id);
    if (!it) return;
    it.qty = qty;
    if (it.qty <= 0) CART = CART.filter(function (x) { return x.id !== id; });
    renderCart();
  }

  function totalCount() { return CART.reduce(function (s, i) { return s + i.qty; }, 0); }

  function renderCart() {
    var n = totalCount();
    var barN = document.getElementById("os-cart-n");
    if (barN) barN.textContent = String(n);
    document.body.setAttribute("data-cart-n", String(n));
    root.classList.toggle("os-cart-has", CART.length > 0);

    var list = document.getElementById("os-cart-items");
    if (list) {
      list.innerHTML = "";
      CART.forEach(function (it) {
        var li = document.createElement("li");
        li.className = "os-cart-item";
        var priceTxt = it.price == null ? "Pregunta el precio" : money(it.price) + " c/u";
        li.innerHTML =
          '<div class="os-cart-item-t"><p class="os-cart-item-name">' + escapeHtml(it.name) + '</p>' +
          '<p class="os-cart-item-price">' + priceTxt + '</p></div>' +
          '<span class="os-cart-item-qty">' +
          '<button type="button" data-qty="-1" aria-label="Quitar una">−</button>' +
          '<b>' + it.qty + '</b>' +
          '<button type="button" data-qty="1" aria-label="Agregar una">+</button>' +
          '</span>';
        li.querySelectorAll("[data-qty]").forEach(function (b) {
          b.addEventListener("click", function () { setQty(it.id, it.qty + Number(b.getAttribute("data-qty"))); });
        });
        list.appendChild(li);
      });
    }

    var hasAsk = CART.some(function (i) { return i.price == null; });
    var totalNum = CART.reduce(function (s, i) { return s + (i.price || 0) * i.qty; }, 0);
    var totalEl = document.getElementById("os-cart-total-n");
    if (totalEl) {
      var frase = true;
      if (CART.length && !hasAsk) { totalEl.textContent = money(totalNum); frase = false; }
      else if (CART.length && hasAsk && totalNum > 0) totalEl.textContent = money(totalNum) + " + las que preguntaste";
      else totalEl.textContent = "Te lo confirmamos por WhatsApp";
      totalEl.classList.toggle("is-frase", frase);
    }

    var send = document.getElementById("os-cart-send");
    if (send) {
      var lines = CART.map(function (i) {
        return "• " + i.name + " x" + i.qty + (i.price == null ? " (pregunta el precio)" : " — " + money(i.price * i.qty));
      });
      var msg;
      if (!CART.length) {
        /* carrito vacío: ni lista ni renglón de total (ni un total en cero) */
        msg = saludo() + " y quiero encargar una pieza.";
      } else {
        msg = saludo() + " y te encargo:\n" + lines.join("\n") +
          "\n\nTotal: " + (hasAsk ? (totalNum > 0 ? money(totalNum) + " + lo que me confirmen" : "me lo confirman por WhatsApp") : money(totalNum));
      }
      send.href = window.OS ? window.OS.waUrl(msg) : ("https://wa.me/524491371706?text=" + encodeURIComponent(msg));
    }
  }

  function escapeHtml(s) { return String(s).replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }); }

  function initAddButtons() {
    document.querySelectorAll("[data-add]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        addItem(btn.getAttribute("data-name"), btn.getAttribute("data-price"));
        btn.classList.add("is-added");
        window.setTimeout(function () { btn.classList.remove("is-added"); }, 260);
      });
    });
  }

  /* ---------------- Hoja: abrir / cerrar con historial (L13) ---------------- */
  function initSheet() {
    var sheet = document.getElementById("os-cart-sheet");
    var bar = document.getElementById("os-cart-bar");
    var closeBtn = document.querySelector(".os-cart-close");
    var scrim = document.querySelector(".os-cart-scrim");
    if (!sheet) return;
    var pushed = false;

    function set(open, fromPop) {
      if (open === root.classList.contains("os-cart-open")) return;
      root.classList.toggle("os-cart-open", open);
      sheet.setAttribute("aria-hidden", open ? "false" : "true");
      if (open) {
        try { history.pushState({ osCart: 1 }, ""); pushed = true; } catch (e) {}
        window.setTimeout(function () { if (closeBtn) closeBtn.focus({ preventScroll: true }); }, 90);
      } else {
        if (pushed && !fromPop) { pushed = false; try { history.back(); } catch (e) {} }
        pushed = false;
        if (bar) bar.focus && bar.focus({ preventScroll: true });
      }
    }
    window.addEventListener("popstate", function () { if (root.classList.contains("os-cart-open")) set(false, true); });

    if (bar) {
      bar.setAttribute("role", "button");
      bar.setAttribute("tabindex", "0");
      bar.addEventListener("click", function () { set(true); });
      bar.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); set(true); } });
    }
    if (closeBtn) closeBtn.addEventListener("click", function () { set(false); });
    if (scrim) scrim.addEventListener("click", function () { set(false); });
    document.addEventListener("keydown", function (e) {
      if (!root.classList.contains("os-cart-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); }
    });
  }

  function init() { initAddButtons(); initSheet(); renderCart(); actualizarFlotante(); }
  window.OSCart = { add: addItem };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
