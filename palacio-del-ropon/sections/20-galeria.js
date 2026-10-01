/* La galería de la corte: coronar hasta 3, filtro, fichas, mensaje de WhatsApp, listón del header. */
(function () {
  "use strict";
  var KEY = "palacio_corte";
  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  var st = { c: [], cel: "", gen: "", edad: "", busca: "", fecha: "", nombre: "" };
  try { var raw = JSON.parse(sessionStorage.getItem(KEY) || "null"); if (raw && typeof raw === "object") { for (var k in st) if (raw[k] != null) st[k] = raw[k]; if (!Array.isArray(st.c)) st.c = []; } } catch (e) {}
  function save() { try { sessionStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }

  var rail = document.getElementById("pr-rail");
  if (!rail) return;
  var rets = Array.prototype.slice.call(rail.querySelectorAll(".pr-ret"));
  var info = {};
  rets.forEach(function (li) {
    var img = li.querySelector(".pr-sh-img img");
    info[li.getAttribute("data-id")] = { name: li.getAttribute("data-name"), src: (img.getAttribute("srcset") || "").split(",")[0].trim().split(" ")[0] || img.src, alt: img.alt };
  });
  st.c = st.c.filter(function (id) { return info[id]; }).slice(0, 3);

  function lista(a) { return a.length < 2 ? a.join("") : a.slice(0, -1).join(", ") + " y " + a[a.length - 1]; }
  function fechaTxt(iso) {
    var p = (iso || "").split("-");
    if (p.length !== 3) return "";
    var m = parseInt(p[1], 10) - 1;
    if (isNaN(m) || !MESES[m]) return "";
    return parseInt(p[2], 10) + " de " + MESES[m] + " de " + p[0];
  }
  function message() {
    var parts = [];
    var cel = st.cel, gen = st.gen;
    if (cel && gen) parts.push("Celebramos: " + cel + " de " + gen + ".");
    else if (cel) parts.push("Celebramos: " + cel + ".");
    else if (gen) parts.push("Es para: " + gen + ".");
    if (st.edad) parts.push("Edad: " + st.edad + ".");
    var f = fechaTxt(st.fecha); if (f) parts.push("Fecha: " + f + ".");
    if (st.busca) parts.push("Busco: " + st.busca + ".");
    if (st.c.length) parts.push("De su página me gustaron: " + lista(st.c.map(function (id) { return info[id].name; })) + ".");
    var nm = (st.nombre || "").trim(); if (nm) parts.push("Mi nombre: " + nm + ".");
    if (!parts.length) return "Hola El Palacio del Ropón, quiero su catálogo de ropones y trajes.";
    return "Hola El Palacio del Ropón, quiero su catálogo. " + parts.join(" ");
  }
  function resumen() {
    var names = st.c.map(function (id) { return info[id].name; });
    var t = names.length ? "Tu corte: " + lista(names) + "." : "";
    var extra = [];
    if (st.cel) extra.push(st.cel.charAt(0).toUpperCase() + st.cel.slice(1));
    var p = (st.fecha || "").split("-");
    if (p.length === 3 && MESES[parseInt(p[1], 10) - 1]) extra.push(parseInt(p[2], 10) + " de " + MESES[parseInt(p[1], 10) - 1]);
    if (t && extra.length) t += " " + extra.join(", ") + ".";
    return t;
  }
  window.PalacioCorte = { get: function () { return st; }, message: message, resumen: resumen, count: function () { return st.c.length; } };

  var FR = '<svg class="pr-sh-fr" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path class="a" d="M0,4 Q50,-1.200 100,4 L100,62 C100,82 74,93 50,100 C26,93 0,82 0,62Z"/></svg>';
  var listCor = document.getElementById("pr-coronadas"), vacio = document.getElementById("pr-vacio");
  var liston = document.getElementById("pr-liston"), listonT = document.getElementById("pr-liston-t");
  var timer = null;

  function renderRets() {
    var full = st.c.length >= 3;
    rets.forEach(function (li) {
      var id = li.getAttribute("data-id"), on = st.c.indexOf(id) > -1, b = li.querySelector(".pr-coronar"), t = b.querySelector(".pr-coronar-t");
      li.classList.toggle("is-crowned", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.disabled = !on && full;
      t.textContent = on ? "Quitar corona" : (full ? "Ya tienes 3" : "Coronar");
      b.setAttribute("aria-label", (on ? "Quitar la corona a " : "Coronar ") + info[id].name);
    });
  }
  function renderCoronadas() {
    if (!listCor) return;
    listCor.innerHTML = "";
    st.c.forEach(function (id) {
      var li = document.createElement("li");
      li.innerHTML = '<figure class="pr-sh"><div class="pr-sh-img"><img src="' + info[id].src + '" alt="" width="128" height="160"></div>' + FR + '</figure><span></span>';
      li.querySelector("span").textContent = info[id].name;
      listCor.appendChild(li);
    });
    if (vacio) vacio.hidden = st.c.length > 0;
  }
  function renderFichas() {
    Array.prototype.forEach.call(document.querySelectorAll(".pr-q[data-k]"), function (fs) {
      var k = fs.getAttribute("data-k");
      Array.prototype.forEach.call(fs.querySelectorAll(".pr-ficha"), function (b) { b.setAttribute("aria-pressed", st[k] === b.getAttribute("data-v") ? "true" : "false"); });
    });
  }
  function renderLinks() {
    var url = window.PR.waUrl(message());
    Array.prototype.forEach.call(document.querySelectorAll("[data-pr-send]"), function (a) { a.href = url; a.target = "_blank"; a.rel = "noopener"; });
  }
  function renderListon() {
    if (!liston) return;
    clearTimeout(timer);
    if (!st.c.length) {
      liston.classList.remove("is-on"); window.PR.listonOn = false; window.PR.onHeader();
      timer = setTimeout(function () { liston.hidden = true; }, 260);
      return;
    }
    liston.hidden = false;
    var nom = st.c.map(function (id) { return info[id].name; });
    listonT.textContent = "Tu corte · " + nom.join(" · ");
    if (listonT.parentNode.scrollWidth > listonT.parentNode.clientWidth + 1 || listonT.offsetWidth > window.innerWidth - 70) listonT.textContent = "Tu corte · " + st.c.length + (st.c.length === 1 ? " coronada" : " coronadas");
    window.PR.listonOn = true; window.PR.onHeader();
    requestAnimationFrame(function () { liston.classList.add("is-on"); });
  }
  function emit() { try { window.dispatchEvent(new CustomEvent("palacio:corte")); } catch (e) {} }
  function renderAll() { renderRets(); renderCoronadas(); renderFichas(); renderLinks(); renderListon(); emit(); }

  rets.forEach(function (li) {
    li.querySelector(".pr-coronar").addEventListener("click", function () {
      var id = li.getAttribute("data-id"), i = st.c.indexOf(id);
      if (i > -1) st.c.splice(i, 1); else if (st.c.length < 3) st.c.push(id); else return;
      save(); renderAll();
    });
  });
  Array.prototype.forEach.call(document.querySelectorAll(".pr-q[data-k]"), function (fs) {
    var k = fs.getAttribute("data-k");
    fs.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest(".pr-ficha") : null;
      if (!b) return;
      var v = b.getAttribute("data-v");
      st[k] = st[k] === v ? "" : v;
      save(); renderFichas(); renderLinks(); emit();
    });
  });
  var fecha = document.getElementById("pr-fecha"), nombre = document.getElementById("pr-nombre");
  if (fecha) {
    var d = new Date(), mm = ("0" + (d.getMonth() + 1)).slice(-2), dd = ("0" + d.getDate()).slice(-2);
    fecha.min = d.getFullYear() + "-" + mm + "-" + dd;
    fecha.value = st.fecha || "";
    fecha.addEventListener("input", function () { st.fecha = fecha.value; save(); renderLinks(); emit(); });
  }
  if (nombre) {
    nombre.value = st.nombre || "";
    nombre.addEventListener("input", function () { st.nombre = nombre.value; save(); renderLinks(); emit(); });
  }
  /* "Quiero el paquete" (sección del paquete) deja marcada la ficha antes de bajar a la cartela */
  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("[data-set-k]") : null;
    if (!a) return;
    st[a.getAttribute("data-set-k")] = a.getAttribute("data-set-v");
    save(); renderFichas(); renderLinks(); emit();
  });

  /* Filtro */
  var filtros = document.querySelectorAll(".pr-filtro");
  Array.prototype.forEach.call(filtros, function (b) {
    b.addEventListener("click", function () {
      var f = b.getAttribute("data-f");
      Array.prototype.forEach.call(filtros, function (x) { var on = x === b; x.classList.toggle("is-on", on); x.setAttribute("aria-pressed", on ? "true" : "false"); });
      rets.forEach(function (li) { li.hidden = !(f === "todas" || li.getAttribute("data-cat") === f); });
      rail.scrollLeft = 0; navState();
    });
  });
  /* Flechas (compu) */
  var prev = document.querySelector(".pr-rail-prev"), next = document.querySelector(".pr-rail-next");
  function navState() {
    if (!prev || !next) return;
    prev.disabled = rail.scrollLeft < 8;
    next.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8;
  }
  if (prev && next) {
    prev.addEventListener("click", function () { rail.scrollBy({ left: -(rail.clientWidth * 0.8), behavior: window.PR.reduce ? "auto" : "smooth" }); });
    next.addEventListener("click", function () { rail.scrollBy({ left: rail.clientWidth * 0.8, behavior: window.PR.reduce ? "auto" : "smooth" }); });
    rail.addEventListener("scroll", navState, { passive: true });
    window.addEventListener("resize", navState);
    navState();
  }
  renderAll();
})();
