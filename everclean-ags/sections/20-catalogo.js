/* Everclean — carrito "Mi visita" compartido entre el catálogo (20) y la herramienta (50).
   window.ECCart: get(), add(nombre, n), setQty(nombre, n), count(), subscribe(fn). Vanilla. */
(function () {
  "use strict";
  var ORDEN = ["Salas y sillones", "Colchones", "Sillas", "Sofá cama", "Tapetes y alfombras", "Reposet / Love seat", "Interiores de auto", "Carriolas", "Cama para perro"];
  var cart = {};
  var subs = [];

  function load() {
    try {
      var raw = sessionStorage.getItem("ec-visita");
      if (raw) cart = JSON.parse(raw) || {};
    } catch (e) { cart = {}; }
  }
  function persist() {
    try { sessionStorage.setItem("ec-visita", JSON.stringify(cart)); } catch (e) { /* modo privado: ok */ }
  }
  function notify() {
    persist();
    var items = ORDEN.filter(function (n) { return cart[n] > 0; }).map(function (n) { return { nombre: n, qty: cart[n] }; });
    var count = items.reduce(function (a, it) { return a + it.qty; }, 0);
    subs.forEach(function (fn) { try { fn(items, count); } catch (e) {} });
    document.body.classList.toggle("ec-hascart", count > 0);
    var evt;
    try { evt = new CustomEvent("ec:cart-changed", { detail: { items: items, count: count } }); }
    catch (e) { evt = document.createEvent("CustomEvent"); evt.initCustomEvent("ec:cart-changed", false, false, { items: items, count: count }); }
    window.dispatchEvent(evt);
  }
  function add(nombre, n) {
    if (!nombre) return;
    cart[nombre] = Math.max(0, (cart[nombre] || 0) + (n || 1));
    notify();
  }
  function setQty(nombre, n) {
    if (!nombre) return;
    cart[nombre] = Math.max(0, n | 0);
    if (!cart[nombre]) delete cart[nombre];
    notify();
  }
  function get() {
    return ORDEN.filter(function (n) { return cart[n] > 0; }).map(function (n) { return { nombre: n, qty: cart[n] }; });
  }
  function count() {
    return get().reduce(function (a, it) { return a + it.qty; }, 0);
  }
  function subscribe(fn) { subs.push(fn); }
  window.ECCart = { add: add, setQty: setQty, get: get, count: count, subscribe: subscribe };

  /* ---------- Botones "+" del catálogo ---------- */
  function initPlus() {
    document.querySelectorAll("[data-ec-add]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        add(btn.getAttribute("data-ec-add"), 1);
        confirmar(btn);
      });
    });
  }

  /* Un link con data-ec-confirm cambia su propio texto 2 s: el visitante ve que si se agrego. */
  function confirmar(el) {
    var txt = el.getAttribute("data-ec-confirm");
    if (!txt || el.__ecBusy) return;
    var nodo = null;
    for (var i = 0; i < el.childNodes.length; i++) {
      if (el.childNodes[i].nodeType === 3 && el.childNodes[i].nodeValue.trim()) { nodo = el.childNodes[i]; break; }
    }
    if (!nodo) return;
    el.__ecBusy = true;
    var antes = nodo.nodeValue;
    nodo.nodeValue = txt;
    setTimeout(function () { nodo.nodeValue = antes; el.__ecBusy = false; }, 2000);
  }

  /* ---------- Refleja cantidades sobre los botones "+" del catálogo ---------- */
  function reflectPlusButtons() {
    var byName = {};
    get().forEach(function (it) { byName[it.nombre] = it.qty; });
    document.querySelectorAll("[data-ec-add]").forEach(function (btn) {
      var n = byName[btn.getAttribute("data-ec-add")] || 0;
      var badge = btn.querySelector(".s-cat-plus-n");
      btn.classList.toggle("is-added", n > 0);
      if (badge) badge.textContent = n > 0 ? String(n) : "";
    });
  }

  /* ---------- Barra fija "MI VISITA · N" ---------- */
  function initBar() {
    var bar = document.getElementById("s-cat-bar");
    var nEl = document.getElementById("s-cat-bar-n");
    if (!bar) return;
    var hiddenByScroll = false;
    function render(items, cnt) {
      nEl.textContent = String(cnt);
      bar.hidden = cnt === 0 || hiddenByScroll;
    }
    subscribe(render);
    /* se oculta al llegar a la sección 50 (ya se ve el carrito completo ahí) o al pie.
       ID selector empieza con dígito: no se puede pasar tal cual a querySelector. */
    var watch = [document.getElementById("50-visita"), document.querySelector(".ec-foot")].filter(Boolean);
    if (watch.length && "IntersectionObserver" in window) {
      var visibles = new Set();
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) visibles.add(e.target); else visibles.delete(e.target); });
        hiddenByScroll = visibles.size > 0;
        render(get(), count());
      }, { threshold: 0.15 });
      watch.forEach(function (t) { io.observe(t); });
    }
  }

  function init() {
    load();
    initPlus();
    subscribe(reflectPlusButtons);
    initBar();
    window.addEventListener("ec:pieza", function (e) {
      var pieza = e.detail && e.detail.pieza;
      if (pieza) add(pieza, 1);
    });
    notify();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
