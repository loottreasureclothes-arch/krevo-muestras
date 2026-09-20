/* 02-servicios — sin carrito, sin hoja, sin barra fija. Un chip de servicio (selección única)
   + nombre de la mascota / edad / qué le pasa / tu nombre arman el mensaje de WhatsApp.

   REVISION-2, cambio 5: el NOMBRE DE LA MASCOTA ya se puede escribir aquí mismo. El campo
   está sincronizado con la placa del hero en los dos sentidos (window.vetinnSetNombre para
   escribirla, el evento "vetinn:placa" para leerla), y desapareció el link "Ponlo arriba ↑". */
(function () {
  "use strict";

  var servicio = ""; // "" = nada elegido, el mensaje sale generico

  function placa() { return (window.vetinnPlaca && window.vetinnPlaca()) || null; }

  /* ---------- Titulo: "...a Canela." / "...a tu mascota." (la placa manda) ---------- */
  function actualizarTitulo() {
    var el = document.getElementById("srv-mascota");
    if (!el) return;
    var p = placa();
    el.textContent = p && p.nombre ? p.nombre + "." : "tu mascota.";
  }

  /* ---------- Linea de confirmacion debajo del campo ---------- */
  function actualizarPlacaLinea() {
    var el = document.getElementById("cita-placa");
    if (!el) return;
    var p = placa();
    el.textContent = "";
    if (!p || !p.nombre) return;
    var b = document.createElement("b");
    b.textContent = "Es " + p.nombre + (p.especie ? " (" + p.especie + ")" : "") + ", ¿verdad?";
    el.appendChild(b);
  }

  /* ---------- El campo del nombre: escribe en la placa del hero ---------- */
  function initMascota() {
    var input = document.getElementById("cita-mascota");
    if (!input) return;
    var p = placa();
    if (p && p.nombre) input.value = p.nombre;
    input.addEventListener("input", function () {
      if (window.vetinnSetNombre) window.vetinnSetNombre(input.value);
      else { actualizarTitulo(); actualizarPlacaLinea(); actualizarHref(); }
    });
  }
  function sincronizarMascota() {
    var input = document.getElementById("cita-mascota");
    if (!input) return;
    var p = placa();
    var v = p && p.nombre ? p.nombre : "";
    if (input.value.trim() !== v && document.activeElement !== input) input.value = v;
  }

  /* ---------- Chips de servicio: seleccion unica ---------- */
  function initChips() {
    var wrap = document.getElementById("cita-servicios");
    if (!wrap) return;
    wrap.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest(".s-srv-cita-chip");
      if (!b) return;
      var ya = b.getAttribute("aria-pressed") === "true";
      Array.prototype.forEach.call(wrap.querySelectorAll(".s-srv-cita-chip"), function (o) {
        o.setAttribute("aria-pressed", "false");
      });
      servicio = ya ? "" : (b.getAttribute("data-servicio") || "");
      b.setAttribute("aria-pressed", ya ? "false" : "true");
      actualizarHref();
    });
  }

  /* ---------- Mensaje de WhatsApp (la placa la antepone site.js: "Hola, es por Canela...") ---------- */
  function mensajeBase() {
    var edad = (document.getElementById("cita-edad") || {}).value || "";
    var quepasa = (document.getElementById("cita-quepasa") || {}).value || "";
    var tunombre = (document.getElementById("cita-tunombre") || {}).value || "";
    edad = edad.trim(); quepasa = quepasa.trim(); tunombre = tunombre.trim();

    var partes = [];
    partes.push(servicio ? "Quiero agendar cita: " + servicio + "." : "Quiero agendar una cita.");
    if (edad) partes.push("Edad: " + edad + ".");
    if (quepasa) partes.push("Le pasa: " + quepasa + ".");
    if (tunombre) partes.push("Mi nombre es " + tunombre + ".");
    return partes.join(" ");
  }

  function actualizarHref() {
    var send = document.getElementById("cita-send");
    if (!send || !window.VIWa) return;
    send.href = window.VIWa.url(window.VIWa.msg(mensajeBase()));
  }

  function initCampos() {
    ["cita-edad", "cita-quepasa", "cita-tunombre"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener("input", actualizarHref);
    });
  }

  function init() {
    initChips();
    initCampos();
    initMascota();
    actualizarTitulo();
    actualizarPlacaLinea();
    actualizarHref();
    window.addEventListener("vetinn:placa", function () {
      sincronizarMascota();
      actualizarTitulo();
      actualizarPlacaLinea();
      actualizarHref();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
