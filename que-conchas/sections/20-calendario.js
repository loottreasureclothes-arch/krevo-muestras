/* Componente firma: LA CONCHA DEL AÑO. 12 gajos = 12 meses; el mes de hoy llega encendido con su banderita. */
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  function init() {
    var QC = window.QC, box = document.getElementById("qc-cal-concha"), strip = document.getElementById("qc-cal-strip"), ficha = document.getElementById("qc-ficha");
    if (!QC || !box || !strip || !ficha) return;
    var hoy = QC.ahora().m, sel = hoy;
    var C = 200, R = 190;
    function pt(r, deg) { var t = deg * Math.PI / 180; return [C + r * Math.cos(t), C + r * Math.sin(t)]; }
    function f(n) { return Math.round(n * 10) / 10; }
    function gajoPath(i) {
      var a1 = -105 + 30 * i, a2 = a1 + 30, c1 = pt(104, a1 + 19), c2 = pt(104, a2 + 19), p1 = pt(R, a1), p2 = pt(R, a2);
      return "M" + C + " " + C + "Q" + f(c1[0]) + " " + f(c1[1]) + " " + f(p1[0]) + " " + f(p1[1]) +
        "A" + R + " " + R + " 0 0 1 " + f(p2[0]) + " " + f(p2[1]) + "Q" + f(c2[0]) + " " + f(c2[1]) + " " + C + " " + C + "Z";
    }
    /* ---- SVG ---- */
    var h = '<svg viewBox="-10 -10 420 420" xmlns="' + NS + '" aria-hidden="false">';
    for (var i = 0; i < 12; i++) {
      var has = !!QC.MES[i].e, mid = -90 + 30 * i + 8, lp = pt(122, mid);
      var cls = "gajo " + (has ? "has" : "no") + (i === hoy ? " hoy" : "");
      var lbl = QC.MES[i].n + ": " + QC.especial(i).n + (i === hoy ? " (este mes)" : "");
      h += '<g class="' + cls + '" data-i="' + i + '" role="button" tabindex="0" aria-pressed="false" aria-label="' + lbl + '">' +
        '<path class="sh" d="' + gajoPath(i) + '" stroke="#FAF4F4" stroke-width="3" stroke-linejoin="round"/>' +
        '<text x="' + f(lp[0]) + '" y="' + f(lp[1]) + '">' + QC.MES[i].a + '</text></g>';
    }
    h += '<path class="selring" id="qc-selring" d=""/><circle class="ring" cx="200" cy="200" r="190.5"/>' +
      '<circle cx="200" cy="200" r="31" fill="#FAF4F4" stroke="#806257" stroke-width="3"/>' +
      '<use href="#i-concha" x="180" y="180" width="40" height="40" style="color:#806257;pointer-events:none"/>';
    var tp = pt(R * 0.925, -90 + 30 * hoy + 7);
    h += '<g class="tag" transform="translate(' + f(tp[0]) + ' ' + f(tp[1]) + ')"><line x1="-14" y1="-8" x2="-21" y2="-30" stroke="#3B2A24" stroke-width="2.6" stroke-linecap="round"/>' +
      '<rect x="-27" y="-17" width="54" height="34" rx="2" fill="#FAF4F4" stroke="#806257" stroke-width="1.8"/><text text-anchor="middle" x="0" y="-3.5">HOY</text><text text-anchor="middle" x="0" y="10">TOCA</text></g>';
    h += '</svg>';
    box.innerHTML = h;
    var gs = box.querySelectorAll(".gajo"), ring = box.querySelector("#qc-selring");

    /* ---- Tira de meses ---- */
    var sb = "";
    for (var j = 0; j < 12; j++) sb += '<button type="button" class="qc-mes ' + (QC.MES[j].e ? "has" : "no") + (j === hoy ? " hoy" : "") + '" data-i="' + j + '" aria-pressed="false">' + QC.MES[j].n + '</button>';
    strip.innerHTML = sb;
    var btns = strip.querySelectorAll(".qc-mes");

    function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
    function foto(e) {
      if (e.foto === "pan") return '<img class="is-cut" src="img/hero-pan-640.webp" width="640" height="619" alt="' + esc(e.alt) + '" decoding="async">';
      return '<img src="img/mes-' + e.foto + '-480.webp" srcset="img/mes-' + e.foto + '-480.webp 480w, img/mes-' + e.foto + '-900.webp 900w" sizes="(min-width: 1100px) 230px, 212px" width="480" height="600" alt="' + esc(e.alt) + '" decoding="async">';
    }
    function fillFicha(i) {
      var e = QC.especial(i), real = !!QC.MES[i].e, esHoy = i === hoy;
      var mesTxt = (i === 9 || i === 10) ? "Octubre y noviembre" : QC.MES[i].n;
      var aviso = "";
      if (!esHoy && real) aviso = '<p class="aviso">Vuelve en ' + QC.MESES_LC[i] + '. Pregunta si ya hay pedidos.</p>';
      var act = '<a class="qc-link" href="#pedido" data-pedir="' + i + '">Pedir este</a>';
      if (!real) act += '<a class="qc-link" href="#rellenos">Ver rellenos</a>';
      ficha.innerHTML =
        '<div class="qc-ficha-ph">' + foto(e) + '<span class="qc-band">' + esc(e.band) + '</span></div>' +
        '<div class="qc-ficha-tx"><p class="qc-ficha-mes">' + mesTxt + (esHoy ? ' <em>Este mes</em>' : '') + '</p>' +
        '<h3>' + esc(e.n) + '</h3><blockquote>«' + esc(e.frase) + '»</blockquote>' +
        (e.extra ? '<p class="extra">' + esc(e.extra) + '</p>' : '') + aviso +
        '<div class="qc-ficha-act">' + act + '</div></div>';
    }
    function paint(i, anim) {
      sel = i;
      Array.prototype.forEach.call(gs, function (g, k) { g.classList.toggle("sel", k === i); g.setAttribute("aria-pressed", k === i ? "true" : "false"); });
      Array.prototype.forEach.call(btns, function (b, k) { b.setAttribute("aria-pressed", k === i ? "true" : "false"); });
      ring.setAttribute("d", gajoPath(i));
      /* lleva la tira al mes elegido sin mover la pagina */
      var b = btns[i]; if (b && strip.scrollWidth > strip.clientWidth) strip.scrollTo({ left: b.offsetLeft - (strip.clientWidth - b.offsetWidth) / 2, behavior: QC.reduce ? "auto" : "smooth" });
      if (anim && !QC.reduce) { ficha.classList.add("is-swap"); setTimeout(function () { fillFicha(i); ficha.classList.remove("is-swap"); }, 130); }
      else fillFicha(i);
    }
    box.addEventListener("click", function (e) { var g = e.target.closest && e.target.closest(".gajo"); if (g) paint(+g.getAttribute("data-i"), true); });
    box.addEventListener("keydown", function (e) {
      var g = e.target.closest && e.target.closest(".gajo"); if (!g) return;
      var i = +g.getAttribute("data-i");
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); paint(i, true); }
      else if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); gs[(i + 1) % 12].focus(); paint((i + 1) % 12, true); }
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); gs[(i + 11) % 12].focus(); paint((i + 11) % 12, true); }
    });
    strip.addEventListener("click", function (e) { var b = e.target.closest && e.target.closest(".qc-mes"); if (b) paint(+b.getAttribute("data-i"), true); });
    ficha.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("[data-pedir]"); if (!a) return;
      var i = +a.getAttribute("data-pedir");
      QC.set(QC.MES[i].e ? { que: "especial", esp: i } : { que: "conchas" }, "cal");
    });
    paint(hoy, false);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
