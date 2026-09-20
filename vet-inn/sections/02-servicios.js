/* 02-servicios — catalogo a la vista + hoja del carrito. Sin precios reales (research/
   servicios-precios.md: ninguno publico), todo "Pregunta el precio", nunca "$0". La placa
   de Canela (01-hero.js) manda el titulo, el encabezado de la hoja y el mensaje de WhatsApp
   (via window.vetinnPlaca / window.VIWa, contrato en site.js). Hoja: history.pushState al
   abrir, "atras" de Android la cierra sin salir de la pagina (L13); window.open con caida a
   location.href y link visible si no se abrio (L15); sessionStorage no aplica aqui (carrito
   vive solo en memoria de esta sesion de scroll, no hace falta persistirlo). */
(function () {
  "use strict";

  var ITEMS = [
    { id: "consultas", nombre: "Consultas" },
    { id: "pension", nombre: "Pensión" },
    { id: "lab", nombre: "Estudios de laboratorio" },
    { id: "cachorros", nombre: "Cachorros y mascotas" },
    { id: "cirugias", nombre: "Cirugías" },
    { id: "vacunas", nombre: "Vacunas" },
    { id: "desparasitacion", nombre: "Desparasitación" },
    { id: "estetica", nombre: "Estética canina" },
    { id: "alimento", nombre: "Alimento" },
    { id: "accesorios", nombre: "Accesorios" },
    { id: "asesoria", nombre: "Asesoría especializada" },
    { id: "acuario", nombre: "Acuario" }
  ];
  var NOMBRE_POR_ID = {};
  ITEMS.forEach(function (it) { NOMBRE_POR_ID[it.id] = it.nombre; });

  var cart = []; // orden de agregado, ids sin repetir
  var sheetOpen = false;

  function tieneItem(id) { return cart.indexOf(id) > -1; }
  function toggleItem(id) {
    var i = cart.indexOf(id);
    if (i > -1) cart.splice(i, 1); else cart.push(id);
    render();
  }

  /* ---------- Titulo: "...a Canela." / "...a tu mascota." (la placa manda)
     Ojo: #srv-mascota es un [data-vi-drop] (titulo que cae y pega, site.js lo envuelve en
     palabras al cargar). Si no hay placa se deja tal cual (ya dice "tu mascota." y conserva
     la animacion de caida); solo se sobreescribe con textContent cuando SI hay placa, ya sea
     restaurada al cargar o puesta despues por el visitante (ahi se pierde el efecto de caida
     de esa linea, pero es una actualizacion en vivo, no la entrada inicial). ---------- */
  function actualizarTitulo() {
    var el = document.getElementById("srv-mascota");
    if (!el) return;
    var p = window.vetinnPlaca && window.vetinnPlaca();
    if (p && p.nombre) el.textContent = p.nombre + ".";
  }

  /* ---------- Botones de agregar (tarjetas con foto + renglones de carta) ---------- */
  function pintarBotones() {
    var botones = document.querySelectorAll("[data-add]");
    for (var i = 0; i < botones.length; i++) {
      var b = botones[i];
      var id = b.getAttribute("data-add");
      var on = tieneItem(id);
      b.classList.toggle("is-added", on);
      if (b.classList.contains("s-srv-fila-add")) {
        b.textContent = on ? "✓" : "+";
        b.setAttribute("aria-label", (on ? "Quitar " : "Agregar ") + (NOMBRE_POR_ID[id] || ""));
      } else if (b.classList.contains("s-srv-add")) {
        b.textContent = on ? "Agregado" : "+ Agregar";
      }
    }
  }

  /* ---------- Barra fija inferior ---------- */
  function pintarBarra() {
    var bar = document.getElementById("srv-bar");
    var txt = document.getElementById("srv-bar-txt");
    if (!bar || !txt) return;
    var n = cart.length;
    bar.hidden = n === 0;
    /* body.srv-bar-on: la barra fija de 56px le quita aire al hero (la placa quedaba
       cortada), al final de la 02 y al flotante de WhatsApp. El CSS lo corrige solo
       cuando la barra esta puesta; sin carrito la pagina no paga ese espacio. */
    document.body.classList.toggle("srv-bar-on", n > 0);
    var p = window.vetinnPlaca && window.vetinnPlaca();
    var quien = (p && p.nombre) ? p.nombre : "tu mascota";
    txt.textContent = "La placa de " + quien + " · " + n + (n === 1 ? " servicio" : " servicios");
  }

  /* ---------- Hoja del carrito ---------- */
  function pintarPlacaSheet() {
    var host = document.getElementById("srv-sheet-placa");
    if (!host) return;
    host.textContent = "";
    var p = window.vetinnPlaca && window.vetinnPlaca();
    var shape = document.createElement("span");
    shape.className = "s-placa-shape is-drawn";
    if (p && p.especie) {
      var iconWrap = document.createElement("span");
      iconWrap.className = "s-placa-icon";
      var svgNS = "http://www.w3.org/2000/svg";
      var svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("aria-hidden", "true");
      var use = document.createElementNS(svgNS, "use");
      use.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#i-" + p.especie);
      use.setAttribute("href", "#i-" + p.especie);
      svg.appendChild(use);
      iconWrap.appendChild(svg);
      shape.appendChild(iconWrap);
    }
    var nombreSpan = document.createElement("span");
    nombreSpan.className = "s-placa-nombre";
    nombreSpan.textContent = (p && p.nombre) ? p.nombre : "Tu mascota";
    shape.appendChild(nombreSpan);
    host.appendChild(shape);
  }

  function pintarLista() {
    var list = document.getElementById("srv-sheet-list");
    if (!list) return;
    list.textContent = "";
    if (!cart.length) {
      var vacio = document.createElement("li");
      vacio.className = "s-srv-sheet-list-empty";
      vacio.textContent = "Aún no agregas nada. Cierra y toca “+ Agregar” en lo que quieras preguntar.";
      list.appendChild(vacio);
      return;
    }
    cart.forEach(function (id) {
      var li = document.createElement("li");
      li.textContent = NOMBRE_POR_ID[id] || id;
      list.appendChild(li);
    });
  }

  function mensajeBase() {
    var nombres = cart.map(function (id) { return NOMBRE_POR_ID[id] || id; });
    var tunombre = (document.getElementById("srv-tunombre") || {}).value || "";
    var quepasa = (document.getElementById("srv-quepasa") || {}).value || "";
    tunombre = tunombre.trim();
    quepasa = quepasa.trim();
    var partes = [];
    if (nombres.length) partes.push("Quiero preguntar por: " + nombres.join(", ") + ".");
    else partes.push("Quiero preguntar por sus servicios.");
    if (tunombre) partes.push("Mi nombre es " + tunombre + ".");
    if (quepasa) partes.push("Le pasa: " + quepasa + ".");
    return partes.join(" ");
  }

  function actualizarHrefEnvio() {
    var send = document.getElementById("srv-sheet-send");
    var fallback = document.getElementById("srv-sheet-fallback");
    if (!send || !window.VIWa) return;
    var url = window.VIWa.url(window.VIWa.msg(mensajeBase()));
    send.href = url;
    if (fallback) fallback.href = url;
  }

  function render() {
    pintarBotones();
    pintarBarra();
    if (sheetOpen) { pintarLista(); actualizarHrefEnvio(); }
  }

  /* ---------- Abrir / cerrar hoja (L12: vive en <body>; L13: pushState + popstate) ---------- */
  function openSheet() {
    var sheet = document.getElementById("srv-sheet");
    if (!sheet || sheetOpen) return;
    sheetOpen = true;
    sheet.setAttribute("aria-hidden", "false");
    document.body.classList.add("srv-sheet-open");
    pintarPlacaSheet();
    pintarLista();
    actualizarHrefEnvio();
    try { history.pushState({ srvSheet: true }, "", location.href); } catch (e) { /* nada */ }
    var closeBtn = sheet.querySelector(".s-srv-sheet-close");
    setTimeout(function () { closeBtn && closeBtn.focus({ preventScroll: true }); }, 60);
  }
  function closeSheet(fromPop) {
    var sheet = document.getElementById("srv-sheet");
    if (!sheet || !sheetOpen) return;
    sheetOpen = false;
    sheet.setAttribute("aria-hidden", "true");
    document.body.classList.remove("srv-sheet-open");
    var fallback = document.getElementById("srv-sheet-fallback");
    if (fallback) fallback.hidden = true;
    if (!fromPop) { try { history.back(); } catch (e) { /* nada */ } }
  }

  function initSheet() {
    var sheet = document.getElementById("srv-sheet");
    if (!sheet) return;
    /* la hoja se monta directo en <body> (L12): un fixed dentro de una seccion con
       transform (revelados de la pagina) se queda atrapado y no cubre la pantalla. */
    if (sheet.parentNode !== document.body) document.body.appendChild(sheet);

    document.getElementById("srv-bar-btn").addEventListener("click", openSheet);
    Array.prototype.forEach.call(sheet.querySelectorAll("[data-srv-close]"), function (el) {
      el.addEventListener("click", function () { closeSheet(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (sheetOpen && e.key === "Escape") closeSheet(false);
    });
    window.addEventListener("popstate", function () { if (sheetOpen) closeSheet(true); });

    var tunombre = document.getElementById("srv-tunombre");
    var quepasa = document.getElementById("srv-quepasa");
    if (tunombre) tunombre.addEventListener("input", actualizarHrefEnvio);
    if (quepasa) quepasa.addEventListener("input", actualizarHrefEnvio);

    var send = document.getElementById("srv-sheet-send");
    var fallback = document.getElementById("srv-sheet-fallback");
    if (send) {
      send.addEventListener("click", function (e) {
        e.preventDefault();
        var url = window.VIWa ? window.VIWa.url(window.VIWa.msg(mensajeBase())) : send.href;
        var win = null;
        try { win = window.open(url, "_blank"); } catch (err) { win = null; }
        if (fallback) { fallback.href = url; fallback.hidden = false; }
        if (!win) location.href = url;
      });
    }
  }

  function initAdd() {
    document.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest("[data-add]");
      if (!b) return;
      toggleItem(b.getAttribute("data-add"));
    });
  }

  function init() {
    initSheet();
    initAdd();
    actualizarTitulo();
    render();
    window.addEventListener("vetinn:placa", function () { actualizarTitulo(); render(); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
