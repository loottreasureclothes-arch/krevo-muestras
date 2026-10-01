/* charola: los discos caen a la hoja; tres decisiones; mensaje de wa.me */
(function () {
  "use strict";
  function init() {
    if (!window.Tq) return;
    var T = Tq, S = T.state;
    var discs = document.getElementById("tq-ch-discs"), empty = document.getElementById("tq-ch-empty"), suma = document.getElementById("tq-ch-suma");
    var ctl = document.getElementById("tq-ch-ctl"), lemaMsg = document.getElementById("tq-lema-msg"), lemaT = document.getElementById("tq-lema-t");
    var nombre = document.getElementById("tq-nombre");
    if (!discs) return;
    var prevUnits = 0, lemaTxt = lemaT.textContent, lemaTimer = null;

    function units() { var u = []; S.orden.forEach(function (id) { for (var i = 0; i < S.q[id]; i++) u.push(id); }); return u; }
    function setLema(txt) {
      if (txt === lemaTxt) return; lemaTxt = txt;
      lemaT.style.opacity = "0"; clearTimeout(lemaTimer);
      lemaTimer = setTimeout(function () { lemaT.textContent = txt; lemaT.style.opacity = "1"; }, 150);
    }
    function paint(info) {
      var u = units(), n = u.length;
      discs.textContent = "";
      u.forEach(function (id, i) {
        var b = document.createElement("button"); b.type = "button"; b.setAttribute("data-rm", id);
        b.setAttribute("aria-label", "Quitar un taco de " + T.BY[id].n + " de la charola");
        var im = document.createElement("img"); im.src = "img/taco-" + id + ".webp"; im.alt = ""; im.width = 92; im.height = 92;
        b.appendChild(im);
        if (info && info.added === id && n > prevUnits && i === lastIndex(u, id)) b.className = "is-new";
        discs.appendChild(b);
      });
      empty.hidden = n > 0; suma.hidden = n === 0; discs.hidden = n === 0;
      if (n) suma.textContent = "Suma de la carta de Centro: $" + T.total() + (S.modo !== "normal" ? " (con +$10 por taco)" : "");
      var pressed = { modo: S.modo, bebida: S.bebida, suc: S.suc };
      Array.prototype.forEach.call(ctl.querySelectorAll(".tq-ficha"), function (f) {
        var on = pressed[f.getAttribute("data-opt")] === f.getAttribute("data-val");
        f.setAttribute("aria-pressed", on ? "true" : "false");
      });
      if (document.activeElement !== nombre) nombre.value = S.nombre;
      lemaMsg.classList.toggle("is-off", n === 0 || S.bebida === "");
      if (n > 0) {
        if (S.bebida === "cheve") setLema("Ahora sí.");
        else if (S.bebida === "agua") setLema("Tú sabrás.");
        else if (S.bebida === "nada") setLema("Taco sin cheve no chabe.");
      }
      if (n > 0 && S.bebida === "") { lemaMsg.classList.remove("is-off"); setLema("Taco sin cheve no chabe."); }
      prevUnits = n;
    }
    function lastIndex(arr, id) { for (var i = arr.length - 1; i >= 0; i--) if (arr[i] === id) return i; return -1; }

    discs.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest("button[data-rm]") : null; if (!b) return;
      var id = b.getAttribute("data-rm"); b.classList.add("is-out");
      setTimeout(function () { T.remove(id); }, 130);
    });
    empty.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest("[data-quick]") : null; if (!b) return;
      T.add(b.getAttribute("data-quick"));
    });
    ctl.addEventListener("click", function (e) {
      var f = e.target.closest ? e.target.closest(".tq-ficha") : null; if (!f) return;
      var k = f.getAttribute("data-opt"), v = f.getAttribute("data-val");
      /* tocar la ficha elegida de bebida o sucursal la suelta */
      if ((k === "bebida" || k === "suc") && S[k] === v) v = "";
      T.set(k, v);
    });
    nombre.addEventListener("input", function () { S.nombre = nombre.value; T.set("nombre", nombre.value); });
    T.on(paint); paint({});
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
