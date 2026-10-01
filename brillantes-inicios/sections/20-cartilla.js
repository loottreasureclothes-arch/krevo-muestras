/* La cartilla de inscripcion: casillas, contador vivo, vista previa del mensaje. Estado en bi_cartilla (site.js). */
(function () {
  "use strict";
  function init() {
    var C = window.BI && window.BI.cartilla;
    var root = document.getElementById("cartilla");
    if (!C || !root) return;
    var boxes = root.querySelectorAll("input[data-doc]");
    var count = root.querySelector(".bi-count");
    var txt = document.getElementById("bi-count-txt");
    var prev = document.getElementById("bi-preview");
    var edad = document.getElementById("bi-edad");
    var nombre = document.getElementById("bi-nombre");
    Array.prototype.forEach.call(boxes, function (b) { b.checked = C.has(b.getAttribute("data-doc")); });
    if (edad) edad.value = C.state.edad || "";
    if (nombre) nombre.value = C.state.nombre || "";
    function paint() {
      var n = C.count(), left = C.TOTAL - n;
      var t = left === 0 ? "Ya tienes todo. Siguiente: inscribe en STIGI."
            : left === 1 ? "Te falta 1 documento"
            : "Te faltan " + left + " documentos";
      if (txt) txt.textContent = t;
      if (count) { count.style.setProperty("--p", (n / C.TOTAL * 100) + "%"); count.classList.toggle("is-done", left === 0); }
      var sheet = root.querySelector(".bi-cart-sheet");
      if (sheet) sheet.classList.toggle("is-done", left === 0); /* sello "¡Listo!" (una vez por llegada, reversible) */
      var sn = document.getElementById("bi-side-n"), st = document.getElementById("bi-side-txt"), sb = document.getElementById("bi-side-bar");
      if (sn) sn.textContent = n;
      if (st) st.textContent = left === 0 ? "Ya tienes todo. Siguiente: STIGI." : n === 1 ? "documento listo" : "documentos listos";
      if (sb) sb.style.width = (n / C.TOTAL * 100) + "%";
      if (prev) prev.textContent = "Tu mensaje: “" + C.message() + "”";
    }
    Array.prototype.forEach.call(boxes, function (b) {
      b.addEventListener("change", function () { C.setDoc(b.getAttribute("data-doc"), b.checked); });
    });
    if (edad) edad.addEventListener("input", function () { C.setField("edad", edad.value); });
    if (nombre) nombre.addEventListener("input", function () { C.setField("nombre", nombre.value); });
    window.addEventListener("bi:cartilla", paint);
    paint();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();

/* Correccion 3: la ayuda corta va tras " · " en la misma linea del documento; si no cupo y bajo a su renglon, se quita el punto. */
(function () {
  "use strict";
  function fit() {
    var smalls = document.querySelectorAll("#cartilla small.bi-in");
    Array.prototype.forEach.call(smalls, function (s) {
      s.classList.remove("is-own");
      var b = s.previousElementSibling;
      if (!b) return;
      var r = b.getClientRects(), last = r[r.length - 1];
      if (last && Math.abs(s.getBoundingClientRect().top - last.top) > 8) s.classList.add("is-own");
    });
  }
  var t;
  function soon() { clearTimeout(t); t = setTimeout(fit, 120); }
  function init() {
    fit();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    window.addEventListener("resize", soon);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
