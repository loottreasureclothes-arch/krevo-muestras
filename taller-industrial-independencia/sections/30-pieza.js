/* DE BARRA A PIEZA: estado, bancada animada, placa de golpe y mensaje de WhatsApp. */
(function () {
  "use strict";
  var TI = window.TI || (window.TI = {});
  var root = document.getElementById("ti-pz");
  if (!root) return;
  var KEY = "ti_pieza", WA = "524493207238";
  var OPS = { tornear: "tornear", fresar: "fresar", barrenar: "barrenar", plasma: "cortar con plasma", soldar: "soldar y armar" };
  var SHAPES = { barra: "barra redonda", lamina: "lámina o placa", maquina: "máquina a reparar" };
  var MATS = { acero: "acero", inox: "acero inoxidable", aluminio: "aluminio", bronce: "bronce", nose: "no sé" };
  var WHEN = { parada: "tengo una línea parada", semana: "esta semana", sinprisa: "sin prisa" };
  var S = { shape: "barra", touched: false, ops: [], mat: "", qty: "", trae: "", ajusta: false, when: "", nombre: "", mtipo: "", falla: "" };

  function $(id) { return document.getElementById(id); }
  var elRows = $("ti-plate-rows"), elCap = $("ti-bench-cap"), elWa = $("ti-pz-wa"), elWaT = $("ti-pz-wa-t"), elN6 = $("ti-n6");
  var stepsP = $("ti-steps-pieza"), stepsM = $("ti-steps-mant"), mant = $("ti-bench-mant");
  var nombre = $("ti-nombre"), falla = $("ti-falla"), ajusta = $("ti-ajusta");
  var fichas = root.querySelectorAll(".ti-ficha[data-set]");

  /* viruta: espirales de SVG (resorte visto de lado) */
  function coil(x0, y0, loops, k, a, b) {
    var d = "", t, n = Math.round(loops * 16);
    for (var i = 0; i <= n; i++) { t = (i / 16) * 2 * Math.PI; d += (i ? "L" : "M") + (x0 + k * t + a * Math.cos(t)).toFixed(1) + " " + (y0 + b * Math.sin(t)).toFixed(1) + " "; }
    return d;
  }
  var cT = $("chipT"), cF = $("chipF"), cB = $("chipB");
  if (cT) cT.setAttribute("d", coil(372, 193, 3.2, 3.6, 8, 9));
  if (cF) cF.setAttribute("d", coil(150, 197, 1.6, 3, 5, 6) + coil(190, 197, 1.6, 3, 5, 6) + coil(232, 197, 1.6, 3, 5, 6));
  if (cB) cB.setAttribute("d", coil(318, 196, 2, 2.4, 4.4, 7));

  function save() { try { sessionStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function load() {
    try { var o = JSON.parse(sessionStorage.getItem(KEY) || "null"); if (o && typeof o === "object") for (var k in S) if (o[k] !== undefined) S[k] = o[k]; } catch (e) {}
    if (!Array.isArray(S.ops)) S.ops = [];
  }
  function lc(t) { return t ? t.charAt(0).toLowerCase() + t.slice(1) : t; }
  function anything() { return !!(S.ops.length || S.mat || S.qty || S.trae || S.ajusta || S.when || S.nombre || S.mtipo || S.falla || S.touched); }

  function message() {
    var M = "Hola Taller Industrial Independencia", p = [];
    if (!anything()) return M + ", quiero cotizar un trabajo de maquinado.";
    if (S.shape === "maquina") {
      var t = S.mtipo === "preventivo" ? " preventivo" : S.mtipo === "correctivo" ? " correctivo" : "";
      p.push(M + ", necesito mantenimiento" + t + " para una máquina.");
      if (S.falla && S.falla.trim()) { var f = S.falla.trim().replace(/\s+/g, " "); p.push("Falla: " + (/[.!?]$/.test(f) ? f : f + ".")); }
    } else {
      p.push(M + ", quiero cotizar una pieza.");
      p.push("Sale de: " + SHAPES[S.shape] + ".");
      if (S.ops.length) p.push("Proceso: " + S.ops.map(function (o, i) { return "OP " + (i + 1) * 10 + " " + OPS[o]; }).join(", ") + ".");
      if (S.mat) p.push("Material: " + MATS[S.mat] + ".");
      if (S.qty) p.push("Cantidad: " + S.qty + ".");
      if (S.trae) p.push("Traigo: " + lc(S.trae) + ".");
      if (S.ajusta) p.push("Tiene que ajustar con otra pieza.");
    }
    if (S.when) p.push("Urgencia: " + WHEN[S.when] + ".");
    if (S.nombre && S.nombre.trim()) p.push("Mi nombre: " + S.nombre.trim() + ".");
    p.push("Les mando fotos por aquí.");
    return p.join(" ");
  }
  TI.pzMessage = message;
  function url() { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(message()); }

  function summary() {
    if (!anything()) return "";
    if (S.shape === "maquina") return "Tu pieza: máquina a reparar" + (S.mtipo && S.mtipo !== "No sé" ? ", mantenimiento " + S.mtipo : "") + (S.when ? ", " + WHEN[S.when] : "") + ".";
    var parts = [S.shape === "barra" ? "barra" : "lámina"];
    if (S.mat && S.mat !== "nose") parts[0] += " de " + MATS[S.mat];
    if (S.ops.length) { var o = S.ops.map(function (x) { return OPS[x]; }); parts.push(o.length > 1 ? o.slice(0, -1).join(", ") + " y " + o[o.length - 1] : o[0]); }
    if (S.qty) parts.push(S.qty);
    return "Tu pieza: " + parts.join(", ") + ".";
  }

  function row(k, v, cls) {
    var li = document.createElement("li"); if (cls) li.className = cls;
    var a = document.createElement("span"); a.className = "k"; a.textContent = k;
    var b = document.createElement("span"); b.className = "v ti-pun"; b.textContent = v || "por elegir";
    if (!v) li.classList.add("is-empty");
    li.appendChild(a); li.appendChild(b); return li;
  }
  function plate() {
    elRows.textContent = "";
    elRows.appendChild(row("Pieza", SHAPES[S.shape]));
    if (S.shape === "maquina") {
      elRows.appendChild(row("Manten.", S.mtipo));
      elRows.appendChild(row("Falla", S.falla && S.falla.trim() ? S.falla.trim().slice(0, 60) : ""));
    } else {
      if (S.ops.length) S.ops.forEach(function (o, i) { elRows.appendChild(row("OP " + (i + 1) * 10, OPS[o])); });
      else elRows.appendChild(row("OP 10", ""));
      elRows.appendChild(row("Material", S.mat ? MATS[S.mat] : ""));
      elRows.appendChild(row("Cantidad", S.qty));
      elRows.appendChild(row("Trae", S.trae));
      if (S.trae === "Plano") elRows.appendChild(row("Toleranc.", "las del plano"));
      if (S.ajusta) elRows.appendChild(row("Ajuste", "con otra pieza"));
    }
    elRows.appendChild(row("Urgencia", S.when ? WHEN[S.when] : "", S.when === "parada" ? "is-paro" : ""));
    if (S.nombre && S.nombre.trim()) elRows.appendChild(row("Nombre", S.nombre.trim().slice(0, 30)));
    var ps = elRows.querySelectorAll(".ti-pun"); for (var i = 0; i < ps.length; i++) TI.punzon(ps[i]);
  }

  function caption() {
    if (!elCap) return;
    if (S.shape === "maquina") { elCap.textContent = "Máquina a reparar" + (S.mtipo && S.mtipo !== "No sé" ? " · " + S.mtipo : ""); return; }
    var t = SHAPES[S.shape].split(" ")[0] === "barra" ? "Barra redonda" : "Lámina o placa";
    if (S.mat && S.mat !== "nose") t += " de " + MATS[S.mat];
    if (S.ops.length) t += " · " + S.ops.map(function (o) { return OPS[o]; }).join(", ");
    else t += ", sin tocar";
    elCap.textContent = t;
  }

  function render() {
    root.setAttribute("data-shape", S.shape === "maquina" ? "barra" : S.shape);
    root.setAttribute("data-mode", S.shape === "maquina" ? "maquina" : "pieza");
    root.setAttribute("data-ops", S.ops.join(" "));
    root.setAttribute("data-mat", S.mat === "nose" ? "" : S.mat);
    var maq = S.shape === "maquina";
    stepsP.hidden = maq; stepsM.hidden = !maq; mant.hidden = !maq;
    if (elN6) elN6.textContent = maq ? "04" : "06";
    var n = 0; Array.prototype.forEach.call(stepsM.querySelectorAll(".ti-n"), function (e, i) { e.textContent = "0" + (i + 2); });
    Array.prototype.forEach.call(fichas, function (b) {
      var k = b.getAttribute("data-set"), v = b.getAttribute("data-v"), on = false, dis = false;
      if (k === "shape") on = S.shape === v;
      else if (k === "op") { on = S.ops.indexOf(v) > -1; dis = (v === "tornear" && S.shape !== "barra") || (v === "plasma" && S.shape !== "lamina"); var tag = b.querySelector(".ti-op"); if (tag) tag.textContent = on ? "OP " + (S.ops.indexOf(v) + 1) * 10 : ""; }
      else on = S[k] === v;
      b.setAttribute("aria-pressed", on ? "true" : "false");
      if (k === "op") { if (dis) b.setAttribute("aria-disabled", "true"); else b.removeAttribute("aria-disabled"); }
    });
    if (nombre && nombre.value !== S.nombre) nombre.value = S.nombre;
    if (falla && falla.value !== S.falla) falla.value = S.falla;
    if (ajusta) ajusta.checked = !!S.ajusta;
    plate(); caption();
    var u = url(); elWa.href = u;
    elWaT.textContent = maq ? "Pedir mantenimiento por WhatsApp" : "Cotizar mi pieza por WhatsApp";
    var cw = $("ti-cierre-wa"); if (cw) { cw.href = u; }
    var cwt = $("ti-cierre-wa-t"); if (cwt) cwt.textContent = maq ? "Pedir mantenimiento por WhatsApp" : "Cotizar mi pieza por WhatsApp";
    var rs = $("ti-resumen"), rl = $("ti-resumen-link"), sm = summary();
    if (rs) { rs.textContent = sm; rs.hidden = !sm; }
    if (rl) rl.hidden = !!sm;
    save();
  }

  function animate(op) {
    if (TI.reduce) return;
    var c = "go-" + op; root.classList.remove(c); void root.getBoundingClientRect(); root.classList.add(c);
    setTimeout(function () { root.classList.remove(c); }, 950);
  }
  function setShape(sh) {
    if (!SHAPES[sh]) return;
    S.shape = sh; S.touched = true;
    S.ops = S.ops.filter(function (o) { return !(o === "tornear" && sh !== "barra") && !(o === "plasma" && sh !== "lamina"); });
    render();
  }
  TI.setShape = setShape;
  TI.setUrgencia = function (v) { S.when = v; render(); };

  root.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest(".ti-ficha[data-set]") : null;
    if (!b) return;
    var k = b.getAttribute("data-set"), v = b.getAttribute("data-v");
    if (k === "shape") { setShape(v); return; }
    if (k === "op") {
      if (b.getAttribute("aria-disabled") === "true") { b.classList.remove("ti-nope"); void b.offsetWidth; b.classList.add("ti-nope"); return; }
      var i = S.ops.indexOf(v);
      if (i > -1) S.ops.splice(i, 1); else { S.ops.push(v); render(); animate(v); return; }
      render(); return;
    }
    S[k] = S[k] === v ? "" : v;
    render();
  });
  if (ajusta) ajusta.addEventListener("change", function () { S.ajusta = ajusta.checked; render(); });
  if (nombre) nombre.addEventListener("input", function () { S.nombre = nombre.value; render(); });
  if (falla) falla.addEventListener("input", function () { S.falla = falla.value; render(); });

  load();
  /* sin elección guardada, la bancada arranca con la barra en bruto (sin JS se ve ya terminada) */
  render();
})();
