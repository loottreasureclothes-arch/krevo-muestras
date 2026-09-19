/* 02a · Contacto corto: "¿Te llamamos?"
   - data-formsubmit vacío  -> abre WhatsApp al dueño con "Nuevo cliente interesado..." ya escrito.
   - data-formsubmit="correo@dueño.com" -> POST silencioso a https://formsubmit.co/ajax/<correo> (gratis)
     y muestra "Listo, te llamamos pronto". Si el POST falla, cae a WhatsApp. */
(function () {
  "use strict";
  var WA = "524494463411";

  function init() {
    var f = document.getElementById("ct-form");
    if (!f) return;
    var err = document.getElementById("ct-err");
    var done = document.getElementById("ct-done");
    var doneS = document.getElementById("ct-done-s");
    var again = document.getElementById("ct-again");
    var send = document.getElementById("ct-send");
    var tel = f.elements.telefono;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function v(n) { return (f.elements[n] && f.elements[n].value || "").trim(); }
    // Solo dígitos; acepta +52 / 52 / 044 delante y se queda con los 10 del número.
    function digits(s) {
      var d = (s || "").replace(/\D/g, "");
      if (d.length === 12 && d.indexOf("52") === 0) d = d.slice(2);
      if (d.length === 13 && d.indexOf("521") === 0) d = d.slice(3);
      return d;
    }
    function pretty(d) { return d.length === 10 ? d.slice(0, 3) + " " + d.slice(3, 6) + " " + d.slice(6) : d; }

    function say(msg, field) {
      err.textContent = msg; err.hidden = false;
      if (field) {
        field.setAttribute("aria-invalid", "true");
        field.focus();
        if (field.animate && !reduce) field.animate(
          [{ transform: "translateX(0)" }, { transform: "translateX(-5px)" }, { transform: "translateX(4px)" }, { transform: "translateX(-2px)" }, { transform: "translateX(0)" }],
          { duration: 280, easing: "ease-out" });
      }
    }
    function clear(el) {
      if (el) el.removeAttribute("aria-invalid");
      if (!f.querySelector('[aria-invalid="true"]')) { err.hidden = true; err.textContent = ""; }
    }

    // Formato mientras escribe: 449 123 4567, con palomita verde al llegar a 10.
    tel.addEventListener("input", function () {
      var d = digits(tel.value).slice(0, 10);
      var start = tel.selectionStart, atEnd = start === tel.value.length;
      tel.value = d.length > 6 ? d.slice(0, 3) + " " + d.slice(3, 6) + " " + d.slice(6) : d.length > 3 ? d.slice(0, 3) + " " + d.slice(3) : d;
      if (atEnd) { try { tel.setSelectionRange(tel.value.length, tel.value.length); } catch (x) {} }
      tel.parentNode.classList.toggle("is-ok", d.length === 10);
    });
    f.addEventListener("input", function (e) { if (e.target.getAttribute("aria-invalid")) clear(e.target); });
    f.addEventListener("change", function (e) { if (e.target.getAttribute("aria-invalid")) clear(e.target); });

    function message() {
      var need = v("necesita") + (v("detalle") ? " (" + v("detalle") + ")" : "");
      return "Nuevo cliente interesado desde la web:\n" +
        "Nombre: " + v("nombre") + "\n" +
        "Tel: " + pretty(digits(v("telefono"))) + "\n" +
        "Necesita: " + need;
    }

    function finish(viaWa, url) {
      f.classList.add("is-sent");
      done.hidden = false;
      doneS.textContent = viaWa ? "Tu mensaje ya va escrito en WhatsApp. Solo dale enviar." : "Recibimos tus datos. Te marcamos al " + pretty(digits(v("telefono"))) + ".";
      if (viaWa) { again.href = url; again.hidden = false; }
      try { done.focus({ preventScroll: true }); } catch (x) { done.focus(); }
      var ck = done.querySelector(".ct-check"), p = done.querySelector(".ct-check path");
      if (ck && ck.animate && !reduce) {
        ck.animate([{ transform: "scale(0.6)", opacity: 0 }, { transform: "scale(1.06)", opacity: 1, offset: 0.6 }, { transform: "scale(1)", opacity: 1 }],
          { duration: 420, easing: "cubic-bezier(0.23, 1, 0.32, 1)" });
        p.animate([{ strokeDashoffset: 26 }, { strokeDashoffset: 0 }], { duration: 320, delay: 160, easing: "ease-out", fill: "backwards" });
        done.animate([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }], { duration: 300, easing: "ease-out" });
      }
      var r = f.getBoundingClientRect();
      if (r.top < 0) f.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }

    function viaWhatsApp() {
      var url = "https://wa.me/" + WA + "?text=" + encodeURIComponent(message());
      f.setAttribute("data-wa-url", url);
      var w = window.open(url, "_blank");
      if (w) { try { w.opener = null; } catch (x) {} }
      finish(true, url);
      if (!w) location.href = url;
    }

    f.addEventListener("submit", function (e) {
      e.preventDefault();
      if (v("nombre").length < 2) { say("Escribe tu nombre para saber a quién llamar.", f.elements.nombre); return; }
      if (digits(v("telefono")).length !== 10) { say("El teléfono debe tener 10 dígitos, ej. 449 123 4567.", tel); return; }
      if (!v("necesita")) { say("Elige qué necesitas.", f.elements.necesita); return; }

      var mail = (f.getAttribute("data-formsubmit") || "").trim();
      if (!mail || !window.fetch) { viaWhatsApp(); return; }

      // Envío silencioso con FormSubmit.co (gratis). Llega al correo del dueño.
      send.setAttribute("aria-busy", "true");
      fetch("https://formsubmit.co/ajax/" + mail.replace(/[^\w.@+-]/g, ""), {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          _subject: "Cliente interesado: " + v("nombre") + " (" + v("necesita") + ")",
          _template: "table",
          _captcha: "false",
          Nombre: v("nombre"),
          Telefono: pretty(digits(v("telefono"))),
          Necesita: v("necesita"),
          Detalle: v("detalle") || "-",
          Origen: "Formulario ¿Te llamamos? de la web"
        })
      }).then(function (r) { return r.json(); }).then(function (j) {
        send.removeAttribute("aria-busy");
        if (j && (j.success === true || j.success === "true")) finish(false);
        else viaWhatsApp();
      }).catch(function () { send.removeAttribute("aria-busy"); viaWhatsApp(); });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
