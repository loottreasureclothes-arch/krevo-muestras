/* Cierre: repite la pared colgada y el mensaje; cambia el título según haya cuadros o no. */
(function () {
  "use strict";
  function start() {
    var NS = window.NS, root = document.getElementById("cierre");
    if (!NS || !root) return;
    var vacio = root.querySelector(".ns-var--vacio"), lleno = root.querySelector(".ns-var--lleno");
    var rail = document.getElementById("ns-cierre-rail"), resumen = document.getElementById("ns-cierre-resumen"), ir = document.getElementById("ns-cierre-ir");
    var SRC = { frances: "c1", caritas: "c2", almendra: "c3", perlas: "c4" };
    function paint() {
      var S = NS.state, has = S.d.length > 0;
      vacio.hidden = has; lleno.hidden = !has;
      [].forEach.call((has ? lleno : vacio).querySelectorAll("[data-reveal]"), function (e) { e.classList.add("is-in"); });
      rail.hidden = !has; resumen.hidden = NS.vacio();
      ir.hidden = has;
      var html = "";
      for (var i = 0; i < 3; i++) {
        var id = S.d[i], inner = "";
        if (id) inner = '<span class="ns-hung"><span class="ns-frame ns-frame--lite"><span class="ns-frame-in" style="display:block"><img src="img/' + SRC[id] + '-240.webp" width="240" height="300" alt="' + NS.byId(id).n + '" loading="lazy"></span></span></span>';
        html += '<div class="ns-slot"><i class="ns-nail"></i>' + (id ? '<svg class="ns-v" viewBox="0 0 76 22" preserveAspectRatio="none" aria-hidden="true"><path d="M38 0 L5 22 M38 0 L71 22"/></svg>' : "") + inner + "</div>";
      }
      rail.innerHTML = html;
      var parts = [];
      if (S.s.length) parts.push(NS.lista(S.s.map(function (k) { return NS.SERVICIOS[k]; })));
      if (S.suc) parts.push("sucursal " + NS.SUC[S.suc]);
      if (NS.fmtDia(S.dia)) parts.push(NS.fmtDia(S.dia));
      resumen.textContent = parts.length ? parts.join(" · ") : "";
      if (!parts.length) resumen.hidden = true;
    }
    NS.on(paint);
    paint();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
