(function () {
  "use strict";
  var doc = document.documentElement, body = document.body;
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  /* header y menú */
  var hd = $("#hd"), burger = $("#burger"), menu = $("#menu");
  function onScroll() { hd.classList.toggle("solid", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  function setMenu(open) {
    body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    menu.setAttribute("aria-hidden", open ? "false" : "true");
  }
  burger.addEventListener("click", function () { setMenu(!body.classList.contains("menu-open")); });
  $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* reveal */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var rv = $$("[data-reveal], #tide");
  if (!reduce && "IntersectionObserver" in window) {
    doc.classList.add("js-rv");
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.target.id === "tide") e.target.classList.toggle("is-in", e.isIntersecting);
        else if (e.isIntersecting || e.boundingClientRect.top < 0) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0 });
    rv.forEach(function (el) { io.observe(el); });
    setTimeout(function () {
      rv.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 1.1 && r.bottom > 0) el.classList.add("is-in");
      });
    }, 1600);
  }

  /* WhatsApp flotante: se esconde donde ya hay un verde */
  var waf = $("#waf"), hideEls = $$("[data-hide-wa]");
  function waCheck() {
    var h = window.innerHeight, off = false;
    hideEls.forEach(function (el) { var r = el.getBoundingClientRect(); if (r.top < h * 0.8 && r.bottom > h * 0.2) off = true; });
    waf.classList.toggle("off", off);
  }
  window.addEventListener("scroll", waCheck, { passive: true }); window.addEventListener("resize", waCheck); waCheck();

  /* Abierto ahora (hora de Aguascalientes) */
  var DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  function nowMx() {
    try {
      var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", hour12: false, minute: "numeric" }).formatToParts(new Date());
      var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
      var wd = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[o.weekday];
      return { d: wd, m: (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10) };
    } catch (e) { var n = new Date(); return { d: n.getDay(), m: n.getHours() * 60 + n.getMinutes() }; }
  }
  function openInfo() {
    var n = nowMx(), isOpenDay = n.d === 0 || n.d >= 4;
    if (isOpenDay && n.m >= 780 && n.m < 1140) return { on: true, long: "Abierto ahora · cierra a las 7 pm", short: "Abierto ahora", d: n.d };
    var next;
    if (isOpenDay && n.m < 780) next = "hoy a la 1 pm";
    else { var k = 1; while (!((n.d + k) % 7 === 0 || (n.d + k) % 7 >= 4)) k++; next = ((n.d + k) % 7 === 4 && k === 1 ? "mañana" : DIAS[(n.d + k) % 7]) + " a la 1 pm"; if (k === 1) next = "mañana a la 1 pm"; }
    return { on: false, long: "Cerrado ahora · abre " + next, short: "Cerrado · abre " + next, d: n.d };
  }
  var oi = openInfo();
  $$("[data-open-badge]").forEach(function (b) { b.textContent = oi.short; });
  var on = $("#openNow"); if (on) { on.textContent = oi.long; on.classList.toggle("on", oi.on); }
  $$("#hor li").forEach(function (li) { if (+li.getAttribute("data-d") === oi.d) li.classList.add("today"); });

  /* Tabla de la marea (componente firma) */
  var WA = "524491259869";
  var DISH = {};
  $$(".card").forEach(function (c) { DISH[c.getAttribute("data-id")] = { id: c.getAttribute("data-id"), name: c.getAttribute("data-name"), img: "img/" + c.getAttribute("data-id") + "-480.webp" }; });
  var qty = {}, order = [], pers = 2, dia = "", hora = "";
  var tb = $("#tb"), list = $("#tbList"), tbWa = $("#tbWa"), back = $("#tbBack");
  if (tb) tb.addEventListener("click", function (e) { if (e.target.closest(".tb-empty")) { var c = document.getElementById("carta"); if (c) c.scrollIntoView(); } });

  function msg() {
    var t = "Hola Costa Camarón, quiero reservar para " + pers + (pers === 1 ? " persona" : " personas");
    if (dia) t += " el " + dia; if (hora) t += " a las " + hora;
    t += ".";
    if (order.length) t += " Mi tabla: " + order.map(function (id) { return qty[id] + " " + DISH[id].name; }).join(", ") + ".";
    return t + " ¿Me confirman?";
  }
  function renderCards() {
    $$(".card").forEach(function (c) {
      var id = c.getAttribute("data-id"), box = $(".add", c), q = qty[id] || 0;
      if (!q) box.innerHTML = '<button type="button" class="btn btn-line" data-add="' + id + '">Agregar</button>';
      else box.innerHTML = '<div class="stp"><button type="button" data-q="-1" data-id="' + id + '" aria-label="Quitar uno">−</button><span>En tu tabla ' + q + '</span><button type="button" data-q="1" data-id="' + id + '" aria-label="Agregar otro">+</button></div>';
    });
  }
  var drawn = {};
  function render() {
    renderCards();
    var empty = !order.length;
    tb.innerHTML = empty ? '<p class="tb-empty">Tu tabla va vacía.<br>Agrega de la carta.</p>' : order.map(function (id) {
      var fresh = !drawn[id]; drawn[id] = 1;
      return '<div class="tb-st" style="background-image:url(' + DISH[id].img + ');' + (fresh ? '' : 'animation:none') + '"><span>' + DISH[id].name + (qty[id] > 1 ? " ×" + qty[id] : "") + '</span></div>';
    }).join("");
    list.innerHTML = order.map(function (id) {
      return '<li><span>' + DISH[id].name + '</span><div class="stp"><button type="button" data-q="-1" data-id="' + id + '" aria-label="Quitar uno">−</button><span>' + qty[id] + '</span><button type="button" data-q="1" data-id="' + id + '" aria-label="Agregar otro">+</button></div></li>';
    }).join("");
    back.textContent = empty ? "Agregar platillos ↑" : "Agregar otro platillo ↑";
    $("#pers").textContent = pers;
    tbWa.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg());
  }
  function change(id, d) {
    var q = (qty[id] || 0) + d;
    if (q <= 0) { delete qty[id]; delete drawn[id]; order = order.filter(function (x) { return x !== id; }); }
    else { if (!qty[id]) order.push(id); qty[id] = Math.min(q, 20); }
    render();
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    if (b.hasAttribute("data-add")) change(b.getAttribute("data-add"), 1);
    else if (b.hasAttribute("data-q")) change(b.getAttribute("data-id"), +b.getAttribute("data-q"));
    else if (b.hasAttribute("data-p")) { pers = Math.max(1, Math.min(30, pers + +b.getAttribute("data-p"))); render(); }
  });
  function chips(id, set) {
    var box = $(id);
    box.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      var was = b.classList.contains("on");
      $$("button", box).forEach(function (x) { x.classList.remove("on"); });
      if (!was) b.classList.add("on");
      set(was ? "" : b.getAttribute("data-v")); render();
    });
  }
  chips("#dias", function (v) { dia = v; }); chips("#horas", function (v) { hora = v; });
  render();
})();
