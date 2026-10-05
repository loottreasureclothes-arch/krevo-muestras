/* La hora de la terraza: sol deslizable + carta por hora + lista que se llama o se copia */
(function () {
  "use strict";
  var app = document.getElementById("mesa-app");
  if (!app) return;
  var TEL = "tel:+524581610310";
  var HORAS = [
    { n: "Mediodía", fr: "al mediodía", nota: "Terraza de día, con la torre enfrente. Abierto de jueves a sábado desde las 8:00 y domingo hasta las 19:00.", items: [
      { id: "guac", n: "Guacamole natural", d: "Con totopos de maíz.", p: 174 },
      { id: "ench", n: "Enchiladas verdes", d: "Pollo, queso gratinado y crema.", p: 156 },
      { id: "hclas", n: "Hamburguesa clásica", d: "Res, queso amarillo y manchego.", p: 165 },
      { id: "tarr", n: "Taco de arrachera", d: "Pimientos y cebolla cambray.", p: 101 }
    ] },
    { n: "Atardecer", fr: "al atardecer", nota: "Cuando se enciende la Catedral. Pizza, tapas y algo frío para mirar.", items: [
      { id: "tapas", n: "Tabla de tapas", d: "Jamón serrano, melón, salami y queso de cabra.", p: 157 },
      { id: "catrina", n: "Pizza Catrina", d: "Jamón, salami y pepperoni.", p: 214 },
      { id: "marga", n: "Pizza Margarita", d: "Mozzarella fresca y albahaca.", p: 203 },
      { id: "sangria", n: "Sangría", d: "La de la foto, con vista.", p: null }
    ] },
    { n: "Noche", fr: "de noche", nota: "Luces en la terraza. Jueves a sábado hasta las 23:00; el domingo se cierra a las 19:00.", items: [
      { id: "prosc", n: "Pizza Cazona Prosciutto", d: "Jamón serrano, arúgula y balsámico.", p: 280 },
      { id: "mole", n: "Mole Cazona", d: "Pollo, arroz y tortillas de maíz.", p: 295 },
      { id: "carajillo", n: "Carajillo", d: "Para cerrar la cena.", p: 184 },
      { id: "michelada", n: "Michelada con Modelo", d: "La de la foto de noche.", p: null }
    ] }
  ];
  var all = {}; HORAS.forEach(function (h) { h.items.forEach(function (it) { all[it.id] = it; }); });
  var st = { h: 0, q: {} };
  var $ = function (id) { return document.getElementById(id); };
  var imgs = app.querySelectorAll(".st");
  var range = $("sky"), tag = $("stage-tag"), note = $("mesa-note"), opts = $("opts");
  var tl = $("ticket-l"), total = $("ticket-total"), ask = $("ticket-ask"), copy = $("mesa-copy"), ok = $("ticket-ok"), hora = $("ticket-hora");
  var btns = app.querySelectorAll(".sky-lbl button");
  function money(n) { return "$" + n.toLocaleString("es-MX"); }
  function setHora(h) {
    st.h = h;
    for (var i = 0; i < imgs.length; i++) { var a = +imgs[i].getAttribute("data-h") === h; imgs[i].classList.toggle("is-on", a); imgs[i].setAttribute("aria-hidden", a ? "false" : "true"); }
    for (i = 0; i < btns.length; i++) { var on = +btns[i].getAttribute("data-h") === h; btns[i].classList.toggle("is-on", on); btns[i].setAttribute("aria-pressed", on ? "true" : "false"); }
    range.value = h; tag.textContent = HORAS[h].n; hora.textContent = HORAS[h].n; note.textContent = HORAS[h].nota;
    drawOpts(); drawTicket();
  }
  function drawOpts() {
    opts.innerHTML = "";
    HORAS[st.h].items.forEach(function (it, i) {
      var li = document.createElement("li"); li.className = "opt"; li.style.setProperty("--i", i);
      var inn = st.q[it.id] > 0;
      li.innerHTML = '<span><b>' + it.n + '</b></span>' +
        '<button type="button" class="add' + (inn ? " is-in" : "") + '" data-id="' + it.id + '" aria-label="' + (inn ? "Quitar " : "Agregar ") + it.n + '"><svg class="ic" aria-hidden="true"><use href="#' + (inn ? "i-minus" : "i-plus") + '"/></svg><span>' + (inn ? "Quitar" : "Agregar") + '</span></button>' +
        '<span class="opt-d">' + it.d + ' <span class="pr' + (it.p == null ? " pr--ask" : "") + '">' + (it.p == null ? "Pregunta el precio" : money(it.p)) + '</span></span>';
      opts.appendChild(li);
    });
  }
  function lines() { var out = []; Object.keys(st.q).forEach(function (id) { if (st.q[id] > 0) out.push({ it: all[id], q: st.q[id] }); }); return out; }
  function drawTicket() {
    var L = lines(), sum = 0, anyAsk = false;
    tl.innerHTML = "";
    if (!L.length) { var e = document.createElement("li"); e.className = "ticket-empty"; e.textContent = "Todavía no agregas nada."; tl.appendChild(e); }
    L.forEach(function (x) {
      var li = document.createElement("li");
      var pr = x.it.p == null ? '<span class="tl-p ask">Pregunta el precio</span>' : '<span class="tl-p">' + money(x.it.p * x.q) + '</span>';
      if (x.it.p == null) anyAsk = true; else sum += x.it.p * x.q;
      li.innerHTML = '<span class="tl-n">' + x.q + " × " + x.it.n + '</span>' + pr +
        '<span class="qty"><button type="button" data-d="-1" data-id="' + x.it.id + '" aria-label="Quitar uno de ' + x.it.n + '"><svg class="ic" aria-hidden="true"><use href="#i-minus"/></svg></button><output>' + x.q + '</output><button type="button" data-d="1" data-id="' + x.it.id + '" aria-label="Agregar uno de ' + x.it.n + '"><svg class="ic" aria-hidden="true"><use href="#i-plus"/></svg></button></span>';
      tl.appendChild(li);
    });
    var priced = L.some(function (x) { return x.it.p != null; });
    total.textContent = priced ? money(sum) : (L.length ? "Pregunta el precio" : "Elige arriba");
    total.classList.toggle("is-empty", !priced);
    ask.hidden = !anyAsk;
    copy.disabled = !L.length;
  }
  function message() {
    var L = lines();
    var t = "Hola, quiero apartar mesa en la terraza de Cazona Corzo, " + HORAS[st.h].fr + ". ";
    if (L.length) {
      t += "Me gustaría pedir: " + L.map(function (x) { return x.q + " " + x.it.n + (x.it.p == null ? " (precio por confirmar)" : " (" + money(x.it.p * x.q) + ")"); }).join(", ") + ". ";
      var s = 0; L.forEach(function (x) { if (x.it.p != null) s += x.it.p * x.q; });
      if (s) t += "Total aproximado: " + money(s) + ". ";
    }
    return t + "¿Tienen lugar?";
  }
  window.CazonaMesa = { message: message };
  opts.addEventListener("click", function (e) {
    var b = e.target.closest(".add"); if (!b) return;
    var id = b.getAttribute("data-id");
    st.q[id] = st.q[id] > 0 ? 0 : 1; ok.textContent = "";
    drawOpts(); drawTicket();
  });
  tl.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-d]"); if (!b) return;
    var id = b.getAttribute("data-id"); st.q[id] = Math.max(0, (st.q[id] || 0) + (+b.getAttribute("data-d")));
    ok.textContent = ""; drawOpts(); drawTicket();
  });
  range.addEventListener("input", function () { setHora(+range.value); });
  Array.prototype.forEach.call(btns, function (b) { b.addEventListener("click", function () { setHora(+b.getAttribute("data-h")); }); });
  copy.addEventListener("click", function () {
    var t = message();
    function done(good) { ok.textContent = good ? "Lista copiada. Pégala donde quieras o léela al llamar." : "No se pudo copiar. Léela así: " + t; }
    if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(t).then(function () { done(true); }, function () { fallback(); }); }
    else fallback();
    function fallback() {
      try { var ta = document.createElement("textarea"); ta.value = t; ta.setAttribute("readonly", ""); ta.style.cssText = "position:fixed;opacity:0;top:0"; document.body.appendChild(ta); ta.select(); var r = document.execCommand("copy"); document.body.removeChild(ta); done(r); }
      catch (err) { done(false); }
    }
  });
  setHora(0);
})();
