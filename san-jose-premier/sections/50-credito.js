/* 50-credito: el formulario arma el mensaje de WhatsApp (href real que se reescribe en pointerdown/click, sin preventDefault) */
(function () {
  "use strict";
  var form = document.getElementById("sj-form");
  if (!form || !window.SJ) return;
  var preview = document.getElementById("sj-preview");
  var nombre = document.getElementById("sj-nombre");
  function paint() {
    var st = SJ.state;
    Array.prototype.forEach.call(form.querySelectorAll('input[name="modelo"]'), function (r) { r.checked = r.value === st.modelo; });
    Array.prototype.forEach.call(form.querySelectorAll('input[name="credito"]'), function (r) { r.checked = r.value === st.credito; });
    if (nombre && document.activeElement !== nombre) nombre.value = st.nombre || "";
    if (preview) preview.textContent = SJ.message();
  }
  form.addEventListener("change", function (e) {
    var t = e.target;
    if (t.name === "modelo") SJ.set("modelo", t.value);
    else if (t.name === "credito") SJ.set("credito", t.value);
  });
  if (nombre) nombre.addEventListener("input", function () { SJ.set("nombre", nombre.value); });
  SJ.on(paint);
  paint();
})();
