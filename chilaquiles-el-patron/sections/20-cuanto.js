/* 20-cuanto: moneda de presupuesto + tarjetas de combo + foto que cambia + decisiones + línea de nota + wa.me */
(function () {
  "use strict";
  if (!window.EP) return;
  var EPx = window.EP, COMBOS = EPx.COMBOS, ITEMS = EPx.ITEMS;
  var $ = function (id) { return document.getElementById(id); };
  var inp = $("ep-budget"), amount = $("ep-amount"), fill = $("ep-fill"), coin = $("ep-coin");
  var cards = $("ep-cards"), cap = $("ep-pic-cap"), note = $("ep-note"), send = $("ep-send"), cafe = $("ep-cafe"), nombre = $("ep-nombre");
  if (!inp || !cards) return;
  var pics = Array.prototype.slice.call(document.querySelectorAll(".ep-pic-img"));
  var shown = "", swapTimer = null;

  function lower(s) { return String(s || "").toLowerCase(); }
  function candidates(b) {
    return COMBOS.filter(function (c) { return c.total <= b; }).sort(function (a, z) { return z.total - a.total; }).slice(0, 3);
  }
  function cardHtml(c) {
    var lines = c.it.map(function (k) { return "<li><span>" + ITEMS[k][0] + "</span><b class=\"ep-num\">$" + ITEMS[k][1] + "</b></li>"; }).join("");
    return '<li class="ep-card" data-id="' + c.id + '"><div class="ep-card-in"><h4 class="ep-card-name">' + c.name + "</h4><ul class=\"ep-lines\">" + lines +
      '</ul><div class="ep-card-foot"><span class="ep-total ep-num">$' + c.total + '<small>sin IVA</small></span><button type="button" class="ep-btn ep-pick" data-id="' + c.id + '">Elegir este</button></div></div></li>';
  }
  function marks(s) {
    Array.prototype.forEach.call(cards.querySelectorAll(".ep-card"), function (li) {
      var on = li.getAttribute("data-id") === s.combo, b = li.querySelector(".ep-pick");
      li.classList.toggle("is-picked", on);
      b.classList.toggle("ep-btn--ink", on);
      b.textContent = on ? "Anotado" : "Elegir este";
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }
  function drawCards(list, s) { cards.innerHTML = list.map(cardHtml).join(""); shown = list.map(function (c) { return c.id; }).join(","); marks(s); }
  function renderCards(s) {
    var list = candidates(s.budget), key = list.map(function (c) { return c.id; }).join(",");
    if (key === shown) { marks(s); return; }
    if (!shown || EPx.reduce) { drawCards(list, s); return; }
    clearTimeout(swapTimer); cards.classList.add("is-swap");
    swapTimer = setTimeout(function () { drawCards(candidates(EPx.state.budget), EPx.state); cards.classList.remove("is-swap"); }, 90);
  }
  function famFor(s) {
    var c = EPx.comboById(s.combo) || candidates(s.budget)[0];
    return c ? c.fam : "verde";
  }
  function paintPic(fam) {
    var cur = null;
    pics.forEach(function (im) { var on = im.getAttribute("data-fam") === fam; im.classList.toggle("is-on", on); if (on) cur = im; });
    if (cur && cap) cap.textContent = cur.getAttribute("data-cap");
  }
  function noteHtml(s) {
    var c = EPx.comboById(s.combo);
    if (!c) return "Mueve la moneda y elige una.";
    var p = ["<b>ANOTADO:</b> " + c.name + "."];
    if (s.salsa) p.push(s.salsa === "Sin salsa" ? "Sin salsa." : "Salsa " + lower(s.salsa) + ".");
    if (s.modo === "aqui") p.push("Para comer aquí."); else if (s.modo === "paso") p.push("Paso por él."); else if (s.modo === "dom") p.push("A domicilio, con costo extra.");
    p.push("Suma $" + c.total + (s.cafe ? " + café por confirmar" : "") + ". Sin IVA.");
    return p.join(" ");
  }
  function sync(s) {
    var pct = (s.budget - 60) / 90;
    if (+inp.value !== s.budget) inp.value = s.budget;
    inp.setAttribute("aria-valuetext", s.budget + " pesos");
    amount.textContent = "$" + s.budget;
    coin.style.left = "calc((100% - 44px) * " + pct + ")";
    fill.style.width = "calc(22px + (100% - 44px) * " + pct + ")";
    renderCards(s);
    paintPic(famFor(s));
    Array.prototype.forEach.call(document.querySelectorAll('input[name="ep-salsa"]'), function (r) { r.checked = r.value === s.salsa; });
    Array.prototype.forEach.call(document.querySelectorAll('input[name="ep-modo"]'), function (r) { r.checked = r.value === s.modo; });
    cafe.checked = !!s.cafe;
    if (document.activeElement !== nombre && nombre.value !== s.nombre) nombre.value = s.nombre || "";
    note.innerHTML = noteHtml(s);
    send.href = EPx.waUrl(EPx.message());
  }
  inp.addEventListener("input", function () { EPx.set({ budget: +inp.value }); });
  cards.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest(".ep-pick") : null; if (!b) return;
    EPx.set({ combo: b.getAttribute("data-id") });
  });
  Array.prototype.forEach.call(document.querySelectorAll('input[name="ep-salsa"]'), function (r) { r.addEventListener("change", function () { EPx.set({ salsa: r.value }); }); });
  Array.prototype.forEach.call(document.querySelectorAll('input[name="ep-modo"]'), function (r) { r.addEventListener("change", function () { EPx.set({ modo: r.value }); }); });
  cafe.addEventListener("change", function () { EPx.set({ cafe: cafe.checked }); });
  nombre.addEventListener("input", function () { EPx.set({ nombre: nombre.value }); });
  EPx.subscribe(sync);
})();
