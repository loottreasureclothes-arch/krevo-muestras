(function () {
  "use strict";
  var WA = "524499188874";
  var d = document, w = window;
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };
  var reduce = w.matchMedia && w.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }

  /* wa.me: el href ya viene real; el JS solo lo reescribe */
  $$("[data-wa]").forEach(function (a) { a.href = waUrl(a.getAttribute("data-wa")); });

  /* menú */
  var body = d.body, btn = $("#hdBtn"), menu = $("#hdMenu");
  function setMenu(o) { body.classList.toggle("menu-open", o); btn.setAttribute("aria-expanded", o); btn.setAttribute("aria-label", o ? "Cerrar menú" : "Abrir menú"); }
  btn.addEventListener("click", function () { setMenu(!body.classList.contains("menu-open")); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  d.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* reveal: visible a 1.6 s pase lo que pase */
  var IO = "IntersectionObserver" in w;
  if (!reduce && IO) {
    d.documentElement.classList.add("js-rv");
    var rv = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); rv.unobserve(e.target); } }); }, { threshold: 0 });
    $$("[data-reveal]").forEach(function (el) { rv.observe(el); });
    setTimeout(function () { $$("[data-reveal]").forEach(function (el) { var r = el.getBoundingClientRect(); if (r.top < w.innerHeight && r.bottom > 0) el.classList.add("is-in"); }); }, 1600);
  }

  /* flotante de WhatsApp se esconde cuando ya hay un botón verde a la vista */
  var wf = $("#waFloat"), hideSet = [];
  if (IO && wf) {
    var hio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { var i = hideSet.indexOf(e.target); if (e.isIntersecting && i < 0) hideSet.push(e.target); if (!e.isIntersecting && i > -1) hideSet.splice(i, 1); });
      wf.classList.toggle("is-off", hideSet.length > 0);
    }, { threshold: .4 });
    $$("[data-hide-wa]").forEach(function (el) { hio.observe(el); });
  }

  /* momento firma: el mantel se tiende y la foto se asienta (reversible) */
  var mesa = $(".mesa");
  if (mesa && IO) {
    new IntersectionObserver(function (es) { es.forEach(function (e) { mesa.classList.toggle("is-seen", e.isIntersecting); }); }, { threshold: .35 }).observe(mesa);
    setTimeout(function () { var r = mesa.getBoundingClientRect(); if (r.top < w.innerHeight * .65 && r.bottom > 0) mesa.classList.add("is-seen"); }, 1600);
  } else if (mesa) { mesa.classList.add("is-seen"); }

  /* componente firma: la charola */
  var cart = {}, modo = "aquí";
  var items = {};
  $$(".it[data-id]").forEach(function (li) { items[li.getAttribute("data-id")] = { name: li.getAttribute("data-name"), price: +li.getAttribute("data-price"), el: li }; });
  var tkList = $("#tkList"), tkEmpty = $("#tkEmpty"), tkTotal = $("#tkTotal"), tkSend = $("#tkSend"), tkName = $("#tkName");
  var chip = $("#chip"), chipN = $("#chipN"), chipT = $("#chipT");
  function money(n) { return "$" + n; }
  function totals() { var n = 0, t = 0; for (var id in cart) { n += cart[id]; t += cart[id] * items[id].price; } return { n: n, t: t }; }
  function ctl(id, pop) {
    var box = $(".ctl", items[id].el), q = cart[id] || 0;
    box.innerHTML = q ? '<span class="step' + (pop ? " pop" : "") + '"><button type="button" data-dec="' + id + '" aria-label="Quitar uno">&minus;</button><output>' + q + '</output><button type="button" data-inc="' + id + '" aria-label="Agregar uno">+</button></span>' : '<button type="button" class="add" data-add="' + id + '" aria-label="Agregar ' + items[id].name + '"><span>Agregar</span></button>';
  }
  function message() {
    var tt = totals();
    if (!tt.n) return "Hola El Bodeguín, quiero hacer un pedido.";
    var lines = ["Hola El Bodeguín, quiero pedir " + (modo === "aquí" ? "para comer aquí" : "para llevar") + ":"];
    for (var id in cart) lines.push("- " + cart[id] + " x " + items[id].name + " (" + money(items[id].price * cart[id]) + ")");
    lines.push("Total: " + money(tt.t));
    var nm = tkName.value.trim(); if (nm) lines.push("A nombre de: " + nm);
    lines.push("¿Me lo confirman, por favor?");
    return lines.join("\n");
  }
  var lastTotal = 0;
  function render(changed) {
    var tt = totals(), html = "";
    for (var id in cart) html += '<li><span class="q">' + cart[id] + 'x</span><span class="n">' + items[id].name + '</span><span class="p">' + money(items[id].price * cart[id]) + '</span></li>';
    tkList.innerHTML = html; tkEmpty.hidden = tt.n > 0;
    tkTotal.textContent = money(tt.t);
    if (tt.t !== lastTotal) { tkTotal.classList.add("bump"); setTimeout(function () { tkTotal.classList.remove("bump"); }, 260); lastTotal = tt.t; }
    tkSend.href = waUrl(message());
    chipN.textContent = tt.n; chipT.textContent = money(tt.t);
    chip.hidden = !(tt.n > 0) || chipHide;
    if (changed) ctl(changed, true);
  }
  var chipHide = false;
  function setQty(id, q) { if (q <= 0) delete cart[id]; else cart[id] = Math.min(q, 20); ctl(id, true); render(); }
  Object.keys(items).forEach(function (id) { ctl(id); });
  d.addEventListener("click", function (e) {
    var t = e.target.closest("[data-add],[data-inc],[data-dec]"); if (!t) return;
    var id = t.getAttribute("data-add") || t.getAttribute("data-inc") || t.getAttribute("data-dec");
    if (t.hasAttribute("data-dec")) setQty(id, (cart[id] || 0) - 1); else setQty(id, (cart[id] || 0) + 1);
  });
  $$(".seg button").forEach(function (b) { b.addEventListener("click", function () { modo = b.getAttribute("data-modo"); $$(".seg button").forEach(function (o) { o.setAttribute("aria-pressed", o === b); }); render(); }); });
  tkName.addEventListener("input", function () { render(); });
  $("#sugerida").addEventListener("click", function () { cart = {}; Object.keys(items).forEach(function (id) { ctl(id); }); setQty("clasica", 1); setQty("gajos", 1); var p = $("#ticket"); if (p && p.scrollIntoView && w.innerWidth < 900) { var r = p.getBoundingClientRect(); if (r.top > w.innerHeight * .7) w.scrollBy(0, r.top - 120); } });
  var ch = $("#charola");
  if (IO && ch) new IntersectionObserver(function (es) { chipHide = es[0].isIntersecting; render(); }, { threshold: .15 }).observe(ch);
  render();

  /* horario: abierto ahora (hora de Aguascalientes) */
  var SCH = { 0: [14, 22.5], 1: [14, 23], 2: [14, 23], 3: [14, 23], 4: [14, 23], 5: [14, 24], 6: [14, 24] };
  function fmt(h) { var m = Math.round((h % 1) * 60), hh = Math.floor(h) % 24, ap = hh >= 12 ? "pm" : "am", h12 = hh % 12 || 12; return h12 + (m ? ":" + (m < 10 ? "0" : "") + m : "") + " " + ap; }
  function hoy() {
    try {
      var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date()), o = {};
      p.forEach(function (x) { o[x.type] = x.value; });
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      return { d: map[o.weekday], h: (+o.hour % 24) + (+o.minute) / 60 };
    } catch (e) { var n = new Date(); return { d: n.getDay(), h: n.getHours() + n.getMinutes() / 60 }; }
  }
  var now = hoy(), st = $("#status"), s = SCH[now.d];
  $$("#hrs li").forEach(function (li) { if (+li.getAttribute("data-d") === now.d) li.classList.add("today"); });
  if (st && s) {
    var open = now.h >= s[0] && now.h < s[1];
    st.classList.toggle("open", open);
    $("span", st).textContent = open ? "Abierto ahora · cierra a las " + fmt(s[1]) : (now.h < s[0] ? "Cerrado · hoy abre a las " + fmt(s[0]) : "Cerrado · abre mañana a las 2 pm");
  }
})();
