(function () {
  "use strict";
  var WA = "524959589903";
  var doc = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function waUrl(m) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(m); }
  if (!reduce) doc.classList.add("ql-js");

  /* momento firma: el arco del hero se abre desde abajo (reversible al volver) */
  var arch = $("#hero-arch");
  if (arch && !reduce) {
    arch.classList.add("ql-pre");
    var open = function () { arch.classList.remove("ql-pre"); };
    var closeA = function () { arch.classList.add("ql-pre"); };
    setTimeout(open, 120);
    setTimeout(open, 1500);
    if ("IntersectionObserver" in window) {
      var seen = false;
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { if (seen) setTimeout(open, 60); }
          else if (e.intersectionRatio === 0 && window.scrollY > window.innerHeight * 1.2) { seen = true; closeA(); }
        });
      }, { threshold: [0, 0.25] }).observe(arch);
    }
  }

  /* reveal con failsafe a 1.6 s */
  var rev = $$("[data-reveal]");
  function showAll() { rev.forEach(function (el) { el.classList.add("is-in"); }); }
  if (reduce || !("IntersectionObserver" in window)) { showAll(); }
  else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    rev.forEach(function (el) { io.observe(el); });
    setTimeout(showAll, 1600);
  }

  /* menu */
  var btn = $(".ql-menu-btn"), menu = $("#ql-menu"), lbl = $(".ql-menu-lbl");
  function setMenu(o) {
    btn.setAttribute("aria-expanded", o ? "true" : "false");
    menu.hidden = !o;
    document.body.classList.toggle("ql-menu-open", o);
    lbl.textContent = o ? "Cerrar" : "Menú";
  }
  btn.addEventListener("click", function () { setMenu(menu.hidden); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menu.hidden) { setMenu(false); btn.focus(); } });

  /* componente firma: Elige tu rincón */
  var st = { rin: "el patio de arcos", n: 4, dia: "hoy", fr: "la comida", platos: [] };
  var out = $("#rin-wa"), big = $("#f-big"), fd = $("#f-d"), nOut = $("#n-out");
  function msg() {
    var m = "Hola, quiero mesa en " + st.rin + " para " + st.n + (st.n === 1 ? " persona " : " personas ") + st.dia + " a la hora de " + st.fr.replace(/^el |^la /, function (x) { return x; }) + ".";
    m = m.replace("a la hora de el desayuno", "para el desayuno").replace("a la hora de la tarde", "por la tarde").replace("a la hora de la comida", "a la hora de la comida");
    if (st.platos.length) m += " Se nos antoja: " + st.platos.join(", ") + ".";
    return m + " ¿Hay lugar?";
  }
  function paint() {
    if (!out) return;
    out.href = waUrl(msg());
    big.innerHTML = "Mesa para <em>" + st.n + "</em>";
    nOut.textContent = st.n;
    var rn = st.rin.replace(/^el |^la /, ""); rn = rn.charAt(0).toUpperCase() + rn.slice(1);
    fd.textContent = rn + ", " + st.dia + ", " + st.fr.replace(/^el |^la /, "") + (st.platos.length ? " · " + st.platos.length + (st.platos.length === 1 ? " platillo" : " platillos") : "");
  }
  function radio(group, cb) {
    var items = $$("[role=radio]", group);
    function pick(it) { items.forEach(function (i) { i.setAttribute("aria-checked", i === it ? "true" : "false"); }); cb(it); }
    items.forEach(function (it) { it.addEventListener("click", function () { pick(it); }); });
    group.addEventListener("keydown", function (e) {
      var k = e.key, i = items.indexOf(document.activeElement);
      if (i < 0) return;
      var d = (k === "ArrowRight" || k === "ArrowDown") ? 1 : (k === "ArrowLeft" || k === "ArrowUp") ? -1 : 0;
      if (!d) return; e.preventDefault();
      var nx = items[(i + d + items.length) % items.length]; nx.focus(); pick(nx);
    });
  }
  var rg = $(".ql-rin-row");
  if (rg) radio(rg, function (it) { st.rin = it.getAttribute("data-rin"); paint(); });
  radio($("#g-dia"), function (it) { st.dia = it.getAttribute("data-v"); paint(); });
  radio($("#g-fr"), function (it) { st.fr = it.getAttribute("data-v"); paint(); });
  $("#n-menos").addEventListener("click", function () { st.n = Math.max(1, st.n - 1); paint(); });
  $("#n-mas").addEventListener("click", function () { st.n = Math.min(30, st.n + 1); paint(); });

  /* platillos marcados viajan en el mensaje */
  var note = $("#mesa-n");
  $$(".ql-row").forEach(function (row) {
    var b = $(".ql-add", row), name = row.getAttribute("data-plato");
    b.addEventListener("click", function () {
      var on = !row.classList.contains("is-on");
      row.classList.toggle("is-on", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.textContent = on ? "En tu mesa" : "Agregar";
      var i = st.platos.indexOf(name);
      if (on && i < 0) st.platos.push(name);
      if (!on && i >= 0) st.platos.splice(i, 1);
      var k = st.platos.length;
      note.innerHTML = (k ? "En tu mesa: " + k + (k === 1 ? " platillo" : " platillos") + ". Viajan con tu mensaje. " : "Aún no marcas nada. Lo que agregues viaja con tu mesa. ") + '<a href="#rincones">Apartar mesa</a>';
      paint();
    });
  });
  paint();

  /* flotante de WhatsApp: se esconde donde ya hay botón verde */
  var fab = $(".ql-fab"), zones = $$("#inicio .ql-hero-cta, #rincones .ql-ficha, #visita .ql-vis-cta, .ql-foot");
  function upd() {
    var h = window.innerHeight, hide = zones.some(function (z) { var r = z.getBoundingClientRect(); return r.top < h - 40 && r.bottom > 60; });
    fab.classList.toggle("is-off", hide);
  }
  var raf = 0;
  function sch() { if (!raf) raf = requestAnimationFrame(function () { raf = 0; upd(); }); }
  window.addEventListener("scroll", sch, { passive: true });
  window.addEventListener("resize", sch);
  upd();
})();
