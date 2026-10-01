/* 40-cita: el formulario llena el estado compartido (Fedgar) y el cajetín en vivo; el botón de WhatsApp
   es un <a href="https://wa.me/..."> real cuyo href se reescribe en cada cambio (y en pointerdown/click, sin preventDefault). */
(function () {
  "use strict";
  var TIPO_LAM = { "Residencia": "Residencia", "Nave industrial": "Nave", "Oficinas": "Oficinas", "Locales comerciales": "Local comercial", "Local comercial": "Local comercial" };
  function init() {
    var form = document.getElementById("cita-form");
    if (!form || !window.Fedgar) return;
    var F = window.Fedgar;
    var cells = {};
    Array.prototype.forEach.call(form.querySelectorAll("dd[data-k]"), function (dd) { cells[dd.getAttribute("data-k")] = dd; });
    function paint(s) {
      Object.keys(cells).forEach(function (k) {
        var v = s[k] ? String(s[k]).trim() : "";
        if (k === "m2" && v) v = v.replace(/[^0-9.,]/g, "") + " m²";
        if (k === "m2" && v === " m²") v = "";
        cells[k].textContent = v;
        cells[k].classList.toggle("is-set", !!v);
      });
    }
    form.addEventListener("submit", function (e) { e.preventDefault(); });
    form.addEventListener("change", function (e) {
      var t = e.target;
      if (t.name) F.set(t.name, t.value);
    });
    form.addEventListener("input", function (e) {
      var t = e.target;
      if (t.name === "m2" || t.name === "ciudad" || t.name === "nombre") F.set(t.name, t.value);
    });
    function setRadio(name, val) {
      var r = form.querySelectorAll('input[name="' + name + '"]');
      Array.prototype.forEach.call(r, function (i) { i.checked = i.value === val; });
    }
    /* "Quiero algo así" desde una lámina: elige la obra y el tipo */
    window.addEventListener("fedgar:obra", function (e) {
      var nombre = e.detail;
      var sel = form.querySelector('select[name="obra"]');
      if (sel) {
        sel.value = nombre;
        var fld = sel.closest ? sel.closest(".fg-field") : null;
        if (fld) { fld.classList.remove("is-flash"); void fld.offsetWidth; fld.classList.add("is-flash"); setTimeout(function () { fld.classList.remove("is-flash"); }, 1400); }
      }
      F.set("obra", nombre);
      var lam = document.getElementById("lam-" + String(nombre).toLowerCase());
      var tipo = lam ? TIPO_LAM[lam.getAttribute("data-tipo")] : "";
      if (tipo) { setRadio("tipo", tipo); F.set("tipo", tipo); }
    });
    /* Aviso visible de la lámina elegida (mini foto en arco) */
    var eleg = document.getElementById("cita-elegida"), elegImg = document.getElementById("cita-elegida-img"), elegN = document.getElementById("cita-elegida-n");
    function paintEleg(s) {
      if (!eleg) return;
      var o = s.obra ? String(s.obra) : "";
      eleg.hidden = !o;
      if (o) { elegN.textContent = o; elegImg.src = "img/idx-" + o.toLowerCase() + ".webp"; }
    }
    F.on(paint); F.on(paintEleg); paint(F.state); paintEleg(F.state);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
