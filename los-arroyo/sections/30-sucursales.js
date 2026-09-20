/* 30 · Sucursales: un solo botón verde al final. Abre el pedido si ya existe (26-pedido);
   si no está disponible, cae a WhatsApp directo con LM.openWa (site.js). */
(function () {
  "use strict";
  var btn = document.getElementById("su-pedir-wa");
  if (!btn) return;
  btn.addEventListener("click", function () {
    if (window.lmPedido && typeof window.lmPedido.open === "function") { window.lmPedido.open(); return; }
    if (window.LM && typeof window.LM.openWa === "function") { window.LM.openWa("Hola, quiero hacer un pedido en Los Arroyo."); return; }
    location.href = "https://wa.me/524495542823";
  });
})();
