/* Visor del portafolio. Se mueve al <body> (dentro de un padre con transform el
   fixed queda atrapado), "atrás" de Android lo cierra en vez de sacar de la
   página, y Escape también. Sin JS las fotos se siguen viendo en su rejilla. */
(function () {
  "use strict";
  var visor = document.getElementById("pf-visor");
  if (!visor) return;
  if (visor.parentNode !== document.body) document.body.appendChild(visor);

  var img = document.getElementById("pf-visor-img");
  var pie = document.getElementById("pf-visor-pie");
  var cerrar = document.getElementById("pf-x");
  var ultimo = null, abierto = false;

  function abre(btn) {
    img.setAttribute("src", btn.getAttribute("data-big"));
    img.setAttribute("alt", btn.querySelector("img").getAttribute("alt") || "");
    pie.textContent = btn.getAttribute("data-pie") || "";
    visor.removeAttribute("hidden");
    document.documentElement.style.overflow = "hidden";
    ultimo = btn; abierto = true;
    cerrar.focus();
    try { history.pushState({ pf: 1 }, ""); } catch (e) {}
  }
  function cierra(porHistoria) {
    if (!abierto) return;
    visor.setAttribute("hidden", "");
    document.documentElement.style.overflow = "";
    abierto = false;
    if (ultimo) { ultimo.focus(); ultimo = null; }
    if (!porHistoria) { try { if (history.state && history.state.pf) history.back(); } catch (e) {} }
  }

  var botones = document.querySelectorAll(".pf-zoom");
  for (var i = 0; i < botones.length; i++) {
    (function (b) { b.addEventListener("click", function () { abre(b); }); })(botones[i]);
  }
  cerrar.addEventListener("click", function () { cierra(false); });
  visor.addEventListener("click", function (e) { if (e.target === visor || e.target === img) cierra(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") cierra(false); });
  window.addEventListener("popstate", function () { cierra(true); });
})();
