/* 12 · Cotizar: wizard de 4 pasos (qué, medidas, materiales, enviar) que arma el mensaje de WhatsApp.
   - Materiales: lee localStorage 'cd_materiales' = [{id, nombre, lugar}] (lo llena materiales.html).
   - Entradas externas: evento window 'cd:cotizar' {detail:{tipo}} y hash '#cotizar?tipo=Puerta'
     preseleccionan el tipo y saltan al paso 2.
   - El avance se guarda en sessionStorage para no perderlo al ir y volver del catálogo de materiales. */
(function () {
  "use strict";
  var WA = "524494463411";
  var MKEY = "cd_materiales", SKEY = "cd_cotizar";
  var LAST = 4, DONE = 5;

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
    var matsUl = document.getElementById("cq-mats");
    var matsEmpty = document.getElementById("cq-mats-empty");
    var matLink = document.getElementById("cq-matlink");
    var cur = 1, auto = 0, anims = [];
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
    var canAnim = !!card.animate;
    var nextLabel = next.innerHTML;

    /* ---------- almacenamiento (todo con try/catch: modo privado puede tronar) ---------- */
    function mats() {
      try {
        var a = JSON.parse(localStorage.getItem(MKEY) || "[]");
        return Array.isArray(a) ? a.filter(function (m) { return m && m.nombre; }) : [];
      } catch (x) { return []; }
    }
    function setMats(a) { try { localStorage.setItem(MKEY, JSON.stringify(a)); } catch (x) {} }
    function save() {
      try {
        sessionStorage.setItem(SKEY, JSON.stringify({ step: cur < DONE ? cur : 1, tipo: tipo(), medidas: val("medidas"), colonia: val("colonia"), nombre: val("nombre") }));
      } catch (x) {}
    }
    function restore() {
      var s; try { s = JSON.parse(sessionStorage.getItem(SKEY) || "null"); } catch (x) { s = null; }
      if (!s) return 1;
      if (s.tipo) setTipo(s.tipo);
      ["medidas", "colonia", "nombre"].forEach(function (k) { if (s[k] && f.elements[k]) f.elements[k].value = s[k]; });
      return s.step || 1;
    }

    // Interrumpible (Emil): si llega otro cambio de paso a medias, se cancela lo que corre y se salta al final.
    function kill() {
      anims.forEach(function (a) { try { a.cancel(); } catch (x) {} });
      anims = [];
      card.style.overflow = "";
      for (var i = 0; i < steps.length; i++) steps[i].hidden = +steps[i].getAttribute("data-step") !== cur;
    }
    // Cambio de paso con dirección: el que sale se va rápido, el que entra llega del lado contrario
    // y la tarjeta ajusta su alto en el mismo tiempo (así no brinca el contenido de abajo).
    function swap(from, to, dir, after) {
      if (!canAnim || !from || from === to) { if (from && from !== to) from.hidden = true; to.hidden = false; after(); return; }
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
    function norm(s) { return (s || "").toString().normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim(); }
    function setTipo(t) {
      var ins = f.querySelectorAll('input[name="tipo"]');
      for (var i = 0; i < ins.length; i++) {
        if (norm(ins[i].value) === norm(t) || norm(ins[i].value).indexOf(norm(t)) === 0) { ins[i].checked = true; return true; }
      }
      return false;
    }

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

    /* ---------- paso 3: materiales ---------- */
    var X_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
    function renderMats() {
      var a = mats();
      matsUl.innerHTML = a.map(function (m, i) {
        return '<li class="cq-mat" data-i="' + i + '"><span class="cq-mat-sw" aria-hidden="true"' +
          (m.img ? ' style="background-image:url(\'' + esc(m.img) + '\')"' : m.color ? ' style="--sw:' + esc(m.color) + '"' : "") + '></span><span><b>' + esc(m.nombre) + '</b>' +
          (m.lugar ? "<small>" + esc(m.lugar) + "</small>" : "") + '</span>' +
          '<button type="button" class="cq-mat-x" data-rm="' + esc(m.id != null ? m.id : m.nombre) + '" aria-label="Quitar ' + esc(m.nombre) + '">' + X_SVG + "</button></li>";
      }).join("");
      matsEmpty.hidden = a.length > 0;
      matLink.firstChild.nodeValue = a.length ? "Elegir más materiales" : "Elegir materiales";
      matLink.classList.toggle("is-quiet", a.length > 0);
      if (cur === 3) next.innerHTML = a.length ? nextLabel : 'Omitir <svg width="18" height="18" aria-hidden="true"><use href="#i-arrow"/></svg>';
      return a;
    }
    matsUl.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest(".cq-mat-x") : null;
      if (!b) return;
      var id = b.getAttribute("data-rm");
      var li = b.closest(".cq-mat");
      var rest = mats().filter(function (m) { return String(m.id != null ? m.id : m.nombre) !== id; });
      var done = function () {
        setMats(rest); renderMats();
        var first = matsUl.querySelector(".cq-mat-x");
        (first || matLink).focus();
      };
      if (li && li.animate && !reduce) {
        var h = li.offsetHeight;
        var an = li.animate([{ opacity: 1, transform: "none", height: h + "px" }, { opacity: 0, transform: "translateX(24px)", height: h + "px", offset: 0.6 }, { opacity: 0, transform: "translateX(24px)", height: "0px", marginTop: "-8px" }],
          { duration: 260, easing: EASE, fill: "forwards" });
        an.onfinish = done;
      } else done();
    });
    // Al ir al catálogo: guarda el avance y marca que el cliente debe volver al paso 3.
    matLink.addEventListener("click", function () { save(); try { sessionStorage.setItem(SKEY + "_back", "3"); } catch (x) {} });
    window.addEventListener("storage", function (e) { if (e.key === MKEY) { renderMats(); fill(); } });
    window.addEventListener("pageshow", function () { renderMats(); fill(); });

    /* ---------- resumen ---------- */
    function fill() {
      var a = mats();
      var map = { tipo: tipo(), medidas: val("medidas"), colonia: val("colonia") };
      for (var k in map) {
        var dd = f.querySelector('[data-sum="' + k + '"]');
        dd.textContent = map[k] || (k === "medidas" ? "Sin medidas por ahora" : "Falta");
        dd.classList.toggle("is-empty", !map[k]);
      }
      var md = f.querySelector('[data-sum="materiales"]');
      md.innerHTML = a.length ? a.map(function (m) { return '<span class="cq-sum-mat">' + esc(m.nombre) + (m.lugar ? " <small>· " + esc(m.lugar) + "</small>" : "") + "</span>"; }).join("") : "Por definir";
      md.classList.toggle("is-empty", !a.length);
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
      for (var j = 0; j < dots.length; j++) {
        dots[j].classList.toggle("is-on", j < Math.min(n, LAST));
        dots[j].classList.toggle("is-cur", j === n - 1);
      }
      back.hidden = n === 1 || n === DONE;
      next.hidden = n >= LAST;
      send.hidden = n !== LAST;
      next.innerHTML = nextLabel;
      if (n === 3) renderMats();
      if (n === LAST) fill();
      status.textContent = n < DONE ? "Paso " + n + " de " + LAST : "Listo, revisa tu WhatsApp";
      if (n < DONE) save();
      swap(from, to, dir, function () {
        if (n === DONE) stamp();
        if (focus === false) return;
        var target = n === 2 ? f.elements.medidas : n === LAST ? f.elements.nombre : to.querySelector(".cq-q");
        // En celular no abrimos el teclado solo: enfocamos el título del paso
        if (n !== DONE && n !== 1 && !window.matchMedia("(pointer: fine)").matches) target = to.querySelector(".cq-q");
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
      if (n === LAST && !val("nombre")) { say("¿Cómo te llamas? Así sabemos a quién contestarle.", f.elements.nombre); return false; }
      return true;
    }

    function message() {
      var med = val("medidas");
      var a = mats();
      return "Hola Closet&Door, soy " + val("nombre") + ". Quiero cotizar: " + tipo() + "." +
        (med ? "\nMedidas aprox.: " + med + "." : "") +
        "\nColonia: " + val("colonia") + "." +
        (a.length ? "\nMateriales que me gustaron: " + a.map(function (m) { return m.nombre + (m.lugar ? " (" + m.lugar + ")" : ""); }).join(", ") + "." : "");
    }

    f.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!check(cur)) return;
      if (cur < LAST) { go(cur + 1); return; }
      var url = "https://wa.me/" + WA + "?text=" + encodeURIComponent(message());
      again.href = url;
      sec.setAttribute("data-wa-url", url);
      var w = window.open(url, "_blank");
      if (w) { try { w.opener = null; } catch (x) {} }
      go(DONE);
      try { sessionStorage.removeItem(SKEY); } catch (x) {}
      if (!w) location.href = url;
    });

    back.addEventListener("click", function () { if (cur > 1 && cur < DONE) go(cur - 1); });

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
    opts.addEventListener("change", function () { clear(); save(); });

    f.addEventListener("input", function (e) {
      if (e.target.getAttribute("aria-invalid")) { e.target.removeAttribute("aria-invalid"); err.hidden = true; }
      save();
    });

    document.getElementById("cq-reset").addEventListener("click", function () {
      f.reset(); try { sessionStorage.removeItem(SKEY); } catch (x) {}
      go(1);
    });

    /* ---------- entradas desde otras secciones ---------- */
    // Preselecciona el tipo y salta al paso 2 con la animación normal. Si el tipo no existe, se queda en el paso 1.
    function preselect(t) {
      if (!t) return;
      clearTimeout(auto);
      if (!setTipo(t)) { if (cur !== 1) go(1, false); return; }
      save();
      var o = f.querySelector('input[name="tipo"]:checked');
      var lab = o && o.closest(".cq-opt");
      if (cur === 1 && lab && !reduce && lab.animate) {
        // deja ver cuál quedó palomeada antes de avanzar
        auto = setTimeout(function () { if (cur === 1) go(2, false); }, 420);
      } else go(2, false);
    }
    window.addEventListener("cd:cotizar", function (e) { preselect(e.detail && e.detail.tipo); });
    function fromHash() {
      var h = location.hash || "";
      var m = h.match(/^#cotizar\?(.*)$/);
      if (!m) return false;
      var q = {};
      m[1].split("&").forEach(function (kv) { var p = kv.split("="); try { q[decodeURIComponent(p[0])] = decodeURIComponent((p[1] || "").replace(/\+/g, " ")); } catch (x) {} });
      if (!q.tipo) return false;
      sec.scrollIntoView({ behavior: "auto", block: "start" });
      preselect(q.tipo);
      return true;
    }
    window.addEventListener("hashchange", fromHash);

    /* ---------- arranque ---------- */
    sec.setAttribute("data-step", "1");
    var saved = restore();
    renderMats();
    var backTo; try { backTo = sessionStorage.getItem(SKEY + "_back"); sessionStorage.removeItem(SKEY + "_back"); } catch (x) {}
    if (!fromHash()) {
      // Regreso del catálogo de materiales: vuelve al paso donde se quedó (o al 3)
      var s0 = backTo ? Math.max(3, +saved || 3) : (/^#cotizar/.test(location.hash) ? +saved : 1);
      if (s0 > 1 && s0 <= LAST) {
        if (s0 >= 2 && !tipo()) s0 = 1;
        if (s0 > 2 && !val("colonia")) s0 = 2;
        if (s0 > 1) go(s0, false);
      }
      if (backTo) setTimeout(function () { sec.scrollIntoView({ behavior: "auto", block: "start" }); }, 60);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
