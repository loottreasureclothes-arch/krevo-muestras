/* 60 · el cierre lee la carta porte guardada (dx_carta) y se actualiza en vivo */
(function () {
  "use strict";
  var l1 = document.getElementById("cj-l1"), l2 = document.getElementById("cj-l2"); if (!l1 || !l2) return;
  var $ = function (id) { return document.getElementById(id); };
  var o = $("cj-o"), d = $("cj-d"), c = $("cj-c"), fe = $("cj-f"), wa = $("cj-wa"), stamp = $("cj-stamp"), folio = $("cj-folio");
  var MES3 = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
  var last = "";
  function put(el, v) { var e = !v; el.textContent = e ? el.getAttribute("data-empty") : v; el.classList.toggle("is-empty", e); }
  function render(s) {
    s = s || {};
    var carga = s.carga ? s.carga + (s.cuanta ? ", " + s.cuanta.toLowerCase() : "") : (s.cuanta ? s.cuanta.toLowerCase() : "");
    put(o, s.origen); put(d, s.destino); put(c, carga);
    put(fe, s.fecha && window.DXcarta ? window.DXcarta.fechaLarga(s.fecha) : "");
    var ok = !!(s.origen && s.destino && s.carga), t1, t2;
    if (ok) { t1 = "Tu flete"; t2 = "ya tiene carta."; }
    else if (!s.destino) { t1 = "Falta el"; t2 = "destino."; }
    else if (!s.carga) { t1 = "Falta la"; t2 = "carga."; }
    else { t1 = "Falta el"; t2 = "origen."; }
    var key = t1 + "|" + t2;
    if (key !== last) { last = key; window.DXsetLine ? (window.DXsetLine(l1, t1), window.DXsetLine(l2, t2)) : (l1.textContent = t1, l2.textContent = t2); }
    stamp.classList.toggle("is-hidden", !ok);
    var n = new Date(), p; try { p = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Mexico_City", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(n); } catch (e) { p = null; }
    if (ok && p) { var q = {}; p.forEach(function (x) { q[x.type] = x.value; }); folio.textContent = q.day + "·" + MES3[parseInt(q.month, 10) - 1] + "·" + q.year.slice(2); } else folio.textContent = "__ / __ / __";
    var msg = window.DXcarta ? window.DXcarta.message(s) : "Hola Delgado Express, quiero cotizar un flete.";
    wa.setAttribute("data-wa", msg); if (window.DX) wa.href = window.DX.waUrl(msg);
  }
  function start() {
    render(window.DXcarta ? (window.DXcarta.load() || window.DXcarta.state()) : null);
    window.addEventListener("dx:carta", function (e) { render(e.detail); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
