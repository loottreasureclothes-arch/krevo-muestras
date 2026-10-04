/* Visítanos: pestañas por sucursal, mapa embebido, horario por día y "abierto ahora". */
(function () {
  "use strict";
  var root = document.getElementById("visitanos"); if (!root || !window.TSJ) return;
  var T = window.TSJ, actual = "ferrocarril";
  var $ = function (s) { return root.querySelector(s); };
  function pintar(k) {
    actual = k; var s = T.SUC[k], hoyD = T.ahoraMx().d;
    Array.prototype.forEach.call(root.querySelectorAll(".tab"), function (b) { b.setAttribute("aria-selected", b.getAttribute("data-suc") === k ? "true" : "false"); });
    $("[data-v-nombre]").textContent = s.nombre; $("[data-v-calle]").textContent = s.calle + ", Aguascalientes";
    $("[data-mapa]").src = "https://www.google.com/maps?q=" + encodeURIComponent(s.q).replace(/%20/g, "+") + "&output=embed";
    $("[data-v-ruta]").href = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(s.q);
    var tel = $("[data-v-tel]");
    if (s.telh) { tel.href = "tel:" + s.telh; tel.textContent = "Llamar " + s.tel; $("[data-v-nota]").textContent = "Para llevar o para comer ahí."; }
    else { var f = T.SUC.ferrocarril; tel.href = "tel:" + f.telh; tel.textContent = "Llamar a Ferrocarril " + f.tel; $("[data-v-nota]").textContent = "Esta sucursal no publica teléfono en Google; el número es el de Ferrocarril."; }
    var e = T.estado(s), ev = $("[data-v-estado]"); ev.textContent = e.texto; ev.classList.toggle("is-open", e.abierto);
    var ul = $("[data-v-horas]"); ul.innerHTML = "";
    [1, 2, 3, 4, 5, 6, 0].forEach(function (d) {
      var h = s.h[d], li = document.createElement("li"); if (d === hoyD) li.className = "hoy";
      var a = document.createElement("span"), b = document.createElement("span"); a.textContent = T.DIAS[d] + (d === hoyD ? " (hoy)" : ""); b.textContent = T.hora(h[0]) + " a " + T.hora(h[1]);
      li.appendChild(a); li.appendChild(b); ul.appendChild(li);
    });
  }
  root.querySelector(".tabs").addEventListener("click", function (e) { var b = e.target.closest ? e.target.closest(".tab") : null; if (b) pintar(b.getAttribute("data-suc")); });
  pintar(actual);
})();
