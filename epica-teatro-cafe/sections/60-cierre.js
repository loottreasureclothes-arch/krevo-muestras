/* 60 · Cierre: un solo remate, en dos estados reales (Corrección 4: se quitó el abanico "ELIGE TU FUNCIÓN",
   que repetía la cartelera y la sala).
   - Sin función elegida: "¿Vienes / esta semana?", una línea y el botón verde con el mensaje general.
   - Con función elegida: "Tu boleto / ya casi está.", el boleto lleno y el botón verde (mismo mensaje que la sala). */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  function paint(d) {
    var st = d.state, c = d.cur, n = st.seats.length;
    var sec = $("cierre"); if (sec) sec.classList.toggle("is-vacio", !c);
    var t1 = $("c-t1"), t2 = $("c-t2");
    if (t1 && t2) { t1.textContent = c ? "Tu boleto" : "¿Vienes"; t2.textContent = c ? "ya casi está." : "esta semana?"; }
    var bol = $("c-bol"); if (bol) bol.hidden = !c;
    var lead = $("c-lead"); if (lead) lead.hidden = !!c;
    function set(id, val) { var el = $(id); if (!el) return; el.textContent = val || el.getAttribute("data-empty") || ""; el.classList.toggle("is-empty", !val); }
    set("c-fn", c ? c.sh.nombre : ""); set("c-fecha", c ? c.f.l : ""); set("c-lug", n ? st.seats.join(" · ") : "");
    var cn = $("c-n"); if (cn) cn.textContent = n ? n : "___";
    var a = $("c-wa");
    if (a) {
      a.setAttribute("data-wa", d.message);
      a.href = window.EpWaUrl ? window.EpWaUrl(d.message) : "https://wa.me/524491577858?text=" + encodeURIComponent(d.message);
      a.target = "_blank"; a.rel = "noopener";
    }
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
