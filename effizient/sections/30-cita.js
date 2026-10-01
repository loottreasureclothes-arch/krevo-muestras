/* 30 cita: el goniómetro mueve la lectura, la ficha se escribe sola y el href de WhatsApp se reescribe.
   Nada se guarda: los datos de salud viven solo en memoria de la página (sin localStorage ni sessionStorage). */
(function () {
  "use strict";
  var form = document.getElementById("ficha");
  if (!form) return;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var WA = "524494137277";
  var svg = document.getElementById("gon");
  var arm = document.getElementById("gon-arm");
  var sector = document.getElementById("gon-sector");
  var range = document.getElementById("hoy");
  var nEl = document.getElementById("gon-n");
  var phraseEl = document.getElementById("gon-phrase");
  var wa = document.getElementById("cita-wa");
  var wrap = document.getElementById("gon-wrap");
  var nom = document.getElementById("nom");
  var CX = 180, CY = 196, R_SEC = 100, REST = 22;
  var S = { zona: "", zonaTxt: "", hoy: null, ent: "", entTxt: "", tb: [], nom: "" };

  function frase(v) { return v === 0 ? "Nada, es preventivo" : v <= 3 ? "Me molesta" : v <= 6 ? "Me limita" : "No me deja hacer mi día"; }
  function fraseMsg(v) { return v === 0 ? "es preventivo" : v <= 3 ? "me molesta" : v <= 6 ? "me limita" : "no me deja hacer mi día"; }

  /* ---------- mensaje ---------- */
  function message() {
    var p = [];
    if (S.zona) p.push("Zona: " + S.zona);
    if (S.hoy !== null) p.push("Molestia hoy: " + S.hoy + " de 10 (" + fraseMsg(S.hoy) + ")");
    if (S.ent) p.push(S.ent);
    if (S.tb.length) p.push("También me interesa: " + S.tb.join(" e "));
    var nm = S.nom.replace(/[\u0000-\u001f]/g, "").trim();
    if (nm) p.push("Mi nombre: " + nm);
    if (!p.length) return "Hola Effizient, quiero agendar una cita de terapia física.";
    return "Hola Effizient, quiero agendar una cita. " + p.join(". ");
  }
  function waUrl(m) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(m); }

  /* ---------- ficha ---------- */
  function setSlip(id, txt, empty) {
    var el = document.getElementById(id);
    if (!el) return;
    el.textContent = txt;
    el.classList.toggle("is-empty", !!empty);
  }
  function paint() {
    setSlip("s-zona", S.zonaTxt || "Falta elegir", !S.zonaTxt);
    setSlip("s-hoy", S.hoy === null ? "Falta mover el goniómetro" : S.hoy + " / 10 · " + frase(S.hoy), S.hoy === null);
    setSlip("s-ent", S.entTxt || "Falta elegir", !S.entTxt);
    setSlip("s-tb", S.tbTxt || "Nada marcado", !S.tbTxt);
    var nm = S.nom.trim();
    setSlip("s-nom", nm || "Sin nombre", !nm);
    var m = message();
    var url = waUrl(m);
    if (wa) { wa.setAttribute("data-wa", m); wa.href = url; }
    try { window.dispatchEvent(new CustomEvent("eff:cita", { detail: { msg: m, url: url, S: S } })); } catch (e) {}
  }
  window.EffCita = { message: message, url: function () { return waUrl(message()); }, state: S };

  /* ---------- goniómetro ---------- */
  var cur = REST, raf = null, gen = 0;
  function pt(r, deg) { var phi = (180 - deg) * Math.PI / 180; return [CX + r * Math.cos(phi), CY - r * Math.sin(phi)]; }
  function draw(deg) {
    arm.setAttribute("transform", "rotate(" + deg.toFixed(2) + " " + CX + " " + CY + ")");
    var d = Math.max(0.01, Math.min(179.99, deg));
    var a = pt(R_SEC, 0), b = pt(R_SEC, d);
    sector.setAttribute("d", "M" + CX + " " + CY + "L" + a[0].toFixed(2) + " " + a[1].toFixed(2) + "A" + R_SEC + " " + R_SEC + " 0 0 1 " + b[0].toFixed(2) + " " + b[1].toFixed(2) + "Z");
  }
  function ease(t) { var c1 = 1.1, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); }
  function animateTo(target) {
    if (reduce) { cur = target; draw(cur); return; }
    var from = cur, t0 = null, my = ++gen;
    if (raf) cancelAnimationFrame(raf);
    function step(ts) {
      if (t0 === null) t0 = ts;
      var t = Math.min(1, (ts - t0) / 220);
      cur = from + (target - from) * ease(t);
      draw(cur);
      if (t < 1) raf = requestAnimationFrame(step); else { raf = null; cur = target; draw(cur); }
    }
    raf = requestAnimationFrame(step);
    /* red: aunque rAF se pause, el brazo termina en su lugar */
    setTimeout(function () { if (my === gen && Math.abs(cur - target) > 0.01) { cur = target; draw(cur); } }, 420);
  }
  function setHoy(v, fromRange) {
    v = Math.max(0, Math.min(10, Math.round(v)));
    S.hoy = v;
    if (!fromRange) range.value = String(v);
    range.setAttribute("aria-valuetext", v + " de 10, " + frase(v));
    nEl.textContent = String(v);
    phraseEl.textContent = frase(v);
    var nms = svg.querySelectorAll(".nm");
    for (var i = 0; i < nms.length; i++) nms[i].classList.toggle("on", +nms[i].getAttribute("data-v") === v);
    sector.style.opacity = "1";
    if (wrap) wrap.classList.remove("is-unset");
    animateTo(v * 18);
    paint();
  }
  sector.style.opacity = "0";
  draw(REST);
  /* un amago de resorte, una vez, para que se entienda que el brazo gira */
  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (en) {
      if (!en[0].isIntersecting) return;
      io.disconnect();
      setTimeout(function () {
        if (S.hoy !== null) return;
        animateTo(50);
        setTimeout(function () { if (S.hoy === null) animateTo(REST); }, 330);
      }, 380);
    }, { rootMargin: "0px 0px -30% 0px" });
    io.observe(svg);
  }

  function valueFromEvent(e) {
    var r = svg.getBoundingClientRect();
    var sx = r.width / 360;
    var px = r.left + CX * sx, py = r.top + (CY - 26) * sx;
    var ang = Math.atan2(py - e.clientY, e.clientX - px) * 180 / Math.PI; /* -180..180, arriba positivo */
    var phi = ang;
    if (phi < 0) phi = phi < -90 ? 180 : 0; /* por debajo del eje: pega al extremo mas cercano */
    return (180 - phi) / 18;
  }
  var dragging = false;
  svg.addEventListener("pointerdown", function (e) {
    if (e.button !== undefined && e.button > 0) return;
    dragging = true;
    try { svg.setPointerCapture(e.pointerId); } catch (x) {}
    var v = Math.round(valueFromEvent(e));
    if (S.hoy !== v) setHoy(v);
    e.preventDefault();
  });
  svg.addEventListener("pointermove", function (e) {
    if (!dragging) return;
    var v = Math.round(valueFromEvent(e));
    if (S.hoy !== v) setHoy(v);
  });
  function up(e) { dragging = false; try { svg.releasePointerCapture(e.pointerId); } catch (x) {} }
  svg.addEventListener("pointerup", up);
  svg.addEventListener("pointercancel", up);
  range.addEventListener("input", function () { setHoy(+range.value, true); });
  range.addEventListener("change", function () { setHoy(+range.value, true); });

  /* ---------- fichas y casillas ---------- */
  function readRadios() {
    var z = form.querySelector('input[name="zona"]:checked');
    S.zona = z ? z.value : ""; S.zonaTxt = z ? z.nextElementSibling.textContent : "";
    var e = form.querySelector('input[name="ent"]:checked');
    S.ent = e ? e.value : ""; S.entTxt = e ? e.nextElementSibling.textContent : "";
    var tbs = form.querySelectorAll('input[name="tb"]:checked'), arr = [], txt = [];
    for (var i = 0; i < tbs.length; i++) { arr.push(tbs[i].value); txt.push(tbs[i].nextElementSibling.textContent); }
    S.tb = arr; S.tbTxt = txt.join(" · ");
    S.nom = nom.value || "";
    paint();
  }
  /* tocar de nuevo una ficha marcada la desmarca */
  form.addEventListener("pointerdown", function (e) {
    var l = e.target.closest ? e.target.closest("label.chip") : null;
    if (!l) return;
    var i = l.querySelector("input");
    if (i) i.setAttribute("data-was", i.checked ? "1" : "");
  });
  form.addEventListener("click", function (e) {
    var i = e.target;
    if (i && i.tagName === "INPUT" && i.type === "radio" && i.getAttribute("data-was") === "1") { i.checked = false; i.removeAttribute("data-was"); }
    readRadios();
  });
  form.addEventListener("change", readRadios);
  nom.addEventListener("input", readRadios);
  form.addEventListener("submit", function (e) { e.preventDefault(); });
  paint();
})();
