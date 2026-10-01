/* Tres puertas, una visita: quién viene -> a qué puerta -> cuándo -> un solo mensaje de WhatsApp.
   Todo vive en memoria de la página (dato de salud: nada de localStorage ni sessionStorage). */
(function () {
  "use strict";
  var root = document.getElementById("mv-comp"); if (!root) return;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var P = {
    yo:     { k: "yo", ini: "Yo", label: "Yo", frase: "mí" },
    hijo:   { k: "hijo", ini: "Hijo", label: "Mi hijo o hija", frase: "mi hijo o hija" },
    pareja: { k: "pareja", ini: "Pareja", label: "Mi pareja", frase: "mi pareja" },
    padres: { k: "padres", ini: "Papás", label: "Mi mamá o mi papá", frase: "mi mamá o mi papá" },
    otra:   { k: "otra", ini: "Otra", label: "Otra persona", frase: "otra persona" }
  };
  var PORD = ["yo", "hijo", "pareja", "padres", "otra"];
  var D = {
    fisio: { nombre: "Fisioterapia", color: "#74BDC6", sq: "t1", minus: "fisioterapia" },
    nutri: { nombre: "Nutrición", color: "#5C5D9D", sq: "tp", minus: "nutrición" },
    psico: { nombre: "Psicología", color: "#8880AC", sq: "t2", minus: "psicología" }
  };
  var DORD = ["fisio", "nutri", "psico"];
  var S = { personas: [], asign: { fisio: [], nutri: [], psico: [] }, interes: { fisio: "", nutri: "", psico: "" }, orden: [], cuando: [], mismo: false, nombre: "", open: "fisio" };
  var painted = {};   // fichas ya caídas en las cenefas (para animar solo las nuevas)
  var lastRows = {};

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function cap(t) { return t.charAt(0).toUpperCase() + t.slice(1); }
  function lista(a) { return a.length < 2 ? (a[0] || "") : a.slice(0, -1).join(", ") + " y " + a[a.length - 1]; }
  function efectivas() { return S.personas.length ? S.personas.slice() : ["yo"]; }
  function totalCitas() { var n = 0; DORD.forEach(function (d) { n += S.asign[d].length; }); return n; }

  /* ---------- mensaje ---------- */
  function mensaje() {
    var ds = S.orden.filter(function (d) { return S.asign[d].length; });
    var cu = S.cuando.length ? "Nos acomoda: " + S.cuando.join(" o ") + "." : "";
    var nom = S.nombre.trim() ? "Mi nombre: " + S.nombre.trim() + "." : "";
    function quien(d) { return "para " + lista(S.asign[d].map(function (p) { return P[p].frase; })); }
    function inte(d) { return S.interes[d] ? " (" + S.interes[d] + ")" : ""; }
    var out = [];
    if (ds.length === 1) {
      out.push("Hola MoviMent, quiero agendar una valoración de " + D[ds[0]].minus + " " + quien(ds[0]) + inte(ds[0]) + ".");
    } else {
      out.push("Hola MoviMent, quiero agendar una valoración.");
      ds.forEach(function (d) { out.push(D[d].nombre + ": " + quien(d) + inte(d) + "."); });
      if (ds.length >= 2 && S.mismo && totalCitas() >= 2) out.push("Si se puede, todas el mismo día.");
    }
    if (cu) out.push(cu);
    if (nom) out.push(nom);
    return out.join(" ");
  }
  function filas() {
    var r = [];
    S.orden.forEach(function (d) {
      if (!S.asign[d].length) return;
      var q = cap(lista(S.asign[d].map(function (p, i) { var l = P[p].label; return i ? l.charAt(0).toLowerCase() + l.slice(1) : l; })));
      var txt = q + (S.interes[d] ? " · " + cap(S.interes[d]) : "");
      r.push({ key: d, area: D[d].nombre.toUpperCase(), sq: D[d].sq, col: D[d].color, txt: txt });
    });
    if (S.cuando.length) {
      var labels = $$('input[name="cuando"]:checked', root).map(function (i) { return i.value; });
      r.push({ key: "cuando", area: "CUÁNDO", sq: "t3", txt: labels.join(" o ") });
    }
    if (S.nombre.trim()) r.push({ key: "nombre", area: "NOMBRE", sq: "t4", txt: S.nombre.trim() });
    return r;
  }
  window.MVVisita = { msg: mensaje, filas: filas, state: S };

  /* ---------- pintar ---------- */
  function render() {
    // chips del paso 1
    $$(".mv-chip", root).forEach(function (c) {
      var p = c.getAttribute("data-p"), inp = c.querySelector("input");
      inp.checked = S.personas.indexOf(p) > -1;
      var bars = c.querySelector(".mv-chip-bars"), h = "";
      DORD.forEach(function (d) { if (S.asign[d].indexOf(p) > -1) h += '<i style="background:' + D[d].color + '"></i>'; });
      bars.innerHTML = h;
    });
    // puertas: fichas caídas
    $$(".mv-door", root).forEach(function (b) {
      var d = b.getAttribute("data-door"), fill = b.querySelector(".mv-door-fill"), h = "";
      S.asign[d].forEach(function (p) {
        var k = d + ":" + p, nuevo = !painted[k];
        painted[k] = true;
        h += '<i style="background:' + D[d].color + '" class="' + (nuevo && !reduce ? "drop" : "") + '" title="' + esc(P[p].label) + '"></i>';
      });
      Object.keys(painted).forEach(function (k) { if (k.indexOf(d + ":") === 0 && S.asign[d].indexOf(k.split(":")[1]) < 0) delete painted[k]; });
      fill.innerHTML = h;
      b.setAttribute("aria-expanded", S.open === d ? "true" : "false");
    });
    // paneles
    $$(".mv-panel", root).forEach(function (pn) {
      var d = pn.getAttribute("data-door");
      pn.classList.toggle("is-closed", S.open !== d);
      pn.querySelector(".mv-panel-in").setAttribute("aria-hidden", S.open !== d ? "true" : "false");
      var para = pn.querySelector(".mv-para"), chips = pn.querySelector(".mv-para-chips"), h = "";
      efectivas().forEach(function (p) {
        var on = S.asign[d].indexOf(p) > -1;
        h += '<button type="button" class="mv-pchip" data-p="' + p + '" data-d="' + d + '" aria-pressed="' + on + '" style="--ac:' + D[d].color + '"><span class="mv-chip-sq" aria-hidden="true"><b>' + P[p].ini + '</b></span><span>' + esc(P[p].label) + '</span></button>';
      });
      chips.innerHTML = h; para.hidden = false;
      $$(".mv-svc-b", pn).forEach(function (b) { b.setAttribute("aria-pressed", S.interes[d] === b.getAttribute("data-msg") ? "true" : "false"); });
      // "Mi pareja" en psicología: Terapia de pareja primero
      if (d === "psico") {
        var ul = $(".mv-svc", pn), par = $('[data-pareja]', ul).parentNode, first = ul.firstElementChild;
        if (S.asign.psico.indexOf("pareja") > -1) { if (first !== par) ul.insertBefore(par, first); }
        else { var orig = ul.children[2]; if (par !== ul.children[3]) ul.insertBefore(par, ul.children[3] || null); }
      }
    });
    // "todas el mismo día"
    var mismo = $("#mv-mismo", root); mismo.hidden = totalCitas() < 2;
    // ficha
    var rows = filas(), box = $("#mv-ficha-rows"), h = "";
    if (!rows.length) h = '<p class="mv-ficha-vacia">Todavía no elegiste nada. Sin elegir, el mensaje es solo: «Hola MoviMent, quiero agendar una valoración.»</p>';
    var nuevos = {};
    rows.forEach(function (r) {
      var sig = r.area + "|" + r.txt; nuevos[r.key] = sig;
      var anim = lastRows[r.key] !== sig && !reduce;
      h += '<div class="mv-fr" style="' + (anim ? "" : "animation:none") + '"><span class="mv-fr-a"><i class="mv-sq ' + r.sq + '"' + (r.col ? ' style="background:' + r.col + '"' : '') + '></i>' + esc(r.area) + '</span><span class="mv-fr-t">' + esc(r.txt) + '</span></div>';
    });
    lastRows = nuevos; box.innerHTML = h;
    // enlaces de WhatsApp
    var url = window.MVwaUrl ? window.MVwaUrl(mensaje()) : "";
    var a = $("#mv-wa-visita"); if (a && url) a.href = url;
    try { window.dispatchEvent(new CustomEvent("mv:visita")); } catch (e) {}
  }

  /* ---------- acciones ---------- */
  function setPersona(p, on) {
    var i = S.personas.indexOf(p);
    if (on && i < 0) { S.personas.push(p); S.personas.sort(function (a, b) { return PORD.indexOf(a) - PORD.indexOf(b); }); }
    if (!on && i > -1) {
      S.personas.splice(i, 1);
      DORD.forEach(function (d) { quitar(d, p); });
    }
  }
  function quitar(d, p) {
    var j = S.asign[d].indexOf(p);
    if (j > -1) S.asign[d].splice(j, 1);
    if (!S.asign[d].length) { S.orden = S.orden.filter(function (x) { return x !== d; }); S.interes[d] = ""; }
  }
  function asignar(d, p) {
    if (S.asign[d].indexOf(p) > -1) { quitar(d, p); return; }
    if (S.personas.indexOf(p) < 0) setPersona(p, true);
    if (!S.asign[d].length) S.orden.push(d);
    S.asign[d].push(p);
    S.asign[d].sort(function (a, b) { return PORD.indexOf(a) - PORD.indexOf(b); });
  }
  function abrir(d) { S.open = S.open === d ? "" : d; }

  root.addEventListener("change", function (e) {
    var t = e.target;
    if (t.name === "quien") { setPersona(t.value, t.checked); render(); }
    else if (t.name === "cuando") { S.cuando = $$('input[name="cuando"]:checked', root).map(function (i) { return i.getAttribute("data-msg"); }); render(); }
    else if (t.id === "mv-mismo-i") { S.mismo = t.checked; render(); }
  });
  root.addEventListener("input", function (e) { if (e.target.id === "mv-nombre") { S.nombre = e.target.value; render(); } });
  root.addEventListener("click", function (e) {
    var door = e.target.closest(".mv-door");
    if (door) { abrir(door.getAttribute("data-door")); render(); return; }
    var pc = e.target.closest(".mv-pchip");
    if (pc) { asignar(pc.getAttribute("data-d"), pc.getAttribute("data-p")); render(); return; }
    var sv = e.target.closest(".mv-svc-b");
    if (sv) {
      var d = sv.closest(".mv-panel").getAttribute("data-door"), m = sv.getAttribute("data-msg");
      S.interes[d] = S.interes[d] === m ? "" : m;
      // elegir un servicio sin haber asignado a nadie: se asigna a quien viene (o a "Yo")
      if (S.interes[d] && !S.asign[d].length) { efectivas().forEach(function (p) { asignar(d, p); }); }
      render(); return;
    }
  });

  render();
})();
