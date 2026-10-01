/* El pizarron del hijo: lee el grado guardado en 20-grado (cepia_grado) y arma el mensaje. */
(function () {
  "use strict";
  var t = document.getElementById("cp-cb-t"), wa = document.getElementById("cp-cb-wa"), lk = document.getElementById("cp-cb-l");
  if (!t || !wa) return;
  var KEY = "cepia_grado", grados = [];
  function join(l) { return l.length < 2 ? l.join("") : l.slice(0, -1).join(", ") + " y " + l[l.length - 1]; }
  function counts() {
    var order = [], c = {};
    grados.forEach(function (l) { if (!c[l]) { c[l] = 0; order.push(l); } c[l]++; });
    return { order: order, c: c };
  }
  /* mensaje: "2 hijos en 3° de primaria"; pizarron: "3° de primaria (2 hijos)" */
  function forMsg() { var k = counts(); return k.order.map(function (l) { return k.c[l] > 1 ? k.c[l] + " hijos en " + l : l; }); }
  function forBoard() { var k = counts(); return k.order.map(function (l) { return k.c[l] > 1 ? l + " (" + k.c[l] + " hijos)" : l; }); }
  function msg() {
    return "Hola Colegio CEPIA, quiero informes " + (grados.length ? "para " + join(forMsg()) + ", " : "para ") + "ciclo 2026-2027. ¿Cuándo puedo conocer el colegio?";
  }
  function paint() {
    if (grados.length) {
      t.textContent = (grados.length > 1 ? "Les toca " : "Le toca ") + join(forBoard()) + ".";
      if (lk) lk.textContent = "Cambiar fecha";
      wa.href = CP.waUrl(msg());
    } else {
      t.textContent = "Pon su fecha de nacimiento y aquí aparece su grado.";
      if (lk) lk.textContent = "¿Qué grado le toca?";
      wa.href = CP.waUrl("Hola Colegio CEPIA, quiero informes para el ciclo 2026-2027. ¿Cuándo puedo conocer el colegio?");
    }
  }
  try { var s = JSON.parse(localStorage.getItem(KEY) || "null"); if (s && s.grados && s.grados.length) grados = s.grados; } catch (e) {}
  window.addEventListener("cepia:grado", function (e) {
    var res = e.detail || [];
    var g = res.filter(function (r) { return r.estado === "ok"; }).map(function (r) { return r.label; });
    if (g.length || res.every(function (r) { return r.estado === "falta"; })) {
      /* al abrir la pagina con todo vacio no borra el grado guardado de una visita anterior */
      if (g.length) grados = g;
    }
    paint();
  });
  CP.bindWa(wa, function () { return grados.length ? msg() : "Hola Colegio CEPIA, quiero informes para el ciclo 2026-2027. ¿Cuándo puedo conocer el colegio?"; });
  paint();
})();
