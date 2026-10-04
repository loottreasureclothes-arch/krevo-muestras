/* El riel de comandas: Agregar cuelga un ticket; arma el mensaje de WhatsApp con precios de la carta. */
(function () {
  "use strict";
  var KEY = "tikin_comanda_v1";
  var items = {};   /* id -> {name, price|null, qty} */
  var order = [];
  var shown = {};
  var serv = "aquí";
  var $ = function (s) { return document.querySelector(s); };
  var tks = $("#riel-tks"), vac = $("#riel-vacio"), tot = $("#riel-total"), por = $("#riel-por"),
      go = $("#riel-go"), goT = $("#riel-go-t"), cnt = $("#hd-count"), nombre = $("#riel-nombre"), clr = $("#riel-limpiar");
  if (!tks) return;
  function save() { try { localStorage.setItem(KEY, JSON.stringify({ items: items, order: order, serv: serv, nombre: nombre.value })); } catch (e) {} }
  function load() {
    try {
      var s = JSON.parse(localStorage.getItem(KEY) || "null");
      if (s && s.items) { items = s.items; order = s.order || []; serv = s.serv || "aquí"; nombre.value = s.nombre || ""; }
    } catch (e) {}
  }
  function money(n) { return "$" + n.toLocaleString("es-MX"); }
  function count() { var c = 0; order.forEach(function (id) { c += items[id].qty; }); return c; }
  function servTxt() { return serv === "llevar" ? "para llevar" : serv === "domicilio" ? "a domicilio" : "para comer ahí"; }
  function message() {
    if (!order.length) return "Hola Tikin, quiero hacer un pedido.";
    var n = nombre.value.trim();
    var lines = ["Hola Tikin, " + (n ? "soy " + n + ", " : "") + "quiero pedir " + servTxt() + ":"];
    var sum = 0, pend = 0;
    order.forEach(function (id) {
      var it = items[id];
      if (it.price != null) { sum += it.price * it.qty; lines.push("- " + it.qty + " x " + it.name + " (" + money(it.price * it.qty) + ")"); }
      else { pend += it.qty; lines.push("- " + it.qty + " x " + it.name + " (precio por confirmar)"); }
    });
    lines.push("Total: " + money(sum) + (pend ? " + lo que falta por confirmar" : ""));
    lines.push("¿Me confirman?");
    return lines.join("\n");
  }
  function paintAdd() {
    var bs = document.querySelectorAll("[data-add]");
    for (var i = 0; i < bs.length; i++) {
      var it = items[bs[i].getAttribute("data-add")];
      bs[i].classList.toggle("on", !!it);
      bs[i].textContent = it ? "En comanda · " + it.qty : (bs[i].getAttribute("data-lbl") || "Agregar");
    }
  }
  function render(anim) {
    var html = "";
    order.forEach(function (id) {
      var it = items[id];
      html += '<li class="tk" data-id="' + id + '"' + (shown[id] ? ' style="animation:none"' : '') + '><span class="tk-n">' + it.name + '</span><span class="tk-pr">' +
        (it.price != null ? money(it.price * it.qty) : "Precio por confirmar") + '</span><div class="tk-q"><button type="button" data-q="-1" aria-label="Quitar uno de ' + it.name + '">−</button><b>' + it.qty +
        '</b><button type="button" data-q="1" aria-label="Agregar uno de ' + it.name + '">+</button></div></li>';
    });
    tks.innerHTML = html;
    shown = {}; order.forEach(function (id) { shown[id] = 1; });
    var sum = 0, pend = 0;
    order.forEach(function (id) { var it = items[id]; if (it.price != null) sum += it.price * it.qty; else pend += it.qty; });
    tot.textContent = sum ? money(sum) : (pend ? "Por confirmar" : "Sin platos"); tot.classList.toggle("vac", !sum);
    por.hidden = !pend; por.textContent = pend ? "Lleva " + pend + (pend > 1 ? " piezas" : " pieza") + " sin precio en la carta. Te lo confirmamos por WhatsApp." : "";
    vac.hidden = order.length > 0; clr.hidden = !order.length;
    cnt.textContent = count();
    goT.textContent = order.length ? "Mandar comanda por WhatsApp" : "Pedir por WhatsApp";
    go.href = window.TK && window.TK.waUrl ? window.TK.waUrl(message()) : "https://wa.me/524493475594?text=" + encodeURIComponent(message());
    paintAdd(); save();
  }
  function bump() { var h = document.querySelector(".hd-tk"); if (!h) return; h.classList.add("bump"); setTimeout(function () { h.classList.remove("bump"); }, 260); }
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-add]");
    if (a) {
      var id = a.getAttribute("data-add");
      if (!items[id]) { items[id] = { name: a.getAttribute("data-name"), price: a.hasAttribute("data-price") ? Number(a.getAttribute("data-price")) : null, qty: 0 }; order.push(id); }
      items[id].qty = Math.min(items[id].qty + 1, 20);
      render(); bump(); return;
    }
    var q = e.target.closest && e.target.closest("[data-q]");
    if (q) {
      var li = q.closest(".tk"), id2 = li.getAttribute("data-id");
      items[id2].qty += Number(q.getAttribute("data-q"));
      if (items[id2].qty <= 0) { delete items[id2]; order = order.filter(function (x) { return x !== id2; }); }
      else if (items[id2].qty > 20) items[id2].qty = 20;
      render(); return;
    }
    var s = e.target.closest && e.target.closest("[data-serv]");
    if (s) {
      serv = s.getAttribute("data-serv");
      var bs = document.querySelectorAll("#seg-serv button");
      for (var k = 0; k < bs.length; k++) { var on = bs[k] === s; bs[k].classList.toggle("on", on); bs[k].setAttribute("aria-checked", on ? "true" : "false"); }
      render();
    }
  });
  clr.addEventListener("click", function () { items = {}; order = []; render(); });
  nombre.addEventListener("input", function () { render(); });
  load(); order.forEach(function (id) { shown[id] = 1; });
  (function () { var bs = document.querySelectorAll("#seg-serv button"); for (var k = 0; k < bs.length; k++) { var on = bs[k].getAttribute("data-serv") === serv; bs[k].classList.toggle("on", on); bs[k].setAttribute("aria-checked", on ? "true" : "false"); } })();
  render();
})();
