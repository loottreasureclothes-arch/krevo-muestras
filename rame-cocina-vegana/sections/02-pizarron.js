/* El pizarron que se escribe: componente firma de Rame. */
(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var list = $("#board-list"); if (!list) return;
  var items = [], modo = "", lastKey = null, totalChanged = false;
  var tot = $("#tot"), totBox = $("#board-total"), note = $("#board-note"), wa = $("#wa-pedido"), chip = $("#chip"), chipN = $("#chip-n");
  function money(n) { return "$" + n; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function key(i) { return i.name + "|" + i.size; }
  function add(name, size, price) {
    var k = name + "|" + size, f = null;
    items.forEach(function (i) { if (key(i) === k) f = i; });
    if (f) f.qty++; else items.push({ name: name, size: size, price: price, qty: 1 });
    lastKey = k; totalChanged = true; render();
  }
  function remove(k) {
    for (var j = 0; j < items.length; j++) if (key(items[j]) === k) { items[j].qty--; if (items[j].qty <= 0) items.splice(j, 1); break; }
    lastKey = null; totalChanged = true; render();
  }
  function total() { var t = 0, un = false; items.forEach(function (i) { if (i.price == null) un = true; else t += i.price * i.qty; }); return { t: t, un: un }; }
  function message() {
    if (!items.length) return "Hola Ramé, quiero hacer un pedido.";
    var m = "Hola Ramé, quiero hacer un pedido:\n", t = total();
    items.forEach(function (i) {
      m += "- " + i.name + (i.size ? ", " + i.size : "") + " x" + i.qty + (i.price != null ? " ($" + i.price * i.qty + ")" : " (precio por confirmar)") + "\n";
    });
    m += "Total: $" + t.t + (t.un ? " (más lo que está por confirmar)" : "") + "\n";
    if (modo) m += "Es para: " + modo + "\n";
    return m + "¿Me confirman, por favor?";
  }
  function render() {
    if (!items.length) { list.innerHTML = '<li class="board-empty">Escoge un platillo y lo anotamos aquí.</li>'; }
    else list.innerHTML = items.map(function (i) {
      var k = key(i), cls = k === lastKey ? ' class="write"' : "";
      return "<li" + cls + "><span>" + (i.qty > 1 ? i.qty + " × " : "") + esc(i.name) + (i.size ? "<small>" + esc(i.size) + "</small>" : "") + '</span><span class="pr">' + (i.price != null ? money(i.price * i.qty) : "?") + '</span><button type="button" class="x" data-k="' + esc(k) + '" aria-label="Quitar uno: ' + esc(i.name) + '">×</button></li>';
    }).join("");
    var t = total(), n = items.reduce(function (a, i) { return a + i.qty; }, 0);
    totBox.hidden = !items.length; note.hidden = !(items.length && t.un);
    tot.textContent = money(t.t);
    if (totalChanged) { totBox.classList.remove("write"); void totBox.offsetWidth; totBox.classList.add("write"); totalChanged = false; }
    wa.href = window.RAME.waUrl(message());
    chipN.textContent = n; chip.hidden = !n || chipInView;
  }
  var chipInView = false;
  function chipCheck() {
    var b = $("#pizarron-tabla").getBoundingClientRect(), vh = innerHeight;
    chipInView = b.top < vh * 0.9 && b.bottom > vh * 0.1;
    chip.hidden = !items.length || chipInView;
  }
  var cr = null; addEventListener("scroll", function () { if (!cr) cr = requestAnimationFrame(function () { cr = null; chipCheck(); }); }, { passive: true });

  list.addEventListener("click", function (e) { var b = e.target.closest(".x"); if (b) remove(b.getAttribute("data-k")); });
  /* elegir platillo */
  $$(".dish-t").forEach(function (t) {
    t.addEventListener("click", function () {
      var id = t.getAttribute("data-tab");
      $$(".dish-t").forEach(function (x) { var on = x === t; x.classList.toggle("on", on); x.setAttribute("aria-pressed", on); });
      $$(".panel").forEach(function (p) { p.classList.toggle("on", p.getAttribute("data-panel") === id); });
      $$(".plato-img").forEach(function (p) { p.classList.toggle("on", p.getAttribute("data-plato") === id); });
    });
  });
  /* tamano y agregar */
  $$(".panel").forEach(function (p) {
    var addBtn = $(".btn-add", p), szs = $$(".sz", p);
    function cur() { var s = null; szs.forEach(function (x) { if (x.getAttribute("aria-pressed") === "true") s = x; }); return s; }
    function label() { var s = cur(); addBtn.textContent = "Agregar al pizarrón · $" + s.getAttribute("data-price"); }
    szs.forEach(function (s) { s.addEventListener("click", function () { szs.forEach(function (x) { x.setAttribute("aria-pressed", x === s); }); label(); }); });
    addBtn.addEventListener("click", function () { var s = cur(); add(addBtn.getAttribute("data-name"), s.getAttribute("data-size"), +s.getAttribute("data-price")); });
    label();
  });
  /* carta completa */
  $$(".add").forEach(function (b) {
    b.addEventListener("click", function () {
      var pr = b.getAttribute("data-price");
      add(b.getAttribute("data-name"), b.getAttribute("data-size") || "", pr === "" ? null : +pr);
      b.classList.add("ok"); setTimeout(function () { b.classList.remove("ok"); }, 700);
    });
  });
  $$(".modo button").forEach(function (b) {
    b.addEventListener("click", function () {
      var on = b.getAttribute("aria-pressed") === "true";
      $$(".modo button").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
      modo = on ? "" : b.getAttribute("data-modo"); if (!on) b.setAttribute("aria-pressed", "true");
      render();
    });
  });
  render();
})();
