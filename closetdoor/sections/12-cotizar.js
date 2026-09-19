/* 12 · Cotizar: wizard de 3 pasos que arma el mensaje de WhatsApp */
(function () {
  "use strict";
  var WA = "524494463411";

  function init() {
    var sec = document.getElementById("cotizar");
    var f = document.getElementById("cq-form");
    if (!sec || !f) return;
    var steps = f.querySelectorAll(".cq-step");
    var dots = sec.querySelectorAll(".cq-tape-steps li");
    var status = document.getElementById("cq-status");
    var err = document.getElementById("cq-err");
    var back = document.getElementById("cq-back");
    var next = document.getElementById("cq-next");
    var send = document.getElementById("cq-send");
    var again = document.getElementById("cq-again");
    var opts = f.querySelector(".cq-opts");
    var card = sec.querySelector(".cq-card");
    var cur = 1, auto = 0, anims = [];
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
    var canAnim = !!card.animate;

    // Interrumpible (Emil): si llega otro cambio de paso a medias, se cancela lo que corre y se salta al final.
    function kill() {
      anims.forEach(function (a) { try { a.cancel(); } catch (x) {} });
      anims = [];
      card.style.overflow = "";
      for (var i = 0; i < steps.length; i++) steps[i].hidden = +steps[i].getAttribute("data-step") !== cur;
    }
    // Cambio de paso con dirección: el que sale se va rápido hacia atrás, el que entra llega del lado contrario
    // y la tarjeta ajusta su alto en el mismo tiempo (así no brinca el contenido de abajo).
    function swap(from, to, dir, after) {
      if (!canAnim || !from || from === to) { if (from) from.hidden = true; to.hidden = false; after(); return; }
      var h0 = card.offsetHeight;
      if (reduce) {
        from.hidden = true; to.hidden = false; after();
        anims.push(to.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, easing: "ease" }));
        return;
      }
      var out = from.animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateX(" + (-dir * 22) + "px)" }],
        { duration: 140, easing: EASE, fill: "forwards" });
      anims.push(out);
      out.onfinish = function () {
        out.cancel();
        from.hidden = true; to.hidden = false;
        var h1 = card.offsetHeight;
        after();
        card.style.overflow = "clip";
        var hh = card.animate([{ height: h0 + "px" }, { height: h1 + "px" }], { duration: 320, easing: EASE });
        hh.onfinish = function () { card.style.overflow = ""; };
        anims.push(hh);
        anims.push(to.animate([{ opacity: 0, transform: "translateX(" + (dir * 28) + "px)" }, { opacity: 1, transform: "none" }],
          { duration: 340, easing: EASE }));
      };
    }

    function val(n) { return (f.elements[n] && f.elements[n].value || "").trim(); }
    function tipo() { var t = f.querySelector('input[name="tipo"]:checked'); return t ? t.value : ""; }

    function say(msg, field) {
      err.textContent = msg; err.hidden = false;
      if (field) { field.setAttribute("aria-invalid", "true"); field.focus(); }
    }
    function clear() {
      err.hidden = true; err.textContent = "";
      opts.classList.remove("is-bad");
      var bad = f.querySelectorAll('[aria-invalid="true"]');
      for (var i = 0; i < bad.length; i++) bad[i].removeAttribute("aria-invalid");
    }

    function fill() {
      var map = { tipo: tipo(), medidas: val("medidas"), colonia: val("colonia") };
      for (var k in map) {
        var dd = f.querySelector('[data-sum="' + k + '"]');
        dd.textContent = map[k] || (k === "medidas" ? "Sin medidas, las vemos después" : "");
        dd.classList.toggle("is-empty", !map[k]);
      }
    }

    function go(n, focus) {
      kill();
      var dir = n >= cur ? 1 : -1;
      var from = f.querySelector('.cq-step[data-step="' + cur + '"]');
      var to = f.querySelector('.cq-step[data-step="' + n + '"]');
      clearTimeout(auto);
      clear();
      cur = n;
      sec.setAttribute("data-step", n);
      for (var j = 0; j < dots.length; j++) dots[j].classList.toggle("is-on", j < Math.min(n, 3));
      back.hidden = n === 1 || n === 4;
      next.hidden = n >= 3;
      send.hidden = n !== 3;
      if (n === 3) fill();
      status.textContent = n < 4 ? "Paso " + n + " de 3" : "Listo, revisa tu WhatsApp";
      swap(from, to, dir, function () {
        if (n === 4) stamp();
        if (focus === false) return;
        var target = n === 2 ? f.elements.medidas : n === 3 ? f.elements.nombre : to.querySelector(".cq-q");
        // En celular no abrimos el teclado solo: enfocamos el título del paso
        if (n !== 4 && n !== 1 && !window.matchMedia("(pointer: fine)").matches) target = to.querySelector(".cq-q");
        try { target.focus({ preventScroll: true }); } catch (x) { target.focus(); }
        var top = card.getBoundingClientRect().top;
        if (top < 0 || top > window.innerHeight * 0.6) {
          card.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        }
      });
    }

    // Celebración sutil (momento raro, una vez por cotización): el sello cae, asienta y la tarjeta acusa el golpe.
    function stamp() {
      var st = f.querySelector(".cq-stamp");
      if (!st || !canAnim) return;
      if (reduce) { anims.push(st.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, easing: "ease" })); return; }
      anims.push(st.animate([
        { opacity: 0, transform: "rotate(-14deg) scale(1.55)" },
        { opacity: 1, transform: "rotate(-5deg) scale(0.96)", offset: 0.55 },
        { opacity: 1, transform: "rotate(-6.5deg) scale(1.02)", offset: 0.78 },
        { opacity: 1, transform: "rotate(-6deg) scale(1)" }
      ], { duration: 560, delay: 120, easing: EASE, fill: "backwards" }));
      anims.push(card.animate([
        { transform: "none" }, { transform: "translateY(3px) scale(0.995)", offset: 0.4 }, { transform: "none" }
      ], { duration: 260, delay: 120 + 300, easing: "ease-out" }));
    }

    function check(n) {
      if (n === 1 && !tipo()) {
        opts.classList.add("is-bad");
        say("Elige una opción para seguir.");
        var first = f.querySelector('input[name="tipo"]'); if (first) first.focus();
        return false;
      }
      if (n === 2 && !val("colonia")) { say("Dinos tu colonia para saber dónde queda.", f.elements.colonia); return false; }
      if (n === 3 && !val("nombre")) { say("¿Cómo te llamas? Así sabemos a quién contestarle.", f.elements.nombre); return false; }
      return true;
    }

    function message() {
      var med = val("medidas");
      return "Hola Closet&Door, soy " + val("nombre") + ". Quiero cotizar: " + tipo() + "." +
        (med ? "\nMedidas aprox.: " + med + "." : "") +
        "\nColonia: " + val("colonia") + ".";
    }

    f.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!check(cur)) return;
      if (cur < 3) { go(cur + 1); return; }
      var url = "https://wa.me/" + WA + "?text=" + encodeURIComponent(message());
      again.href = url;
      sec.setAttribute("data-wa-url", url);
      var w = window.open(url, "_blank");
      if (w) { try { w.opener = null; } catch (x) {} }
      go(4);
      if (!w) location.href = url;
    });

    back.addEventListener("click", function () { if (cur > 1) go(cur - 1); });

    f.addEventListener("click", function (e) {
      var ed = e.target.closest ? e.target.closest(".cq-edit") : null;
      if (ed) go(+ed.getAttribute("data-go"));
    });

    // Feedback táctil al apoyar el dedo (pointerdown, no al soltar) + vibración mínima en teléfonos que la soportan.
    opts.addEventListener("pointerdown", function (e) {
      var o = e.target.closest ? e.target.closest(".cq-opt") : null;
      if (o) o.classList.add("is-press");
    });
    ["pointerup", "pointercancel", "pointerleave"].forEach(function (ev) {
      opts.addEventListener(ev, function () {
        var p = opts.querySelectorAll(".is-press");
        for (var i = 0; i < p.length; i++) p[i].classList.remove("is-press");
      });
    });
    // Tocar una tarjeta con el dedo o el mouse avanza solo; con teclado no.
    opts.addEventListener("click", function (e) {
      if (e.target.name !== "tipo" || !e.detail) return;
      clear();
      clearTimeout(auto);
      if (navigator.vibrate && window.matchMedia("(pointer: coarse)").matches) { try { navigator.vibrate(8); } catch (x) {} }
      // deja ver el palomeo con resorte antes de pasar
      auto = setTimeout(function () { if (cur === 1) go(2); }, 380);
    });
    opts.addEventListener("change", clear);

    f.addEventListener("input", function (e) {
      if (e.target.getAttribute("aria-invalid")) { e.target.removeAttribute("aria-invalid"); err.hidden = true; }
    });

    document.getElementById("cq-reset").addEventListener("click", function () {
      f.reset(); go(1);
    });

    sec.setAttribute("data-step", "1");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
