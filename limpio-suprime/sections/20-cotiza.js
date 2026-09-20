/* 20 · Arma tu limpieza: cotizador visible completo, sin pantallas escondidas.
   Estado en localStorage 'ls_cotiza'; evento window 'ls:espacio' lo preselecciona desde
   otras secciones o el menú. Arma el mensaje exacto de WhatsApp de la hoja de dirección. */
(function () {
  "use strict";
  var SKEY = "ls_cotiza";
  var FOTOS = {
    "Casa": { c: "sala", alt: "Casa: sala impecable, imagen ilustrativa" },
    "Empresa u oficina": { c: "oficina", alt: "Empresa u oficina: oficina limpia, imagen ilustrativa" },
    "Local": { c: "local", alt: "Local comercial recién limpiado, imagen ilustrativa" },
    "Otro": { c: "cocina", alt: "Cocina reluciente, imagen ilustrativa" }
  };
  var MESES_DIAS = 30;
  var FILAS = 10, COLS = 10, M2_MOSAICO = 10; // 10 x 10 mosaicos, cada uno 10 m² (20 a 1,000)

  function init() {
    var sec = document.getElementById("cotiza");
    var form = document.getElementById("cq-form");
    if (!sec || !form) return;

    var espacios = sec.querySelectorAll("#cq-espacios .ls-disc");
    var chips = sec.querySelectorAll("#cq-chips .ls-chip");
    var freqs = sec.querySelectorAll("#cq-freq .ls-disc");
    var m2input = document.getElementById("cq-m2");
    var m2val = document.getElementById("cq-m2-val");
    var m2unit = document.getElementById("cq-m2-unit");
    var floor = document.getElementById("cq-floor");
    var floorGrid = document.getElementById("cq-floor-grid");
    var floorSpark = document.getElementById("cq-floor-spark");
    var nosabe = document.getElementById("cq-nosabe");
    var cuartosWrap = document.getElementById("cq-cuartos-wrap");
    var cuartos = document.getElementById("cq-cuartos");
    var otroWrap = document.getElementById("cq-otro-wrap");
    var otro = document.getElementById("cq-otro");
    var presupuesto = document.getElementById("cq-presupuesto");
    var zona = document.getElementById("cq-zona");
    var month = document.getElementById("cq-month");
    var scene = document.getElementById("cq-scene");
    var img = document.getElementById("cq-img");
    var srcD = document.getElementById("cq-src-d");
    var sendBtn = document.getElementById("cq-send");
    var ready = false;

    /* ---------- piso de mosaicos: 10 x 10, cada mosaico 10 m² ----------
       Se encienden en orden de adelante (fila de abajo) hacia atras, fila por fila. */
    var mosaicos = [];
    (function buildFloor() {
      if (!floorGrid) return;
      var frag = document.createDocumentFragment();
      for (var r = 0; r < FILAS; r++) {
        for (var c = 0; c < COLS; c++) {
          var t = document.createElement("i");
          t.__k = (FILAS - 1 - r) * COLS + c; // orden de encendido
          t.style.setProperty("--k", t.__k);
          frag.appendChild(t);
          mosaicos.push(t);
        }
      }
      floorGrid.appendChild(frag);
      mosaicos.sort(function (a, b) { return a.__k - b.__k; }); // indice 0 = el de hasta adelante
    })();
    var limpiosPrev = -1;
    function moverDestello(t) {
      if (!t || !floorSpark || !floor) return;
      var fr = floor.getBoundingClientRect(), tr = t.getBoundingClientRect();
      if (!tr.width) return;
      floorSpark.style.left = (tr.left + tr.width / 2 - fr.left) + "px";
      floorSpark.style.top = (tr.top + tr.height / 2 - fr.top) + "px";
      floorSpark.classList.remove("is-on");
      void floorSpark.offsetWidth; // reinicia la animacion del destello
      floorSpark.classList.add("is-on");
    }
    function pintarPiso(m2, destellar) {
      if (!mosaicos.length) return;
      var n = Math.max(1, Math.min(mosaicos.length, Math.round(m2 / M2_MOSAICO)));
      if (n === limpiosPrev) return;
      for (var i = 0; i < mosaicos.length; i++) mosaicos[i].classList.toggle("is-on", i < n);
      limpiosPrev = n;
      if (destellar !== false) moverDestello(mosaicos[n - 1]);
    }

    /* ---------- mes con puntitos ---------- */
    for (var d = 0; d < MESES_DIAS; d++) { var i = document.createElement("i"); month.appendChild(i); }
    var dots = month.querySelectorAll("i");
    function litIndices(freq) {
      if (freq === "Una vez") return [0];
      if (freq === "Cada semana") return [1, 8, 15, 22, 29];
      if (freq === "Cada 15 días") return [1, 15];
      if (freq === "Cada mes") return [29];
      if (freq === "Personal fijo") { var a = []; for (var k = 0; k < MESES_DIAS; k++) a.push(k); return a; }
      return [];
    }
    function paintMonth(freq) {
      var lit = litIndices(freq);
      dots.forEach(function (dot, i) { dot.classList.toggle("is-on", lit.indexOf(i) > -1); });
    }

    /* ---------- estado ---------- */
    var state = { tipo: "Casa", otro: "", necesita: "", m2: 100, noSabe: false, cuartos: "", frecuencia: "Una vez", presupuesto: "", zona: "" };

    function save() {
      try { localStorage.setItem(SKEY, JSON.stringify(state)); } catch (x) {}
      window.dispatchEvent(new CustomEvent("ls:cotiza", { detail: state }));
    }
    function restore() {
      var s;
      try { s = JSON.parse(localStorage.getItem(SKEY) || "null"); } catch (x) { s = null; }
      if (s) { for (var k in state) if (s[k] !== undefined) state[k] = s[k]; }
    }

    function setPressed(list, matchAttr, value) {
      list.forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute(matchAttr) === value ? "true" : "false"); });
    }

    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function bump(el) {
      if (!el.animate || reduce) return;
      el.animate([
        { transform: "translateY(-24px) scaleY(1.1)", opacity: 0.2 },
        { transform: "translateY(3px) scaleY(0.93)", opacity: 1, offset: 0.6 },
        { transform: "translateY(-1px) scaleY(1.02)", offset: 0.82 },
        { transform: "none", opacity: 1 }
      ], { duration: 320, easing: "cubic-bezier(.2,.9,.32,1)" });
    }

    /* ---------- la pasada del jalador sobre la foto del espacio ---------- */
    function enPantalla(el) {
      var r = el.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      return r.bottom > 40 && r.top < vh - 40;
    }
    function correrPasada(ms) {
      if (!scene || !window.LSJalador) return;
      scene.__lsRan = true; // el motor ya no la dispara por su cuenta
      if (enPantalla(scene)) { window.LSJalador.run(scene, ms); return; }
      var t = 0; // si el cotizador todavia no se ve (llegada desde otra sección), se espera
      var iv = setInterval(function () {
        t += 120;
        if (enPantalla(scene) || t > 4000) { clearInterval(iv); window.LSJalador.run(scene, ms); }
      }, 120);
    }
    /* cambia la foto SOLO cuando la nueva ya cargó (atras del vaho nunca se ve un hueco) */
    function ponerFoto(f, cb) {
      var m = "img/fotos/" + f.c + "-m.webp", dd = "img/fotos/" + f.c + "-d.webp";
      if (img.getAttribute("src") === m) { cb(); return; }
      var ancho = window.matchMedia && window.matchMedia("(min-width: 720px)").matches;
      var hecho = false;
      function aplicar() {
        if (hecho) return;
        hecho = true;
        img.src = m; srcD.srcset = dd; img.alt = f.alt;
        cb();
      }
      var pre = new Image();
      pre.onload = aplicar; pre.onerror = aplicar;
      pre.src = ancho ? dd : m;
      if (pre.complete) aplicar();
      setTimeout(aplicar, 900); // pase lo que pase, la foto se cambia
    }

    function renderEspacio(animatePhoto) {
      setPressed(espacios, "data-tipo", state.tipo);
      otroWrap.hidden = state.tipo !== "Otro";
      if (state.tipo === "Otro" && otro.value !== state.otro) otro.value = state.otro || "";
      var f = FOTOS[state.tipo] || FOTOS.Casa;
      if (!animatePhoto) { // arranque: la foto entra sin pasada (el motor la corre al verse)
        var m = "img/fotos/" + f.c + "-m.webp";
        if (img.getAttribute("src") !== m) { img.src = m; srcD.srcset = "img/fotos/" + f.c + "-d.webp"; img.alt = f.alt; }
        return;
      }
      if (window.LSJalador) window.LSJalador.reset(scene); // se empaña de inmediato
      ponerFoto(f, function () { setTimeout(function () { correrPasada(620); }, 110); });
    }
    function renderNecesita() { setPressed(chips, "data-necesita", state.necesita); }
    function renderM2(destellar) {
      m2input.value = state.m2;
      m2input.disabled = state.noSabe;
      m2val.textContent = state.noSabe ? "por ver" : state.m2;
      m2val.classList.toggle("is-texto", state.noSabe);
      if (m2unit) m2unit.hidden = state.noSabe;
      m2input.setAttribute("aria-valuetext", state.m2 + " metros cuadrados");
      nosabe.checked = state.noSabe;
      cuartosWrap.hidden = !state.noSabe;
      if (state.noSabe && cuartos.value !== state.cuartos) cuartos.value = state.cuartos || "";
      var p = Math.min(1, Math.max(0, (state.m2 - 20) / (1000 - 20)));
      m2input.style.setProperty("--cq-fill", (p * 100).toFixed(1) + "%");
      floor.classList.toggle("is-apagado", state.noSabe);
      pintarPiso(state.m2, destellar);
    }
    function renderFreq() { setPressed(freqs, "data-freq", state.frecuencia); paintMonth(state.frecuencia); }
    function renderOpt() {
      if (presupuesto.value !== state.presupuesto) presupuesto.value = state.presupuesto || "";
      if (zona.value !== state.zona) zona.value = state.zona || "";
    }
    function renderAll(animatePhoto) { renderEspacio(animatePhoto); renderNecesita(); renderM2(false); renderFreq(); renderOpt(); }

    /* ---------- eventos de UI ---------- */
    espacios.forEach(function (b) {
      b.addEventListener("click", function () {
        state.tipo = b.getAttribute("data-tipo");
        renderEspacio(true);
        save();
      });
    });
    chips.forEach(function (b) {
      b.addEventListener("click", function () {
        var v = b.getAttribute("data-necesita");
        state.necesita = state.necesita === v ? "" : v;
        renderNecesita();
        save();
      });
    });
    freqs.forEach(function (b) {
      b.addEventListener("click", function () {
        state.frecuencia = b.getAttribute("data-freq");
        renderFreq();
        save();
      });
    });
    m2input.addEventListener("input", function () {
      state.m2 = +m2input.value;
      renderM2(true);
      save();
    });
    /* al soltar: el numero cae y pega, y un brillo cruza el piso que quedo limpio */
    m2input.addEventListener("change", function () {
      if (state.noSabe) return;
      bump(m2val);
      if (reduce) return;
      floor.classList.remove("is-brillo");
      void floor.offsetWidth;
      floor.classList.add("is-brillo");
      setTimeout(function () { floor.classList.remove("is-brillo"); }, 720);
    });
    nosabe.addEventListener("change", function () {
      state.noSabe = nosabe.checked;
      renderM2(false);
      save();
      if (state.noSabe) setTimeout(function () { cuartos.focus(); }, 60);
    });
    cuartos.addEventListener("input", function () { state.cuartos = cuartos.value.trim(); save(); });
    otro.addEventListener("input", function () { state.otro = otro.value.trim(); save(); });
    presupuesto.addEventListener("input", function () { state.presupuesto = presupuesto.value.trim(); save(); });
    zona.addEventListener("input", function () { state.zona = zona.value.trim(); save(); });

    /* ---------- mensaje de WhatsApp ---------- */
    function espacioTexto() {
      if (state.tipo === "Otro") return state.otro ? state.otro : "Otro";
      return state.tipo;
    }
    function message() {
      var lines = ["Hola Limpio Suprime, quiero cotizar una limpieza."];
      var esp = espacioTexto();
      if (esp) lines.push("Espacio: " + esp + ".");
      if (state.necesita) lines.push("Necesito: " + state.necesita + ".");
      if (state.noSabe) {
        lines.push("Tamaño: no sé los metros" + (state.cuartos ? " (" + state.cuartos + " cuartos o áreas aprox.)" : "") + ".");
      } else if (state.m2) {
        lines.push("Tamaño: " + state.m2 + " m² aprox.");
      }
      if (state.frecuencia) lines.push("Frecuencia: " + state.frecuencia + ".");
      if (state.presupuesto) lines.push("Mi presupuesto: $" + state.presupuesto + ".");
      if (state.zona) lines.push("Zona: " + state.zona + ".");
      return lines.join(" ");
    }
    function updateHref() {
      if (window.LSWa) sendBtn.href = window.LSWa.url(message());
    }
    form.addEventListener("input", updateHref);
    form.addEventListener("change", updateHref);

    /* sendBtn ya es un <a href> real (el navegador lo manda solo); esto es solo un respaldo
       por si alguien pulsa Enter en un campo de texto y el navegador intenta enviar el form. */
    form.addEventListener("submit", function (e) { e.preventDefault(); });

    /* ---------- entrada externa: menú y renglones de "esto limpiamos" ---------- */
    window.addEventListener("ls:espacio", function (e) {
      var detail = e.detail || {};
      var changed = false;
      if (detail.tipo && FOTOS[detail.tipo]) { state.tipo = detail.tipo; changed = true; }
      if (detail.necesita !== undefined && detail.necesita !== "") { state.necesita = detail.necesita; }
      renderAll(true);
      save();
    });

    /* ---------- arranque ---------- */
    restore();
    renderAll(false);
    updateHref();
    ready = true;

    window.LSCotiza = { state: state, message: message, espacioTexto: espacioTexto };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
