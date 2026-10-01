/* 20-bascula · la báscula del mostrador: tres topes reales de su carta, la nota y el mensaje de WhatsApp */
(function () {
  "use strict";
  var ui = document.getElementById("bascula-ui");
  if (!ui) return;
  var WA = "524494731508";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }

  var TOPES = [130, 150, 170];
  var PRECIO = { 130: 130, 150: 155, 170: 165 };
  var TAM = { 130: ["chico", "chicos"], 150: ["mediano", "medianos"], 170: ["grande", "grandes"] };
  var MACHO = 20;
  var KILO = { llevar: 890, carne: 940 };
  /* id: [nombre en la nota, precio, singular para el mensaje, plural para el mensaje] */
  var ITEMS = {
    "takotes": ["Takotes (65 g)", 62, "takote (65 g)", "takotes (65 g)"],
    "taco-queso": ["Taco con queso", 67, "taco con queso", "tacos con queso"],
    "taquito-inf": ["Taquito infantil", 29, "taquito infantil", "taquitos infantiles"],
    "taquito-queso": ["Taquito con queso", 35, "taquito con queso", "taquitos con queso"],
    "cons-inf": ["Consomé infantil", 35, "consomé infantil", "consomés infantiles"],
    "cons-ch": ["Consomé chico (300 ml)", 48, "consomé chico", "consomés chicos"],
    "cons-gr": ["Consomé grande (1/2 L)", 58, "consomé grande", "consomés grandes"],
    "cons-lt": ["Litro de consomé", 116, "litro de consomé", "litros de consomé"],
    "q-queso": ["Quesadilla de queso", 35, "quesadilla de queso", "quesadillas de queso"],
    "q-huit": ["Quesadilla de huitlacoche", 45, "quesadilla de huitlacoche", "quesadillas de huitlacoche"],
    "q-flor": ["Quesadilla de flor de calabaza", 45, "quesadilla de flor de calabaza", "quesadillas de flor de calabaza"],
    "q-champ": ["Quesadilla de champiñón", 45, "quesadilla de champiñón", "quesadillas de champiñón"],
    "q-comb": ["Quesadilla combinada", 50, "quesadilla combinada", "quesadillas combinadas"],
    "flan": ["Flan napolitano", 49, "flan napolitano", "flanes napolitanos"],
    "pay": ["Pay de limón", 49, "pay de limón", "pays de limón"],
    "fresas": ["Fresas con crema", 45, "fresas con crema", "fresas con crema"],
    "arroz": ["Arroz con leche", 35, "arroz con leche", "arroz con leche"],
    "t-doc": ["Docena de tortillas", 40, "docena de tortillas", "docenas de tortillas"],
    "t-med": ["Media docena de tortillas", 20, "media docena de tortillas", "medias docenas de tortillas"]
  };
  var ORDER = Object.keys(ITEMS);

  var st = { carne: "barbacoa", modo: "plato", tope: 0, macho: false, kilo: "", qty: 1, items: {}, nombre: "" };
  function load() {
    st.tope = 150; /* sin nota guardada, la báscula arranca con el plato mediano de su carta */
    try {
      var raw = sessionStorage.getItem("gc_nota");
      if (!raw) return;
      st.tope = 0;
      var o = JSON.parse(raw);
      if (o.carne === "birria") st.carne = "birria";
      if (o.modo === "kilo") st.modo = "kilo";
      if (TOPES.indexOf(o.tope) > -1) st.tope = o.tope;
      st.macho = !!o.macho;
      if (KILO[o.kilo]) st.kilo = o.kilo;
      var q = parseInt(o.qty, 10); if (q >= 1 && q <= 20) st.qty = q;
      if (o.items && typeof o.items === "object") ORDER.forEach(function (id) { var n = parseInt(o.items[id], 10); if (n >= 1 && n <= 20) st.items[id] = n; });
      if (typeof o.nombre === "string") st.nombre = o.nombre.slice(0, 40);
    } catch (e) {}
  }
  function save() { try { sessionStorage.setItem("gc_nota", JSON.stringify(st)); } catch (e) {} }
  load();

  var dial = $("#dial"), needle = $("#needle"), oval = $(".gc-plato-oval");
  var elG = $("#lect-g"), elP = $("#lect-p"), elS = $("#lect-s");
  var rows = $("#nota-rows"), vacia = $("#nota-vacia"), totalEl = $("#total");
  var mini = $("#mini"), miniT = $("#mini-t");
  var nombre = $("#nombre");
  var czLleno = $(".gc-cz-lleno"), czVacio = $(".gc-cz-vacio"), czRes = $("#cz-resumen"), czRows = $("#cz-rows"), czTotal = $("#cz-total"), czVac = $("#cz-vacio");

  function money(n) { return "$" + n; }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  /* Renglón principal (plato o kilo) */
  function main() {
    if (st.modo === "plato" && st.tope) {
      var unit = PRECIO[st.tope] + (st.macho ? MACHO : 0), t = TAM[st.tope];
      return { k: "main", q: st.qty, unit: unit,
        name: "Plato " + t[0] + " de " + st.carne + " (" + st.tope + "\u00a0g)" + (st.macho ? ", con macho" : ""),
        one: "plato " + t[0] + " de " + st.carne + " (" + st.tope + " g)" + (st.macho ? " con macho" : ""),
        many: "platos " + t[1] + " de " + st.carne + " (" + st.tope + " g)" + (st.macho ? " con macho" : "") };
    }
    if (st.modo === "kilo" && st.kilo === "llevar") {
      return { k: "main", q: st.qty, unit: KILO.llevar, name: "Kilo de " + st.carne + " para llevar", one: "kilo de " + st.carne + " para llevar", many: "kilos de " + st.carne + " para llevar" };
    }
    if (st.modo === "kilo" && st.kilo === "carne") {
      return { k: "main", q: st.qty, unit: KILO.carne, name: "Carne por kilo", one: "kilo de carne de su lista por kilo", many: "kilos de carne de su lista por kilo" };
    }
    return null;
  }
  function lines() {
    var out = [], m = main();
    if (m) out.push(m);
    ORDER.forEach(function (id) {
      var n = st.items[id]; if (!n) return;
      var it = ITEMS[id];
      out.push({ k: id, q: n, unit: it[1], name: it[0], one: it[2], many: it[3], item: true });
    });
    return out;
  }
  function total(ls) { return ls.reduce(function (a, l) { return a + l.unit * l.q; }, 0); }
  function message() {
    var ls = lines();
    if (!ls.length) return "Hola, quiero preguntar por la barbacoa y la birria.";
    var parts = ["Hola, ¿me pueden preparar esto para llevar?"];
    ls.forEach(function (l) { parts.push(l.q + " " + (l.q === 1 ? l.one : l.many) + "."); });
    parts.push("Total según su carta: " + money(total(ls)) + ".");
    var n = (st.nombre || "").trim();
    if (n) parts.push("Mi nombre: " + n + ".");
    return parts.join(" ");
  }
  window.GC_BASCULA = { message: message, state: st };

  /* Aguja */
  function deg(v, M) { return (v / M) * 180 - 90; }
  function paint(d) { if (needle) needle.style.transform = "rotate(" + d.toFixed(2) + "deg)"; }
  var settleT = null;
  function settle() {
    if (!oval || reduce) return;
    clearTimeout(settleT);
    settleT = setTimeout(function () { oval.classList.remove("is-asienta"); void oval.offsetWidth; oval.classList.add("is-asienta"); }, 300);
  }
  if (oval) oval.addEventListener("animationend", function () { oval.classList.remove("is-asienta"); });

  var prevKeys = null, lastSig = "";
  function render(opts) {
    opts = opts || {};
    var isKilo = st.modo === "kilo";
    dial.classList.toggle("is-kilo", isKilo);
    $("#modo-plato").hidden = isKilo;
    $("#modo-kilo").hidden = !isKilo;
    /* radios y casillas */
    $$('input[name="carne"]', ui).forEach(function (r) { r.checked = r.value === st.carne; });
    $$('input[name="tope"]', ui).forEach(function (r) { r.checked = !isKilo && parseInt(r.value, 10) === st.tope; });
    $$('input[name="modo"]', ui).forEach(function (r) { r.checked = r.value === st.modo; });
    $$('input[name="kilo"]', ui).forEach(function (r) { r.checked = isKilo && r.value === st.kilo; });
    var mc = $("#macho"); if (mc) mc.checked = st.macho;
    /* platillo */
    $$(".gc-pl", ui).forEach(function (im) { im.classList.toggle("is-on", im.classList.contains("gc-pl--" + st.carne)); });
    /* aguja y lectura */
    var m = main();
    if (!opts.dragging) {
      var v, M;
      if (isKilo) { M = 1000; v = st.kilo ? 1000 : 0; } else { M = 200; v = st.tope || 0; }
      paint(deg(v, M));
      $$(".t-tope", dial).forEach(function (l) { l.classList.toggle("is-on", !isKilo && parseInt(l.getAttribute("data-t"), 10) === st.tope); });
      dial.setAttribute("aria-valuemax", M);
      dial.setAttribute("aria-valuenow", v);
      if (isKilo) {
        elG.textContent = st.kilo ? "1 KILO" : "0 g";
        elP.textContent = st.kilo ? money(KILO[st.kilo]) : "Elige una opción";
        elS.textContent = st.kilo === "llevar" ? cap(st.carne) + ", para llevar" : st.kilo === "carne" ? "Carne por kilo" : cap(st.carne);
        dial.setAttribute("aria-valuetext", st.kilo ? "1 kilo" : "Sin kilo elegido");
      } else if (st.tope) {
        elG.textContent = st.tope + " g";
        elP.textContent = money(PRECIO[st.tope] + (st.macho ? MACHO : 0));
        elS.textContent = cap(st.carne) + ", plato " + TAM[st.tope][0] + (st.macho ? ", con macho (+$20)" : "");
        dial.setAttribute("aria-valuetext", st.tope + " gramos, " + money(PRECIO[st.tope]));
      } else {
        elG.textContent = "0 g"; elP.textContent = "Elige un tamaño"; elS.textContent = cap(st.carne);
        dial.setAttribute("aria-valuetext", "Sin plato");
      }
      var sig = st.modo + ":" + st.tope + ":" + st.kilo;
      if (sig !== lastSig && (st.tope || st.kilo) && lastSig !== "") settle();
      lastSig = sig;
    }
    /* nota */
    var ls = lines(), t = total(ls);
    var keys = ls.map(function (l) { return l.k; });
    var html = ls.map(function (l) {
      var isNew = prevKeys && prevKeys.indexOf(l.k) === -1;
      return '<li class="gc-nr' + (isNew ? " is-new" : "") + '" data-k="' + l.k + '">' +
        '<button type="button" class="gc-nr-b" data-dec="' + l.k + '" aria-label="Quitar uno: ' + l.name + '"><span><svg aria-hidden="true"><use href="#i-menos"/></svg></span></button>' +
        '<span class="gc-nr-q">' + l.q + " ×</span>" +
        '<span class="gc-nr-n">' + l.name + "</span>" +
        '<b class="gc-nr-p">' + money(l.unit * l.q) + "</b>" +
        (l.k === "main" ? '<button type="button" class="gc-nr-b" data-inc="main" aria-label="Agregar uno: ' + l.name + '"><span><svg aria-hidden="true"><use href="#i-mas"/></svg></span></button>' : "") +
        "</li>";
    }).join("");
    if (rows) rows.innerHTML = html;
    prevKeys = keys;
    if (vacia) vacia.hidden = ls.length > 0;
    if (totalEl) totalEl.classList.toggle("is-vacio", !ls.length);
    if (czTotal) czTotal.classList.toggle("is-vacio", !ls.length);
    if (totalEl) totalEl.textContent = ls.length ? money(t) : "SIN ELEGIR";
    $$(".gc-add").forEach(function (b) { var n = st.items[b.getAttribute("data-add")]; if (n) b.setAttribute("data-n", n); else b.removeAttribute("data-n"); });
    var pcs = ls.reduce(function (a, l) { return a + l.q; }, 0);
    if (mini) { mini.hidden = !ls.length; if (miniT) miniT.textContent = pcs + (pcs === 1 ? " PIEZA" : " PIEZAS") + " · " + money(t); }
    /* cierre */
    if (czLleno) czLleno.hidden = !ls.length;
    if (czVacio) czVacio.hidden = ls.length > 0;
    if (czRes) czRes.hidden = !ls.length;
    if (czVac) czVac.hidden = ls.length > 0;
    if (czRows) czRows.innerHTML = ls.map(function (l) { return "<li><span>" + l.q + " × " + l.name + "</span><b>" + money(l.unit * l.q) + "</b></li>"; }).join("");
    if (czTotal) czTotal.textContent = ls.length ? money(t) : "SIN ELEGIR";
    /* WhatsApp: solo se reescribe el href */
    var href = waUrl(message());
    $$('[data-wa="nota"]').forEach(function (a) { a.href = href; });
    if (nombre && nombre.value !== st.nombre) nombre.value = st.nombre;
    save();
  }

  function setTope(t) { st.modo = "plato"; st.tope = t; render(); }

  /* Eventos */
  ui.addEventListener("change", function (e) {
    var r = e.target;
    if (!r || !r.name) { if (r && r.id === "macho") { st.macho = r.checked; render(); } return; }
    if (r.name === "carne") { st.carne = r.value; render(); }
    else if (r.name === "tope") { setTope(parseInt(r.value, 10)); }
    else if (r.name === "modo") { st.modo = r.value; render(); }
    else if (r.name === "kilo") { st.kilo = r.value; render(); }
  });
  var mach = $("#macho"); if (mach) mach.addEventListener("change", function () { st.macho = mach.checked; render(); });

  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("[data-add],[data-dec],[data-inc],[data-tope]") : null;
    if (!t) return;
    var id;
    if ((id = t.getAttribute("data-add"))) { if ((st.items[id] || 0) < 20) st.items[id] = (st.items[id] || 0) + 1; render(); }
    else if ((id = t.getAttribute("data-dec"))) {
      if (id === "main") {
        if (st.qty > 1) st.qty--; else { if (st.modo === "plato") st.tope = 0; else st.kilo = ""; }
      } else { st.items[id] = (st.items[id] || 1) - 1; if (st.items[id] <= 0) delete st.items[id]; }
      render();
    }
    else if (t.getAttribute("data-inc")) { if (st.qty < 20) st.qty++; render(); }
    else if (t.hasAttribute("data-tope")) { setTope(parseInt(t.getAttribute("data-tope"), 10)); }
  });

  if (nombre) nombre.addEventListener("input", function () { st.nombre = nombre.value.slice(0, 40); var href = waUrl(message()); $$('[data-wa="nota"]').forEach(function (a) { a.href = href; }); save(); });

  /* Arrastrar la aguja (solo por plato): al soltar se pega al tope más cercano */
  var drag = false;
  function pointerValue(e) {
    var r = dial.getBoundingClientRect(), s = r.width / 320;
    var px = r.left + 160 * s, py = r.top + 172 * s;
    var a = Math.atan2(py - e.clientY, e.clientX - px);
    if (a < 0) a = e.clientX < px ? Math.PI : 0;
    return Math.max(0, Math.min(200, (1 - a / Math.PI) * 200));
  }
  function move(e) {
    var v = pointerValue(e);
    paint(deg(v, 200));
    elG.textContent = (Math.round(v / 5) * 5) + " g";
    elP.textContent = "Suelta en un tope";
  }
  dial.addEventListener("pointerdown", function (e) {
    if (st.modo !== "plato") return;
    drag = true; dial.classList.add("is-drag");
    try { dial.setPointerCapture(e.pointerId); } catch (er) {}
    move(e);
  });
  dial.addEventListener("pointermove", function (e) { if (drag) move(e); });
  function end(e) {
    if (!drag) return;
    drag = false; dial.classList.remove("is-drag");
    var v = pointerValue(e), best = 0, bd = 1e9;
    if (v < 60) best = 0; else TOPES.forEach(function (t) { var d = Math.abs(t - v); if (d < bd) { bd = d; best = t; } });
    st.tope = best; render();
  }
  dial.addEventListener("pointerup", end);
  dial.addEventListener("pointercancel", function () { if (!drag) return; drag = false; dial.classList.remove("is-drag"); render(); });
  dial.addEventListener("keydown", function (e) {
    if (st.modo !== "plato") return;
    var i = TOPES.indexOf(st.tope), k = e.key, n = null;
    if (k === "ArrowRight" || k === "ArrowUp") n = i < 0 ? TOPES[0] : TOPES[Math.min(TOPES.length - 1, i + 1)];
    else if (k === "ArrowLeft" || k === "ArrowDown") n = i <= 0 ? 0 : TOPES[i - 1];
    else if (k === "Home") n = 0; else if (k === "End") n = TOPES[TOPES.length - 1];
    if (n === null) return;
    e.preventDefault(); st.tope = n; render();
  });

  /* Primer pintado sin animar la aguja */
  needle.style.transition = "none";
  render();
  requestAnimationFrame(function () { requestAnimationFrame(function () { needle.style.transition = ""; }); });

  /* La mini barra solo aparece ya dentro de la báscula (no encima del hero) */
  var miniWrap = mini ? mini.parentNode : null, secB = ui.closest ? (ui.closest("section") || ui) : ui;
  var notaEl = document.getElementById("nota"), pedirEl = $(".gc-pedir");
  function miniPos() {
    if (!miniWrap) return;
    var vh = window.innerHeight, r = secB.getBoundingClientRect(), lejos = r.top > vh * 0.35;
    if (!lejos && notaEl && pedirEl) { var a = notaEl.getBoundingClientRect(), b = pedirEl.getBoundingClientRect(); if (a.top < vh - 20 && b.bottom > 0) lejos = true; }
    miniWrap.classList.toggle("is-lejos", lejos);
  }
  window.addEventListener("scroll", miniPos, { passive: true }); window.addEventListener("resize", miniPos); miniPos();

  /* Al asomar la báscula por primera vez, la aguja sube de 0 al peso elegido (solo adorno; la lectura ya es la real) */
  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (en) {
      if (!en[0].isIntersecting) return;
      io.disconnect();
      if (st.modo !== "plato" || !st.tope || drag) return;
      needle.style.transition = "none"; paint(deg(0, 200));
      void needle.getBoundingClientRect();
      requestAnimationFrame(function () { needle.style.transition = "transform .7s cubic-bezier(.2,.9,.25,1.15)"; paint(deg(st.tope, 200)); settle();
        setTimeout(function () { needle.style.transition = ""; }, 750); });
    }, { threshold: 0.6 });
    io.observe(dial);
  }
})();
