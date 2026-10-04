/* Mi Cantón: header, menú, ronda (componente firma), horario vivo, reveal y vertido de cerveza. */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function money(n) { return "$" + n.toLocaleString("es-MX"); }

  var CASAS = {
    g: { nombre: "Guadalupe 331", tel: "524493639327", telTxt: "449 363 9327",
         dir: "Calle Guadalupe 331, Centro, 20000 Aguascalientes",
         q: "Mi+Cant%C3%B3n+Bar+Guadalupe+331+Centro+Aguascalientes", ir: "Calle+Guadalupe+331+Centro+Aguascalientes",
         sem: [[720, 1500], [720, 1500], [720, 1500], [720, 1500], [720, 1500], [720, 1500], [720, 1470]] },
    p: { nombre: "Poder Legislativo 210", tel: "524496582127", telTxt: "449 658 2127",
         dir: "Poder Legislativo 210, Zona Centro, 20259 Aguascalientes",
         q: "Mi+Cant%C3%B3n+Bar+Poder+Legislativo+210+Zona+Centro+Aguascalientes", ir: "Poder+Legislativo+210+Zona+Centro+Aguascalientes",
         sem: [[660, 1500], [660, 1500], [660, 1500], [660, 1500], [660, 1500], [660, 1500], null] }
  };
  var DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  /* ---------- header + menú ---------- */
  function initHeader() {
    var hd = $("#hd"), btn = $(".hd-btn"), menu = $("#hd-menu"), body = document.body, lbl = $(".hd-lbl");
    var ticking = false;
    function upd() { ticking = false; hd.classList.toggle("is-compact", (window.scrollY || 0) > 12); }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
    function set(open) {
      body.classList.toggle("hd-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      lbl.textContent = open ? "Cerrar" : "Menú";
    }
    btn.addEventListener("click", function () { set(!body.classList.contains("hd-menu-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a") || e.target === menu) set(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
    window.__closeMenu = function () { set(false); };
  }

  /* ---------- anclas suaves ---------- */
  function go(el) {
    var top = el.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      var h = a.getAttribute("href");
      if (h.length < 2) return;
      var el = $(h);
      if (!el) return;
      e.preventDefault();
      go(el);
      if (history.replaceState) history.replaceState(null, "", h);
    });
  }

  /* ---------- sondeo de visibilidad (sin IntersectionObserver) ---------- */
  function watch(list, frac, on, off) {
    list = $$(list);
    if (!list.length) return;
    var raf = null;
    function tick() {
      raf = null;
      var vh = window.innerHeight;
      list.forEach(function (el) {
        var r = el.getBoundingClientRect(), vis = r.top < vh * frac && r.bottom > 0;
        if (vis && !el._in) { el._in = true; on(el); }
        else if (!vis && el._in && off) { el._in = false; off(el); }
      });
    }
    function sch() { if (!raf) raf = requestAnimationFrame(tick); }
    window.addEventListener("scroll", sch, { passive: true });
    window.addEventListener("resize", sch);
    sch();
  }
  function initReveal() {
    var els = $$("[data-reveal]");
    if (reduce) { els.forEach(function (e) { e.classList.add("is-in"); }); $$("[data-pour]").forEach(function (e) { e.classList.add("is-in"); }); return; }
    watch("[data-reveal]", 0.92, function (el) { el.classList.add("is-in"); });
    /* momento firma: la cerveza se sirve al llegar y se vacía al irse (reversible) */
    watch("[data-pour]", 0.8, function (el) { el.classList.add("is-in"); }, function (el) {
      var r = el.getBoundingClientRect(); if (r.top > 0) el.classList.remove("is-in");
    });
  }

  /* ---------- botón flotante: se esconde donde ya hay un Llamar a la vista ---------- */
  function initFab() {
    var zones = $$("#top, #visitanos, #pie, #ronda .ticket");
    function upd() {
      var vh = window.innerHeight, on = false;
      zones.forEach(function (z) { var r = z.getBoundingClientRect(); if (r.top < vh * 0.7 && r.bottom > vh * 0.3) on = true; });
      document.body.classList.toggle("hd-fab-off", on);
    }
    var raf = null;
    function sch() { if (!raf) raf = requestAnimationFrame(function () { raf = null; upd(); }); }
    window.addEventListener("scroll", sch, { passive: true });
    window.addEventListener("resize", sch);
    sch();
  }

  /* ---------- LA RONDA (componente firma) ---------- */
  var ITEMS = [
    { id: "barril1", n: "Barril", u: "1 litro", p: 85, barril: true },
    { id: "barril05", n: "Barril", u: "medio litro", p: 50, barril: true },
    { id: "corona", n: "Corona", p: 45 },
    { id: "victoria", n: "Victoria", p: 45 },
    { id: "modelo", n: "Modelo Especial", p: 50 },
    { id: "negra", n: "Negra Modelo", p: 50 },
    { id: "ultra", n: "Cerveza Ultra", p: 55 },
    { id: "cubCorona", n: "Cubeta Corona", p: 225 },
    { id: "cubModelo", n: "Cubeta Modelo Especial", p: 250 }
  ];
  var QUICK = ["barril1", "modelo", "cubCorona"];
  var KEY = "mc_ronda";
  var R = { q: {}, tipo: "clara", casa: "g" };
  try { var sv = JSON.parse(localStorage.getItem(KEY) || "null"); if (sv && typeof sv === "object") { R.q = sv.q || {}; R.tipo = sv.tipo === "oscura" ? "oscura" : "clara"; R.casa = sv.casa === "p" ? "p" : "g"; } } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(R)); } catch (e) {} }
  function item(id) { for (var i = 0; i < ITEMS.length; i++) if (ITEMS[i].id === id) return ITEMS[i]; }
  function label(it) { return it.barril ? "Barril " + R.tipo + " " + it.u : it.n; }
  function count() { var c = 0; for (var k in R.q) c += R.q[k]; return c; }
  function total() { var t = 0; for (var k in R.q) { var it = item(k); if (it) t += it.p * R.q[k]; } return t; }
  function add(id, d) {
    var n = (R.q[id] || 0) + d;
    if (n <= 0) delete R.q[id]; else R.q[id] = Math.min(n, 30);
    save(); paint();
  }
  function paint() {
    /* lista de la carta */
    var ul = $("#lista-cervezas");
    if (ul && !ul._built) {
      ul._built = true;
      ul.innerHTML = ITEMS.map(function (it) {
        return '<li><span class="n">' + (it.barril ? "Cerveza de barril, " + it.u : it.n) + '</span><span class="p">' + money(it.p) +
          '</span><button class="mas" type="button" data-add="' + it.id + '" aria-label="Agregar ' + it.n + ' a mi ronda">+</button></li>';
      }).join("");
    }
    $$("[data-add]").forEach(function (b) {
      var on = !!R.q[b.getAttribute("data-add")];
      b.classList.toggle("is-on", on);
      if (b.classList.contains("btn-add")) b.firstChild.textContent = on ? "En tu ronda (" + R.q[b.getAttribute("data-add")] + ")" : "Agregar a mi ronda";
    });
    /* ticket */
    var lines = $("#ticket-lines");
    var ids = ITEMS.filter(function (it) { return R.q[it.id]; });
    lines.innerHTML = ids.map(function (it) {
      var q = R.q[it.id];
      return '<li><span class="l-n">' + label(it) + (it.barril ? "" : "") + '<small>' + money(it.p) + ' c/u</small></span>' +
        '<span class="l-q"><button type="button" data-q="-1" data-id="' + it.id + '" aria-label="Quitar uno">&minus;</button><b>' + q +
        '</b><button type="button" data-q="1" data-id="' + it.id + '" aria-label="Agregar uno">+</button></span><span class="l-p">' + money(it.p * q) + '</span></li>';
    }).join("");
    $("#ticket-empty").style.display = ids.length ? "none" : "";
    var quick = $("#quick");
    quick.style.display = ids.length ? "none" : "flex";
    if (!quick._built) {
      quick._built = true;
      quick.innerHTML = QUICK.map(function (id) { var it = item(id); return '<button type="button" data-add="' + id + '">+ ' + (it.barril ? "Barril " + it.u : it.n) + " " + money(it.p) + "</button>"; }).join("");
    }
    $("#ticket-total").textContent = money(total());
    /* tarro */
    var c = count(), f = Math.min(1, c / 6);
    var nivel = $("#t-nivel");
    nivel.style.setProperty("--lvl", ((1 - f) * 215) + "px");
    $("#t-liquido").setAttribute("fill", "url(#g-" + R.tipo + ")");
    $("#tarro-n").textContent = c === 0 ? "Todavía vacío" : (c === 1 ? "1 cerveza en la ronda" : c + " cervezas en la ronda");
    /* segmentados */
    $$("[data-tipo]").forEach(function (b) { b.setAttribute("aria-checked", b.getAttribute("data-tipo") === R.tipo ? "true" : "false"); });
    $$("[data-casa]").forEach(function (b) { b.setAttribute("aria-checked", b.getAttribute("data-casa") === R.casa ? "true" : "false"); });
    $("#ronda-call").setAttribute("href", "tel:+" + CASAS[R.casa].tel);
  }
  function mensaje() {
    var partes = ids().map(function (it) { return R.q[it.id] + " x " + label(it); });
    return "Hola, quiero ir a Mi Cantón (" + CASAS[R.casa].nombre + "). Mi ronda: " + (partes.join(", ") || "todavía la estoy armando") + ". Total de cervezas: " + money(total()) + ".";
  }
  function ids() { return ITEMS.filter(function (it) { return R.q[it.id]; }); }
  function initRonda() {
    document.addEventListener("click", function (e) {
      var t = e.target.closest ? e.target.closest("button") : null;
      if (!t) return;
      if (t.hasAttribute("data-add")) { add(t.getAttribute("data-add"), 1); return; }
      if (t.hasAttribute("data-q")) { add(t.getAttribute("data-id"), parseInt(t.getAttribute("data-q"), 10)); return; }
      if (t.hasAttribute("data-tipo")) { R.tipo = t.getAttribute("data-tipo"); save(); paint(); return; }
      if (t.hasAttribute("data-casa")) { R.casa = t.getAttribute("data-casa"); save(); paint(); return; }
    });
    var cp = $("#ronda-copy");
    cp.addEventListener("click", function () {
      var txt = mensaje();
      function ok() { cp.textContent = "Copiado"; setTimeout(function () { cp.textContent = "Copiar mi ronda"; }, 1800); }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok, fallback); else fallback();
      function fallback() {
        var ta = document.createElement("textarea"); ta.value = txt; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); ok(); } catch (er) {}
        document.body.removeChild(ta);
      }
    });
    window.__ronda = { mensaje: mensaje, R: R };
    paint();
  }

  /* ---------- VISÍTANOS: casa, mapa, horario y "abierto ahora" ---------- */
  function fmt(min) {
    var m = min % 1440, h = Math.floor(m / 60), mm = m % 60;
    var ap = h >= 12 && h < 24 ? "p.m." : "a.m.", h12 = h % 12 === 0 ? 12 : h % 12;
    return h12 + (mm ? ":" + (mm < 10 ? "0" : "") + mm : "") + " " + ap;
  }
  function ahora() {
    var d = new Date(), parts = {};
    try {
      new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(d).forEach(function (p) { parts[p.type] = p.value; });
      var w = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 }[parts.weekday];
      return { d: w, m: (parseInt(parts.hour, 10) % 24) * 60 + parseInt(parts.minute, 10) };
    } catch (e) { var g = d.getDay(); return { d: (g + 6) % 7, m: d.getHours() * 60 + d.getMinutes() }; }
  }
  function estado(c) {
    var n = ahora(), s = c.sem[n.d], pv = c.sem[(n.d + 6) % 7];
    if (pv && pv[1] > 1440 && n.m < pv[1] - 1440) return { open: true, t: "Abierto ahora · cierra a la(s) " + fmt(pv[1]) };
    if (s && n.m >= s[0] && n.m < s[1]) return { open: true, t: "Abierto ahora · cierra a la(s) " + fmt(s[1]) };
    if (s && n.m < s[0]) return { open: false, t: "Cerrado ahora · abre hoy a las " + fmt(s[0]) };
    for (var i = 1; i <= 7; i++) { var k = (n.d + i) % 7; if (c.sem[k]) return { open: false, t: "Cerrado ahora · abre " + (i === 1 ? "mañana" : "el " + DIAS[k].toLowerCase()) + " a las " + fmt(c.sem[k][0]) }; }
    return { open: false, t: "Cerrado ahora" };
  }
  var vis = "g";
  function paintVis() {
    var c = CASAS[vis];
    var n = ahora(), st = estado(c);
    var box = $("#vis-estado");
    box.classList.toggle("is-open", st.open);
    $("#vis-estado-t").textContent = st.t;
    $("#vis-dir").textContent = c.dir;
    $("#horas").innerHTML = DIAS.map(function (dn, i) {
      var s = c.sem[i];
      return '<li' + (i === n.d ? ' class="hoy"' : "") + "><span>" + dn + "</span><span>" + (s ? fmt(s[0]) + " a " + fmt(s[1]) : "Cerrado") + "</span></li>";
    }).join("");
    $("#vis-ir").setAttribute("href", "https://www.google.com/maps/dir/?api=1&destination=" + c.ir);
    $("#vis-tel").setAttribute("href", "tel:+" + c.tel);
    $("#vis-tel").lastChild.textContent = "Llamar " + c.telTxt;
    var fr = $("#mapa"), src = "https://www.google.com/maps?q=" + c.q + "&output=embed";
    if (fr.getAttribute("src") !== src) fr.setAttribute("src", src);
    $$("[data-vis]").forEach(function (b) { b.setAttribute("aria-checked", b.getAttribute("data-vis") === vis ? "true" : "false"); });
  }
  function initVis() {
    document.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest("[data-vis]") : null;
      if (b) { vis = b.getAttribute("data-vis"); paintVis(); return; }
      var a = e.target.closest ? e.target.closest("[data-casa-go]") : null;
      if (a) { vis = a.getAttribute("data-casa-go"); paintVis(); }
    });
    paintVis();
    setInterval(paintVis, 60000);
  }

  function init() { initHeader(); initAnchors(); initRonda(); initVis(); initReveal(); initFab(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
