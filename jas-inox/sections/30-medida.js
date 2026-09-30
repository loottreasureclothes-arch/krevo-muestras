/* 30-medida: LA MESA A TU MEDIDA. Dibujo isometrico en SVG (viewBox fijo 420x300, escala proporcional)
   que se estira con los deslizadores y escribe las cotas. Arma el mensaje de WhatsApp. Guarda jas_cotiza. */
(function () {
  "use strict";
  var KEY = "jas_cotiza";
  var C = 0.8660254;
  var VBW = 420, VBH = 300;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var TIPOS = {
    mesa:    { n: "Mesa de trabajo", d: [180, 70, 90], opts: ["entrepano", "respaldo", "rodajas", "tarja"] },
    tarja:   { n: "Mesa con tarja",  d: [180, 70, 90], opts: ["entrepano", "respaldo", "rodajas", "tarja"] },
    carrito: { n: "Carrito",         d: [120, 60, 90], opts: ["respaldo", "rodajas", "tarja"] },
    campana: { n: "Campana",         d: [150, 90, 100], opts: [] },
    rack:    { n: "Estante o rack",  d: [120, 50, 180], opts: ["rodajas"], hMax: 200 },
    otro:    { n: "Otro",            d: [180, 70, 90], opts: [] }
  };
  var OPT_NAMES = { entrepano: "entrepaño", respaldo: "respaldo", rodajas: "rodajas", tarja: "tarja" };

  var st = { tipo: "mesa", picked: false, otro: "", l: 180, w: 70, h: 90, o: { entrepano: false, respaldo: false, rodajas: false, tarja: false }, uso: "", ciudad: "", nombre: "", touched: false };
  var cur = { l: 180, w: 70, h: 90 };
  var listeners = [];

  function $(id) { return document.getElementById(id); }
  function load() {
    try {
      var s = JSON.parse(localStorage.getItem(KEY) || "null");
      if (s && typeof s === "object" && s.v === 1) {
        ["tipo", "otro", "uso", "ciudad", "nombre"].forEach(function (k) { if (typeof s[k] === "string") st[k] = s[k].slice(0, 80); });
        ["l", "w", "h"].forEach(function (k) { if (typeof s[k] === "number") st[k] = s[k]; });
        if (s.o) for (var k in st.o) st.o[k] = !!s.o[k];
        st.touched = !!s.touched;
        st.picked = !!s.picked || !!s.touched;
        if (!st.tipo || !TIPOS[st.tipo]) st.tipo = "mesa";
      }
    } catch (e) {}
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify({ v: 1, tipo: st.tipo, otro: st.otro, l: st.l, w: st.w, h: st.h, o: st.o, uso: st.uso, ciudad: st.ciudad, nombre: st.nombre, touched: st.touched, picked: st.picked })); } catch (e) {}
  }

  /* ---------- mensaje ---------- */
  function joinY(a) { return a.length < 2 ? a.join("") : a.slice(0, -1).join(", ") + " y " + a[a.length - 1]; }
  function activeOpts() {
    var t = TIPOS[st.tipo];
    if (!t) return [];
    return t.opts.filter(function (k) { return st.o[k] && !(st.tipo === "tarja" && k === "tarja"); }).map(function (k) { return OPT_NAMES[k]; });
  }
  function dimsText() { return st.l + " x " + st.w + " x " + st.h + " cm"; }
  function nombreTipo() {
    if (!st.tipo) return "";
    if (st.tipo === "otro") return (st.otro || "").trim() || "Otro mueble";
    return TIPOS[st.tipo].n;
  }
  function message() {
    var s = "Hola JAS INOX, quiero cotizar";
    if (!st.tipo) {
      s += " un mueble en acero inoxidable" + (st.touched ? " de " + dimsText() + " (largo, ancho y alto)" : "") + ".";
    } else {
      s += ": " + nombreTipo() + " de " + dimsText() + " (largo, ancho y alto)";
      var ex = activeOpts();
      if (ex.length) s += ", con " + joinY(ex);
      s += ".";
    }
    if (st.uso.trim()) s += " Para: " + st.uso.trim() + ".";
    if (st.ciudad.trim()) s += " Ciudad: " + st.ciudad.trim() + ".";
    if (st.nombre.trim()) s += " Mi nombre: " + st.nombre.trim() + ".";
    return s;
  }
  function summary() {
    if (!st.tipo) return "Elige un tipo para dibujarlo.";
    var x = nombreTipo() + " · " + st.l + " × " + st.w + " × " + st.h + " cm";
    var ex = activeOpts();
    return ex.length ? x + " · " + ex.join(" · ") : x;
  }
  function getState() {
    /* "armada" = la persona ya eligio algo (tipo, medida u opcion); la Mesa de trabajo de arranque no cuenta */
    var armed = !!st.tipo && st.picked;
    return { armed: armed, name: nombreTipo(), dims: st.l + " × " + st.w + " × " + st.h + " cm", opts: activeOpts(), summary: summary(), message: message(), url: window.JAS ? window.JAS.waUrl(message()) : "" };
  }
  function emit() { var g = getState(); listeners.forEach(function (f) { try { f(g); } catch (e) {} }); }

  /* ---------- dibujo ---------- */
  function fmt(n) { return (Math.round(n * 10) / 10).toString(); }
  function render() {
    var g = $("med-g"), fig = $("med-svg") && $("med-svg").parentNode;
    if (!g) return;
    var L = cur.l, W = cur.w, H = cur.h;
    /* extension del dibujo con sus cotas (en cm isometricos) y margenes fijos para los textos de cota
       (no escalan) y para el pie "FIG." que tapa la franja de abajo: ninguna cota se corta en medidas extremas */
    var xMin = (-26 - W) * C, xMax = (L + 18) * C, yMin = -(H + 12), yMax = (L + W + 18) * 0.5;
    var PL = 30, PR = 44, PT = 12, PB = 58;
    var S = Math.min(0.98, (VBW - PL - PR) / (xMax - xMin), (VBH - PT - PB) / (yMax - yMin));
    var tx = PL + (VBW - PL - PR - (xMax - xMin) * S) / 2 - xMin * S;
    var ty = PT + (VBH - PT - PB - (yMax - yMin) * S) / 2 - yMin * S;
    function P(x, y, z) { return [(x - y) * C * S + tx, (x + y) * 0.5 * S - z * S + ty]; }
    function pts(a) { return a.map(function (p) { return fmt(p[0]) + "," + fmt(p[1]); }).join(" "); }
    function poly(cls, a) { return '<polygon class="' + cls + '" points="' + pts(a) + '"/>'; }
    function box(x0, y0, z0, x1, y1, z1) {
      return poly("f-r", [P(x1, y0, z0), P(x1, y1, z0), P(x1, y1, z1), P(x1, y0, z1)]) +
        poly("f-l", [P(x0, y1, z0), P(x1, y1, z0), P(x1, y1, z1), P(x0, y1, z1)]) +
        poly("f-top", [P(x0, y0, z1), P(x1, y0, z1), P(x1, y1, z1), P(x0, y1, z1)]);
    }
    function line(cls, a, b) { var p = P(a[0], a[1], a[2]), q = P(b[0], b[1], b[2]); return '<line class="' + cls + '" x1="' + fmt(p[0]) + '" y1="' + fmt(p[1]) + '" x2="' + fmt(q[0]) + '" y2="' + fmt(q[1]) + '"/>'; }
    function wheel(x, y, foot) {
      var b = P(x, y, 0), t = P(x, y, foot);
      return '<line class="f-stem" x1="' + fmt(t[0]) + '" y1="' + fmt(t[1]) + '" x2="' + fmt(b[0]) + '" y2="' + fmt(b[1] - 1) + '"/>' +
        '<ellipse class="f-wheel" cx="' + fmt(b[0]) + '" cy="' + fmt(b[1] - 1.6) + '" rx="' + fmt(4.4 * S) + '" ry="' + fmt(2.7 * S) + '"/>';
    }
    function basin(x0, y0, x1, y1, z) {
      var s = poly("f-basin", [P(x0, y0, z), P(x1, y0, z), P(x1, y1, z), P(x0, y1, z)]);
      s += poly("f-basin2", [P(x0 + 3, y0 + 3, z - 0.5), P(x1 - 3, y0 + 3, z - 0.5), P(x1 - 3, y1 - 3, z - 0.5), P(x0 + 3, y1 - 3, z - 0.5)]);
      var bx = (x0 + x1) / 2;
      var a = P(bx, y0 - 3, z), b = P(bx, y0 - 3, z + 20), c = P(bx, y0 + 8, z + 20);
      s += '<polyline class="f-tap" points="' + pts([a, b, c]) + '"/>';
      return s;
    }
    var o = st.o, t = st.tipo || "mesa";
    var out = "";
    var foot, th = 3.5, i;
    out += poly("f-shadow", [P(-8, -8, 0), P(L + 10, -8, 0), P(L + 10, W + 10, 0), P(-8, W + 10, 0)]);

    if (t === "campana") {
      var zb = H * 0.4, zt = H * 0.78, cx = L / 2, cy = W / 2, tl = Math.max(24, L * 0.3), tw = Math.max(20, W * 0.36);
      var a0 = cx - tl / 2, a1 = cx + tl / 2, b0 = cy - tw / 2, b1 = cy + tw / 2;
      out += box(2, 2, 0, 5.5, 5.5, zb) + box(L - 5.5, 2, 0, L - 2, 5.5, zb);
      out += box(2, W - 5.5, 0, 5.5, W - 2, zb) + box(L - 5.5, W - 5.5, 0, L - 2, W - 2, zb);
      out += box(0, 0, zb - 3, L, W, zb);
      out += poly("f-l", [P(0, W, zb), P(L, W, zb), P(a1, b1, zt), P(a0, b1, zt)]);
      out += poly("f-r", [P(L, 0, zb), P(L, W, zb), P(a1, b1, zt), P(a1, b0, zt)]);
      out += box(a0, b0, zt, a1, b1, H);
    } else if (t === "rack") {
      foot = o.rodajas ? 9 : 0;
      if (foot) out += wheel(1.5, 1.5, foot) + wheel(L - 1.5, 1.5, foot) + wheel(1.5, W - 1.5, foot) + wheel(L - 1.5, W - 1.5, foot);
      var n = Math.max(3, Math.min(5, Math.round(H / 45) + 1));
      out += box(0, 0, foot, 3, 3, H) + box(L - 3, 0, foot, L, 3, H);
      for (i = 0; i < n; i++) {
        var z = foot + i * (H - foot - 2.5) / (n - 1);
        out += box(0, 0, z, L, W, z + 2.5);
      }
      out += box(0, W - 3, foot, 3, W, H) + box(L - 3, W - 3, foot, L, W, H);
    } else if (t === "carrito") {
      foot = o.rodajas ? 9 : 0;
      if (foot) out += wheel(6, 6, foot) + wheel(L - 6, 6, foot) + wheel(6, W - 6, foot) + wheel(L - 6, W - 6, foot);
      out += box(0, 0, foot + 1, L, W, H - th);
      out += line("f-door", [L / 2, W, foot + 3], [L / 2, W, H - th - 1]);
      out += line("f-door", [L, W / 2, foot + 3], [L, W / 2, H - th - 1]);
      out += box(-2, -2, H - th, L + 2, W + 2, H);
      if (o.respaldo) out += box(-2, -2, H, L + 2, -0.5, H + 10);
      if (o.tarja) out += basin(Math.max(8, L * 0.12), (W - Math.min(W - 16, 40)) / 2, Math.max(8, L * 0.12) + Math.min(70, L * 0.5), (W + Math.min(W - 16, 40)) / 2, H);
    } else {
      foot = (o.rodajas && TIPOS[t].opts.indexOf("rodajas") > -1) ? 9 : 0;
      var show = t !== "otro";
      if (foot) out += wheel(2, 2, foot) + wheel(L - 2, 2, foot) + wheel(2, W - 2, foot) + wheel(L - 2, W - 2, foot);
      out += box(0, 0, foot, 4, 4, H - th) + box(L - 4, 0, foot, L, 4, H - th);
      if (show && o.entrepano) out += box(3, 3, foot + 14, L - 3, W - 3, foot + 16.5);
      out += box(0, W - 4, foot, 4, W, H - th) + box(L - 4, W - 4, foot, L, W, H - th);
      out += box(0, 0, H - th, L, W, H);
      if (show && o.respaldo) out += box(0, 0, H, L, 2.5, H + 10);
      if (show && (o.tarja || t === "tarja")) {
        var bl = Math.min(80, L * 0.5), bw = Math.min(W - 16, 42), x0 = Math.max(8, L * 0.12), y0 = (W - bw) / 2 + (o.respaldo ? 2 : 0);
        out += basin(x0, y0, x0 + bl, y0 + bw, H);
      }
    }

    /* cotas en azul soldadura */
    function tick(p, ang) {
      var d = 4.5, a = ang + Math.PI / 2;
      return '<line class="dim" x1="' + fmt(p[0] - Math.cos(a) * d) + '" y1="' + fmt(p[1] - Math.sin(a) * d) + '" x2="' + fmt(p[0] + Math.cos(a) * d) + '" y2="' + fmt(p[1] + Math.sin(a) * d) + '"/>';
    }
    var A, B, m, ang;
    /* largo */
    A = P(0, W + 16, 0); B = P(L, W + 16, 0); ang = Math.atan2(B[1] - A[1], B[0] - A[0]);
    out += line("dim-x", [0, W, 0], [0, W + 18, 0]) + line("dim-x", [L, W, 0], [L, W + 18, 0]);
    out += '<line class="dim" x1="' + fmt(A[0]) + '" y1="' + fmt(A[1]) + '" x2="' + fmt(B[0]) + '" y2="' + fmt(B[1]) + '"/>' + tick(A, ang) + tick(B, ang);
    m = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
    out += '<text class="dim-t" text-anchor="middle" transform="translate(' + fmt(m[0]) + ' ' + fmt(m[1] + 14) + ') rotate(30)">' + Math.round(L) + ' cm</text>';
    /* ancho */
    A = P(L + 16, 0, 0); B = P(L + 16, W, 0); ang = Math.atan2(B[1] - A[1], B[0] - A[0]);
    out += line("dim-x", [L, 0, 0], [L + 18, 0, 0]) + line("dim-x", [L, W, 0], [L + 18, W, 0]);
    out += '<line class="dim" x1="' + fmt(A[0]) + '" y1="' + fmt(A[1]) + '" x2="' + fmt(B[0]) + '" y2="' + fmt(B[1]) + '"/>' + tick(A, ang) + tick(B, ang);
    m = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
    out += '<text class="dim-t" text-anchor="middle" transform="translate(' + fmt(m[0] + 4) + ' ' + fmt(m[1] + 15) + ') rotate(-30)">' + Math.round(W) + ' cm</text>';
    /* alto */
    A = P(-24, W, 0); B = P(-24, W, H);
    out += line("dim-x", [0, W, 0], [-26, W, 0]) + line("dim-x", [0, W, H], [-26, W, H]);
    out += '<line class="dim" x1="' + fmt(A[0]) + '" y1="' + fmt(A[1]) + '" x2="' + fmt(B[0]) + '" y2="' + fmt(B[1]) + '"/>' + tick(A, 0) + tick(B, 0);
    m = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
    out += '<text class="dim-t" text-anchor="middle" transform="translate(' + fmt(m[0] - 7) + ' ' + fmt(m[1]) + ') rotate(-90)">' + Math.round(H) + ' cm</text>';

    g.innerHTML = out;
    if (fig) fig.classList.toggle("is-idle", !st.tipo);
  }

  var raf = null;
  function animateTo() {
    var from = { l: cur.l, w: cur.w, h: cur.h }, to = { l: st.l, w: st.w, h: st.h }, t0 = null;
    if (raf) cancelAnimationFrame(raf);
    if (reduce || (from.l === to.l && from.w === to.w && from.h === to.h)) { cur.l = to.l; cur.w = to.w; cur.h = to.h; render(); return; }
    function step(ts) {
      if (t0 === null) t0 = ts;
      var k = Math.min(1, (ts - t0) / 130), e = 1 - Math.pow(1 - k, 3);
      cur.l = from.l + (to.l - from.l) * e; cur.w = from.w + (to.w - from.w) * e; cur.h = from.h + (to.h - from.h) * e;
      render();
      if (k < 1) raf = requestAnimationFrame(step); else raf = null;
    }
    raf = requestAnimationFrame(step);
  }

  /* ---------- UI ---------- */
  function syncUI() {
    var t = TIPOS[st.tipo];
    var radios = document.querySelectorAll('input[name="tipo"]');
    Array.prototype.forEach.call(radios, function (r) { r.checked = r.value === st.tipo; });
    var otro = $("fld-otro"); if (otro) otro.hidden = st.tipo !== "otro";
    if ($("f-otro") && $("f-otro").value !== st.otro) $("f-otro").value = st.otro;
    var hmax = t && t.hMax ? t.hMax : 110;
    var rh = $("r-h"); rh.max = hmax; $("h-max").textContent = hmax;
    if (st.h > hmax) st.h = hmax;
    $("r-l").value = st.l; $("r-w").value = st.w; rh.value = st.h;
    $("o-l").textContent = st.l + " cm"; $("o-w").textContent = st.w + " cm"; $("o-h").textContent = st.h + " cm";
    var allowed = t ? t.opts : [];
    Array.prototype.forEach.call(document.querySelectorAll("[data-opt]"), function (c) {
      var k = c.getAttribute("data-opt"), ok = allowed.indexOf(k) > -1;
      c.disabled = !ok; c.checked = ok && !!st.o[k];
    });
    var note = $("opt-note"); if (note) note.hidden = !(st.tipo && allowed.length === 0);
    if ($("f-uso") && $("f-uso").value !== st.uso) $("f-uso").value = st.uso;
    if ($("f-ciudad") && $("f-ciudad").value !== st.ciudad) $("f-ciudad").value = st.ciudad;
    if ($("f-nombre") && $("f-nombre").value !== st.nombre) $("f-nombre").value = st.nombre;
    var cap = $("med-cap");
    if (cap) cap.textContent = st.tipo === "otro" ? "FIG. 03 · Dibujo de referencia a escala" : "FIG. 03 · " + TIPOS[st.tipo].n + " a escala";
  }
  function updateOut() {
    var a = $("wa-cotiza"), m = message();
    if (a) { a.href = window.JAS ? window.JAS.waUrl(m) : a.href; a.setAttribute("data-wa", m); }
    var s = $("med-sum"); if (s) s.textContent = summary();
    var svg = $("med-svg"); if (svg) svg.setAttribute("aria-label", "Dibujo a escala: " + summary());
  }
  function update(anim) {
    if (anim !== false) animateTo(); else { cur.l = st.l; cur.w = st.w; cur.h = st.h; render(); }
    updateOut(); save(); emit();
  }

  function setTipo(t, otroTxt) {
    if (!TIPOS[t]) return;
    var prev = st.tipo;
    st.tipo = t; st.picked = true;
    if (t === "otro") { if (otroTxt) st.otro = otroTxt; }
    else st.otro = "";
    var d = TIPOS[t].d;
    if (!st.touched) { st.l = d[0]; st.w = d[1]; st.h = d[2]; }
    if (t === "rack" && st.h > 200) st.h = 200;
    if (t !== "rack" && st.h > 110) st.h = 110;
    if (t === "tarja") st.o.tarja = true;
    if (t === "mesa" && prev !== "mesa") st.o.tarja = false;
    if (t === "carrito" && prev !== "carrito") { st.o.rodajas = true; st.o.tarja = false; }
    Object.keys(st.o).forEach(function (k) { if (TIPOS[t].opts.indexOf(k) < 0) st.o[k] = false; });
    syncUI(); update();
  }

  function bind() {
    Array.prototype.forEach.call(document.querySelectorAll('input[name="tipo"]'), function (r) {
      r.addEventListener("change", function () { if (r.checked) setTipo(r.value, ""); });
    });
    function rng(id, key, out) {
      var el = $(id);
      el.addEventListener("input", function () {
        st[key] = parseInt(el.value, 10); st.touched = true; st.picked = true;
        $(out).textContent = st[key] + " cm";
        update();
      });
    }
    rng("r-l", "l", "o-l"); rng("r-w", "w", "o-w"); rng("r-h", "h", "o-h");
    Array.prototype.forEach.call(document.querySelectorAll("[data-opt]"), function (c) {
      c.addEventListener("change", function () {
        var k = c.getAttribute("data-opt");
        st.o[k] = c.checked; st.picked = true;
        if (k === "tarja") {
          if (c.checked && st.tipo === "mesa") { st.tipo = "tarja"; syncUI(); }
          else if (!c.checked && st.tipo === "tarja") { st.tipo = "mesa"; syncUI(); }
        }
        update(false);
      });
    });
    [["f-otro", "otro"], ["f-uso", "uso"], ["f-ciudad", "ciudad"], ["f-nombre", "nombre"]].forEach(function (p) {
      var el = $(p[0]);
      el.addEventListener("input", function () { st[p[1]] = el.value; updateOut(); save(); emit(); });
    });
    var wa = $("wa-cotiza");
    if (wa) { var fix = function () { wa.href = window.JAS.waUrl(message()); }; wa.addEventListener("pointerdown", fix); wa.addEventListener("click", fix); }
  }

  function init() {
    if (!$("med-form")) return;
    load();
    if (!window.JAS || !window.JAS.waUrl) window.JAS = { waUrl: function (m) { return "https://wa.me/524494415822?text=" + encodeURIComponent(m); } };
    cur.l = st.l; cur.w = st.w; cur.h = st.h;
    bind(); syncUI(); render(); updateOut(); emit();
  }

  window.JasCotiza = {
    get: getState,
    setTipo: setTipo,
    on: function (f) { listeners.push(f); try { f(getState()); } catch (e) {} }
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
