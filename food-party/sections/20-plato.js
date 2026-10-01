(function () {
  "use strict";
  var fila = document.getElementById("fp-fila");
  if (!fila) return;
  var S = FP.S, cards = Array.prototype.slice.call(fila.querySelectorAll(".fp-ch"));
  var por = Array.prototype.slice.call(document.querySelectorAll(".fp-por"));
  var servir = document.getElementById("fp-servir"), txt = document.getElementById("fp-plato-txt");
  var prop = document.getElementById("fp-prop"), veg = document.getElementById("fp-veg"), propL = document.getElementById("fp-plato-prop");
  var chips = Array.prototype.slice.call(document.querySelectorAll(".fp-chip"));
  var otro = document.getElementById("fp-otro"), colonia = document.getElementById("fp-colonia"), nombre = document.getElementById("fp-nombre");
  var fechaC = document.getElementById("fp-fecha-c"), invN = document.getElementById("fp-inv-n"), invM = document.getElementById("fp-inv-m"), invP = document.getElementById("fp-inv-p");
  var waBtn = document.getElementById("fp-com-wa");
  var prev = document.getElementById("fp-prev"), next = document.getElementById("fp-next");
  var center = 0;
  function byId(id) { for (var i = 0; i < FP.PLATOS.length; i++) if (FP.PLATOS[i].id === id) return i; return -1; }

  /* ---- charola que está al centro de la fila ---- */
  function findCenter() {
    var r = fila.getBoundingClientRect(), cx = r.left + r.width / 2, best = 0, bd = 1e9;
    cards.forEach(function (c, i) { var b = c.getBoundingClientRect(), d = Math.abs(b.left + b.width / 2 - cx); if (d < bd) { bd = d; best = i; } });
    return best;
  }
  var raf = null;
  function onScroll() { if (raf) return; raf = requestAnimationFrame(function () { raf = null; var c = findCenter(); if (c !== center) { center = c; render(); } navState(); }); }
  function navState() { if (prev) prev.disabled = findCenter() === 0; if (next) next.disabled = findCenter() === cards.length - 1; }
  fila.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  function centrar(i, smooth) {
    var c = cards[i]; if (!c) return;
    var left = c.offsetLeft - (fila.clientWidth - c.offsetWidth) / 2;
    fila.scrollTo({ left: left, behavior: smooth && !FP.reduce ? "smooth" : "auto" });
  }
  if (prev) prev.addEventListener("click", function () { centrar(Math.max(0, findCenter() - 1), true); });
  if (next) next.addEventListener("click", function () { centrar(Math.min(cards.length - 1, findCenter() + 1), true); });

  /* ---- servir / quitar ---- */
  function toggle(i) {
    var id = FP.PLATOS[i].id, a = S.plato.slice(), k = a.indexOf(id);
    if (k > -1) a.splice(k, 1); else a.push(id);
    /* mantener el orden de la fila */
    a.sort(function (x, y) { return byId(x) - byId(y); });
    FP.set({ plato: a });
  }
  cards.forEach(function (c, i) {
    var b = c.querySelector(".fp-ch-b");
    b.addEventListener("click", function () { if (i !== findCenter()) centrar(i, true); toggle(i); });
  });
  servir.addEventListener("click", function () { toggle(findCenter()); });
  por.forEach(function (p) { p.addEventListener("click", function () { toggle(byId(p.getAttribute("data-id"))); }); });
  prop.addEventListener("change", function () { FP.set({ propuesta: prop.checked }); });
  veg.addEventListener("change", function () { FP.set({ veg: veg.checked }); });

  /* ---- comanda ---- */
  chips.forEach(function (ch) {
    ch.addEventListener("click", function () {
      var g = ch.getAttribute("data-g"), v = ch.getAttribute("data-v"), p = {};
      p[g] = S[g] === v ? "" : v; FP.set(p);
    });
  });
  otro.addEventListener("input", function () { FP.set({ otro: otro.value }) });
  colonia.addEventListener("input", function () { FP.set({ colonia: colonia.value }) });
  nombre.addEventListener("input", function () { FP.set({ nombre: nombre.value }) });
  fechaC.min = FP.hoyISO();
  fechaC.addEventListener("change", function () { FP.set({ fecha: fechaC.value || "" }); });
  function step(d) {
    var n = S.invitados || 0; n = Math.max(0, Math.min(300, n + d * 10)); FP.set({ invitados: n });
  }
  [[invM, -1], [invP, 1]].forEach(function (pair) {
    var b = pair[0], d = pair[1], t = null, iv = null, held = false;
    function stop() { clearTimeout(t); clearInterval(iv); }
    b.addEventListener("pointerdown", function () { held = false; stop(); t = setTimeout(function () { held = true; iv = setInterval(function () { step(d); }, 90); }, 450); });
    ["pointerup", "pointerleave", "pointercancel"].forEach(function (ev) { b.addEventListener(ev, stop); });
    b.addEventListener("click", function () { if (held) { held = false; return; } step(d); });
  });

  function refreshWa() { waBtn.href = FP.waUrl(FP.msgBuffet()); }
  function render() {
    cards.forEach(function (c, i) {
      var id = FP.PLATOS[i].id, en = S.plato.indexOf(id) > -1, was = c.classList.contains("is-en");
      c.classList.toggle("is-center", i === center);
      c.classList.toggle("is-en", en);
      c.querySelector(".fp-ch-b").setAttribute("aria-pressed", en ? "true" : "false");
      var t = c.querySelector(".fp-let-t"), nuevo = en ? "En tu plato" : FP.PLATOS[i].letrero;
      if (t.textContent !== nuevo) {
        t.textContent = nuevo;
        if (en !== was && !FP.reduce) { var l = c.querySelector(".fp-let"); l.classList.remove("flip"); void l.offsetWidth; l.classList.add("flip"); }
      }
    });
    por.forEach(function (p) { p.classList.toggle("on", S.plato.indexOf(p.getAttribute("data-id")) > -1); var on = p.classList.contains("on"); p.tabIndex = on ? 0 : -1; if (on) p.removeAttribute("aria-hidden"); else p.setAttribute("aria-hidden", "true"); });
    var cid = FP.PLATOS[center].id, enC = S.plato.indexOf(cid) > -1;
    servir.textContent = enC ? "Quitar" : "Servir";
    servir.setAttribute("aria-label", (enC ? "Quitar " : "Servir ") + FP.PLATOS[center].nombre);
    if (S.plato.length) { txt.innerHTML = "En tu plato: <b></b>."; txt.querySelector("b").textContent = FP.platosTxt(); }
    else txt.textContent = S.propuesta ? "Food Party te propone el menú." : "Toca una charola para servirte.";
    prop.checked = !!S.propuesta; veg.checked = !!S.veg; propL.hidden = !S.propuesta;
    chips.forEach(function (ch) { ch.setAttribute("aria-checked", S[ch.getAttribute("data-g")] === ch.getAttribute("data-v") ? "true" : "false"); });
    otro.hidden = S.evento !== "Otro"; if (otro.value !== S.otro) otro.value = S.otro;
    if (colonia.value !== S.colonia) colonia.value = S.colonia;
    if (nombre.value !== S.nombre) nombre.value = S.nombre;
    if (fechaC.value !== (S.fecha || "")) fechaC.value = S.fecha || "";
    var n = S.invitados;
    invN.textContent = !n ? "Elige" : (n >= 300 ? "300 o más" : String(n));
    invN.classList.toggle("is-vacio", !n);
    invM.disabled = !n; invM.style.opacity = n ? 1 : .35; invP.disabled = n >= 300; invP.style.opacity = n >= 300 ? .35 : 1;
    refreshWa();
  }
  FP.on(render);
  render();
  /* arranca con la primera charola al centro */
  var ini = window.matchMedia && window.matchMedia("(min-width: 760px)").matches ? 2 : 0;
  centrar(ini, false); center = ini; render(); navState();
  window.addEventListener("load", function () { centrar(findCenter(), false); center = findCenter(); render(); });
})();
