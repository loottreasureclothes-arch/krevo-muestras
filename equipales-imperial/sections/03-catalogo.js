/* 03 CATÁLOGO + MI PEDIDO
   Las 125 piezas vienen escritas en el HTML como tarjetas (sin JS se ven todas, agrupadas
   por línea, con precio; Google las lee). El JS filtra por línea (chips fijos al bajar),
   muestra de 12 en 12, abre una hoja con foto grande al tocar "Ver", y arma "Mi pedido"
   (localStorage en try/catch) que se envía por WhatsApp. También sincroniza el contador
   del ícono "Mi pedido" del header (ver template.html / site.js).
   API: window.EQcatalogo.show(linea, scroll) · window.EQcatalogo.open(i) · window.EQpedido.add(i) */
(function () {
  "use strict";
  var sec = document.getElementById("catalogo");
  if (!sec || !window.EQ) return;
  var DATA = window.EQ_CATALOGO || [];
  var rows = Array.prototype.slice.call(sec.querySelectorAll(".eq-pcard"));
  var chips = Array.prototype.slice.call(sec.querySelectorAll(".s-cat-chip"));
  var more = sec.querySelector(".s-cat-more");
  var sub = sec.querySelector(".s-cat-sub");
  var PAGE = 12, filt = "top", shown = PAGE;
  var NAMES = { top: "piezas más pedidas", asientos: "asientos", cantineros: "cantineros", salas: "salas", comedores: "comedores", mesas: "mesas", barras: "barras", complementos: "complementos" };
  var LINE_LABEL = { asientos: "Asientos", cantineros: "Cantineros", salas: "Salas", comedores: "Comedores", mesas: "Mesas", barras: "Barras", complementos: "Complementos" };

  function list() {
    if (filt === "top") return rows.filter(function (c) { return c.hasAttribute("data-top"); }).sort(function (a, b) { return a.getAttribute("data-top") - b.getAttribute("data-top"); });
    /* las que todavía no tienen foto ("Foto en camino") se van al final de su línea */
    var L = rows.filter(function (c) { return c.getAttribute("data-c") === filt; });
    var con = [], sin = [];
    L.forEach(function (c) { (c.hasAttribute("data-noimg") ? sin : con).push(c); });
    return con.concat(sin);
  }
  function render(anim) {
    var L = list(), ul = sec.querySelector(".s-cat-grid");
    rows.forEach(function (c) { c.classList.add("is-hidden"); c.classList.remove("is-new"); });
    L.forEach(function (c, k) {
      ul.appendChild(c); /* orden de la rejilla */
      if (k < shown) { c.classList.remove("is-hidden"); if (anim) { c.style.setProperty("--k", k % PAGE); c.classList.add("is-new"); } }
    });
    var rest = L.length - shown;
    more.hidden = rest <= 0;
    if (rest > 0) more.textContent = "Ver " + Math.min(rest, PAGE) + " más de " + L.length;
  }
  function paintSub(f) {
    var L = list();
    var mins = L.map(function (c) { return DATA[+c.getAttribute("data-i")].p[0]; });
    if (!mins.length) { sub.textContent = ""; return; }
    sub.innerHTML = L.length + " " + NAMES[f] + " · desde " + EQ.money(Math.min.apply(null, mins)) + " <small>+ IVA</small>";
  }
  function show(f, scroll) {
    if (!NAMES[f]) return;
    filt = f; shown = PAGE;
    chips.forEach(function (c) { c.setAttribute("aria-pressed", c.getAttribute("data-f") === f ? "true" : "false"); });
    document.body.classList.toggle("eq-top-on", f === "top"); /* el sello "Más pedido" sobra si el filtro ya se llama así */
    var cta = sec.querySelector(".s-cat-cta");
    if (cta) { cta.querySelector("span").textContent = f === "top" ? "Cotizar por WhatsApp" : "Cotizar " + LINE_LABEL[f]; cta.href = EQ.waUrl("Hola Equipales Imperial, quiero cotizar " + (f === "top" ? "piezas de su catálogo" : LINE_LABEL[f]) + "."); }
    paintSub(f);
    render(true);
    if (scroll) {
      var h = document.querySelector(".k-header"), tb = document.querySelector(".eq-topbar");
      var off = (h ? h.offsetHeight : 0) + (tb && !document.body.classList.contains("eq-bar-off") ? tb.offsetHeight : 0);
      var top = sec.querySelector(".s-cat-chips-wrap").getBoundingClientRect().top + window.scrollY - off - 4;
      window.scrollTo({ top: top, behavior: "auto" });
    }
  }
  sec.addEventListener("click", function (e) {
    var c = e.target.closest(".s-cat-chip"); if (c) { show(c.getAttribute("data-f"), false); return; }
    if (e.target.closest(".s-cat-more")) { shown += PAGE; render(false); return; }
    var view = e.target.closest(".eq-pcard-view"); if (view) { openDetail(+view.getAttribute("data-open")); return; }
    var add = e.target.closest(".eq-pcard-add");
    if (add) {
      var i = +add.getAttribute("data-i"), was = find(i) > -1;
      toggle(i);
      if (!was) EQ.toast("Agregado a tu pedido: " + DATA[i].n, function () { fillSheet(); sh.open(); });
      return; /* Agregar no abre el detalle */
    }
    /* como en cualquier tienda: tocar la foto o el nombre abre la pieza */
    var card = e.target.closest(".eq-pcard");
    if (card && card.hasAttribute("data-i")) { openDetail(+card.getAttribute("data-i")); return; }
  });
  /* sub-links del menú, de Colecciones y del slider del hero (data-linea, y opcional data-item para abrir la pieza) */
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[data-linea]"); if (!a) return;
    e.preventDefault();
    var f = a.getAttribute("data-linea");
    var item = a.hasAttribute("data-item") ? +a.getAttribute("data-item") : -1;
    setTimeout(function () {
      show(f, true);
      if (item > -1) setTimeout(function () { openDetail(item); }, 260);
    }, 60);
  });
  show(filt, false);
  window.EQcatalogo = { show: show, open: function (i) { openDetail(i); } };

  /* ---------------- Hoja de detalle (toca "Ver" en una tarjeta) ---------------- */
  var detailEl = sec.querySelector(".s-cat-detail");
  var dsh = EQ.sheet(detailEl, "cat-detail");
  var dEye = detailEl.querySelector(".s-cd-eye"), dT = detailEl.querySelector(".eq-sheet-t"), dPh = detailEl.querySelector(".s-cd-ph"), dImg = detailEl.querySelector(".s-cd-img");
  var dPrice = detailEl.querySelector(".s-cd-price"), dMeta = detailEl.querySelector(".s-cd-meta"), dCal = detailEl.querySelector(".s-cd-cal"), dAdd = detailEl.querySelector(".s-cd-add");
  var curDetail = -1;
  function paintDetailAdd() {
    if (curDetail < 0) return;
    var on = find(curDetail) > -1;
    dAdd.setAttribute("aria-pressed", on ? "true" : "false");
    dAdd.querySelector("span").textContent = on ? "En mi pedido" : "Agregar";
    dAdd.querySelector("use").setAttribute("href", on ? "#i-check" : "#i-plus");
  }
  function openDetail(i) {
    var x = DATA[i]; if (!x) return;
    curDetail = i;
    dEye.textContent = LINE_LABEL[x.c] || "";
    dT.textContent = x.n;
    dPh.hidden = !x.img;
    if (x.img) { dImg.src = x.img; dImg.alt = x.n + " de Equipales Imperial"; }
    dPrice.innerHTML = EQ.priceTxt(x.p) + " <small>+ IVA</small>";
    dMeta.textContent = x.m || "";
    dMeta.hidden = !x.m;
    dCal.innerHTML = "";
    if (x.q && x.q.length) { x.q.forEach(function (q) { var s = document.createElement("span"); s.className = "s-cd-chip"; s.textContent = q; dCal.appendChild(s); }); }
    paintDetailAdd();
    dsh.open();
  }
  dAdd.addEventListener("click", function () {
    if (curDetail < 0) return;
    var was = find(curDetail) > -1;
    toggle(curDetail); paintDetailAdd();
    if (!was) EQ.toast("Agregado a tu pedido: " + DATA[curDetail].n, function () { fillSheet(); sh.open(); });
  });

  /* ---------------- Mi pedido ---------------- */
  var KEY = "eq_pedido", P = EQ.store.get(KEY, { lines: [], cp: "", nombre: "" });
  if (!P || !Array.isArray(P.lines)) P = { lines: [], cp: "", nombre: "" };
  P.lines = P.lines.filter(function (l) { return DATA[l.i]; });
  var bar = sec.querySelector(".s-ped-bar"), sheetEl = sec.querySelector(".s-ped-sheet");
  document.body.appendChild(bar);
  var sh = EQ.sheet(sheetEl, "pedido");
  var ul = sheetEl.querySelector(".s-ped-list"), empty = sheetEl.querySelector(".s-ped-empty"), sum = sheetEl.querySelector(".s-ped-sum");
  var cpI = sheetEl.querySelector('[name="cp"]'), nmI = sheetEl.querySelector('[name="nombre"]');
  cpI.value = P.cp || ""; nmI.value = P.nombre || "";
  /* pago: transferencia (como en su web), PayPal o tarjeta en línea. El link de cobro (Mercado Pago) va en EQ_PAGO_LINK;
     mientras esté vacío, el pedido pide el link por WhatsApp. */
  var pagos = sheetEl.querySelectorAll('[name="pago"]'), cardA = sheetEl.querySelector(".s-ped-card");
  P.pago = P.pago || "Transferencia o depósito";
  function paintPago() {
    Array.prototype.forEach.call(pagos, function (r) { r.checked = r.value === P.pago; });
    var link = window.EQ_PAGO_LINK || "";
    cardA.hidden = !(link && P.pago === "Tarjeta en línea"); cardA.href = link || "#";
  }
  Array.prototype.forEach.call(pagos, function (r) { r.addEventListener("change", function () { P.pago = r.value; save(); paintPago(); }); });
  paintPago();
  function save() { EQ.store.set(KEY, P); }
  function find(i) { for (var k = 0; k < P.lines.length; k++) if (P.lines[k].i === i) return k; return -1; }
  function toggle(i) {
    var k = find(i);
    if (k > -1) P.lines.splice(k, 1); else P.lines.push({ i: i, q: 1, cal: "" });
    save(); paint();
  }
  function count() { return P.lines.reduce(function (s, l) { return s + l.q; }, 0); }
  function desde() { return P.lines.reduce(function (s, l) { return s + DATA[l.i].p[0] * l.q; }, 0); }
  var prevCount = 0;
  function bump(el) { if (!el) return; el.classList.remove("is-bump"); void el.offsetWidth; el.classList.add("is-bump"); }
  function paint() {
    var n = count();
    /* document, no "rows": el slider "Lo más pedido" del hero repite piezas del catálogo y también
       tiene su botón Agregar (ver sections/01-hero.html) */
    Array.prototype.forEach.call(document.querySelectorAll(".eq-pcard-add[data-i]"), function (b) {
      var i = +b.getAttribute("data-i"); if (!DATA[i]) return;
      var on = find(i) > -1;
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.setAttribute("aria-label", (on ? "Quitar " : "Agregar ") + DATA[i].n + (on ? " de mi pedido" : " a mi pedido"));
      b.querySelector("use").setAttribute("href", on ? "#i-check" : "#i-plus");
      var t = b.querySelector(".eq-pcard-add-t"); if (t) t.textContent = on ? "Agregado" : "Agregar";
    });
    paintDetailAdd();
    bar.hidden = false;
    bar.classList.toggle("is-on", n > 0);
    document.body.classList.toggle("eq-ped-on", n > 0);
    var barN = bar.querySelector(".s-ped-n"), headN = document.querySelector(".eq-mp-n");
    barN.textContent = n;
    if (headN) { headN.textContent = n; headN.setAttribute("data-n", n); }
    bar.querySelector(".s-ped-t").textContent = n ? "desde " + EQ.money(desde()) + " + IVA" : "";
    if (n > prevCount) { bump(barN); bump(headN); }
    prevCount = n;
    if (sh.isOpen()) fillSheet();
  }
  function fillSheet() {
    ul.innerHTML = "";
    empty.hidden = P.lines.length > 0;
    P.lines.forEach(function (l) {
      var x = DATA[l.i], li = document.createElement("li");
      li.className = "s-ped-li";
      li.innerHTML = (x.img ? '<img src="' + x.img + '" alt="" width="64" height="64">' : '<span class="ph" aria-hidden="true"></span>') +
        '<div><b></b><small></small></div><div class="s-ped-ctl"><span class="s-ped-q"><button type="button" data-q="-1" aria-label="Uno menos"><svg aria-hidden="true"><use href="#i-minus"/></svg></button><output></output><button type="button" data-q="1" aria-label="Uno más"><svg aria-hidden="true"><use href="#i-plus"/></svg></button></span></div>';
      li.querySelector("b").textContent = x.n;
      li.querySelector("small").textContent = EQ.priceTxt(x.p) + " + IVA c/u" + (x.m ? " · " + x.m : "");
      li.querySelector("output").textContent = l.q;
      var ctl = li.querySelector(".s-ped-ctl");
      if (x.q && x.q.length) {
        var s = document.createElement("select"); s.className = "eq-input s-ped-cal"; s.setAttribute("aria-label", (x.c === "complementos" ? "Tamaño de " : "Calidad de ") + x.n);
        s.innerHTML = '<option value="">' + (x.c === "complementos" ? "Tamaño" : "Calidad") + ': que me recomienden</option>' + x.q.map(function (q) { return '<option' + (q === l.cal ? " selected" : "") + ">" + q + "</option>"; }).join("");
        s.addEventListener("change", function () { l.cal = s.value; save(); });
        ctl.appendChild(s);
      }
      var del = document.createElement("button"); del.type = "button"; del.className = "s-ped-del"; del.textContent = "Quitar";
      del.addEventListener("click", function () { toggle(l.i); });
      ctl.appendChild(del);
      li.querySelector(".s-ped-q").addEventListener("click", function (e) {
        var b = e.target.closest("button[data-q]"); if (!b) return;
        l.q = Math.max(1, Math.min(200, l.q + parseInt(b.getAttribute("data-q"), 10)));
        save(); paint();
      });
      ul.appendChild(li);
    });
    sum.textContent = P.lines.length ? count() + " piezas · desde " + EQ.money(desde()) + " + IVA (precio más bajo de cada pieza). Flete aparte." : "";
  }
  function message() {
    var t = "Hola Equipales Imperial, quiero cotizar este pedido:\n";
    P.lines.forEach(function (l) { var x = DATA[l.i]; t += "- " + l.q + " x " + x.n + (x.m ? " (" + x.m + ")" : "") + (l.cal ? ", " + (x.c === "complementos" ? "tamaño " : "calidad ") + l.cal : "") + "\n"; });
    t += "Total desde " + EQ.money(desde()) + " + IVA.\n";
    t += "Pago: " + (P.pago || "Transferencia o depósito") + (P.pago === "Tarjeta en línea" ? " (mándenme el link de pago)" : "") + ".\n";
    if (P.cp) t += "Envío a: " + P.cp + "\n";
    if (P.nombre) t += "Soy " + P.nombre + ".";
    return t.trim();
  }
  cpI.addEventListener("input", function () { P.cp = cpI.value.trim(); save(); });
  nmI.addEventListener("input", function () { P.nombre = nmI.value.trim(); save(); });
  bar.addEventListener("click", function (e) {
    if (e.target.closest(".s-ped-open") || e.target.closest(".s-ped-go")) { fillSheet(); sh.open(); }
  });
  sheetEl.querySelector(".s-ped-send").addEventListener("click", function (e) {
    if (!P.lines.length) { sh.close(); return; }
    if (!P.cp) { cpI.focus(); cpI.setAttribute("aria-invalid", "true"); cpI.placeholder = "Escribe tu ciudad o CP para el flete"; return; }
    cpI.removeAttribute("aria-invalid");
    EQ.send(message(), e.currentTarget);
  });
  /* el pedido no tapa formularios: se esconde en cotiza, personaliza, visítanos y cierre */
  if ("IntersectionObserver" in window) {
    var on = new Set();
    var io = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) on.add(x.target); else on.delete(x.target); }); bar.style.visibility = on.size ? "hidden" : ""; }, { rootMargin: "0px 0px -30% 0px" });
    ["#hero", "#cotiza", "#personaliza", "#restaurantes", "#cierre"].forEach(function (s) { var el = document.querySelector(s); if (el) io.observe(el); });
  }
  prevCount = count();
  paint();
  window.EQpedido = { add: function (i) { if (find(i) < 0) toggle(i); }, open: function () { fillSheet(); sh.open(); } };
})();
