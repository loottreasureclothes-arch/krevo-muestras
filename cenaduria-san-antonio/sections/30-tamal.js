/* 30 · Desenvuelve tu tamal: arma LA CUENTA (platillos, tamal de postre, atole del dia) */
(function () {
  "use strict";
  var CS = window.CS;
  if (!CS) return;
  var C = CS.Cuenta, $ = function (s, r) { return (r || document).querySelector(s); };
  var ns = "http://www.w3.org/2000/svg";
  var contV = $("#cont-v"), menos = $("#p-menos"), mas = $("#p-mas");
  var lugares = $("#lugares"), nota = $("#lug-nota"), tray = $("#tray");
  var sw = $("#sw-atole"), swSabor = $("#sw-sabor"), swChip = $("#sw-chip");
  var hojaL = $("#hoja-l"), hojaT = $("#hoja-total");
  var tms = Array.prototype.slice.call(tray ? tray.querySelectorAll(".tm") : []);
  var prevKeys = null;
  var atole = CS.atole();

  menos.addEventListener("click", function () { C.setP(C.get().p - 1); });
  mas.addEventListener("click", function () { C.setP(C.get().p + 1); });
  tms.forEach(function (b) { b.addEventListener("click", function () { C.toggleTamal(b.getAttribute("data-tm")); }); });
  sw.addEventListener("click", function () {
    if (sw.disabled) return;
    C.setX("atole", (C.get().x.atole || 0) > 0 ? 0 : 1);
  });

  /* atole del dia: sabor, chip y estado */
  swChip.style.background = atole.c;
  if (atole.k === "cerrado") {
    sw.disabled = true;
    swSabor.textContent = atole.cuando === "MAÑANA" ? "Mañana descansan." : "Hoy descansan.";
  } else if (atole.k === "pregunta") {
    swSabor.textContent = "Pregunta el atole del día.";
  } else {
    swSabor.textContent = "Atole de " + atole.nombre.toLowerCase() + (atole.cuando === "MAÑANA" ? ", mañana." : ", hoy.");
  }

  function icono(id) {
    var s = document.createElementNS(ns, "svg"), u = document.createElementNS(ns, "use");
    s.setAttribute("aria-hidden", "true");
    u.setAttribute("href", "#" + id);
    s.appendChild(u);
    return s;
  }

  function paint() {
    var S = C.get();
    contV.textContent = S.p;
    menos.disabled = S.p <= 0;
    mas.disabled = S.p >= 4;

    /* tamales: abierto = elegido; el papelito dice en que lugar quedo */
    tms.forEach(function (b) {
      var k = b.getAttribute("data-tm"), i = S.t.indexOf(k), on = i >= 0;
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
      var sl = b.querySelector(".tm-slot");
      if (sl) sl.textContent = on ? "Tamal " + (i + 1) : "Tamal";
    });

    /* lugares */
    lugares.textContent = "";
    for (var i = 0; i < S.p; i++) {
      var li = document.createElement("li"), b = document.createElement("button");
      b.type = "button";
      var k = S.t[i];
      b.className = "lug" + (k ? " on" : (i === S.t.length ? " next" : ""));
      var sm = document.createElement("small"); sm.textContent = "Tamal " + (i + 1);
      var bb = document.createElement("b"); bb.textContent = k ? CS.TAMALES[k].n : "Elige uno";
      b.appendChild(sm); b.appendChild(bb);
      if (k) {
        b.appendChild(icono("i-x"));
        b.setAttribute("aria-label", "Quitar el tamal " + (i + 1) + ": " + CS.TAMALES[k].n);
        (function (kk) { b.addEventListener("click", function () { C.toggleTamal(kk); }); })(k);
      } else {
        b.setAttribute("aria-label", "Tamal " + (i + 1) + ", falta elegir");
        b.addEventListener("click", function () { tray.scrollIntoView({ block: "center", behavior: CS.reduce ? "auto" : "smooth" }); });
      }
      li.appendChild(b); lugares.appendChild(li);
    }
    if (!S.p) nota.textContent = "Toca un tamal para desenvolverlo: cada Platillo Hidrocálido trae uno de postre.";
    else if (S.t.length < S.p) nota.textContent = "Faltan " + (S.p - S.t.length) + " por elegir. Toca uno para desenvolverlo; si lo vuelves a tocar, se envuelve.";
    else nota.textContent = "Listo. Toca otro para cambiar el último, o el abierto para envolverlo.";

    /* atole */
    var on = (S.x.atole || 0) > 0;
    sw.setAttribute("aria-checked", on ? "true" : "false");

    /* hoja */
    var L = C.lines(), keys = {};
    hojaL.textContent = "";
    if (!L.length) {
      var v = document.createElement("li");
      v.className = "hl hl-vacio";
      v.textContent = "Todavía no hay renglones. Elige un platillo o toca el + en la carta.";
      hojaL.appendChild(v);
    }
    L.forEach(function (l) {
      keys[l.key] = 1;
      var li = document.createElement("li");
      li.className = "hl" + (l.sub ? " hl-sub" : "") + (prevKeys && !prevKeys[l.key] ? " nuevo" : "");
      var n = document.createElement("span"); n.className = "hl-n"; n.textContent = l.label;
      var d = document.createElement("i"); d.className = "dots"; d.setAttribute("aria-hidden", "true");
      var p = document.createElement("span"); p.className = "hl-pr";
      if (l.nota) { p.textContent = l.nota; }
      else if (l.total == null) { p.className += " q"; p.textContent = "Pregunta el precio"; }
      else p.textContent = CS.money(l.total);
      li.appendChild(n); li.appendChild(d); li.appendChild(p);
      if (!l.sub) {
        var q = document.createElement("button");
        q.type = "button"; q.className = "sq sq-ghost";
        q.setAttribute("aria-label", "Quitar uno: " + l.label);
        q.appendChild(icono("i-minus"));
        q.addEventListener("click", function () {
          if (l.id === "p") C.setP(C.get().p - 1); else C.addX(l.id, -1);
        });
        li.appendChild(q);
      }
      hojaL.appendChild(li);
    });
    prevKeys = keys;
    var t = C.total();
    hojaT.textContent = t > 0 ? CS.money(t) : (C.vacia() ? "Por armar" : "Pregunta el precio");
  }
  C.on(paint);
  paint();
})();
