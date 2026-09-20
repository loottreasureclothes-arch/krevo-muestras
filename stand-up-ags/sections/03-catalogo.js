/* 03-catalogo: dibuja las 15 plantas con SU.plantaHTML, filtra por chip
   (arranca en 3x3, siempre una categoria activa, crossfade de opacidad),
   arma el carrito ("Mi cotizacion") y la hoja que manda el WhatsApp con la
   lista + fecha + feria. Nunca precio: el total dice "te lo confirmamos por
   WhatsApp". Expone window.SU.cart para que 05-fecha.js pueda precargar la
   medida elegida aqui. */
(function () {
  "use strict";
  if (!window.SU) return;
  var SU = window.SU;
  var cart = SU.cart = []; // [{name, qty}]

  function paintPlans() {
    var cards = document.querySelectorAll(".s-cat-card");
    Array.prototype.forEach.call(cards, function (card) {
      var box = card.querySelector("[data-plan]");
      if (!box) return;
      var w = parseFloat(card.getAttribute("data-w"));
      var d = parseFloat(card.getAttribute("data-d"));
      var tipo = card.getAttribute("data-tipo");
      box.innerHTML = SU.plantaHTML(w, d, tipo, { sistema: card.getAttribute("data-sello") });
      if (box.hasAttribute("data-hide-cota")) {
        var cotas = box.querySelectorAll(".su-cota");
        Array.prototype.forEach.call(cotas, function (c) { c.style.display = "none"; });
      }
      box.addEventListener("click", function () {
        var scene = box.querySelector(".su-plan-3d");
        if (scene) scene.classList.toggle("is-vol");
      });
    });
  }

  function initFilters() {
    var chips = document.querySelectorAll(".s-cat-chip");
    var cards = document.querySelectorAll(".s-cat-card");
    var grid = document.getElementById("s-cat-grid");
    var tally = document.getElementById("s-cat-tally");
    if (tally) {
      var b = tally.querySelector("b");
      if (b) b.textContent = String(cards.length);
    }
    function applyFilter(target) {
      Array.prototype.forEach.call(cards, function (card) {
        card.hidden = card.getAttribute("data-size") !== target;
      });
    }
    Array.prototype.forEach.call(chips, function (chip) {
      chip.addEventListener("click", function () {
        // Siempre queda una categoria activa: nada de "ver las 15 de golpe"
        // (regla de la hoja). Tocar el chip ya activo no hace nada.
        if (chip.classList.contains("is-active")) return;
        var target = chip.getAttribute("data-filter");
        Array.prototype.forEach.call(chips, function (c) {
          c.classList.remove("is-active");
          c.setAttribute("aria-pressed", "false");
        });
        chip.classList.add("is-active");
        chip.setAttribute("aria-pressed", "true");
        if (!grid) { applyFilter(target); return; }
        // Crossfade corto: apaga, cambia el "hidden" a opacidad 0, prende.
        grid.classList.add("is-switching");
        setTimeout(function () {
          applyFilter(target);
          // requestAnimationFrame para que el navegador registre el cambio
          // de "hidden" antes de quitar la clase y disparar el fade-in.
          requestAnimationFrame(function () { grid.classList.remove("is-switching"); });
        }, 140);
      });
    });
  }

  /* Menu "Las 15 medidas": cada renglon prende el chip de su tamano y lleva a
     SU tarjeta (antes los 15 caian en #catalogo mostrando 3x3). El menu se
     cierra solo (site.js); aqui se espera a que cierre y a que termine el
     cambio de filtro antes de moverse. */
  function initMenuMedidas() {
    var links = document.querySelectorAll("[data-medida]");
    Array.prototype.forEach.call(links, function (a) {
      a.addEventListener("click", function (e) {
        var name = a.getAttribute("data-medida");
        var card = null;
        Array.prototype.forEach.call(document.querySelectorAll(".s-cat-card"), function (c) {
          if (c.getAttribute("data-name") === name) card = c;
        });
        if (!card) return; /* sin tarjeta: que el ancla #catalogo haga lo suyo */
        e.preventDefault();
        var chip = document.querySelector('.s-cat-chip[data-filter="' + card.getAttribute("data-size") + '"]');
        if (chip) chip.click();
        setTimeout(function () {
          if (window.SU && SU.go) SU.go(card); else card.scrollIntoView();
          card.classList.add("is-marked");
          setTimeout(function () { card.classList.remove("is-marked"); }, 1600);
        }, 320);
      });
    });
  }

  function findItem(name) {
    for (var i = 0; i < cart.length; i++) if (cart[i].name === name) return cart[i];
    return null;
  }

  function updateBar() {
    var bar = document.getElementById("s-cat-bar");
    var n = document.getElementById("s-cat-bar-n");
    var total = cart.reduce(function (a, it) { return a + it.qty; }, 0);
    if (!bar || !n) return;
    n.textContent = String(total);
    bar.hidden = total === 0;
  }

  function renderSheet() {
    var list = document.getElementById("s-cat-sheet-list");
    if (!list) return;
    list.innerHTML = "";
    if (!cart.length) {
      list.innerHTML = '<li class="s-cat-empty">Todavía no agregas ninguna medida.</li>';
      return;
    }
    cart.forEach(function (it, idx) {
      var li = document.createElement("li");
      li.innerHTML =
        '<b>' + it.name + '</b>' +
        '<span class="s-cat-qty">' +
        '<button type="button" data-dec="' + idx + '" aria-label="Quitar uno">–</button>' +
        '<span class="su-num">' + it.qty + '</span>' +
        '<button type="button" data-inc="' + idx + '" aria-label="Agregar uno">+</button>' +
        '</span>';
      list.appendChild(li);
    });
  }

  function initAdd() {
    var buttons = document.querySelectorAll("[data-add]");
    Array.prototype.forEach.call(buttons, function (btn) {
      btn.addEventListener("click", function () {
        var card = btn.closest(".s-cat-card");
        var name = card.getAttribute("data-name");
        var it = findItem(name);
        if (it) it.qty++; else cart.push({ name: name, qty: 1 });
        btn.classList.add("is-added");
        btn.textContent = "Agregada";
        setTimeout(function () { btn.classList.remove("is-added"); btn.textContent = "+ Agregar"; }, 1100);
        updateBar();
        renderSheet();
      });
    });
  }

  function initSheet() {
    var sheet = document.getElementById("s-cat-sheet");
    var bar = document.getElementById("s-cat-bar");
    var list = document.getElementById("s-cat-sheet-list");
    var send = document.getElementById("s-cat-send");
    if (!sheet || !bar) return;
    function open() { sheet.hidden = false; sheet.setAttribute("aria-hidden", "false"); renderSheet(); }
    function close() { sheet.hidden = true; sheet.setAttribute("aria-hidden", "true"); }
    bar.addEventListener("click", open);
    Array.prototype.forEach.call(sheet.querySelectorAll("[data-sheet-close]"), function (el) {
      el.addEventListener("click", close);
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !sheet.hidden) close(); });
    if (list) list.addEventListener("click", function (e) {
      var dec = e.target.closest("[data-dec]"), inc = e.target.closest("[data-inc]");
      if (dec) {
        var i1 = +dec.getAttribute("data-dec");
        cart[i1].qty--; if (cart[i1].qty <= 0) cart.splice(i1, 1);
        renderSheet(); updateBar();
      } else if (inc) {
        var i2 = +inc.getAttribute("data-inc");
        cart[i2].qty++;
        renderSheet(); updateBar();
      }
    });
    if (send) send.addEventListener("click", function () {
      if (!cart.length) return;
      var fecha = (document.getElementById("s-cat-fecha") || {}).value || "";
      var feria = (document.getElementById("s-cat-feria") || {}).value || "";
      var lines = cart.map(function (it) { return "- " + it.qty + "x " + it.name; });
      var msg = "Hola Stand Up, quiero cotizar:\n" + lines.join("\n");
      if (feria) msg += "\nFeria: " + feria;
      if (fecha) msg += "\nFecha de montaje: " + SU.fechaLarga(fecha);
      msg += "\nMe confirman el total por aquí, porfa.";
      var url = SU.openWa(msg);
      // eslint-disable-next-line no-console
      console.log("WA_URL_CATALOGO:", url);
    });
  }

  function init() {
    paintPlans();
    initFilters();
    initAdd();
    initSheet();
    updateBar();
    initMenuMedidas();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
