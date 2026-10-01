/* 2 · MITAD Y MITAD: elegir una pizza la pinta en la mitad marcada del dibujo; el mensaje de WhatsApp se arma solo. */
(function () {
  "use strict";
  var ML = window.ML;
  var sec = document.getElementById("mitad");
  if (!ML || !sec) return;
  sec.classList.add("mt-js");

  var rows = Array.prototype.slice.call(sec.querySelectorAll(".mt-row"));
  var info = {};
  rows.forEach(function (r) {
    info[r.getAttribute("data-id")] = { id: r.getAttribute("data-id"), base: r.getAttribute("data-base"), gl: r.getAttribute("data-gl").split(","), esp: r.getAttribute("data-esp") === "1", row: r };
  });
  var halves = [document.getElementById("mt-half-0"), document.getElementById("mt-half-1")];
  var tps = [document.getElementById("mt-tp-0"), document.getElementById("mt-tp-1")];
  var sauces = halves.map(function (h) { return h.querySelector(".mt-sauce"); });
  var resL = document.getElementById("mt-res"), resS = document.getElementById("mt-res-s");
  var tabs = Array.prototype.slice.call(sec.querySelectorAll(".mt-tab"));
  var grupos = Array.prototype.slice.call(sec.querySelectorAll(".mt-grupo"));
  var fN = Array.prototype.slice.call(sec.querySelectorAll("#mt-n .mt-ficha"));
  var fC = Array.prototype.slice.call(sec.querySelectorAll("#mt-c .mt-ficha"));
  var ab = document.getElementById("mt-ab");

  /* ---------- vocabulario de trazos de tinta ---------- */
  var GL = {
    circulo: '<circle r="10" class="mt-g-circulo"/><circle cx="-3.2" cy="-2.4" r="1.5" class="mt-g-pt"/><circle cx="3.4" cy="2.6" r="1.5" class="mt-g-pt"/><circle cx="2.6" cy="-4" r="1.2" class="mt-g-pt"/>',
    hoja: '<path d="M-10 5 Q-7 -11 10 -9 Q9 9 -10 5 Z" class="mt-g-hoja"/><path d="M-10 5 L5 -3" class="mt-gl"/>',
    anillo: '<circle r="5.6" class="mt-g-anillo"/>',
    arco: '<path d="M-10 3 Q-10 -10 0 -10 Q10 -10 10 3 Z M-2.6 3 V10 H2.6 V3" class="mt-g-crema"/>',
    cubito: '<rect x="-6" y="-6" width="12" height="12" rx="1.6" class="mt-g-crema"/>',
    cherry: '<circle r="7.2" class="mt-g-cherry"/><path d="M0 -7 q3 -6 8 -4" class="mt-g-hoja2"/>',
    garabato: '<path d="M-14 0 q3.5 -9 7 0 t7 0 t7 0 t7 0" class="mt-g-gar"/>',
    puntos: '<circle cx="-5" cy="-3" r="2" class="mt-g-pt"/><circle cx="4" cy="-5" r="1.7" class="mt-g-pt"/><circle cx="1" cy="4" r="2.1" class="mt-g-pt"/><circle cx="8" cy="3" r="1.5" class="mt-g-pt"/>'
  };
  /* posiciones fijas (semilla) dentro de cada mitad */
  function slots(half) {
    var s = half === 0 ? 7 : 19, out = [], tries = 0;
    function rnd() { s = (s * 16807) % 2147483647; return s / 2147483647; }
    while (out.length < 16 && tries < 1400) {
      tries++;
      var x = half === 0 ? 150 - (16 + rnd() * 104) : 150 + (16 + rnd() * 104), y = 160 + (rnd() * 2 - 1) * 112;
      var dx = x - 150, dy = y - 160;
      if (dx * dx + dy * dy > 108 * 108) continue;
      var ok = true;
      for (var i = 0; i < out.length; i++) { var ex = out[i][0] - x, ey = out[i][1] - y; if (ex * ex + ey * ey < 27 * 27) { ok = false; break; } }
      if (ok) out.push([x, y, Math.round(rnd() * 360), 1.02 + rnd() * .3]);
    }
    return out;
  }
  var SL = [slots(0), slots(1)];
  /* mozzarella derretida: manchas irregulares fijas debajo de los trazos */
  function quesos(half) {
    var s = half === 0 ? 41 : 83, out = "", k;
    function rnd() { s = (s * 16807) % 2147483647; return s / 2147483647; }
    for (k = 0; k < 9; k++) {
      var cx = half === 0 ? 150 - (14 + rnd() * 96) : 150 + (14 + rnd() * 96), cy = 160 + (rnd() * 2 - 1) * 100;
      var dx = cx - 150, dy = cy - 160; if (dx * dx + dy * dy > 98 * 98) { k--; continue; }
      var r = 15 + rnd() * 9, d = "", n = 7, a;
      for (a = 0; a <= n; a++) {
        var t = a / n * Math.PI * 2, rr = r * (.78 + rnd() * .34), x = cx + Math.cos(t) * rr, y = cy + Math.sin(t) * rr * .86;
        d += (a ? " " : "M") + x.toFixed(1) + " " + y.toFixed(1);
      }
      out += '<path class="mt-queso" d="' + d + ' Z"/>';
    }
    return out;
  }
  var QS = [quesos(0), quesos(1)];

  var last = [undefined, undefined];
  function paint(h, id) {
    if (last[h] === id) return;
    last[h] = id;
    var p = info[id], el = sauces[h];
    if (!p) { el.setAttribute("class", "mt-sauce"); tps[h].innerHTML = ""; return; }
    el.setAttribute("class", "mt-sauce " + (p.base === "blanca" ? "is-blanca" : "is-roja"));
    var html = '<g class="mt-pop mt-quesos" style="--i:0">' + QS[h] + "</g>", sl = SL[h];
    for (var i = 0; i < sl.length; i++) {
      var g = p.gl[i % p.gl.length];
      html += '<g transform="translate(' + sl[i][0].toFixed(1) + " " + sl[i][1].toFixed(1) + ") rotate(" + sl[i][2] + ") scale(" + sl[i][3].toFixed(2) + ')"><g class="mt-pop" style="--i:' + i + '">' + GL[g] + "</g></g>";
    }
    tps[h].innerHTML = html;
  }

  /* ---------- pintar todo según la mesa ---------- */
  var nombre = function (id) { return ML.NOM[id]; };
  function render() {
    var m = ML.mesa, a = m.m[0], b = m.m[1], i;
    for (i = 0; i < 2; i++) {
      paint(i, m.m[i]);
      halves[i].classList.toggle("is-act", m.a === i);
      halves[i].classList.toggle("is-vacia", !m.m[i]);
      halves[i].setAttribute("aria-pressed", m.a === i ? "true" : "false");
      halves[i].setAttribute("aria-label", (i === 0 ? "Mitad izquierda" : "Mitad derecha") + (m.m[i] ? ": " + nombre(m.m[i]) : ", vacía") + (m.a === i ? ", marcada" : ""));
    }
    rows.forEach(function (r) {
      var id = r.getAttribute("data-id"), tag = r.querySelector(".mt-tag"), sel = id === a || id === b;
      r.classList.toggle("is-sel", sel);
      r.setAttribute("aria-pressed", sel ? "true" : "false");
      tag.textContent = (a === b && id === a) ? "Entera" : (id === a ? "Mitad izq." : (id === b ? "Mitad der." : ""));
    });
    var esp = (a && info[a] && info[a].esp) || (b && info[b] && info[b].esp);
    if (a && b) {
      resL.innerHTML = a === b ? "Entera: " + nombre(a) : '<span class="mt-r0">Mitad y mitad</span><span class="mt-r1">' + nombre(a) + '</span><span class="mt-r2"><i>y</i> ' + nombre(b) + "</span>";
      resS.textContent = esp ? "Las especiales llevan +$29." : "Toca una mitad para cambiarla.";
    } else if (a || b) {
      resL.textContent = "Mitad " + nombre(a || b);
      resS.textContent = (esp ? "Las especiales llevan +$29. " : "") + "Falta la otra mitad.";
    } else {
      resL.textContent = "Dos mitades vacías";
      resS.textContent = "Toca una pizza de la lista.";
    }
    var col = sec.querySelector(".mt-pizza-col"); if (col) col.classList.toggle("is-vacia", !a && !b);
    fN.forEach(function (f) { f.setAttribute("aria-pressed", m.n === parseInt(f.getAttribute("data-n"), 10) ? "true" : "false"); });
    var hoyOff = hoyDeshabilitado();
    fC.forEach(function (f) {
      var c = f.getAttribute("data-c");
      f.setAttribute("aria-pressed", m.c === c ? "true" : "false");
      if (c === "hoy") f.setAttribute("aria-disabled", hoyOff ? "true" : "false");
    });
    ab.hidden = !hoyOff;
  }
  function hoyDeshabilitado() { var e = ML.estado(); return !e.abierto && e.cuando === "manana"; }

  /* ---------- pestañas ---------- */
  function setTab(k) {
    tabs.forEach(function (t) { t.setAttribute("aria-selected", t.getAttribute("data-tab") === k ? "true" : "false"); t.tabIndex = t.getAttribute("data-tab") === k ? 0 : -1; });
    grupos.forEach(function (g) { g.classList.toggle("is-on", g.getAttribute("data-grupo") === k); });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { setTab(t.getAttribute("data-tab")); });
    t.addEventListener("keydown", function (e) {
      var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      var n = tabs[(i + d + tabs.length) % tabs.length];
      setTab(n.getAttribute("data-tab")); n.focus();
    });
  });
  setTab("rojas");

  /* ---------- toques ---------- */
  rows.forEach(function (r) {
    r.addEventListener("click", function () {
      var id = r.getAttribute("data-id");
      ML.cambiar(function (m) { m.m[m.a] = id; m.a = m.a === 0 ? 1 : 0; });
    });
  });
  halves.forEach(function (h, i) {
    function act() { ML.cambiar(function (m) { m.a = i; }); }
    h.addEventListener("click", act);
    h.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); act(); } });
  });
  fN.forEach(function (f) {
    f.addEventListener("click", function () {
      var n = parseInt(f.getAttribute("data-n"), 10);
      ML.cambiar(function (m) { m.n = m.n === n ? null : n; });
    });
  });
  fC.forEach(function (f) {
    f.addEventListener("click", function () {
      var c = f.getAttribute("data-c");
      if (c === "hoy" && hoyDeshabilitado()) return;
      ML.cambiar(function (m) { m.c = m.c === c ? null : c; });
    });
  });

  window.addEventListener("ml:mesa", render);
  /* si ya cerraron hoy, "Hoy" no se puede y queda marcada "Mañana" */
  if (hoyDeshabilitado() && (ML.mesa.c === null || ML.mesa.c === "hoy")) ML.cambiar(function (m) { m.c = "manana"; });
  else render();
})();
