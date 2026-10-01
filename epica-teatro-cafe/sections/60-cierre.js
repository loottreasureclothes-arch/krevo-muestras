/* 60 · Cierre: dos estados reales.
   - Sin función elegida: "¿Cuál función / te toca?" y solo el abanico con el sello "ELIGE TU FUNCIÓN" (link a la sala).
   - Con función elegida: "Tu boleto / ya casi está.", el boleto lleno y el botón verde (mismo mensaje que la sala).
   El abanico cambia según el día: VIE y SÁB teatro (Off Shakespeare, La Herencia, Gigoló); DOM infantil y música
   (Mariquita, La Pau Durán, Jean de Blues y poesía); MIÉ y JUE el abanico mixto. */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var AB = {
    mix: ["mariquita", "off-shakespeare-19", "pau-duran"],
    teatro: ["off-shakespeare-26", "herencia", "gigolo-25"],
    dom: ["mariquita", "pau-duran", "jean-27-poesia"]
  };
  var GRUPO = { mie: "mix", jue: "mix", vie: "teatro", sab: "teatro", dom: "dom" };
  function abanico(dia) {
    var set = AB[GRUPO[dia] || "mix"];
    for (var i = 0; i < 3; i++) {
      var img = $("c-ab-" + (i + 1)), src = "img/p-" + set[i] + "-480.webp";
      if (img && img.getAttribute("src") !== src) img.setAttribute("src", src);
    }
  }
  function paint(d) {
    var st = d.state, c = d.cur, n = st.seats.length;
    var sec = $("cierre"); if (sec) sec.classList.toggle("is-vacio", !c);
    var t1 = $("c-t1"), t2 = $("c-t2");
    if (t1 && t2) { t1.textContent = c ? "Tu boleto" : "¿Cuál función"; t2.textContent = c ? "ya casi está." : "te toca?"; }
    var tk = $("c-tk"); if (tk) tk.hidden = !c;
    function set(id, val) { var el = $(id); if (!el) return; el.textContent = val || el.getAttribute("data-empty") || ""; el.classList.toggle("is-empty", !val); }
    set("c-fn", c ? c.sh.nombre : ""); set("c-fecha", c ? c.f.l : ""); set("c-lug", n ? st.seats.join(" · ") : "");
    var cn = $("c-n"); if (cn) cn.textContent = n ? n : "___";
    var a = $("c-wa");
    if (a) {
      a.setAttribute("data-wa", d.message);
      a.href = window.EpWaUrl ? window.EpWaUrl(d.message) : "https://wa.me/524491577858?text=" + encodeURIComponent(d.message);
      a.target = "_blank"; a.rel = "noopener";
    }
    abanico(c ? c.dia : "");
    var k = $("c-sello-k"), v = $("c-sello-v"), ab = $("c-abanico");
    if (k && v) {
      if (c) { k.textContent = c.f.l; k.hidden = false; v.textContent = c.sh.nombre; }
      else { k.hidden = true; v.textContent = "Elige tu función"; }
    }
    if (ab) ab.setAttribute("aria-label", c ? "Tu función: " + c.sh.nombre + ", " + c.f.l + ". Cambiarla en la sala" : "Elige tu función en la sala");
  }
  function now() { return { state: window.EpBoleto.get(), cur: window.EpBoleto.current(), message: window.EpBoleto.message() }; }
  function init() {
    var a = $("c-wa");
    if (a) ["click", "pointerdown", "touchstart", "focus"].forEach(function (t) {
      a.addEventListener(t, function () { if (window.EpBoleto) paint(now()); }, { passive: true });
    });
    window.addEventListener("epica:boleto", function (e) { paint(e.detail); });
    if (window.EpBoleto) paint(now());
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
