/* Firma: El pizarron. Arma enchiladas (salsa x relleno, precio real de su carta), suma te y demas,
   anota con gis, calcula el total y deja el pedido listo para dictar por telefono o copiar. Sin WhatsApp. */
(function () {
  "use strict";
  var TEL = "+524959562183";
  var PRECIOS = {
    mole:   { pollo: 100, camaron: 110 },
    suizas: { pollo: 70, camaron: 100, champi: 110 },
    mix:    { pollo: 90 }
  };
  var NOMBRES = {
    mole:   { pollo: ["enchi-mole-pollo", "Enchiladas de mole de guayaba con pollo"], camaron: ["enchi-mole-camaron", "Enchiladas de mole de guayaba con camarón"] },
    suizas: { pollo: ["suizas-pollo", "Enchiladas suizas de pollo"], camaron: ["suizas-camaron", "Enchiladas suizas de camarón"], champi: ["suizas-champi", "Enchiladas suizas de champiñón"] },
    mix:    { pollo: ["mix-pollo", "Enchiladas mix de pollo, 2 suizas y 2 de mole"] }
  };
  var SALSA_TXT = { mole: "Mole de guayaba, con arroz y ensalada.", suizas: "Suizas, con arroz y ensalada.", mix: "2 suizas y 2 de mole de guayaba, con arroz y ensalada." };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var items = []; /* {id,name,price,qty} */

  function money(n) { return "$" + n; }
  function find(id) { for (var i = 0; i < items.length; i++) if (items[i].id === id) return items[i]; return null; }
  function add(id, name, price, n) {
    var it = find(id);
    if (it) it.qty += n || 1; else items.push({ id: id, name: name, price: price, qty: n || 1 });
    render(true);
  }
  function setQty(id, d) {
    var it = find(id); if (!it) return;
    it.qty += d;
    if (it.qty <= 0) items.splice(items.indexOf(it), 1);
    render(false);
  }
  function lower(s) { return s.charAt(0).toLowerCase() + s.slice(1); }
  function texto() {
    var partes = items.map(function (it) { return it.qty + " " + it.name; });
    var total = items.reduce(function (a, it) { return a + it.qty * it.price; }, 0);
    return "Quiero pedir: " + partes.join("; ") + ". Total: " + money(total) + ". Pago en efectivo o transferencia.";
  }
  function render(flash) {
    var list = $("#b-list"), empty = $("#b-empty"), totalEl = $("#b-total"), dict = $("#b-dictar"), copy = $("#b-copy"), clear = $("#b-clear"), pill = $("#fav-n");
    if (!list) return;
    list.innerHTML = "";
    var units = 0, total = 0;
    items.forEach(function (it) {
      units += it.qty; total += it.qty * it.price;
      var li = document.createElement("li");
      li.innerHTML = '<span class="q"><button type="button" aria-label="Quitar uno de ' + it.name + '" data-d="-1">&minus;</button><span>' + it.qty + '</span><button type="button" aria-label="Agregar uno de ' + it.name + '" data-d="1">+</button></span><span>' + it.name + '</span><span class="m">' + money(it.qty * it.price) + '</span>';
      $$("button", li).forEach(function (b) { b.addEventListener("click", function () { setQty(it.id, parseInt(b.getAttribute("data-d"), 10)); }); });
      list.appendChild(li);
    });
    var vacio = items.length === 0;
    empty.hidden = !vacio;
    totalEl.textContent = vacio ? "Elige arriba" : money(total);
    totalEl.classList.toggle("vacio", vacio);
    dict.textContent = vacio ? "Aquí aparece lo que vas a decir por teléfono." : texto();
    copy.disabled = vacio;
    $("span", copy).textContent = vacio ? "Elige arriba" : "Copiar pedido";
    clear.hidden = vacio;
    if (pill) { pill.hidden = vacio; pill.textContent = units; }
    if (flash) { var b = $(".board"); if (b) { b.classList.remove("board-flash"); void b.offsetWidth; b.classList.add("board-flash"); } }
  }

  /* constructor de enchiladas */
  function salsa() { return $('input[name="salsa"]:checked').value; }
  function rell() { return $('input[name="rell"]:checked').value; }
  function sync() {
    var s = salsa(), tabla = PRECIOS[s];
    $$('input[name="rell"]').forEach(function (r) { r.disabled = !(r.value in tabla); });
    if (!(rell() in tabla)) { var first = $('input[name="rell"][value="pollo"]'); first.checked = true; }
    $("#b-price").textContent = money(tabla[rell()]);
    $("#b-cap").textContent = SALSA_TXT[s];
    $$(".bp").forEach(function (im) { im.classList.toggle("on", im.classList.contains("bp-" + s)); });
  }
  $$('input[name="salsa"], input[name="rell"]').forEach(function (r) { r.addEventListener("change", sync); });
  $("#b-add").addEventListener("click", function () {
    var n = NOMBRES[salsa()][rell()];
    add(n[0], n[1], PRECIOS[salsa()][rell()], 1);
  });

  /* botones Agregar de toda la pagina */
  $$("[data-add]").forEach(function (b) {
    b.addEventListener("click", function () {
      add(b.getAttribute("data-add"), b.getAttribute("data-name"), parseInt(b.getAttribute("data-price"), 10), 1);
      var sp = $("span", b), old = sp.getAttribute("data-old") || sp.textContent;
      sp.setAttribute("data-old", old);
      sp.textContent = "En el pizarrón";
      b.classList.add("did");
      clearTimeout(b._t);
      b._t = setTimeout(function () { sp.textContent = old; b.classList.remove("did"); }, 1300);
    });
  });

  $("#b-clear").addEventListener("click", function () { items = []; render(false); });
  $("#b-copy").addEventListener("click", function () {
    if (!items.length) return;
    var t = texto(), btn = $("#b-copy"), sp = $("span", btn);
    function ok() { sp.textContent = "Copiado"; setTimeout(function () { sp.textContent = "Copiar pedido"; }, 1400); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(ok, fallback); else fallback();
    function fallback() {
      var ta = document.createElement("textarea"); ta.value = t; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); ok(); } catch (e) {} document.body.removeChild(ta);
    }
  });
  $("#b-call").setAttribute("href", "tel:" + TEL);
  sync(); render(false);
  window.AlgarabiaPedido = { texto: texto, items: function () { return items.slice(); } };
})();
