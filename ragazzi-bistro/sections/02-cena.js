/* La cena en cuatro tiempos: escoge un platillo por tiempo, sucursal, personas, día y hora; arma el WhatsApp. */
(function () {
  "use strict";
  var cn = document.getElementById("cn"); if (!cn) return;
  var $ = function (s) { return cn.querySelector(s); };
  var DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  var DS = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
  var MES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  var MS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  var st = { suc: "centro", pax: 2, dia: 0, hora: null, picks: {} };

  function mx() {
    try {
      var p = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Mexico_City", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date()), o = {};
      p.forEach(function (x) { o[x.type] = x.value; });
      return { y: +o.year, m: +o.month - 1, d: +o.day, min: (+o.hour % 24) * 60 + (+o.minute) };
    } catch (e) { var n = new Date(); return { y: n.getFullYear(), m: n.getMonth(), d: n.getDate(), min: n.getHours() * 60 + n.getMinutes() }; }
  }
  var now = mx();
  function fecha(off) { var d = new Date(Date.UTC(now.y, now.m, now.d + off)); return { dow: d.getUTCDay(), d: d.getUTCDate(), m: d.getUTCMonth() }; }
  function horario(suc, dow) { /* [abre, última mesa] en minutos; última mesa = cierre menos 1 h */
    if (dow === 0) return suc === "centro" ? [840, 1110 - 60] : [810, 1200 - 60];
    return [840, 1380 - 60];
  }
  function fmt(min) { var h = Math.floor(min / 60), m = min % 60, s = h >= 12 ? "pm" : "am", h12 = h % 12 || 12; return h12 + ":" + (m < 10 ? "0" : "") + m + " " + s; }
  function slots(suc, off) {
    var f = fecha(off), h = horario(suc, f.dow), out = [];
    for (var t = h[0]; t <= h[1]; t += 30) { if (off === 0 && t < now.min + 30) continue; out.push(t); }
    return out;
  }
  function diasValidos() { var out = []; for (var i = 0; i < 8; i++) if (slots(st.suc, i).length) out.push(i); return out; }
  function lblDia(off) {
    var f = fecha(off), base = DS[f.dow] + " " + f.d + " " + MS[f.m];
    return off === 0 ? "Hoy · " + base : off === 1 ? "Mañana · " + base : base;
  }
  function textoDia(off) {
    var f = fecha(off);
    return off === 0 ? "hoy" : off === 1 ? "mañana" : "el " + DIAS[f.dow] + " " + f.d + " de " + MES[f.m];
  }

  var selD = $("#cn-dia"), selH = $("#cn-hora");
  function pintaDias() {
    var v = diasValidos(); if (v.indexOf(st.dia) < 0) st.dia = v[0] || 0;
    selD.innerHTML = v.map(function (o) { return '<option value="' + o + '"' + (o === st.dia ? " selected" : "") + ">" + lblDia(o) + "</option>"; }).join("");
    pintaHoras();
  }
  function pintaHoras() {
    var s = slots(st.suc, st.dia); if (s.indexOf(st.hora) < 0) st.hora = s.indexOf(1200) >= 0 ? 1200 : s[0];
    selH.innerHTML = s.map(function (t) { return '<option value="' + t + '"' + (t === st.hora ? " selected" : "") + ">" + fmt(t) + "</option>"; }).join("");
    actualiza();
  }
  var ROM = ["I", "II", "III", "IV"];
  function lista() {
    var ol = $("#cn-list"), h = "", n = 0, cs = cn.querySelectorAll(".cn-course");
    for (var i = 0; i < cs.length; i++) { var k = cs[i].getAttribute("data-course"); if (st.picks[k]) { h += "<li><i>" + ROM[i] + "</i><span>" + st.picks[k] + "</span></li>"; n++; } }
    ol.innerHTML = n ? h : '<li class="cn-empty">Aún sin platillos. También puedes reservar sin escoger.</li>';
  }
  function mensaje() {
    var nm = window.RZ.NOM[st.suc], p = st.pax;
    var m = "Hola Ragazzi, quiero reservar en " + nm + " para " + p + (p === 1 ? " persona" : " personas") + ", " + textoDia(st.dia) + " a las " + fmt(st.hora) + ".";
    var cs = cn.querySelectorAll(".cn-course"), a = [];
    for (var i = 0; i < cs.length; i++) { var k = cs[i].getAttribute("data-course"); if (st.picks[k]) a.push(st.picks[k]); }
    if (a.length) m += " Cenamos: " + a.join(", ") + ".";
    return m + " ¿Me confirman por favor?";
  }
  function actualiza() { lista(); $("#cn-go").href = window.RZ.waUrl(mensaje(), st.suc); $("#pax-n").textContent = st.pax; }

  cn.addEventListener("click", function (e) {
    var c = e.target.closest(".cn-card");
    if (c) {
      var f = c.closest(".cn-course"), k = f.getAttribute("data-course"), nm = c.getAttribute("data-name"), on = c.getAttribute("aria-pressed") === "true";
      Array.prototype.forEach.call(f.querySelectorAll(".cn-card"), function (x) { x.setAttribute("aria-pressed", "false"); });
      if (on) delete st.picks[k]; else { c.setAttribute("aria-pressed", "true"); st.picks[k] = nm; }
      actualiza(); return;
    }
    var s = e.target.closest(".cn-suc");
    if (s) {
      st.suc = s.getAttribute("data-suc");
      Array.prototype.forEach.call(cn.querySelectorAll(".cn-suc"), function (x) { var o = x === s; x.classList.toggle("is-on", o); x.setAttribute("aria-checked", o ? "true" : "false"); });
      window.RZ.setSuc(st.suc); pintaDias(); return;
    }
    if (e.target.closest("#pax-m")) { st.pax = Math.max(1, st.pax - 1); actualiza(); }
    if (e.target.closest("#pax-p")) { st.pax = Math.min(20, st.pax + 1); actualiza(); }
  });
  selD.addEventListener("change", function () { st.dia = +selD.value; pintaHoras(); });
  selH.addEventListener("change", function () { st.hora = +selH.value; actualiza(); });
  pintaDias();
})();
