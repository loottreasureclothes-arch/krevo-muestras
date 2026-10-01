(function () {
  "use strict";
  function init() {
    var LG = window.LG; if (!LG) return;
    var btns = Array.prototype.slice.call(document.querySelectorAll("[data-add]"));
    var neonText = document.getElementById("lg-neon-text");
    var neonAdd = document.getElementById("lg-neon-add");
    var design = "Nuestra Boda";
    function itemOf(b) {
      var k = b.getAttribute("data-add");
      if (k === "neon") return { k: "neon", msg: "letrero neón " + design, disp: "Letrero neón " + design, price: "" };
      return { k: k, msg: b.getAttribute("data-msg"), disp: b.getAttribute("data-disp"), price: b.getAttribute("data-price") || "" };
    }
    function paint() {
      btns.forEach(function (b) {
        var on = LG.hasItem(b.getAttribute("data-add"));
        b.classList.toggle("is-on", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
        b.textContent = on ? "En tu lista" : b.getAttribute("data-t");
      });
      /* el neón guarda el diseño elegido: si cambia con el letrero ya en la lista, se actualiza */
      var st = LG.state.lista;
      for (var i = 0; i < st.length; i++) if (st[i].k === "neon") { st[i].msg = "letrero neón " + design; st[i].disp = "Letrero neón " + design; }
    }
    btns.forEach(function (b) {
      b.addEventListener("click", function () { LG.toggleItem(itemOf(b)); });
    });
    LG.on("lista", paint);
    /* diseño elegido del neón: si ya venía en la lista (sessionStorage), se recupera */
    LG.state.lista.forEach(function (it) { if (it.k === "neon" && it.msg) design = it.msg.replace(/^letrero neón /, ""); });
    var chips = Array.prototype.slice.call(document.querySelectorAll("[data-neon]"));
    function setDesign(d) {
      design = d;
      if (neonText) neonText.textContent = d;
      chips.forEach(function (c) { var on = c.getAttribute("data-neon") === d; c.classList.toggle("is-on", on); c.setAttribute("aria-pressed", on ? "true" : "false"); });
      if (LG.hasItem("neon")) { paint(); LG.emit("lista", LG.state.lista); } 
    }
    chips.forEach(function (c) { c.addEventListener("click", function () { setDesign(c.getAttribute("data-neon")); }); });
    setDesign(design);
    paint();
  }
  if (window.LG) init(); else document.addEventListener("DOMContentLoaded", init);
})();
