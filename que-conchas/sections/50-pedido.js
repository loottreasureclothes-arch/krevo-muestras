/* Nota de pedido: arma el mensaje de WhatsApp (qué, para cuándo, recoger/entrega, dedicatoria, nombre) y marca el horario en vivo. */
(function () {
  "use strict";
  function init() {
    var QC = window.QC, nota = document.getElementById("qc-nota"); if (!QC || !nota) return;
    var S = QC.state, hoy = QC.ahora().m;
    var opts = nota.querySelectorAll("#qc-opts .qc-opt"), modos = nota.querySelectorAll("#qc-modos .qc-opt");
    var optEsp = document.getElementById("qc-opt-esp"), optEspN = document.getElementById("qc-opt-esp-n");
    var det = document.getElementById("qc-detalle"), fecha = document.getElementById("qc-fecha"), ded = document.getElementById("qc-ded"), nom = document.getElementById("qc-nombre");
    var fded = document.getElementById("qc-f-ded"), vista = document.getElementById("qc-vista");
    fecha.min = QC.mañanaISO();
    function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

    function espIdx() { return S.esp == null ? hoy : S.esp; }
    function render(src) {
      var ei = espIdx(), e = QC.MES[ei].e;
      /* opción del especial: solo si ese mes tiene uno publicado */
      optEsp.hidden = !e;
      if (e) {
        optEsp.querySelector("span").textContent = ei === hoy ? "El especial del mes" : "Especial de " + QC.MESES_LC[ei];
        optEspN.textContent = e.n;
      }
      if (S.que === "especial" && !e) S.que = null;
      Array.prototype.forEach.call(opts, function (b) { b.setAttribute("aria-checked", b.getAttribute("data-q") === S.que ? "true" : "false"); });
      Array.prototype.forEach.call(modos, function (b) { b.setAttribute("aria-checked", b.getAttribute("data-m") === S.modo ? "true" : "false"); });
      fded.hidden = !(S.que === "desayuno" || S.que === "ramo");
      /* detalle bajo "Qué quieres" (no se rehace mientras se escribe) */
      if (src !== "form") {
        var h = "";
        if (S.que === "conchas") {
          h = '<p class="qc-det-t">Elige el relleno (puedes marcar varios):</p><div class="qc-chips">' +
            QC.RELLENOS.map(function (r, i) { return '<button type="button" class="qc-chip" data-r="' + i + '" aria-pressed="' + (S.rell.indexOf(i) >= 0 ? "true" : "false") + '">' + r.n + '</button>'; }).join("") + '</div>' +
            '<p class="qc-det-t">Tamaños y precios: pregúntalos.</p>';
        } else if (S.que === "especial" && e) {
          h = '<p class="qc-det-esp">' + esc(e.n) + '</p>' + (ei !== hoy ? '<p class="qc-det-t">Pregunta si ya hay pedidos.</p>' : '<p class="qc-det-t">Tamaños y precios: pregúntalos.</p>');
        } else if (S.que === "desayuno") {
          h = '<p class="qc-det-t">Cuéntanos para cuándo y, si quieres, la dedicatoria. Precios: pregúntalos.</p>';
        } else if (S.que === "ramo") {
          h = '<p class="qc-det-t">Ramo de pan para regalar. Cuéntanos para cuándo y la dedicatoria. Precios: pregúntalos.</p>';
        }
        det.innerHTML = h;
        if (document.activeElement !== fecha && fecha.value !== S.fecha) fecha.value = S.fecha || "";
        if (document.activeElement !== ded && ded.value !== S.dedic) ded.value = S.dedic || "";
        if (document.activeElement !== nom && nom.value !== S.nombre) nom.value = S.nombre || "";
      }
      vista.textContent = QC.mensaje();
    }
    nota.addEventListener("click", function (e) {
      var o = e.target.closest && e.target.closest(".qc-opt[data-q]");
      if (o) { QC.set({ que: o.getAttribute("data-q"), esp: o.getAttribute("data-q") === "especial" ? espIdx() : S.esp }, "nota"); return; }
      var m = e.target.closest && e.target.closest(".qc-opt[data-m]");
      if (m) { QC.set({ modo: m.getAttribute("data-m") }, "nota"); return; }
      var c = e.target.closest && e.target.closest(".qc-chip[data-r]");
      if (c) QC.toggleRell(+c.getAttribute("data-r"));
    });
    nota.addEventListener("keydown", function (e) {
      var b = e.target.closest && e.target.closest(".qc-opt"); if (!b) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowUp") {
        var grp = Array.prototype.filter.call(b.parentNode.querySelectorAll(".qc-opt"), function (x) { return !x.hidden; });
        var i = grp.indexOf(b), d = (e.key === "ArrowRight" || e.key === "ArrowDown") ? 1 : -1, n = grp[(i + d + grp.length) % grp.length];
        e.preventDefault(); n.focus(); n.click();
      }
    });
    fecha.addEventListener("input", function () { QC.set({ fecha: fecha.value }, "form"); });
    ded.addEventListener("input", function () { QC.set({ dedic: ded.value }, "form"); });
    nom.addEventListener("input", function () { QC.set({ nombre: nom.value }, "form"); });
    nota.addEventListener("submit", function (e) { e.preventDefault(); });
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("[data-pedir-des]");
      if (a) QC.set({ que: "desayuno" }, "des");
    });
    QC.on(render); render("init");

    /* ---- horario en vivo (America/Mexico_City) ---- */
    var est = document.getElementById("qc-estado"), estT = document.getElementById("qc-estado-t");
    function fmt(min) { var h = Math.floor(min / 60), m = min % 60, ap = h >= 12 ? "p. m." : "a. m."; h = h % 12 || 12; return h + ":" + ("0" + m).slice(-2) + " " + ap; }
    function tramos(dow) { return (dow === 0 || dow === 6) ? [[600, 720], [990, 1230]] : [[585, 765], [990, 1230]]; }
    function estado() {
      var n = QC.ahora(), t = n.h * 60 + n.mi, tr = tramos(n.dow), i;
      for (i = 0; i < tr.length; i++) if (t >= tr[i][0] && t < tr[i][1]) { est.classList.remove("is-off"); estT.textContent = "Atendiendo ahora"; return; }
      est.classList.add("is-off");
      for (i = 0; i < tr.length; i++) if (t < tr[i][0]) { estT.textContent = "Abrimos a las " + fmt(tr[i][0]); return; }
      estT.textContent = "Abrimos mañana a las " + fmt(tramos((n.dow + 1) % 7)[0][0]);
    }
    estado(); setInterval(estado, 30000);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
