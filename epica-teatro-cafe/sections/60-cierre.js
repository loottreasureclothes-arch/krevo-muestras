/* 60 · Cierre: refleja el boleto del plano (día de la programación, fecha, lugares) y el mismo mensaje de WhatsApp.
   El sello del abanico dice "Elige tu función" hasta que elige; luego muestra el tipo de función y la fecha. */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  function paint(d) {
    var st = d.state, c = d.cur, n = st.seats.length;
    function set(id, val) { var el = $(id); if (!el) return; el.textContent = val || el.getAttribute("data-empty") || ""; el.classList.toggle("is-empty", !val); }
    set("c-fn", c ? c.sh.nombre : ""); set("c-fecha", c ? c.f.l : ""); set("c-lug", n ? st.seats.join(" · ") : "");
    var cn = $("c-n"); if (cn) cn.textContent = n ? n : "___";
    var falta = $("c-falta"), sube = $("c-sube");
    if (falta) {
      if (!c) { falta.hidden = false; falta.textContent = "Falta elegir función."; }
      else if (!n) { falta.hidden = false; falta.textContent = "Faltan los lugares: tócalos en el plano."; }
      else falta.hidden = true;
    }
    if (sube) { sube.hidden = !!(c && n); sube.firstChild.nodeValue = !c ? "Elegir función" : "Elegir lugares"; }
    var a = $("c-wa");
    if (a) {
      a.setAttribute("data-wa", d.message);
      a.href = window.EpWaUrl ? window.EpWaUrl(d.message) : "https://wa.me/524491577858?text=" + encodeURIComponent(d.message);
      a.target = "_blank"; a.rel = "noopener";
    }
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
