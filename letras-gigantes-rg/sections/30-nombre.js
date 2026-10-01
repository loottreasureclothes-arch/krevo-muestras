(function () {
  "use strict";
  function init() {
    var LG = window.LG; if (!LG) return;
    var stage = document.getElementById("lg-stage");
    var wrap = document.getElementById("lg-tiles");
    var plaque = document.getElementById("lg-plaque");
    var sourceEl = document.getElementById("lg-source");
    var inp = document.getElementById("lg-nombre-in");
    if (!stage || !wrap || !inp) return;
    var els = [];        /* elementos vivos (mosaicos y espacios), en orden */
    var cur = [];        /* descriptores vivos */
    var lastDemo = null;
    var plaqueT = null;

    /* ---------- construir un mosaico ---------- */
    function mk(t, isNew) {
      var el;
      if (t.sp) { el = document.createElement("span"); el.className = "lg-sp"; el.setAttribute("aria-hidden", "true"); return el; }
      el = document.createElement("button"); el.type = "button";
      el.className = "lg-tile" + (t.key ? "" : " is-empty") + (isNew ? " is-new" : "");
      el.style.setProperty("--ar", t.key ? (LG.AR[t.key] || .5) : .56);
      if (t.key) {
        var s = LG.SRC[t.key];
        el.setAttribute("aria-label", t.base + ", de " + s[0] + ", " + s[1]);
        el.setAttribute("data-say", t.base + " · de " + s[0] + ", " + s[1]);
        var im = document.createElement("img"); im.src = LG.tileSrc(t.key); im.alt = ""; im.width = Math.round(360 * (LG.AR[t.key] || .5)); im.height = 360; im.decoding = "async";
        var rf = document.createElement("span"); rf.className = "lg-refl"; rf.setAttribute("aria-hidden", "true");
        var im2 = document.createElement("img"); im2.src = LG.tileSrc(t.key); im2.alt = ""; im2.setAttribute("aria-hidden", "true");
        rf.appendChild(im2); el.appendChild(im); el.appendChild(rf);
      } else {
        el.setAttribute("aria-label", t.ch + ". Esta aún no sale clara en sus fotos");
        el.setAttribute("data-say", t.ch + " · Esta aún no sale clara en sus fotos");
        var h = document.createElement("span"); h.className = "lg-t-hollow"; h.textContent = t.ch; h.setAttribute("aria-hidden", "true"); el.appendChild(h);
      }
      if (isNew) el.addEventListener("animationend", function () { el.classList.remove("is-new"); }, { once: true });
      el.addEventListener("click", function () { say(el); });
      return el;
    }
    function say(el) {
      Array.prototype.forEach.call(wrap.querySelectorAll(".is-sel"), function (x) { x.classList.remove("is-sel"); });
      el.classList.add("is-sel");
      plaque.textContent = el.getAttribute("data-say");
      plaque.hidden = false;
      clearTimeout(plaqueT);
      plaqueT = setTimeout(function () { plaque.hidden = true; el.classList.remove("is-sel"); }, 4200);
    }

    /* ---------- acomodo: ancho de mosaico y renglones ---------- */
    function layout() {
      if (!els.length) { wrap.textContent = ""; return; }
      var mobile = window.innerWidth < 720;
      var avail = wrap.clientWidth || (stage.clientWidth - 32);
      var gap = 4;
      var lines = [els.slice()];
      if (mobile && els.length >= 7) {
        var mid = Math.ceil(els.length / 2), cut = -1, best = 99;
        for (var i = 1; i < els.length - 1; i++) if (els[i].classList.contains("lg-sp") && Math.abs(i - els.length / 2) < best) { best = Math.abs(i - els.length / 2); cut = i; }
        if (cut > 0) lines = [els.slice(0, cut), els.slice(cut + 1)]; else lines = [els.slice(0, mid), els.slice(mid)];
      }
      /* los espacios al borde de un renglón no se pintan */
      lines = lines.map(function (l) { return l.filter(function (e, idx) { return !(e.classList.contains("lg-sp") && (idx === 0 || idx === l.length - 1)); }); });
      /* cada letra con su ancho real: se calcula el alto que cabe en el renglón más largo */
      var maxH = mobile ? 150 : 200, th = maxH;
      lines.forEach(function (l) {
        var units = 0; l.forEach(function (e) { units += e.classList.contains("lg-sp") ? 0.22 : (parseFloat(e.style.getPropertyValue("--ar")) || .5); });
        var h = Math.floor((avail - gap * (l.length - 1)) / Math.max(units, .5));
        if (h < th) th = h;
      });
      th = Math.max(56, th);
      wrap.style.setProperty("--th", th + "px");
      var frag = document.createDocumentFragment();
      lines.forEach(function (l) {
        var d = document.createElement("div"); d.className = "lg-tline";
        l.forEach(function (e) { d.appendChild(e); });
        frag.appendChild(d);
      });
      /* los espacios sobrantes que se filtraron se quedan fuera del DOM pero siguen en els */
      wrap.textContent = "";
      wrap.appendChild(frag);
    }

    /* ---------- render con diff por prefijo ---------- */
    function sig(t) { return t.sp ? "_" : (t.key || ("#" + t.ch)); }
    function describeSource(items) {
      var names = [], miss = [];
      items.forEach(function (t) {
        if (t.sp) return;
        if (t.key) { var n = LG.SRC[t.key][0]; if (names.indexOf(n) < 0) names.push(n); }
        else if (miss.indexOf(t.ch) < 0) miss.push(t.ch);
      });
      var txt = "Tu nombre está hecho con letras que ya montaron para: " + names.join(" · ") + ".";
      if (!names.length) txt = "Esa letra aún no sale clara en sus fotos.";
      if (names.length && miss.length) txt += " " + (miss.length > 1 ? "Estas aún no salen claras en sus fotos: " : "Esta aún no sale clara en sus fotos: ") + miss.join(", ") + ".";
      return txt;
    }
    function render() {
      var nombre = LG.state.nombre;
      var demo = !nombre.replace(/ /g, "");
      var want = LG.parse(demo ? "XIMENA" : nombre);
      if (lastDemo !== null && demo !== lastDemo) { els = []; cur = []; wrap.textContent = ""; }
      var first = (lastDemo === null);
      lastDemo = demo;
      stage.setAttribute("data-demo", demo ? "true" : "false");
      var p = 0; while (p < cur.length && p < want.length && sig(cur[p]) === sig(want[p])) p++;
      /* quitar sobrantes: el último sube y se va */
      var removed = els.splice(p);
      cur.length = p;
      var animate = !first && !LG.reduce;
      removed.forEach(function (e) {
        if (animate && e.parentNode) { e.classList.add("is-out"); setTimeout(function () { if (e.parentNode) e.parentNode.removeChild(e); layout(); }, 170); }
        else if (e.parentNode) e.parentNode.removeChild(e);
      });
      for (var i = p; i < want.length; i++) { els.push(mk(want[i], animate && !demo ? true : false)); cur.push(want[i]); }
      if (!(removed.length && animate && p === want.length)) layout(); else setTimeout(layout, 175);
      sourceEl.textContent = demo ? "Así se vería XIMENA. Escribe el tuyo arriba." : describeSource(want);
    }

    /* ---------- campo y atajos ---------- */
    inp.value = LG.state.nombre;
    inp.addEventListener("input", function () {
      var c = LG.clean(inp.value);
      if (c !== inp.value) inp.value = c;
      LG.setNombre(c, "stage");
    });
    LG.on("nombre", function (d) { if (d.from !== "stage" && inp.value !== d.value) inp.value = d.value; render(); });
    Array.prototype.forEach.call(document.querySelectorAll("[data-short]"), function (b) {
      b.addEventListener("click", function () { var v = LG.clean(b.getAttribute("data-short")); inp.value = v; LG.setNombre(v, "chip"); });
    });
    var rz = null;
    window.addEventListener("resize", function () { clearTimeout(rz); rz = setTimeout(layout, 120); });
    render();

    /* ---------- la ficha ---------- */
    var ficha = document.getElementById("lg-ficha");
    var fecha = document.getElementById("lg-fecha");
    var contacto = document.getElementById("lg-contacto");
    var evChips = Array.prototype.slice.call(ficha.querySelectorAll("[data-evento]"));
    var moChips = Array.prototype.slice.call(ficha.querySelectorAll("[data-modo]"));
    function pressSet(chips, attr, val) { chips.forEach(function (c) { c.setAttribute("aria-pressed", c.getAttribute(attr) === val ? "true" : "false"); }); }
    function chipGroup(chips, attr, key) {
      chips.forEach(function (c) {
        c.addEventListener("click", function () {
          var v = c.getAttribute(attr);
          var next = LG.state[key] === v ? "" : v;
          LG.setField(key, next);
          pressSet(chips, attr, next);
        });
      });
      pressSet(chips, attr, LG.state[key]);
    }
    chipGroup(evChips, "data-evento", "evento");
    chipGroup(moChips, "data-modo", "modo");
    var t = new Date(), mm = ("0" + (t.getMonth() + 1)).slice(-2), dd = ("0" + t.getDate()).slice(-2);
    fecha.min = t.getFullYear() + "-" + mm + "-" + dd;
    fecha.value = LG.state.fecha || "";
    fecha.addEventListener("input", function () { LG.setField("fecha", fecha.value); });
    contacto.value = LG.state.contacto || "";
    contacto.addEventListener("input", function () { LG.setField("contacto", contacto.value); });

    var ul = document.getElementById("lg-lista"), vacia = document.getElementById("lg-lista-vacia");
    function paintLista() {
      var l = LG.state.lista;
      ul.textContent = "";
      l.forEach(function (it) {
        var li = document.createElement("li");
        var n = document.createElement("span"); n.className = "lg-f-n"; n.textContent = it.disp || it.msg;
        var p = document.createElement("span"); p.className = "lg-f-p" + (it.price ? "" : " is-ask"); p.textContent = it.price || "Pregunta el precio";
        var x = document.createElement("button"); x.type = "button"; x.className = "lg-f-x"; x.setAttribute("aria-label", "Quitar " + (it.disp || it.msg));
        x.innerHTML = '<svg aria-hidden="true"><use href="#i-x"/></svg>';
        x.addEventListener("click", function () { LG.toggleItem(it); });
        li.appendChild(n); li.appendChild(p); li.appendChild(x); ul.appendChild(li);
      });
      vacia.hidden = l.length > 0;
    }
    LG.on("lista", paintLista);
    paintLista();
    ficha.addEventListener("submit", function (e) { e.preventDefault(); });
  }
  if (window.LG) init(); else document.addEventListener("DOMContentLoaded", init);
})();
