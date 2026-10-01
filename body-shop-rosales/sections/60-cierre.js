/* El cierre repite lo que se eligió en el tablero (estado compartido en window.BSR). */
(function () {
  "use strict";
  var B = window.BSR; if (!B) return;
  var wa = document.getElementById("bs-ci-wa");
  var vacio = document.getElementById("bs-ci-vacio");
  var list = document.getElementById("bs-ci-list");
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function fila(rowId, ddId, txt) {
    var r = document.getElementById(rowId); if (!r) return;
    r.hidden = !txt; document.getElementById(ddId).textContent = txt || "";
  }
  function render(st) {
    wa.href = B.url();
    var hay = st.z.length || st.c || st.golpe || st.pulido || (st.auto || "").trim();
    vacio.hidden = !!hay; list.hidden = !hay;
    document.getElementById("ci-piezas").textContent = st.z.length ? cap(B.piezasTexto()) : "Sin elegir";
    fila("ci-r-color", "ci-color", st.c ? cap(B.COLORES[st.c].nombre) : "");
    var ex = B.extrasArr();
    fila("ci-r-extras", "ci-extras", ex.length ? ex.map(cap).join(" · ") : "");
    fila("ci-r-auto", "ci-auto", (st.auto || "").trim());
  }
  B.on(render);
  render(B.state());
})();
