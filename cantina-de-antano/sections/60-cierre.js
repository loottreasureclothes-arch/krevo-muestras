(function () {
  "use strict";
  function init() {
    var C = window.Cantina, form = document.getElementById("ficha");
    if (!C || !form) return;
    var S = C.state, money = C.money;
    var $ = function (s) { return form.querySelector(s); };
    var lines = document.getElementById("f-lines"), vacio = document.getElementById("f-vacio");
    var tot = document.getElementById("f-tot"), totv = document.getElementById("f-total"), tnote = document.getElementById("f-tnote");
    var hint = document.getElementById("f-hint"), wa = document.getElementById("mesa-wa"), wat = document.getElementById("mesa-wa-t");
    var pers = document.getElementById("f-pers"), hora = document.getElementById("f-hora"), nom = document.getElementById("f-nombre");
    var when = document.getElementById("f-when");

    function radio(name, val) { var r = form.querySelector('input[name="' + name + '"][value="' + val + '"]'); if (r) r.checked = true; }
    function sync() {
      radio("modo", S.modo); radio("suc", S.suc); radio("dia", S.dia);
      pers.textContent = S.n; hora.value = S.hora;
      if (document.activeElement !== nom) nom.value = S.nombre || "";
      when.hidden = S.modo === "evento";
      wat.textContent = S.modo === "evento" ? "Cotizar evento por WhatsApp" : "Apartar mesa por WhatsApp";
      /* lo agregado de la carta */
      lines.innerHTML = "";
      var any = false;
      Object.keys(S.items).forEach(function (k) {
        var x = S.items[k]; any = true;
        var li = document.createElement("li");
        li.innerHTML = '<span class="f-ln"></span><span class="f-lp"></span><div class="qs" role="group"><button type="button" data-q="-1">&minus;</button><output></output><button type="button" data-q="1">+</button></div>';
        li.querySelector(".f-ln").textContent = x.label;
        li.querySelector(".f-lp").textContent = money(x.price) + " c/u";
        li.querySelector("output").textContent = x.qty;
        li.querySelector('[data-q="-1"]').setAttribute("aria-label", "Quitar uno de " + x.label);
        li.querySelector('[data-q="1"]').setAttribute("aria-label", "Agregar otro " + x.label);
        li.querySelectorAll("button").forEach(function (b) { b.addEventListener("click", function () { C.setQty(k, C.qtyOf(k) + (+b.dataset.q)); }); });
        lines.appendChild(li);
      });
      vacio.hidden = any; tot.hidden = !any; tnote.hidden = !any; totv.textContent = money(C.total);
      /* aviso si a esa hora esa sucursal está cerrada */
      var msg = "";
      if (S.modo !== "evento") {
        var t = C.ahora(), dow = S.dia === "manana" ? (t.dow + 1) % 7 : t.dow, hp = S.hora.split(":"), m = +hp[0] * 60 + +hp[1];
        var e = C.estado(S.suc, dow, m);
        if (S.dia !== "manana" && m <= t.min) msg = "Esa hora ya pasó. Elige una más tarde o mañana.";
        else if (!e.open) {
          var h = C.SUC[S.suc].h[dow];
          msg = "A esa hora " + C.SUC[S.suc].nombre + " todavía no abre: abre a " + C.art(h[0]) + C.fmt(h[0]) + ". Elige otra hora o escríbenos.";
          if (m > h[0]) msg = "A esa hora " + C.SUC[S.suc].nombre + " ya cerró. Elige otra hora o escríbenos.";
        }
      }
      hint.textContent = msg;
      wa.href = C.waUrl();
    }
    /* Con "hoy", la hora inicial nunca queda en el pasado: la siguiente media hora (o mañana si ya es tarde) */
    (function horaInicial() {
      var t = C.ahora(), hp = S.hora.split(":"), m = +hp[0] * 60 + +hp[1];
      if (S.dia === "manana" || m > t.min) return;
      var next = Math.ceil((t.min + 1) / 30) * 30;
      if (next < 810) next = 810;
      if (next <= 1380) S.hora = (next / 60 < 10 ? "0" : "") + Math.floor(next / 60) + ":" + (next % 60 ? "30" : "00");
      else S.dia = "manana";
    })();
    C.on(sync); sync();

    form.addEventListener("change", function (e) {
      var t = e.target;
      if (t.name === "modo") C.set("modo", t.value);
      else if (t.name === "suc") C.set("suc", t.value);
      else if (t.name === "dia") C.set("dia", t.value);
      else if (t.id === "f-hora") C.set("hora", t.value);
    });
    nom.addEventListener("input", function () { C.set("nombre", nom.value); });
    form.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest("[data-pers]"); if (!b) return;
      C.set("n", Math.max(1, Math.min(120, S.n + (+b.dataset.pers))));
    });
    form.addEventListener("submit", function (e) { e.preventDefault(); });
    /* el href se renueva justo antes de abrir; sin preventDefault ni window.open */
    function renew() { wa.href = C.waUrl(); }
    wa.addEventListener("pointerdown", renew); wa.addEventListener("click", renew); wa.addEventListener("focus", renew);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
