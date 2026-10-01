/* Hero: "Hoy toca" con el mes real de Aguascalientes + la foto del hero sigue al especial del mes. */
(function () {
  "use strict";
  function init() {
    var QC = window.QC; if (!QC) return;
    var n = QC.ahora(), e = QC.MES[n.m].e;
    var nombre = e ? e.band : "Conchas rellenas";
    Array.prototype.forEach.call(document.querySelectorAll("[data-hoy]"), function (a) { a.textContent = nombre; });
    var img = document.getElementById("qc-hero-img"), band = document.getElementById("qc-hero-band");
    if (!img || !band) return;
    band.textContent = e ? e.band : "Conchas rellenas";
    var foto = (e ? e.foto : "todo");
    if (foto !== "pan") {
      img.classList.remove("is-cut"); img.classList.add("is-photo");
      img.removeAttribute("srcset"); img.removeAttribute("sizes");
      img.src = "img/mes-" + foto + "-900.webp"; img.width = 900; img.height = 1125;
      img.alt = (e || QC.TODO).alt;
      var rays = document.querySelector(".qc-hero-rays"); if (rays) rays.style.display = "none";
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
