/* La México Gran Cantina: formulario de reservación a WhatsApp */
(function () {
  "use strict";
  var WA = "524491201728";

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function fechaBonita(iso) {
    var p = iso.split("-");
    if (p.length !== 3) return iso;
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    try {
      return d.toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" });
    } catch (e) { return iso; }
  }

  function init() {
    var form = document.getElementById("lm-form");
    if (!form) return;
    var dia = form.elements.dia;
    var now = new Date();
    dia.min = now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate());

    var err = form.querySelector(".lm-form-err");

    form.addEventListener("input", function (e) {
      var f = e.target.closest(".lm-field");
      if (f) f.classList.remove("is-bad");
    });
    form.addEventListener("change", function (e) {
      var f = e.target.closest(".lm-field");
      if (f) f.classList.remove("is-bad");
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nombre = form.elements.nombre.value.trim();
      var personas = form.elements.personas.value;
      var d = form.elements.dia.value;
      var h = form.elements.hora.value;
      var ok = true;
      [["nombre", nombre], ["personas", personas], ["dia", d], ["hora", h]].forEach(function (x) {
        var bad = !x[1];
        form.elements[x[0]].closest(".lm-field").classList.toggle("is-bad", bad);
        if (bad) ok = false;
      });
      err.hidden = ok;
      if (!ok) return;

      var msg =
        "Hola, quiero reservar una mesa en La México Gran Cantina (Colosio).\n" +
        "Nombre: " + nombre + "\n" +
        "Personas: " + personas + "\n" +
        "Día: " + fechaBonita(d) + "\n" +
        "Hora: " + h;
      window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
    });
  }

  // En compu el objeto se abre solo al terminar la caida: los datos se ven sin hacer scroll
  function autoOpen() {
    var hero = document.querySelector(".lm-hero");
    if (!hero || !window.matchMedia("(min-width: 900px)").matches) return;
    setTimeout(function () { hero.classList.add("is-open"); }, 1300);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", autoOpen);
  else autoOpen();

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
