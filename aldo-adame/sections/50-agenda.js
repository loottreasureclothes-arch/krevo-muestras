/* El correo que arma el formulario.
   El <a> ya trae en el HTML un mailto: REAL con asunto y cuerpo base: si el JS
   no corre, el boton sigue abriendo el correo. Aqui solo se reescribe el href
   (en el click y al escribir), sin preventDefault y sin window.open. */
(function () {
  "use strict";

  var form = document.getElementById("aa-form");
  var boton = document.getElementById("aa-mail");
  if (!form || !boton) return;

  var CORREO = "aldoadame@aldoadame.com";
  var SALUDO = "Hola Aldo, vi tu página y quiero platicar una fecha.";
  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
               "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

  var $ = function (id) { return document.getElementById(id); };
  var elAsunto = $("aa-asunto"), elCuerpo = $("aa-cuerpo");

  // El minimo de la fecha se pone al arrancar, no quemado en el HTML: asi nunca
  // deja escoger una fecha que ya paso.
  var elFecha = $("f-fecha");
  if (elFecha) {
    var hoy = new Date();
    hoy = new Date(hoy.getTime() - hoy.getTimezoneOffset() * 60000);
    elFecha.setAttribute("min", hoy.toISOString().slice(0, 10));
  }

  function fechaLarga(v) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || "");
    if (!m) return "";
    var mes = MESES[parseInt(m[2], 10) - 1];
    if (!mes) return "";
    return parseInt(m[3], 10) + " de " + mes + " de " + m[1];
  }

  function arma() {
    var tipo = ($("f-tipo").value || "").trim();
    var fecha = fechaLarga($("f-fecha").value);
    var lugar = ($("f-lugar").value || "").trim();
    var inv = ($("f-inv").value || "").trim();
    var nombre = ($("f-nombre").value || "").trim();

    // Asunto: solo con lo que de verdad llenaron. Nada de renglones vacios.
    var partes = [tipo || "Agenda 2027"];
    if (fecha) partes.push(fecha);
    if (lugar) partes.push(lugar);
    var asunto = partes.join(" - ");
    if (!fecha && !lugar) asunto = "Agenda 2027 - Aldo Adame";

    var lineas = [SALUDO, ""];
    if (tipo) lineas.push("Tipo de evento: " + tipo);
    if (fecha) lineas.push("Fecha tentativa: " + fecha);
    if (lugar) lineas.push("Ciudad o venue: " + lugar);
    if (inv) lineas.push("Invitados: " + inv);
    if (nombre) lineas.push("Mi nombre: " + nombre);
    var cuerpo = lineas.join("\n");

    return { asunto: asunto, cuerpo: cuerpo };
  }

  function pinta() {
    var m = arma();
    if (elAsunto) elAsunto.textContent = m.asunto;
    if (elCuerpo) elCuerpo.textContent = m.cuerpo;
    boton.setAttribute("href",
      "mailto:" + CORREO +
      "?subject=" + encodeURIComponent(m.asunto) +
      "&body=" + encodeURIComponent(m.cuerpo));
  }

  form.addEventListener("input", pinta);
  form.addEventListener("change", pinta);
  boton.addEventListener("click", pinta);          // sin preventDefault: el <a> navega solo
  form.addEventListener("submit", function (e) { e.preventDefault(); pinta(); });
  pinta();
})();
