/* ARMA TU PINTA: zonas y etiquetas tocables, fichas, nota que se escribe sola. Estado en MZ (sessionStorage). */
(function () {
  "use strict";
  var MZ = window.MZ; if (!MZ) return;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var sec = document.getElementById("pinta"); if (!sec) return;
  var btns = sec.querySelectorAll("[data-z]"); // zonas, etiquetas, pines y cordones
  var numStep = document.getElementById("pz-num"), sucStep = document.getElementById("pz-suc");
  var nameIn = document.getElementById("pz-name"), sr = document.getElementById("pz-sr");
  var rows = {}; Array.prototype.forEach.call(sec.querySelectorAll(".pz-row"), function (r) { rows[r.getAttribute("data-row")] = r; });
  var first = true, srT = null;

  /* escribe el renglón de a poco; reduced-motion o primera pintura: de golpe */
  function typeTo(el, text) {
    if (el._v === text) return; el._v = text;
    if (el._t) { clearTimeout(el._t); el._t = null; }
    if (reduce || first || !text) { el.textContent = text; el.classList.remove("is-typing"); return; }
    var i = 0, n = text.length, step = Math.max(1, Math.ceil(n / 28));
    el.classList.add("is-typing"); el.textContent = "";
    (function tick() { i = Math.min(n, i + step); el.textContent = text.slice(0, i); if (i < n) el._t = setTimeout(tick, 18); else { el.classList.remove("is-typing"); el._t = null; } })();
  }

  function render() {
    var st = MZ.get(), L = MZ.lines(), botas = MZ.has("botas");
    Array.prototype.forEach.call(btns, function (b) {
      var z = b.getAttribute("data-z"), on = MZ.has(z);
      if (b.tagName === "BUTTON" && !b.hasAttribute("data-num") && !b.hasAttribute("data-suc")) b.setAttribute("aria-pressed", on ? "true" : "false");
      if (b.tagName === "I" || b.tagName === "line") b.classList.toggle("is-on", on);
    });
    if (numStep) numStep.hidden = !botas;
    if (rows.num) rows.num.hidden = !botas;
    Array.prototype.forEach.call(sec.querySelectorAll("[data-num]"), function (c) { c.setAttribute("aria-pressed", st.num === c.getAttribute("data-num") ? "true" : "false"); });
    Array.prototype.forEach.call(sec.querySelectorAll("[data-suc]"), function (c) { c.setAttribute("aria-pressed", st.suc === c.getAttribute("data-suc") ? "true" : "false"); });
    typeTo(rows.busco.querySelector(".pz-typed"), L.busco);
    rows.busco.classList.toggle("is-empty", !L.busco);
    typeTo(rows.num.querySelector(".pz-typed"), L.num);
    typeTo(rows.suc.querySelector(".pz-typed"), L.suc);
    if (nameIn && document.activeElement !== nameIn && nameIn.value !== st.name) nameIn.value = st.name;
    clearTimeout(srT); srT = setTimeout(function () { if (sr) sr.textContent = MZ.empty() ? "" : "Nota: " + MZ.message(); }, 500);
    first = false;
  }

  sec.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("button") : null; if (!t) return;
    var z = t.getAttribute("data-z");
    if (z && (t.classList.contains("pz-zone") || t.classList.contains("pz-tag"))) { MZ.toggle(z); return; }
    var num = t.getAttribute("data-num");
    if (num) { MZ.set("num", MZ.get().num === num ? "" : num); return; }
    var suc = t.getAttribute("data-suc");
    if (suc) { MZ.set("suc", MZ.get().suc === suc ? "" : suc); return; }
  });
  if (nameIn) nameIn.addEventListener("input", function () {
    MZ.setQuiet("name", nameIn.value.slice(0, 40));
    var a = document.querySelectorAll("[data-wa-pinta]"); for (var i = 0; i < a.length; i++) a[i].href = MZ.waUrl();
    try { window.dispatchEvent(new Event("mz-name")); } catch (e) {}
  });
  MZ.on(render);
  render();
})();
