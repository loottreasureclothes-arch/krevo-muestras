/* 10 · Pase de abordar vivo: destino (crossfade + avioncito + codigo que cae y pega),
   fechas, personas, y el pase que se manda por WhatsApp.
   El boton de envio es un <a> con href real de wa.me desde el HTML: aqui solo se le
   actualiza el mensaje. Asi funciona aunque el JS no cargue. */
(function () {
  "use strict";
  function init() {
    var sec = document.getElementById("pase");
    var form = document.getElementById("hd-pase-form");
    if (!sec || !form || !window.HodoPase) return;
    var HP = window.HodoPase;

    var imgA = document.getElementById("hd-pase-img-a");
    var imgB = document.getElementById("hd-pase-img-b");
    var codeDest = document.getElementById("hd-pase-code-dest");
    var talon = sec.querySelector(".hd-pase-talon");
    var plane = document.getElementById("hd-pase-plane");
    var dests = form.querySelectorAll(".hd-dest");
    var otroWrap = document.getElementById("hd-pase-otro");
    var otroInput = document.getElementById("hd-otro-input");
    var salida = document.getElementById("hd-fecha-salida");
    var regreso = document.getElementById("hd-fecha-regreso");
    var sinFechas = document.getElementById("hd-sin-fechas");
    var mesWrap = document.getElementById("hd-pase-mes-wrap");
    var mesAprox = document.getElementById("hd-mes-aprox");
    var adultosOut = document.getElementById("hd-adultos");
    var menoresOut = document.getElementById("hd-menores");
    var tipoChips = form.querySelectorAll(".hd-chip");
    var nombre = document.getElementById("hd-nombre");
    var err = document.getElementById("hd-pase-err");
    var send = document.getElementById("hd-pase-send");
    var dSalida = document.getElementById("hd-pase-d-salida");
    var dRegreso = document.getElementById("hd-pase-d-regreso");
    var dPersonas = document.getElementById("hd-pase-d-personas");

    var lastCode = "¿?";
    var VACIO = "- -";

    /* ---------- fondo con crossfade (dos capas A/B) ---------- */
    var activeLayer = imgA, idleLayer = imgB;
    function setBg(slug) {
      var base = "img/destinos/" + slug;
      idleLayer.srcset = base + "-m.webp 960w, " + base + "-d.webp 1920w";
      idleLayer.src = base + "-m.webp";
      var done = function () {
        idleLayer.classList.add("is-on");
        activeLayer.classList.remove("is-on");
        var t = activeLayer; activeLayer = idleLayer; idleLayer = t;
      };
      if (idleLayer.decode) idleLayer.decode().then(done).catch(done);
      else done();
    }

    /* ---------- codigo que cae y pega (golpe seco + el papel acusa el golpe) ---------- */
    function dropCode(text) {
      if (text === lastCode) return;
      lastCode = text;
      codeDest.innerHTML = "";
      var span = document.createElement("span");
      span.className = "hd-word";
      span.textContent = text;
      codeDest.appendChild(span);
      codeDest.classList.remove("hd-code-fall");
      void codeDest.offsetWidth;
      codeDest.classList.add("hd-code-fall");
      if (talon) {
        talon.classList.remove("hd-jolt");
        setTimeout(function () { talon.classList.add("hd-jolt"); }, 230);
      }
    }

    /* ---------- avioncito vuela la ruta ---------- */
    function fly() {
      plane.style.transition = "none";
      plane.classList.remove("is-flying");
      void plane.offsetWidth;
      plane.style.transition = "";
      requestAnimationFrame(function () { plane.classList.add("is-flying"); });
    }

    function markDest(slug) {
      for (var i = 0; i < dests.length; i++) {
        dests[i].setAttribute("aria-pressed", dests[i].getAttribute("data-slug") === slug ? "true" : "false");
      }
    }
    function markTipo(tipo) {
      tipoChips.forEach(function (c) {
        c.setAttribute("aria-pressed", tipo && c.getAttribute("data-tipo") === tipo ? "true" : "false");
      });
    }

    /* ---------- el pase se va imprimiendo: datos del talon + link de WhatsApp ---------- */
    function paintPase() {
      var s = HP.getState();
      if (dSalida) dSalida.textContent = s.sinFechas ? (s.mesAprox ? HP.fmtMes(s.mesAprox) : "Sin fecha") : (s.salida ? HP.fmtFecha(s.salida) : VACIO);
      if (dRegreso) dRegreso.textContent = s.sinFechas ? "Sin fecha" : (s.regreso ? HP.fmtFecha(s.regreso) : VACIO);
      if (dPersonas) {
        var a = s.adultos != null ? s.adultos : 2, m = s.menores != null ? s.menores : 0;
        dPersonas.textContent = m > 0 ? a + " + " + m : String(a);
      }
      if (send) send.href = HP.waUrl();
    }

    HP.on("hodo:destino", function (d) {
      if (!d) return;
      dropCode(d.codigo || "???");
      fly();
      markDest(d.slug);
      if (d.slug === "otro") {
        otroWrap.hidden = false;
        /* Si el destino vino de fuera (el buscador del hero: "Ese también te lo cotizamos"),
           el campo libre tiene que quedar ya escrito. No se toca si la persona esta tecleando. */
        if (otroInput && document.activeElement !== otroInput && otroInput.value !== (d.nombre || "")) otroInput.value = d.nombre || "";
      } else {
        otroWrap.hidden = true;
        if (HP.DESTINOS[d.slug]) setBg(d.slug);
      }
      if (err) err.hidden = true;
      paintPase();
    });
    /* Repintar tambien cuando otra seccion cambia un campo (p. ej. "Cotizar mi luna de
       miel" en bodas, que preselecciona el tipo de viaje). */
    HP.on("hodo:campo", function (c) {
      if (c && c.key === "tipo") markTipo(c.value);
      paintPase();
    });

    dests.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var slug = btn.getAttribute("data-slug");
        if (slug === "otro") {
          HP.setDestino("otro", otroInput.value);
          otroWrap.hidden = false;
          setTimeout(function () { otroInput.focus(); }, 60);
        } else {
          HP.setDestino(slug);
        }
      });
    });
    otroInput.addEventListener("input", function () { HP.setDestino("otro", otroInput.value); });

    /* ---------- fechas ---------- */
    salida.addEventListener("input", function () { HP.setField("salida", salida.value); });
    regreso.addEventListener("input", function () { HP.setField("regreso", regreso.value); });
    sinFechas.addEventListener("change", function () {
      var on = sinFechas.checked;
      HP.setField("sinFechas", on);
      mesWrap.hidden = !on;
      salida.disabled = on; regreso.disabled = on;
      document.getElementById("hd-pase-fechas").style.opacity = on ? 0.45 : 1;
    });
    mesAprox.addEventListener("input", function () { HP.setField("mesAprox", mesAprox.value); });

    /* ---------- personas ---------- */
    var counts = { adultos: 2, menores: 0 };
    var limits = { adultos: [1, 9], menores: [0, 6] };
    function paintCount(key) {
      (key === "adultos" ? adultosOut : menoresOut).textContent = counts[key];
      HP.setField(key, counts[key]);
    }
    form.querySelectorAll("[data-inc]").forEach(function (b) {
      b.addEventListener("click", function () {
        var k = b.getAttribute("data-inc");
        if (counts[k] < limits[k][1]) { counts[k]++; paintCount(k); }
      });
    });
    form.querySelectorAll("[data-dec]").forEach(function (b) {
      b.addEventListener("click", function () {
        var k = b.getAttribute("data-dec");
        if (counts[k] > limits[k][0]) { counts[k]--; paintCount(k); }
      });
    });
    paintCount("adultos"); paintCount("menores");

    /* ---------- tipo de viaje (una ficha, se puede deseleccionar) ---------- */
    tipoChips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var was = chip.getAttribute("aria-pressed") === "true";
        HP.setField("tipo", was ? "" : chip.getAttribute("data-tipo"));
      });
    });

    /* ---------- nombre ---------- */
    nombre.addEventListener("input", function () { HP.setField("nombre", nombre.value); });

    /* ---------- restaurar estado guardado ---------- */
    (function restore() {
      var s = HP.getState();
      if (s.destinoSlug) {
        if (s.destinoSlug === "otro") { otroInput.value = s.destinoNombre || ""; otroWrap.hidden = false; }
        markDest(s.destinoSlug);
        lastCode = s.destinoCodigo || "¿?";
        codeDest.textContent = "";
        var sp = document.createElement("span"); sp.className = "hd-word"; sp.textContent = lastCode; codeDest.appendChild(sp);
        if (HP.DESTINOS[s.destinoSlug] && s.destinoSlug !== "cancun") {
          var base0 = "img/destinos/" + s.destinoSlug;
          activeLayer.srcset = base0 + "-m.webp 960w, " + base0 + "-d.webp 1920w";
          activeLayer.src = base0 + "-m.webp";
        }
      }
      if (s.salida) salida.value = s.salida;
      if (s.regreso) regreso.value = s.regreso;
      if (s.sinFechas) { sinFechas.checked = true; mesWrap.hidden = false; salida.disabled = true; regreso.disabled = true; document.getElementById("hd-pase-fechas").style.opacity = 0.45; }
      if (s.mesAprox) mesAprox.value = s.mesAprox;
      if (s.adultos != null) { counts.adultos = s.adultos; adultosOut.textContent = s.adultos; }
      if (s.menores != null) { counts.menores = s.menores; menoresOut.textContent = s.menores; }
      if (s.tipo) markTipo(s.tipo);
      if (s.nombre) nombre.value = s.nombre;
      paintPase();
    })();

    /* ---------- enviar: se desprende el talon y se abre WhatsApp ---------- */
    function tear() {
      form.classList.remove("is-tearing");
      void form.offsetWidth;
      form.classList.add("is-tearing");
      setTimeout(function () { form.classList.remove("is-tearing"); }, 520);
    }
    function guard(e) {
      var s = HP.getState();
      if (!s.destinoSlug) {
        if (e) e.preventDefault();
        err.textContent = "Elige un destino para mandar tu pase.";
        err.hidden = false;
        var d = document.getElementById("hd-pase-dests");
        var top = d.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        return false;
      }
      err.hidden = true;
      paintPase();
      tear();
      return true;
    }
    if (send) send.addEventListener("click", guard);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (guard(null) && send) window.open(send.href, "_blank", "noopener");
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
