/* ¿Que grado le toca? Edad cumplida al 31 de diciembre del año en que inicia el ciclo (regla general de la SEP). */
(function () {
  "use strict";
  var CICLO = 2026, MAX = 4;
  var KEY = "cepia_grado";
  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  var form = document.getElementById("cp-gform");
  if (!form) return;
  var kidsEl = document.getElementById("cp-kids"), addBtn = document.getElementById("cp-add"), outEl = document.getElementById("cp-out"), outSr = document.getElementById("cp-out-sr");
  var nombre = document.getElementById("cp-nombre"), wa = document.getElementById("cp-g-wa");
  var det = document.querySelector(".cp-edades");
  if (det && window.innerWidth < 760) det.removeAttribute("open");

  function gradoPorEdad(edad) {
    if (edad < 3) return { ok: true, label: "Inicial" };
    if (edad <= 5) return { ok: true, label: (edad - 2) + "° de preescolar" };
    if (edad <= 11) return { ok: true, label: (edad - 5) + "° de primaria" };
    if (edad <= 14) return { ok: true, label: (edad - 11) + "° de secundaria" };
    return { ok: false, label: "" };
  }
  /* d, m, y numericos (m de 1 a 12). Devuelve {estado, label, edad} */
  function calc(d, m, y, hoy) {
    if (!d || !m || !y) return { estado: "falta" };
    var dt = new Date(y, m - 1, d);
    if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d) return { estado: "invalida" };
    var t = CP.mx(hoy || CP.now());
    if (dt > new Date(t.y, t.m - 1, t.d)) return { estado: "futura" };
    var edad = CICLO - y;
    var g = gradoPorEdad(edad);
    if (!g.ok) return { estado: "termino", edad: edad };
    return { estado: "ok", label: g.label, edad: edad };
  }
  window.CPGrado = { calc: calc, gradoPorEdad: gradoPorEdad };

  function opt(v, t) { var o = document.createElement("option"); o.value = v; o.textContent = t; return o; }
  function makeKid(i) {
    var fs = document.createElement("fieldset");
    fs.className = "cp-kid";
    var lg = document.createElement("legend"); lg.className = "cp-sr"; fs.appendChild(lg);
    var h = document.createElement("div"); h.className = "cp-kid-h";
    var b = document.createElement("b"); h.appendChild(b);
    var x = document.createElement("button"); x.type = "button"; x.className = "cp-kid-x"; x.setAttribute("aria-label", "Quitar a este hijo");
    x.innerHTML = '<svg aria-hidden="true"><use href="#i-x"/></svg>'; h.appendChild(x); fs.appendChild(h);
    var f = document.createElement("div"); f.className = "cp-kid-f";
    var sd = document.createElement("select"); sd.setAttribute("data-f", "d"); sd.appendChild(opt("", "Día"));
    for (var d = 1; d <= 31; d++) sd.appendChild(opt(d, d));
    var sm = document.createElement("select"); sm.setAttribute("data-f", "m"); sm.appendChild(opt("", "Mes"));
    MESES.forEach(function (n, k) { sm.appendChild(opt(k + 1, n)); });
    var sy = document.createElement("select"); sy.setAttribute("data-f", "y"); sy.appendChild(opt("", "Año"));
    for (var y = CICLO; y >= CICLO - 20; y--) sy.appendChild(opt(y, y));
    [sd, sm, sy].forEach(function (s) { var w = document.createElement("label"); w.className = "cp-sel"; w.appendChild(s); f.appendChild(w); });
    fs.appendChild(f);
    return fs;
  }
  function kids() { return Array.prototype.slice.call(kidsEl.querySelectorAll(".cp-kid")); }
  function renumber() {
    var ks = kids();
    ks.forEach(function (k, i) {
      k.querySelector(".cp-kid-h b").textContent = "Hijo " + (i + 1);
      k.querySelector("legend").textContent = "Hijo " + (i + 1) + ", fecha de nacimiento";
      var sel = k.querySelectorAll("select"), nm = ["Día", "Mes", "Año"];
      for (var j = 0; j < 3; j++) sel[j].setAttribute("aria-label", nm[j] + " de nacimiento, hijo " + (i + 1));
      k.querySelector(".cp-kid-x").hidden = ks.length < 2;
    });
    addBtn.hidden = ks.length >= MAX;
  }
  function read() {
    return kids().map(function (k) {
      var g = function (n) { return +k.querySelector('[data-f="' + n + '"]').value || 0; };
      return calc(g("d"), g("m"), g("y"));
    });
  }
  function join(list) {
    if (list.length < 2) return list.join("");
    return list.slice(0, -1).join(", ") + " y " + list[list.length - 1];
  }
  /* "3° de primaria" dos veces pasa a "2 hijos en 3° de primaria" */
  function group(list) {
    var order = [], count = {};
    list.forEach(function (l) { if (!count[l]) { count[l] = 0; order.push(l); } count[l]++; });
    return order.map(function (l) { return count[l] > 1 ? count[l] + " hijos en " + l : l; });
  }
  window.CPGrado = { calc: calc, gradoPorEdad: gradoPorEdad, group: group };
  function message(res) {
    var labels = group(res.filter(function (r) { return r.estado === "ok"; }).map(function (r) { return r.label; }));
    var msg = "Hola Colegio CEPIA, quiero informes " + (labels.length ? "para " + join(labels) + ", " : "para ") + "ciclo 2026-2027. ¿Cuándo puedo conocer el colegio?";
    if (!labels.length) msg = "Hola Colegio CEPIA, quiero informes para el ciclo 2026-2027. ¿Cuándo puedo conocer el colegio?";
    var n = (nombre.value || "").trim();
    if (n) msg += " Mi nombre: " + n;
    return msg;
  }
  function textOut(res) {
    var multi = res.length > 1;
    if (!multi) {
      var r = res[0];
      if (r.estado === "ok") return { t: "En el ciclo 2026-2027 le toca " + r.label + ".", idle: false };
      if (r.estado === "termino") return { t: "Ya terminó la secundaria: no es con nosotros.", idle: false };
      if (r.estado === "futura") return { t: "Esa fecha todavía no llega. Revísala.", idle: true };
      if (r.estado === "invalida") return { t: "Ese día no existe en ese mes. Revísalo.", idle: true };
      return { t: "Elige día, mes y año.", idle: true };
    }
    if (res.every(function (r) { return r.estado === "falta"; })) return { t: "Elige día, mes y año de cada hijo.", idle: true };
    var lines = ["Ciclo 2026-2027:"];
    res.forEach(function (r, i) {
      var n = "Hijo " + (i + 1) + ": ";
      if (r.estado === "ok") lines.push(n + r.label + ".");
      else if (r.estado === "termino") lines.push(n + "ya terminó la secundaria.");
      else if (r.estado === "futura") lines.push(n + "esa fecha todavía no llega.");
      else if (r.estado === "invalida") lines.push(n + "ese día no existe.");
      else lines.push(n + "falta la fecha.");
    });
    return { t: lines.join("\n"), idle: false };
  }
  var last = "";
  function refresh(animate) {
    var res = read();
    var o = textOut(res);
    wa.href = CP.waUrl(message(res));
    if (o.t !== last) {
      last = o.t;
      outEl.classList.toggle("is-idle", o.idle);
      if (animate && !o.idle) CP.chalk(outEl, o.t); else { clearTimeout(outEl._ct); outEl.classList.remove("is-writing"); outEl.textContent = o.t; }
      outSr.textContent = o.t.replace(/\n/g, " ");
    }
    try {
      var oks = res.filter(function (r) { return r.estado === "ok"; }).map(function (r) { return r.label; });
      if (oks.length) localStorage.setItem(KEY, JSON.stringify({ grados: oks, kids: kids().map(function (k) { return [+k.querySelector('[data-f="d"]').value || 0, +k.querySelector('[data-f="m"]').value || 0, +k.querySelector('[data-f="y"]').value || 0]; }) }));
    } catch (e) {}
    window.dispatchEvent(new CustomEvent("cepia:grado", { detail: res }));
  }
  var saved = null;
  try { saved = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) {}
  var nk = saved && saved.kids && saved.kids.length ? Math.min(MAX, saved.kids.length) : 1;
  for (var q = 0; q < nk; q++) {
    var kk = makeKid(q); kidsEl.appendChild(kk);
    if (saved && saved.kids && saved.kids[q]) {
      var sv = saved.kids[q], ss = kk.querySelectorAll("select");
      for (var z = 0; z < 3; z++) if (sv[z]) ss[z].value = String(sv[z]);
    }
  }
  renumber();
  form.addEventListener("change", function () { refresh(true); });
  form.addEventListener("input", function (e) { if (e.target === nombre) refresh(false); });
  form.addEventListener("submit", function (e) { e.preventDefault(); });
  addBtn.addEventListener("click", function () {
    if (kids().length >= MAX) return;
    var k = makeKid(kids().length); kidsEl.appendChild(k); renumber(); refresh(false);
    var s = k.querySelector("select"); if (s) s.focus();
  });
  kidsEl.addEventListener("click", function (e) {
    var x = e.target.closest ? e.target.closest(".cp-kid-x") : null;
    if (!x) return;
    var k = x.closest(".cp-kid"); k.parentNode.removeChild(k); renumber(); refresh(false);
    addBtn.focus();
  });
  CP.bindWa(wa, function () { return message(read()); });
  refresh(false);
})();
