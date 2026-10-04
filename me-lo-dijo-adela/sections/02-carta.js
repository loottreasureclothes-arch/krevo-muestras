/* La comanda: tocar un nombre lo apunta en el papel; el papel termina en un wa.me ya armado. */
(function () {
  "use strict";
  var WA = "524495376787";
  var q = function (s, r) { return (r || document).querySelector(s); };
  var qa = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var lines = q("#tk-lines"), empty = q("#tk-empty"), totalEl = q("#tk-total"), sumEl = q("#tk-sum"), noteEl = q("#tk-note");
  var send = q("#tk-send"), clr = q("#tk-clear"), barra = q("#barra"), barraT = q("#barra-t"), modeN = q("#tk-mode-n");
  if (!lines) return;
  var items = {}; /* id -> {n, p, qty} */
  var MODOS = { aqui: "comer ahí", llevar: "llevar", domicilio: "domicilio" };
  function val(name) { var c = q('input[name="' + name + '"]:checked'); return c ? c.value : ""; }
  function money(n) { return "$" + n; }
  function ids() { return Object.keys(items).filter(function (k) { return items[k].qty > 0; }); }
  function message() {
    var modo = val("modo"), suc = val("suc"), ks = ids();
    var lead = modo === "aqui" ? "Hola Adela, voy a ir a comer a la sucursal " + suc + " y quiero adelantar mi comanda:"
      : modo === "domicilio" ? "Hola Adela, quiero mi comanda a domicilio, sucursal " + suc + ":"
      : "Hola Adela, quiero mi comanda para llevar, sucursal " + suc + ":";
    if (!ks.length) return "Hola Adela, quiero pedir una comanda. ¿Qué tienen hoy en la sucursal " + suc + "?";
    var out = [lead], sum = 0, unk = false;
    ks.forEach(function (k) {
      var it = items[k];
      out.push(it.qty + " x " + it.n + (it.p ? " (" + money(it.p) + ")" : " (precio por confirmar)"));
      if (it.p) sum += it.p * it.qty; else unk = true;
    });
    out.push("Total: " + money(sum) + (unk ? " y lo que falte por confirmar" : "") + ".");
    if (modo === "domicilio") out.push("Te paso mi dirección por aquí.");
    out.push("¿Me confirmas?");
    return out.join("\n");
  }
  function render() {
    var ks = ids(), sum = 0, unk = false, n = 0;
    lines.innerHTML = "";
    ks.forEach(function (k) {
      var it = items[k], li = document.createElement("li");
      n += it.qty; if (it.p) sum += it.p * it.qty; else unk = true;
      li.innerHTML = '<span class="tk-name"></span><span class="tk-amt"></span>' +
        '<span class="tk-step"><button type="button" data-d="-1" aria-label="Quitar uno"></button><output></output><button type="button" data-d="1" aria-label="Agregar uno"></button></span>';
      q(".tk-name", li).textContent = it.n;
      q(".tk-amt", li).textContent = it.p ? money(it.p * it.qty) : "Pregunta";
      q("output", li).textContent = it.qty;
      qa("button", li)[0].textContent = "−"; qa("button", li)[1].textContent = "+";
      qa("button", li).forEach(function (b) { b.addEventListener("click", function () { change(k, +b.getAttribute("data-d")); }); });
      lines.appendChild(li);
    });
    empty.hidden = ks.length > 0; totalEl.hidden = !ks.length; clr.hidden = !ks.length; noteEl.hidden = !(ks.length && unk);
    sumEl.textContent = money(sum);
    var m = val("modo"); modeN.textContent = m === "aqui" ? "comer aquí" : m === "domicilio" ? "domicilio" : "llevar";
    send.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(message());
    qa("[data-add]").forEach(function (b) {
      var it = items[b.getAttribute("data-add")], on = it && it.qty > 0;
      b.classList.toggle("on", !!on); b.textContent = on ? "En la comanda (" + it.qty + ")" : "Agregar";
    });
    if (barra) { barra.hidden = !ks.length; if (ks.length) barraT.textContent = "Tu comanda · " + n + (n === 1 ? " plato" : " platos") + (sum ? " · " + money(sum) : ""); }
  }
  function change(id, d) { if (!items[id]) return; items[id].qty = Math.max(0, items[id].qty + d); render(); }
  qa("[data-add]").forEach(function (b) {
    b.addEventListener("click", function () {
      var id = b.getAttribute("data-add");
      if (!items[id]) items[id] = { n: b.getAttribute("data-n"), p: +b.getAttribute("data-p") || 0, qty: 0 };
      items[id].qty += 1; render();
    });
  });
  qa('input[name="modo"],input[name="suc"]').forEach(function (r) { r.addEventListener("change", render); });
  clr.addEventListener("click", function () { items = {}; render(); });
  /* pestañas */
  var tabs = qa(".tab");
  function pick(k) {
    tabs.forEach(function (t) { t.setAttribute("aria-selected", t.getAttribute("data-tab") === k ? "true" : "false"); });
    qa(".lista").forEach(function (p) { if (p.getAttribute("data-pan") === k) p.removeAttribute("data-off"); else p.setAttribute("data-off", ""); });
  }
  tabs.forEach(function (t) { t.addEventListener("click", function () { pick(t.getAttribute("data-tab")); }); });
  render();
})();
