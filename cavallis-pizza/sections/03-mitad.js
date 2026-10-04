(function () {
  "use strict";
  var WA = "524499134949";
  var cz = document.getElementById("cz"); if (!cz) return;
  var disc = document.getElementById("cz-disc"), b = document.getElementById("cz-b"), k = document.getElementById("cz-k"),
      knob = document.getElementById("cz-knob"), n1 = document.getElementById("cz-n1"), n2 = document.getElementById("cz-n2"),
      res = document.getElementById("mi-res"), wa = document.getElementById("mi-wa");
  var IMG = { ruc: "img/pz-ruc-960.webp", jam: "img/pz-jam-960.webp" };
  var NOM = { ruc: "Rúcula", jam: "Jamón, elote y jalapeño" };
  var st = { a: "ruc", b: "jam", modo: "para comer ahí", ang: 90 };
  var halfs = document.querySelectorAll(".mi-f[data-half]"), modo = document.querySelector(".mi-f[data-modo]");

  function clip(ang) {
    var t = ang * Math.PI / 180, ux = Math.cos(t), uy = Math.sin(t), vx = -uy, vy = ux, R = 200;
    var P = [[ux * R, uy * R], [ux * R + vx * R, uy * R + vy * R], [-ux * R + vx * R, -uy * R + vy * R], [-ux * R, -uy * R]];
    b.style.clipPath = "polygon(" + P.map(function (p) { return (50 + p[0]) + "% " + (50 + p[1]) + "%"; }).join(",") + ")";
    k.style.transform = "rotate(" + ang + "deg)";
    n2.style.left = (50 + vx * 28) + "%"; n2.style.top = (50 + vy * 28) + "%";
    n1.style.left = (50 - vx * 28) + "%"; n1.style.top = (50 - vy * 28) + "%";
    knob.setAttribute("aria-valuenow", Math.round(((ang % 180) + 180) % 180));
  }
  function msg() {
    var m = st.a === st.b
      ? "Hola Cavalli's, quiero una pizza entera de " + NOM[st.a].toLowerCase() + ", " + st.modo + ". ¿Me confirman tamaño y precio?"
      : "Hola Cavalli's, quiero una pizza mitad " + NOM[st.a].toLowerCase() + " y mitad " + NOM[st.b].toLowerCase() + ", " + st.modo + ". ¿Me confirman tamaño y precio?";
    return m;
  }
  function sync() {
    cz.querySelector(".cz-a").src = IMG[st.a];
    b.querySelector("img").src = IMG[st.b];
    n1.style.display = n2.style.display = st.a === st.b ? "none" : "";
    Array.prototype.forEach.call(halfs, function (f, i) {
      var v = i === 0 ? st.a : st.b;
      Array.prototype.forEach.call(f.querySelectorAll(".mi-o"), function (o) { o.setAttribute("aria-pressed", o.getAttribute("data-p") === v ? "true" : "false"); });
    });
    Array.prototype.forEach.call(modo.querySelectorAll(".mi-o"), function (o) { o.setAttribute("aria-pressed", o.getAttribute("data-m") === st.modo ? "true" : "false"); });
    res.textContent = st.a === st.b ? "Entera de " + NOM[st.a].toLowerCase() : NOM[st.a] + " + " + NOM[st.b];
    wa.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg());
  }
  /* Mitad 1 = lado -v (n1), Mitad 2 = lado +v (capa b). La capa de abajo (a) es la Mitad 1. */
  Array.prototype.forEach.call(halfs, function (f, i) {
    f.addEventListener("click", function (e) {
      var o = e.target.closest(".mi-o"); if (!o) return;
      if (i === 0) st.a = o.getAttribute("data-p"); else st.b = o.getAttribute("data-p");
      sync();
    });
  });
  modo.addEventListener("click", function (e) { var o = e.target.closest(".mi-o"); if (!o) return; st.modo = o.getAttribute("data-m"); sync(); });

  /* tocar una mitad = cambiar su sabor */
  disc.addEventListener("click", function (e) {
    var r = disc.getBoundingClientRect(), x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2), t = st.ang * Math.PI / 180;
    var side = x * (-Math.sin(t)) + y * Math.cos(t); /* >0 = lado +v = capa b = mitad 2 */
    if (side > 0) st.b = st.b === "ruc" ? "jam" : "ruc"; else st.a = st.a === "ruc" ? "jam" : "ruc";
    sync();
  });

  /* arrastrar la perilla */
  var drag = false;
  function setAng(a) { st.ang = a; clip(a); }
  function fromPointer(e) {
    var r = cz.getBoundingClientRect();
    setAng(Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI);
  }
  knob.addEventListener("pointerdown", function (e) { drag = true; knob.setPointerCapture(e.pointerId); fromPointer(e); e.preventDefault(); });
  knob.addEventListener("pointermove", function (e) { if (drag) fromPointer(e); });
  knob.addEventListener("pointerup", function () { drag = false; });
  knob.addEventListener("pointercancel", function () { drag = false; });
  knob.addEventListener("keydown", function (e) {
    var d = e.key === "ArrowRight" || e.key === "ArrowUp" ? 12 : e.key === "ArrowLeft" || e.key === "ArrowDown" ? -12 : 0;
    if (d) { e.preventDefault(); setAng(st.ang + d); }
  });

  clip(st.ang); sync();
  /* momento de entrada: el cuchillo cae a su lugar (reversible: no cambia estado) */
  if (!window.CV.reduce) {
    window.CV.watch([cz], 0.8, function () {
      var t0 = null, from = 20, to = 90;
      setAng(from);
      function step(ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min(1, (ts - t0) / 900), e = 1 - Math.pow(1 - p, 3);
        if (!drag) setAng(from + (to - from) * e);
        if (p < 1 && !drag) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
})();
