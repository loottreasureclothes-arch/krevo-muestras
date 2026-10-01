/* La pirámide de lo que buscas: bloques tocables → ficha → para quién → lista que se escribe sola → WhatsApp. */
(function () {
  "use strict";
  var KEY = "masco_lista";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var LAB = { alimento: "alimento", accesorios: "accesorios", peces: "peces y acuarios", exoticos: "animales exóticos", aves: "aves", vacunas: "vacunas y consultas", estetica: "estética", otra: "otra cosa" };
  var ORD = ["alimento", "accesorios", "peces", "exoticos", "aves", "vacunas", "estetica", "otra"];
  var PARA = { perro: "mi perro", gato: "mi gato", pez: "mi pez", ave: "mi ave", exotico: "mi mascota exótica" };
  var PARA_LISTA = { perro: "perro", gato: "gato", pez: "pez", ave: "ave", exotico: "exótico" };
  var S = { b: [], para: "", paraOtro: "", otra: "", nombre: "", open: "alimento" };
  try { var raw = JSON.parse(sessionStorage.getItem(KEY) || "null"); if (raw && typeof raw === "object") { for (var k in S) if (raw[k] !== undefined) S[k] = raw[k]; if (!Array.isArray(S.b)) S.b = []; } } catch (e) {}
  function save() { try { sessionStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function join(a) { return a.length < 2 ? a.join("") : a.slice(0, -1).join(", ") + " y " + a[a.length - 1]; }
  function busco() {
    var items = [];
    ORD.forEach(function (id) {
      if (S.b.indexOf(id) < 0) return;
      items.push(id === "otra" && S.otra.trim() ? S.otra.trim() : LAB[id]);
    });
    return join(items);
  }
  function paraMsg() { if (S.para === "otro") return S.paraOtro.trim() ? "mi " + S.paraOtro.trim() : "mi mascota"; return PARA[S.para] || ""; }
  function paraLista() { if (S.para === "otro") return S.paraOtro.trim() || "otro"; return PARA_LISTA[S.para] || ""; }
  function msg() {
    var b = busco(), p = paraMsg(), n = (S.nombre || "").trim(), m = "Hola Mascotitlán, ";
    if (b) { m += "busco " + b + "."; if (p) m += " Es para " + p + "."; }
    else if (p) m += "quiero preguntar por algo para " + p + ".";
    else m += "quiero preguntar por algo para mi mascota.";
    if (n) m += " Mi nombre: " + n;
    return m;
  }
  var listeners = [];
  window.MascoLista = {
    get: function () { return { busco: busco(), para: paraLista(), nombre: (S.nombre || "").trim(), msg: msg(), hay: !!(S.b.length || S.para) }; },
    url: function () { return window.MascoWa ? window.MascoWa(msg()) : "https://wa.me/524495666644?text=" + encodeURIComponent(msg()); },
    on: function (cb) { listeners.push(cb); },
    marca: function (id) { if (LAB[id] && S.b.indexOf(id) < 0) S.b.push(id); S.open = id; render(); }
  };
  function emit() { listeners.forEach(function (cb) { try { cb(); } catch (e) {} }); try { window.dispatchEvent(new CustomEvent("masco:lista")); } catch (e) {} }

  var root = document.getElementById("piramide");
  if (!root) return;
  var blocks = root.querySelectorAll(".bloque"), chips = root.querySelectorAll(".chip"), fichas = root.querySelectorAll(".ficha-i");
  var lBusco = document.getElementById("l-busco"), lPara = document.getElementById("l-para");
  var inNombre = document.getElementById("nombre"), inOtra = document.getElementById("otra-txt"), inParaOtro = document.getElementById("para-otro");
  var wa = document.getElementById("pir-wa");

  function typeTo(el, text) {
    var prev = el.getAttribute("data-full") || "";
    if (prev === text) return;
    el.setAttribute("data-full", text);
    var tok = (el._t = (el._t || 0) + 1);
    if (reduce || !text) { el.textContent = text; el.classList.remove("typing"); return; }
    var i = (prev && text.indexOf(prev) === 0) ? prev.length : 0;
    el.textContent = text.slice(0, i); el.classList.add("typing");
    (function step() {
      if (el._t !== tok) return;
      i++; el.textContent = text.slice(0, i);
      if (i < text.length) setTimeout(step, 20); else el.classList.remove("typing");
    })();
  }

  function render(opts) {
    opts = opts || {};
    Array.prototype.forEach.call(blocks, function (b) {
      var id = b.getAttribute("data-b"), on = S.b.indexOf(id) >= 0;
      b.classList.toggle("is-on", on); b.classList.toggle("is-open", S.open === id);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    Array.prototype.forEach.call(chips, function (c) {
      var on = S.para === c.getAttribute("data-p");
      c.setAttribute("aria-pressed", on ? "true" : "false");
    });
    if (inParaOtro) inParaOtro.hidden = S.para !== "otro";
    Array.prototype.forEach.call(fichas, function (f) {
      var show = f.getAttribute("data-f") === S.open;
      if (show && f.hidden) { f.hidden = false; if (!reduce) { f.classList.remove("entra"); void f.offsetWidth; f.classList.add("entra"); } }
      else if (!show) f.hidden = true;
    });
    typeTo(lBusco, busco());
    typeTo(lPara, paraLista());
    if (document.activeElement !== inNombre && inNombre.value !== (S.nombre || "")) inNombre.value = S.nombre || "";
    if (inOtra && document.activeElement !== inOtra && inOtra.value !== S.otra) inOtra.value = S.otra;
    if (inParaOtro && document.activeElement !== inParaOtro && inParaOtro.value !== S.paraOtro) inParaOtro.value = S.paraOtro;
    wa.href = window.MascoLista.url();
    save();
    if (!opts.quiet) emit();
  }

  Array.prototype.forEach.call(blocks, function (b) {
    b.addEventListener("click", function () {
      var id = b.getAttribute("data-b"), i = S.b.indexOf(id);
      if (i >= 0) S.b.splice(i, 1); else S.b.push(id);
      S.open = id;
      render();
      if (!reduce) { b.classList.remove("salta"); void b.offsetWidth; b.classList.add("salta"); }
      if (id === "otra" && S.b.indexOf("otra") >= 0 && inOtra) setTimeout(function () { try { inOtra.focus({ preventScroll: true }); } catch (e) {} }, 50);
    });
  });
  Array.prototype.forEach.call(chips, function (c) {
    c.addEventListener("click", function () {
      var p = c.getAttribute("data-p");
      S.para = S.para === p ? "" : p;
      render();
      if (S.para === "otro" && inParaOtro) setTimeout(function () { try { inParaOtro.focus({ preventScroll: true }); } catch (e) {} }, 50);
    });
  });
  inNombre.addEventListener("input", function () { S.nombre = inNombre.value; render(); });
  if (inOtra) inOtra.addEventListener("input", function () { S.otra = inOtra.value; if (S.b.indexOf("otra") < 0 && S.otra.trim()) S.b.push("otra"); render(); });
  if (inParaOtro) inParaOtro.addEventListener("input", function () { S.paraOtro = inParaOtro.value; render(); });
  function syncHref() { wa.href = window.MascoLista.url(); }
  wa.addEventListener("pointerdown", syncHref); wa.addEventListener("click", syncHref);
  render({ quiet: true });
  emit();
})();
