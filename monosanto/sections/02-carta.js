/* Componente firma: El vaso de cobre (la cuenta de la mesa). Sin WhatsApp: termina en Copiar pedido y Llamar. */
(function () {
  "use strict";
  var cart = {}, order = [], people = 2;
  var list = document.getElementById("v-list"), totalEl = document.getElementById("v-total"), per = document.getElementById("v-per");
  var nEl = document.getElementById("v-n"), copy = document.getElementById("v-copy"), copyT = document.getElementById("v-copy-t");
  var chip = document.getElementById("chip"), chipTotal = document.getElementById("chip-total");
  var liq = document.querySelector(".vaso-liq"), box = document.getElementById("vaso");
  if (!list || !totalEl) return;
  var STORE = "monosanto-mesa";
  function money(n) { return "$" + Math.round(n).toLocaleString("es-MX"); }
  function save() { try { localStorage.setItem(STORE, JSON.stringify({ c: cart, o: order, p: people })); } catch (e) {} }
  function load() {
    try {
      var s = JSON.parse(localStorage.getItem(STORE) || "null");
      if (s && s.c && s.o) { cart = s.c; order = s.o; people = s.p || 2; }
    } catch (e) {}
  }
  var buttons = {};
  Array.prototype.forEach.call(document.querySelectorAll(".add"), function (b) { buttons[b.getAttribute("data-id")] = b; });
  function info(id) {
    var b = buttons[id];
    return b ? { name: b.getAttribute("data-name"), price: b.hasAttribute("data-price") ? parseInt(b.getAttribute("data-price"), 10) : null } : null;
  }
  function change(id, d) {
    if (!info(id)) return;
    var q = (cart[id] || 0) + d;
    if (q <= 0) { delete cart[id]; order = order.filter(function (x) { return x !== id; }); }
    else { if (!cart[id]) order.push(id); cart[id] = Math.min(q, 20); }
    render(true);
  }
  function summary() {
    var total = 0, priced = 0, ask = 0, items = 0, lines = [];
    order.forEach(function (id) {
      var i = info(id), q = cart[id]; if (!i || !q) return;
      items += q;
      if (i.price != null) { total += i.price * q; priced += q; lines.push(q + " x " + i.name + " (" + money(i.price * q) + ")"); }
      else { ask += q; lines.push(q + " x " + i.name + " (pregunta el precio)"); }
    });
    return { total: total, priced: priced, ask: ask, items: items, lines: lines };
  }
  function render(pulse) {
    var s = summary();
    Object.keys(buttons).forEach(function (id) {
      var b = buttons[id], q = cart[id] || 0;
      b.classList.toggle("is-on", q > 0);
      if (q > 0) b.setAttribute("data-qty", q); else b.removeAttribute("data-qty");
    });
    list.innerHTML = "";
    if (!s.items) {
      var e = document.createElement("li"); e.className = "vaso-empty"; e.textContent = "Toca + en cada platillo."; list.appendChild(e);
    } else {
      order.forEach(function (id) {
        var i = info(id), q = cart[id]; if (!i || !q) return;
        var li = document.createElement("li"); li.className = "vl";
        var n = document.createElement("span"); n.className = "vl-n"; n.textContent = i.name;
        var p = document.createElement("span"); p.className = "vl-p" + (i.price == null ? " ask" : "");
        p.textContent = i.price == null ? "Pregunta el precio" : money(i.price * q);
        var qd = document.createElement("div"); qd.className = "vl-q";
        var m = document.createElement("button"); m.type = "button"; m.textContent = "−"; m.setAttribute("aria-label", "Quitar uno de " + i.name);
        var c = document.createElement("b"); c.textContent = q;
        var a = document.createElement("button"); a.type = "button"; a.textContent = "+"; a.setAttribute("aria-label", "Agregar otro " + i.name);
        m.addEventListener("click", function () { change(id, -1); });
        a.addEventListener("click", function () { change(id, 1); });
        qd.appendChild(m); qd.appendChild(c); qd.appendChild(a);
        li.appendChild(n); li.appendChild(p); li.appendChild(qd); list.appendChild(li);
      });
    }
    var tot;
    if (!s.items) tot = "Elige arriba";
    else if (s.priced) tot = money(s.total);
    else tot = "Pregunta el precio";
    totalEl.textContent = tot;
    chipTotal.textContent = tot;
    chip.hidden = !s.items;
    if (s.priced && s.total > 0) {
      per.hidden = false;
      per.textContent = "Unos " + money(s.total / people) + " por persona" + (s.ask ? " (sin contar " + s.ask + (s.ask > 1 ? " platillos" : " platillo") + " por preguntar)" : "");
    } else if (s.ask) { per.hidden = false; per.textContent = "Llama y pregunta el precio de lo que elegiste."; }
    else per.hidden = true;
    nEl.textContent = people;
    var level = Math.min(1, s.items / 8);
    if (liq) liq.style.transform = "translateY(" + Math.round((1 - level) * 132) + "px)";
    copy.disabled = !s.items;
    if (pulse && box) { box.classList.remove("pulse"); void box.offsetWidth; box.classList.add("pulse"); }
    save();
  }
  function text() {
    var s = summary();
    var t = "Hola, quiero pedir en Monosanto. Somos " + people + ".\n" + s.lines.join("\n");
    if (s.priced) t += "\nTotal de referencia: " + money(s.total) + (s.ask ? " más lo que falta por preguntar" : "");
    return t;
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest(".add") : null;
    if (b) change(b.getAttribute("data-id"), 1);
  });
  document.getElementById("v-menos").addEventListener("click", function () { people = Math.max(1, people - 1); render(false); });
  document.getElementById("v-mas").addEventListener("click", function () { people = Math.min(20, people + 1); render(false); });
  copy.addEventListener("click", function () {
    if (copy.disabled) return;
    var t = text();
    function done() { copyT.textContent = "Copiado. Ahora llama"; setTimeout(function () { copyT.textContent = "Copiar pedido"; }, 2200); }
    function fallback() {
      var ta = document.createElement("textarea"); ta.value = t; ta.style.position = "fixed"; ta.style.opacity = "0"; document.body.appendChild(ta);
      ta.select(); try { document.execCommand("copy"); done(); } catch (x) { copyT.textContent = "Mantén para copiar"; } document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(done, fallback); else fallback();
  });
  Array.prototype.forEach.call(document.querySelectorAll(".tab"), function (t) {
    t.addEventListener("click", function () {
      Array.prototype.forEach.call(document.querySelectorAll(".tab"), function (x) { x.classList.toggle("is-act", x === t); x.setAttribute("aria-selected", x === t ? "true" : "false"); });
      Array.prototype.forEach.call(document.querySelectorAll(".grp"), function (g) { g.classList.toggle("is-act", g.id === t.getAttribute("data-g")); });
    });
  });
  load(); render(false);
  window.MonosantoMesa = { text: text, change: change };
})();
