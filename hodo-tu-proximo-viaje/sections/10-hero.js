/* 10 · Hero: buscador con forma de boleto.
   - Sugiere los 7 destinos que HODO sí publicó y los 4 tipos de viaje (combobox con teclado).
   - Buscar un destino: lo deja puesto en el pase (localStorage hodo_pase), en la ruta del
     header y baja a PLANES filtrado (evento hodo:filtro).
   - Buscar un tipo de viaje: marca la ficha del pase y filtra planes por ese grupo.
   - Lo que no está: "Ese también te lo cotizamos" y baja al pase con "Otro destino" escrito.
   La foto del fondo cambia con el destino (crossfade de dos capas, igual que el pase). */
(function () {
  "use strict";

  function norm(s) {
    s = String(s == null ? "" : s).toLowerCase();
    if (s.normalize) s = s.normalize("NFD").replace(/[̀-ͯ]/g, "");
    return s.replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
  }

  var DESTINOS = [
    { slug: "cancun", nombre: "Cancún", codigo: "CUN", alias: "cancun quintana roo caribe riu palace peninsula playa todo incluido" },
    { slug: "riviera-maya", nombre: "Riviera Maya", codigo: "CUN", alias: "riviera maya playa del carmen quintana roo caribe" },
    { slug: "punta-cana", nombre: "Punta Cana", codigo: "PUJ", alias: "punta cana republica dominicana caribe aeromexico" },
    { slug: "puerto-vallarta", nombre: "Puerto Vallarta", codigo: "PVR", alias: "puerto vallarta jalisco pacifico" },
    { slug: "punta-mita", nombre: "Punta Mita", codigo: "PVR", alias: "punta mita nayarit boda de destino grand palladium luna de miel" },
    { slug: "ixtapa", nombre: "Ixtapa", codigo: "ZIH", alias: "ixtapa zihuatanejo guerrero" },
    { slug: "cdmx", nombre: "Ciudad de México", codigo: "MEX", alias: "ciudad de mexico cdmx capital" }
  ];
  var TIPOS = [
    { id: "playa", nombre: "Playa todo incluido", grupo: "playa", alias: "playa todo incluido mar resort alberca" },
    { id: "luna", nombre: "Luna de miel", grupo: "bodas", alias: "luna de miel novios recien casados" },
    { id: "boda", nombre: "Boda de destino", grupo: "bodas", alias: "boda de destino bodas casarse en la playa" },
    { id: "familiar", nombre: "Familiar", grupo: "todos", alias: "familiar familia con ninos hijos" }
  ];
  DESTINOS.forEach(function (d) { d.busca = norm(d.nombre + " " + d.alias + " " + d.codigo); });
  TIPOS.forEach(function (t) { t.busca = norm(t.nombre + " " + t.alias); });

  function init() {
    var sec = document.getElementById("hero");
    var form = document.getElementById("hd-buscador");
    var input = document.getElementById("hd-q");
    var lista = document.getElementById("hd-sug");
    var msg = document.getElementById("hd-buscador-msg");
    var fichas = document.getElementById("hd-hero-fichas");
    var imgA = document.getElementById("hd-hero-img-a");
    var imgB = document.getElementById("hd-hero-img-b");
    if (!sec || !form || !input || !lista || !window.HodoPase) return;
    var HP = window.HodoPase;

    /* ---------- fondo con crossfade ---------- */
    var activa = imgA, libre = imgB, bgSlug = "cancun";
    function setBg(slug) {
      if (!slug || slug === bgSlug || !HP.DESTINOS[slug]) return;
      bgSlug = slug;
      var base = "img/destinos/" + slug;
      libre.srcset = base + "-m.webp 960w, " + base + "-d.webp 1920w";
      libre.src = base + "-m.webp";
      var listo = function () {
        libre.classList.add("is-on"); activa.classList.remove("is-on");
        var t = activa; activa = libre; libre = t;
      };
      if (libre.decode) libre.decode().then(listo).catch(listo); else listo();
    }

    /* ---------- ir a una sección respetando el header ---------- */
    function irA(sel) {
      var el = document.querySelector(sel);
      if (!el) return;
      if (window.HodoIr) window.HodoIr(el);
      else el.scrollIntoView({ block: "start" });
    }
    function filtrar(detalle) {
      try { window.dispatchEvent(new CustomEvent("hodo:filtro", { detail: detalle })); }
      catch (e) { var ev = document.createEvent("CustomEvent"); ev.initCustomEvent("hodo:filtro", false, false, detalle); window.dispatchEvent(ev); }
    }

    /* ---------- sugerencias ---------- */
    var opciones = [], activo = -1, abierto = false;
    function candidatos(q) {
      var n = norm(q);
      var out = [];
      DESTINOS.forEach(function (d) {
        if (!n || d.busca.indexOf(n) >= 0 || n.indexOf(norm(d.nombre)) >= 0) out.push({ tipo: "destino", ref: d, texto: d.nombre, codigo: d.codigo, tag: "Destino" });
      });
      TIPOS.forEach(function (t) {
        if (!n || t.busca.indexOf(n) >= 0 || n.indexOf(norm(t.nombre)) >= 0) out.push({ tipo: "tipo", ref: t, texto: t.nombre, codigo: "", tag: "Tipo de viaje" });
      });
      return out.slice(0, 11);
    }
    function pintar(q) {
      opciones = candidatos(q);
      lista.innerHTML = "";
      if (!opciones.length) { cerrar(); return; }
      opciones.forEach(function (o, i) {
        var li = document.createElement("li");
        li.id = "hd-sug-" + i;
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", "false");
        li.innerHTML = '<span class="hd-sug-code hd-code">' + (o.codigo || "···") + '</span><span>' + o.texto + '</span><span class="hd-sug-tag">' + o.tag + "</span>";
        li.addEventListener("mousedown", function (e) { e.preventDefault(); });
        li.addEventListener("click", function () { elegir(i); });
        li.addEventListener("mouseenter", function () { marcar(i, false); });
        lista.appendChild(li);
      });
      abrir();
    }
    function abrir() {
      if (abierto) return;
      abierto = true; lista.hidden = false; input.setAttribute("aria-expanded", "true");
    }
    function cerrar() {
      abierto = false; lista.hidden = true; input.setAttribute("aria-expanded", "false");
      input.removeAttribute("aria-activedescendant"); activo = -1;
    }
    function marcar(i, mover) {
      var lis = lista.children;
      for (var k = 0; k < lis.length; k++) lis[k].setAttribute("aria-selected", k === i ? "true" : "false");
      activo = i;
      if (i >= 0) {
        input.setAttribute("aria-activedescendant", "hd-sug-" + i);
        if (mover && lis[i].scrollIntoView) lis[i].scrollIntoView({ block: "nearest" });
        if (opciones[i] && opciones[i].tipo === "destino") setBg(opciones[i].ref.slug);
      } else input.removeAttribute("aria-activedescendant");
    }
    function elegir(i) {
      var o = opciones[i];
      if (!o) return;
      input.value = o.texto;
      cerrar();
      buscar();
    }

    /* ---------- buscar ---------- */
    function decir(texto) {
      if (!msg) return;
      msg.textContent = texto;
      msg.hidden = !texto;
    }
    function empate(q) {
      var n = norm(q);
      if (!n) return null;
      var i, d, t;
      for (i = 0; i < DESTINOS.length; i++) { d = DESTINOS[i]; if (norm(d.nombre) === n || norm(d.codigo) === n) return { tipo: "destino", ref: d }; }
      for (i = 0; i < TIPOS.length; i++) { t = TIPOS[i]; if (norm(t.nombre) === n) return { tipo: "tipo", ref: t }; }
      for (i = 0; i < DESTINOS.length; i++) { d = DESTINOS[i]; if (d.busca.indexOf(n) >= 0) return { tipo: "destino", ref: d }; }
      for (i = 0; i < TIPOS.length; i++) { t = TIPOS[i]; if (t.busca.indexOf(n) >= 0) return { tipo: "tipo", ref: t }; }
      return null;
    }
    function buscar() {
      var q = input.value.trim();
      if (!q) { decir("Escribe a dónde quieres ir."); input.focus(); return; }
      var m = empate(q);
      if (m && m.tipo === "destino") {
        decir("");
        HP.setDestino(m.ref.slug);
        filtrar({ modo: "destino", slug: m.ref.slug, etiqueta: m.ref.nombre });
        irA("#planes");
      } else if (m && m.tipo === "tipo") {
        decir("");
        HP.setField("tipo", m.ref.nombre);
        filtrar({ modo: m.ref.grupo === "todos" ? "todos" : "grupo", grupo: m.ref.grupo, etiqueta: m.ref.nombre });
        irA("#planes");
      } else {
        decir("Ese también te lo cotizamos.");
        HP.setDestino("otro", q);
        filtrar({ modo: "todos" });
        irA("#pase");
      }
    }

    form.addEventListener("submit", function (e) { e.preventDefault(); cerrar(); buscar(); });
    input.addEventListener("input", function () { decir(""); pintar(input.value); });
    input.addEventListener("focus", function () { if (!abierto) pintar(input.value); });
    input.addEventListener("blur", function () { setTimeout(cerrar, 120); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (!abierto) { pintar(input.value); if (!opciones.length) return; }
        var n = opciones.length;
        if (!n) return;
        marcar(e.key === "ArrowDown" ? (activo + 1) % n : (activo - 1 + n) % n, true);
        return;
      }
      if (e.key === "Enter") {
        if (abierto && activo >= 0) { e.preventDefault(); elegir(activo); }
        return;
      }
      if (e.key === "Escape") {
        if (abierto) { e.preventDefault(); cerrar(); }
        else if (input.value) { input.value = ""; decir(""); }
        return;
      }
      if (e.key === "Tab") cerrar();
    });

    /* ---------- fichas rápidas ---------- */
    function marcarFichas(slug) {
      if (!fichas) return;
      Array.prototype.forEach.call(fichas.querySelectorAll(".hd-ficha"), function (b) {
        b.setAttribute("aria-pressed", b.getAttribute("data-slug") === slug ? "true" : "false");
      });
    }
    if (fichas) {
      Array.prototype.forEach.call(fichas.querySelectorAll(".hd-ficha"), function (b) {
        var slug = b.getAttribute("data-slug");
        b.addEventListener("click", function () {
          var d = HP.DESTINOS[slug];
          HP.setDestino(slug);
          filtrar({ modo: "destino", slug: slug, etiqueta: d ? d.nombre : "" });
          irA("#planes");
        });
        b.addEventListener("mouseenter", function () { setBg(slug); });
        b.addEventListener("focus", function () { setBg(slug); });
      });
    }

    /* ---------- estado compartido ---------- */
    HP.on("hodo:destino", function (d) {
      if (!d) return;
      marcarFichas(d.slug);
      if (d.slug !== "otro") setBg(d.slug);
    });
    var guardado = HP.getState();
    if (guardado && guardado.destinoSlug) {
      marcarFichas(guardado.destinoSlug);
      if (guardado.destinoSlug !== "otro" && guardado.destinoSlug !== "cancun" && HP.DESTINOS[guardado.destinoSlug]) {
        var base0 = "img/destinos/" + guardado.destinoSlug;
        activa.srcset = base0 + "-m.webp 960w, " + base0 + "-d.webp 1920w";
        activa.src = base0 + "-m.webp";
        bgSlug = guardado.destinoSlug;
      }
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
