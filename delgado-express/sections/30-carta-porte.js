/* 30 · la carta porte: arma el mensaje de WhatsApp, pone el sello y guarda dx_carta */
(function () {
  "use strict";
  var KEY = "dx_carta";
  var form = document.getElementById("cp-form");
  if (!form) return;
  var $ = function (id) { return document.getElementById(id); };
  var f = { origen: $("cp-origen"), destino: $("cp-destino"), carga: $("cp-carga"), peso: $("cp-peso"), fecha: $("cp-fecha"), empresa: $("cp-empresa"), nombre: $("cp-nombre") };
  var stamp = $("cp-stamp"), folio = $("cp-folio"), wa = $("cp-wa");
  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  var MES3 = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
  var stamped = false;

  function cuanta() { var r = form.querySelector('input[name="cuanta"]:checked'); return r ? r.value : ""; }
  function clean(s) { return (s || "").replace(/\s+/g, " ").trim(); }
  function fechaLarga(iso) {
    var p = (iso || "").split("-"); if (p.length !== 3) return "";
    return parseInt(p[2], 10) + " de " + MESES[parseInt(p[1], 10) - 1];
  }
  function hoyMx() {
    try {
      var parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Mexico_City", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
      var o = {}; parts.forEach(function (x) { o[x.type] = x.value; });
      return { d: o.day, m: parseInt(o.month, 10) - 1, y: o.year.slice(2) };
    } catch (e) { var n = new Date(); return { d: ("0" + n.getDate()).slice(-2), m: n.getMonth(), y: String(n.getFullYear()).slice(2) }; }
  }
  function state() {
    return { origen: clean(f.origen.value), destino: clean(f.destino.value), carga: clean(f.carga.value), cuanta: cuanta(), peso: clean(f.peso.value), fecha: f.fecha.value, empresa: clean(f.empresa.value), nombre: clean(f.nombre.value) };
  }
  function dot(t) { return /[.!?]$/.test(t) ? t : t + "."; }
  function message(s) {
    var p = ["Hola Delgado Express, quiero cotizar un flete."];
    if (s.origen) p.push("Origen: " + dot(s.origen));
    if (s.destino) p.push("Destino: " + dot(s.destino));
    var carga = s.carga ? s.carga + (s.cuanta ? ", " + s.cuanta.toLowerCase() : "") : (s.cuanta ? s.cuanta.toLowerCase() : "");
    if (carga) p.push("Carga: " + dot(carga));
    if (s.peso) p.push("Peso aproximado: " + dot(s.peso));
    var fl = fechaLarga(s.fecha); if (fl) p.push("Fecha de carga: " + dot(fl));
    if (s.empresa) p.push("Empresa: " + dot(s.empresa));
    if (s.nombre) p.push("Mi nombre: " + s.nombre);
    return p.join("\n");
  }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
  function load() { try { var v = JSON.parse(localStorage.getItem(KEY) || "null"); return v && typeof v === "object" ? v : null; } catch (e) { return null; } }
  window.DXcarta = { load: load, message: message, fechaLarga: fechaLarga, state: function () { return state(); } };

  function refresh(first) {
    var s = state();
    wa.setAttribute("data-wa", message(s));
    wa.href = window.DX ? window.DX.waUrl(message(s)) : wa.href;
    var ok = !!(s.origen && s.destino && s.carga);
    if (ok && !stamped) {
      stamped = true;
      var h = hoyMx(); folio.textContent = h.d + "·" + MES3[h.m] + "·" + h.y;
      stamp.classList.remove("is-on", "is-static");
      if (first || (window.DX && window.DX.reduce)) stamp.classList.add("is-static");
      else { void stamp.offsetWidth; stamp.classList.add("is-on"); }
    } else if (!ok && stamped) {
      stamped = false; stamp.classList.remove("is-on", "is-static"); folio.textContent = "__ / __ / __";
    }
    if (!first) { save(s); try { window.dispatchEvent(new CustomEvent("dx:carta", { detail: s })); } catch (e) {} }
  }

  var saved = load();
  if (saved) {
    ["origen", "destino", "carga", "peso", "fecha", "empresa", "nombre"].forEach(function (k) { if (saved[k]) f[k].value = saved[k]; });
    if (saved.cuanta) { var r = form.querySelector('input[name="cuanta"][value="' + saved.cuanta.replace(/"/g, "") + '"]'); if (r) r.checked = true; }
  }
  form.addEventListener("input", function () { refresh(false); });
  form.addEventListener("change", function () { refresh(false); });
  form.addEventListener("submit", function (e) { e.preventDefault(); });
  /* tocar de nuevo la ficha ya marcada la desmarca */
  form.addEventListener("click", function (e) {
    var t = e.target; if (!(t && t.name === "cuanta" && t.type === "radio")) return;
    if (t.getAttribute("data-was") === "1") { t.checked = false; t.removeAttribute("data-was"); refresh(false); return; }
    var all = form.querySelectorAll('input[name="cuanta"]'); for (var i = 0; i < all.length; i++) all[i].removeAttribute("data-was");
    t.setAttribute("data-was", "1");
  });
  refresh(true);
})();
