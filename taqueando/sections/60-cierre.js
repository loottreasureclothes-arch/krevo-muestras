/* cierre: repite la charola armada y su boton verde */
(function () {
  "use strict";
  function init() {
    if (!window.Tq) return;
    var T = Tq, S = T.state;
    var t = document.getElementById("tq-ci-t"), vacio = document.getElementById("tq-ci-vacio"), list = document.getElementById("tq-ci-list"), det = document.getElementById("tq-ci-det"), lnk = document.getElementById("tq-ci-lnk");
    var MODO = { queso: "Con queso (+$10 por taco)", volcan: "En volcán (+$10 por taco)" }, BEB = { cheve: "Cheve", agua: "Agua de sabor" };
    function paint() {
      var n = T.count();
      if (n) {
        t.innerHTML = '<span class="l">TU CHAROLA</span><span class="l y">YA ESTÁ ARMADA.</span>';
        vacio.hidden = true; list.hidden = false; list.textContent = "";
        S.orden.forEach(function (id) {
          var li = document.createElement("li"), im = document.createElement("img"), s = document.createElement("span"), b = document.createElement("b");
          im.src = "img/taco-" + id + ".webp"; im.alt = ""; im.width = 40; im.height = 40;
          s.textContent = S.q[id] + " × " + T.BY[id].t; b.textContent = "$" + (T.BY[id].p * S.q[id]);
          li.appendChild(im); li.appendChild(s); li.appendChild(b); list.appendChild(li);
        });
        var d = []; if (MODO[S.modo]) d.push(MODO[S.modo]); if (BEB[S.bebida]) d.push("Para tomar: " + BEB[S.bebida]); if (S.suc) d.push("Sucursal " + T.SUC[S.suc]);
        d.push("Suma de la carta de Centro: $" + T.total() + ". Te confirmamos por WhatsApp.");
        det.hidden = false; det.textContent = d.join(" · ");
        lnk.querySelector("span").textContent = "Cambiar mi charola"; lnk.setAttribute("href", "#charola");
      } else {
        t.innerHTML = '<span class="l">FALTA EL</span><span class="l y">PRIMER TACO.</span>';
        vacio.hidden = false; list.hidden = true; det.hidden = true;
        lnk.querySelector("span").textContent = "Ver la carta"; lnk.setAttribute("href", "#carta");
      }
    }
    T.on(paint); paint();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
