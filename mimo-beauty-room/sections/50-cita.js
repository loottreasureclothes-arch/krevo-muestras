/* 5 · LA CITA. Pinta los proximos 10 dias (domingo apagado porque estan cerrados) y las horas
   REALES del dia elegido segun su horario: lun 10 a 6 · mar y mie 9 a 6 · jue y vie 10 a 5 ·
   sab 10 a 2. El boton verde ya nace en el HTML con un href de wa.me que funciona sin JS; aqui
   solo se le mejora el mensaje con lo que la clienta eligio. Nunca window.open. */
(function () {
  "use strict";
  var C = window.MimoCita;
  if (!C) return;
  var chips = document.getElementById("ct-serv");
  var cajaDias = document.getElementById("ct-dias");
  var cajaHoras = document.getElementById("ct-horas");
  var nota = document.getElementById("ct-nota");
  var msj = document.getElementById("ct-msj");
  var btn = document.getElementById("ct-wa");
  var inNombre = document.getElementById("ct-nombre");
  if (!chips || !cajaDias || !cajaHoras || !btn) return;

  /* ---- 00 · el nombre (OPCIONAL) ---- */
  if (inNombre) {
    inNombre.value = C.get().nombre || "";
    inNombre.addEventListener("input", function () { C.setCampo("nombre", inNombre.value); });
  }

  /* ---- 01 · que te vas a hacer (se pueden elegir varios) ---- */
  function pintaChips() {
    Array.prototype.forEach.call(chips.querySelectorAll(".s-chip"), function (b) {
      b.setAttribute("aria-pressed", C.tiene(b.getAttribute("data-serv")) ? "true" : "false");
    });
  }
  chips.addEventListener("click", function (e) {
    var b = e.target.closest(".s-chip");
    if (!b) return;
    C.setServicio(b.getAttribute("data-serv"));
  });

  /* ---- 02 · que dia ---- */
  var dias = C.proximosDias(10);
  dias.forEach(function (d) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "s-dia" + (d.hoy ? " s-dia-hoy" : "");
    b.setAttribute("data-dia", d.iso);
    var u = document.createElement("u");
    u.textContent = d.abierto ? (d.hoy ? "hoy" : d.corto) : d.corto;
    var s = document.createElement("s");
    s.textContent = d.dia;
    b.appendChild(u); b.appendChild(s);
    if (!d.abierto) {
      b.disabled = true;
      b.setAttribute("aria-disabled", "true");
      b.setAttribute("aria-label", C.fmtDia(d.iso) + ": cerrado");
      b.title = "Domingo: cerrado";
    } else {
      b.setAttribute("aria-pressed", "false");
      b.setAttribute("aria-label", C.fmtDia(d.iso));
    }
    cajaDias.appendChild(b);
  });
  cajaDias.addEventListener("click", function (e) {
    var b = e.target.closest(".s-dia");
    if (!b || b.disabled) return;
    C.setCampo("dia", b.getAttribute("data-dia"));
    C.setCampo("hora", "");
  });
  function pintaDias() {
    var hoy = C.get().dia;
    Array.prototype.forEach.call(cajaDias.querySelectorAll(".s-dia"), function (b) {
      if (b.disabled) return;
      b.setAttribute("aria-pressed", b.getAttribute("data-dia") === hoy ? "true" : "false");
    });
  }

  /* ---- 03 · a que hora (cambia con el dia elegido) ---- */
  function pintaHoras() {
    var st = C.get();
    cajaHoras.textContent = "";
    var hs = C.horasDe(st.dia);
    if (!hs.length) {
      nota.textContent = "Elige primero el día y te enseñamos su horario.";
      return;
    }
    hs.forEach(function (h) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "s-hora";
      b.setAttribute("data-hora", h.txt);
      b.setAttribute("aria-pressed", st.hora === h.txt ? "true" : "false");
      b.textContent = h.txt;
      cajaHoras.appendChild(b);
    });
    var d = C.fmtDia(st.dia).split(" ")[0];
    nota.textContent = d.charAt(0).toUpperCase() + d.slice(1) + ": de " + hs[0].txt + " a " + hs[hs.length - 1].txt + ".";
  }
  cajaHoras.addEventListener("click", function (e) {
    var b = e.target.closest(".s-hora");
    if (!b) return;
    C.setCampo("hora", b.getAttribute("data-hora"));
  });

  /* ---- el mensaje y el boton verde ---- */
  function pintaEnvio() {
    var t = C.message();
    msj.textContent = "";
    var fuerte = document.createElement("b");
    fuerte.textContent = t;
    msj.appendChild(fuerte);
    btn.setAttribute("data-wa", t);
    btn.href = C.waUrl();
  }

  function todo() { pintaChips(); pintaDias(); pintaHoras(); pintaEnvio(); }
  C.on("mimo:servicio", function () { pintaChips(); pintaEnvio(); });
  /* el nombre solo cambia el mensaje: no hay por que volver a pintar dias y horas en cada tecla */
  C.on("mimo:cita", function (d) {
    if (!d || d.key === "dia" || d.key === "hora") { pintaDias(); pintaHoras(); }
    pintaEnvio();
  });
  todo();
})();
