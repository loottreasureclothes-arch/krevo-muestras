/* Tu cuerpo habla: UNA frase en primera persona con cuatro huecos; esa frase es el mensaje de WhatsApp.
   El estado vive en memoria (nada de localStorage). Sin JS se ve la frase de ejemplo y el boton generico. */
(function () {
  "use strict";
  var sec = document.getElementById("frase");
  var live = document.getElementById("ks-live");
  if (!sec || !live) return;
  var WA = "524492426877";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var AREAS = [
    { id: "movimiento", word: "Movimiento", svc: "kinesiología, fisioterapia y quiropráctica" },
    { id: "salud", word: "Salud", svc: "masaje" },
    { id: "belleza", word: "Belleza", svc: "spa dermatofuncional" }
  ];
  var SKIP_M = { chip: "prefiero contarlo en la valoración", say: "algo que prefiero contar en la valoración", send: null };
  var MOTIVOS = {
    movimiento: [
      { chip: "un dolor de espalda baja", say: "un dolor de espalda baja", send: "un dolor de espalda baja" },
      { chip: "un dolor de cuello", say: "un dolor de cuello", send: "un dolor de cuello" },
      { chip: "la ciática", say: "la ciática", send: "la ciática" },
      { chip: "una lesión deportiva", say: "una lesión deportiva", send: "una lesión deportiva" },
      { chip: "un dolor muscular o articular", say: "un dolor muscular o articular", send: "un dolor muscular o articular" },
      { chip: "recuperar movilidad", say: "recuperar movilidad", send: "recuperar movilidad" },
      { chip: "un ajuste quiropráctico", say: "un ajuste quiropráctico", send: "un ajuste quiropráctico" },
      SKIP_M
    ],
    salud: [
      { chip: "la tensión y el estrés", sub: "masaje descontracturante", say: "la tensión y el estrés", send: "la tensión y el estrés" },
      { chip: "recuperarme después de correr", sub: "masaje terapéutico deportivo", say: "recuperarme después de correr", send: "recuperarme después de correr" },
      { chip: "un dolor de espalda en mi embarazo", say: "un dolor de espalda en mi embarazo", send: "un dolor de espalda en mi embarazo" },
      SKIP_M
    ],
    belleza: [
      { chip: "definir mi cintura sin cirugía", say: "definir mi cintura sin cirugía", send: "definir mi cintura sin cirugía" },
      { chip: "conocer el spa dermatofuncional", say: "conocer el spa dermatofuncional", send: "conocer el spa dermatofuncional" },
      SKIP_M
    ]
  };
  var TIEMPOS = [
    { chip: "unos días", say: "desde hace unos días", send: "desde hace unos días" },
    { chip: "unas semanas", say: "desde hace unas semanas", send: "desde hace unas semanas" },
    { chip: "varios meses", say: "desde hace varios meses", send: "desde hace varios meses" },
    { chip: "prefiero no decir", say: "sin decir desde cuándo", send: null }
  ];
  var TURNOS = [
    { chip: "entre semana, de 10 a 2", say: "entre semana, de 10 a 2", send: "entre semana, de 10 a 2" },
    { chip: "entre semana, de 4 a 9", say: "entre semana, de 4 a 9", send: "entre semana, de 4 a 9" },
    { chip: "el sábado, de 9 a 2", say: "el sábado, de 9 a 2", send: "el sábado, de 9 a 2" }
  ];
  var PH = { area: "tu área", motivo: "qué te trae", tiempo: "desde cuándo", turno: "tu turno" };
  var LBL = { area: "Elige tu área", motivo: "¿Qué te trae?", tiempo: "¿Desde cuándo?", turno: "¿Qué turno te acomoda?" };
  var ORDER = ["area", "motivo", "tiempo", "turno"];

  var state = { area: null, motivo: null, tiempo: null, turno: null, nombre: "" };
  var open = "area";
  var holes = {}, chipbox = document.getElementById("ks-chips"), chiprow = document.getElementById("ks-chiprow"), chipl = document.getElementById("ks-chips-l");
  var rails = sec.querySelectorAll(".ks-rails i"), progTxt = document.getElementById("ks-prog");
  var send = document.getElementById("ks-send"), name = document.getElementById("ks-name"), tWrap = sec.querySelector(".ks-t");
  Array.prototype.forEach.call(sec.querySelectorAll(".ks-hole"), function (h) { holes[h.getAttribute("data-h")] = h; h.setAttribute("data-ph", PH[h.getAttribute("data-h")]); });
  live.hidden = false;

  function areaObj() { return AREAS.filter(function (a) { return a.id === state.area; })[0] || null; }
  function activeKeys() { return state.area === "belleza" ? ["area", "motivo", "turno"] : ORDER; }
  function options(k) {
    if (k === "area") return AREAS.map(function (a) { return { chip: a.word, sub: a.svc, id: a.id }; });
    if (k === "motivo") return state.area ? MOTIVOS[state.area] : [];
    if (k === "tiempo") return TIEMPOS;
    return TURNOS;
  }
  function valueText(k) {
    var v = state[k];
    if (!v) return "";
    if (k === "area") return areaObj().svc;
    return v.say;
  }
  function message() {
    var a = areaObj(), parts = ["Hola Kinesthetics."];
    var nom = (state.nombre || "").replace(/\s+/g, " ").trim();
    if (!a && !state.motivo && !state.tiempo && !state.turno && !nom) return "Hola Kinesthetics, quiero agendar una valoración.";
    if (a) parts.push("Vengo por " + a.svc + ".");
    var m = state.motivo && state.motivo.send, t = state.area !== "belleza" && state.tiempo && state.tiempo.send;
    if (m && t) parts.push("Me trae " + m + ", " + t + ".");
    else if (m) parts.push("Me trae " + m + ".");
    else if (t) parts.push(t.charAt(0).toUpperCase() + t.slice(1) + ".");
    if (state.turno) parts.push("Me acomoda " + state.turno.send + ".");
    if (nom) parts.push("Me llamo " + nom + ".");
    parts.push("Quiero agendar mi valoración.");
    return parts.join(" ");
  }
  function sentence() {
    var a = areaObj(), out = [];
    if (!a && !state.motivo && !state.tiempo && !state.turno) return "";
    if (a) out.push("Vengo por " + a.svc + ".");
    if (state.motivo) out.push("Me trae " + state.motivo.say + (state.area !== "belleza" && state.tiempo ? ", " + state.tiempo.say : "") + ".");
    else if (state.area !== "belleza" && state.tiempo) out.push(state.tiempo.say.charAt(0).toUpperCase() + state.tiempo.say.slice(1) + ".");
    if (state.turno) out.push("Me acomoda " + state.turno.say + ".");
    var nom = (state.nombre || "").replace(/\s+/g, " ").trim();
    if (nom) out.push("Me llamo " + nom + ".");
    return out.join(" ");
  }
  function url() { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(message()); }

  function paint(changed) {
    var keys = activeKeys();
    Object.keys(holes).forEach(function (k) {
      var h = holes[k], txt = valueText(k);
      h.textContent = txt;
      h.classList.toggle("is-empty", !txt);
      h.classList.toggle("is-open", open === k);
      h.setAttribute("aria-expanded", open === k ? "true" : "false");
      if (changed === k && txt && !reduce) { h.classList.remove("is-swap"); void h.offsetWidth; h.classList.add("is-swap"); }
    });
    if (tWrap) tWrap.hidden = state.area === "belleza";
    var filled = keys.filter(function (k) { return !!state[k]; }).length, total = keys.length;
    Array.prototype.forEach.call(rails, function (r, i) { r.classList.toggle("is-off", i >= total); r.classList.toggle("is-on", i < filled); });
    progTxt.textContent = filled === total ? "Tu frase está lista." : filled + " de " + total;
    send.href = url();
    paintChips();
    emit();
  }
  function emit() {
    try { window.dispatchEvent(new CustomEvent("ks:frase", { detail: { sentence: sentence(), url: url() } })); } catch (e) { /* nada */ }
  }
  function paintChips() {
    if (!open) { chipbox.hidden = true; return; }
    chipbox.hidden = false;
    chipl.textContent = LBL[open];
    chiprow.innerHTML = "";
    options(open).forEach(function (o) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "ks-chip";
      var sel = state[open] && ((open === "area" && state.area === o.id) || (open !== "area" && state[open] === o));
      b.setAttribute("aria-pressed", sel ? "true" : "false");
      b.innerHTML = open === "area" ? "<b></b><small></small>" : (o.sub ? "<span></span><small></small>" : "<span></span>");
      var kids = b.children;
      kids[0].textContent = o.chip;
      if (kids[1]) kids[1].textContent = o.sub;
      b.addEventListener("click", function () { choose(open, o); });
      chiprow.appendChild(b);
    });
  }
  function nextEmpty() {
    var keys = activeKeys();
    for (var i = 0; i < keys.length; i++) if (!state[keys[i]]) return keys[i];
    return null;
  }
  function setArea(id) {
    if (state.area !== id) {
      state.area = id;
      if (state.motivo && MOTIVOS[id].indexOf(state.motivo) < 0) state.motivo = null;
    }
  }
  function choose(k, o) {
    if (k === "area") setArea(o.id); else state[k] = o;
    open = nextEmpty();
    paint(k);
  }
  function openHole(k) {
    if (k !== "area" && !state.area) k = "area";
    open = (open === k) ? null : k;
    paint();
  }
  Object.keys(holes).forEach(function (k) {
    var h = holes[k];
    h.addEventListener("click", function () { openHole(k); });
    h.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openHole(k); } });
  });
  name.addEventListener("input", function () {
    state.nombre = name.value;
    name.style.width = Math.max(7.5, Math.min(24, name.value.length * 0.95 + 2)) + "ch";
    send.href = url();
    emit();
  });
  /* El lema del header y los links "Agendar por aqui" dejan el area preelegida */
  window.addEventListener("ks:area", function (e) {
    var id = e.detail && e.detail.area;
    if (!id) return;
    setArea(id);
    open = nextEmpty();
    paint("area");
  });
  if (window.KS && window.KS.area) setArea(window.KS.area);
  open = nextEmpty();
  paint();
  window.KSFrase = { state: state, message: message, url: url, sentence: sentence };
})();
