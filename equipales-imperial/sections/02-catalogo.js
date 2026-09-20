/* 05 CATÁLOGO + MI PEDIDO
   Las 125 piezas vienen escritas en el HTML como renglones tipográficos (sin JS se ven todas, agrupadas
   por línea; Google lee nombre y precio). El JS filtra por línea (chips), pinta el capítulo (foto de
   ambiente + nombre gigante, o banda de cuero si no hay foto), muestra de 12 en 12, abre una hoja chica
   con la foto del catálogo al tocar el nombre, y arma "Mi pedido" (localStorage en try/catch) que se
   envía por WhatsApp.
   API: window.EQcatalogo.show(linea, scroll)  ·  window.EQpedido.add(i) */
(function () {
  "use strict";
  var sec = document.getElementById("catalogo");
  if (!sec || !window.EQ) return;
  var DATA = window.EQ_CATALOGO || [];
  var rows = Array.prototype.slice.call(sec.querySelectorAll(".s-cat-row"));
  var chips = Array.prototype.slice.call(sec.querySelectorAll(".s-cat-chip"));
  var more = sec.querySelector(".s-cat-more");
  var PAGE = 12, filt = "top", shown = PAGE;
  var NAMES = { top: "Lo más pedido", asientos: "asientos", cantineros: "cantineros", salas: "salas", comedores: "comedores", mesas: "mesas", barras: "barras", complementos: "complementos" };
  var LINE_LABEL = { asientos: "Asientos", cantineros: "Cantineros", salas: "Salas", comedores: "Comedores", mesas: "Mesas", barras: "Barras", complementos: "Complementos" };
  /* fotos reales de ambiente en "top" y "asientos"; el resto son las 6 ilustraciones de IA
     (img/scene/, ver IMAGENES.md) hechas a partir de sus piezas reales: llevan etiqueta y alt "Ilustración:" */
  var BANNERS = {
    top: { img: "img/gal/mecedora-bosque.webp", alt: "Mecedora de Equipales Imperial en el bosque", n: "Lo más pedido" },
    asientos: { img: "img/gal/contraluz.webp", alt: "Equipal de Equipales Imperial a contraluz en el campo al atardecer", n: "Asientos" },
    cantineros: { img: "img/scene/cantineros", ill: true, alt: "Ilustración: cantinero de Equipales Imperial en una barra de casa", n: "Cantineros" },
    salas: { img: "img/scene/salas", ill: true, alt: "Ilustración: sala de Equipales Imperial en una terraza", n: "Salas" },
    comedores: { img: "img/scene/comedores", ill: true, alt: "Ilustración: comedor de Equipales Imperial en un restaurante", n: "Comedores" },
    mesas: { img: "img/scene/mesas", ill: true, alt: "Ilustración: mesa de Equipales Imperial en una sala", n: "Mesas" },
    barras: { img: "img/scene/barras", ill: true, alt: "Ilustración: barra de Equipales Imperial con copero", n: "Barras" },
    complementos: { img: "img/scene/complementos", ill: true, alt: "Ilustración: biombo y cabecera de Equipales Imperial", n: "Complementos" }
  };
  var blurIn = EQ.blurIn;

  function list() {
    if (filt === "top") return rows.filter(function (c) { return c.hasAttribute("data-top"); }).sort(function (a, b) { return a.getAttribute("data-top") - b.getAttribute("data-top"); });
    return rows.filter(function (c) { return c.getAttribute("data-c") === filt; });
  }
  function render(anim) {
    var L = list(), ul = sec.querySelector(".s-cat-list");
    rows.forEach(function (c) { c.classList.add("is-hidden"); c.classList.remove("is-new"); });
    L.forEach(function (c, k) {
      ul.appendChild(c); /* orden de la lista */
      if (k < shown) { c.classList.remove("is-hidden"); if (anim) { c.style.setProperty("--k", k % PAGE); c.classList.add("is-new"); } }
    });
    var rest = L.length - shown;
    more.hidden = rest <= 0;
    if (rest > 0) more.textContent = "Ver " + Math.min(rest, PAGE) + " más de " + L.length;
  }
  function bannerMinPrice(f) {
    var items = f === "top" ? rows.filter(function (c) { return c.hasAttribute("data-top"); }).map(function (c) { return DATA[+c.getAttribute("data-i")]; }) : DATA.filter(function (x) { return x.c === f; });
    var mins = items.map(function (x) { return x.p[0]; });
    return { n: items.length, min: Math.min.apply(null, mins) };
  }
  function paintBanner(f) {
    var b = BANNERS[f]; if (!b) return;
    var box = sec.querySelector(".s-cat-banner"), ph = box.querySelector(".s-cat-banner-ph"), h = box.querySelector(".s-cat-banner-n"), m = box.querySelector(".s-cat-banner-m");
    box.setAttribute("data-c", f);
    box.classList.toggle("is-leather", !!b.leather);
    if (b.leather) {
      ph.innerHTML = "";
    } else if (b.ill) {
      ph.innerHTML = '<picture><source media="(max-width: 767px)" srcset="' + b.img + '-1200.webp">'
        + '<img class="eq-blurin is-pre" src="' + b.img + '-2000.webp" alt="' + b.alt + '" width="1400" height="1400" loading="lazy" decoding="async"></picture>'
        + '<span class="s-cat-banner-ill">Imagen ilustrativa</span>';
      blurIn(ph.querySelector("img"));
    } else {
      ph.innerHTML = '<img class="eq-blurin is-pre" src="' + b.img + '" alt="' + b.alt + '" width="1400" height="1400" loading="lazy" decoding="async">';
      blurIn(ph.querySelector("img"));
    }
    h.textContent = b.n;
    var agg = bannerMinPrice(f);
    m.innerHTML = agg.n + " piezas · desde " + EQ.money(agg.min) + " <small>+ IVA</small>";
  }
  function show(f, scroll) {
    if (!NAMES[f]) return;
    filt = f; shown = PAGE;
    chips.forEach(function (c) { c.setAttribute("aria-pressed", c.getAttribute("data-f") === f ? "true" : "false"); });
    var cta = sec.querySelector(".s-cat-cta");
    if (cta) { cta.querySelector("span").textContent = f === "top" ? "Cotizar por WhatsApp" : "Cotizar " + NAMES[f]; cta.href = EQ.waUrl("Hola Equipales Imperial, quiero cotizar " + (f === "top" ? "piezas de su catálogo" : NAMES[f]) + "."); }
    paintBanner(f);
    render(true);
    if (scroll) {
      var h = document.querySelector(".k-header");
      var top = sec.querySelector(".s-cat-chips").getBoundingClientRect().top + window.scrollY - (h ? h.offsetHeight : 0) - 12;
      window.scrollTo({ top: top, behavior: "auto" });
    }
  }
  sec.addEventListener("click", function (e) {
    var c = e.target.closest(".s-cat-chip"); if (c) { show(c.getAttribute("data-f"), false); return; }
    if (e.target.closest(".s-cat-more")) { shown += PAGE; render(false); return; }
    var info = e.target.closest(".s-cat-info"); if (info) { openDetail(+info.getAttribute("data-open")); return; }
    var a = e.target.closest(".s-cat-add");
    if (a) { var i = +a.getAttribute("data-i"); toggle(i); }
  });
  /* sub-links del menú y del índice del hero: #catalogo con data-linea (y, en el hero, data-item
     con la pieza exacta: abre su línea y, encima, su hoja de detalle) */
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
  paintBanner(filt);
  render(false);
  window.EQcatalogo = { show: show };

  /* ---------------- Hoja de detalle (toca el nombre de una pieza) ---------------- */
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
  dAdd.addEventListener("click", function () { if (curDetail > -1) { toggle(curDetail); paintDetailAdd(); } });

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
  function paint() {
    var n = count();
    rows.forEach(function (c) {
      var i = +c.getAttribute("data-i"), on = find(i) > -1, b = c.querySelector(".s-cat-add");
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.setAttribute("aria-label", (on ? "Quitar " : "Agregar ") + DATA[i].n + (on ? " de mi pedido" : " a mi pedido"));
      b.querySelector("use").setAttribute("href", on ? "#i-check" : "#i-plus");
    });
    paintDetailAdd();
    bar.hidden = false;
    bar.classList.toggle("is-on", n > 0);
    document.body.classList.toggle("eq-ped-on", n > 0);
    bar.querySelector(".s-ped-n").textContent = n;
    bar.querySelector(".s-ped-t").textContent = n ? "desde " + EQ.money(desde()) + " + IVA" : "";
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
  paint();
  window.EQpedido = { add: function (i) { if (find(i) < 0) toggle(i); }, open: function () { fillSheet(); sh.open(); } };
})();
