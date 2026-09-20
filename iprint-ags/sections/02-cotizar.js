/* 02 cotizador: resumen en vivo, preselección desde el catálogo/hoja (evento ip:cotizar) y envío a WhatsApp */
(function () {
  "use strict";
  var sec = document.getElementById("cotizar");
  if (!sec) return;
  var f = sec.querySelector("form"), sum = sec.querySelector(".s-q-sum-t"), hint = sec.querySelector("[data-hint-impresos]");
  var fileBox = sec.querySelector(".s-q-file"), fileT = sec.querySelector(".s-q-file-t"), go = document.getElementById("s-q-go");
  function val(n) { var e = f.elements[n]; return e && e.value ? e.value.trim() : ""; }
  function tipo() { var r = f.querySelector('input[name="tipo"]:checked'); return r ? r.value : ""; }
  function msg() {
    var t = tipo(), a = val("ancho").replace(",", "."), h = val("alto").replace(",", "."), c = val("cant"), n = val("nombre"), w = val("cuando");
    var ex = Array.prototype.map.call(f.querySelectorAll('input[name="extra"]:checked'), function (x) { return x.value; });
    var file = f.arte.files && f.arte.files[0] ? f.arte.files[0].name : "";
    var L = [];
    L.push("Quiero cotizar: " + t);
    if (a || h) L.push("Medida: " + (a || "?") + " x " + (h || "?") + " m");
    if (c) L.push("Cantidad: " + c);
    if (ex.length) L.push("Necesito: " + ex.join(", "));
    L.push(file ? "Arte: " + file + " (te lo mando en este chat)" : "Arte: todavía no lo tengo");
    if (w) L.push("Para: " + w);
    return { body: L.join("\n"), n: n, file: file };
  }
  /* El boton es un <a href="wa.me"> REAL (nada de window.open: Instagram lo bloquea). Cada cambio del
     formulario reescribe el href, asi el enlace siempre lleva el pedido al dia. */
  function upd() {
    var m = msg();
    sum.textContent = m.body;
    if (go) go.href = IP.waUrl("Hola iPrint" + (m.n ? ", soy " + m.n : "") + ".\n" + m.body);
    hint.hidden = tipo() !== "Tarjetas / volantes";
  }
  f.addEventListener("input", upd);
  f.addEventListener("change", function (e) {
    if (e.target.name === "arte") {
      var fl = f.arte.files && f.arte.files[0];
      fileBox.classList.toggle("has-file", !!fl);
      fileT.textContent = fl ? fl.name : "Elegir archivo";
    }
    upd();
  });
  f.addEventListener("submit", function (e) { e.preventDefault(); upd(); if (go) go.click(); }); /* Enter en un campo */
  if (go) go.addEventListener("click", function () { upd(); sec.querySelector(".s-q-after").hidden = !msg().file; });
  document.addEventListener("ip:cotizar", function (e) {
    var t = e.detail && e.detail.tipo; if (!t) return;
    var r = f.querySelector('input[name="tipo"][value="' + t.replace(/"/g, "") + '"]');
    if (r) { r.checked = true; upd(); }
  });
  upd();

  /* ---------- Caidita: el 4.5 real de Google cae y pega, una sola vez (WAAPI) ---------- */
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var drop = sec.querySelector(".s-q-drop-fall");
  if (drop && drop.animate && !reduce && "IntersectionObserver" in window) {
    sec.classList.add("s-q-js");
    var played = false;
    function play() {
      if (played) return;
      played = true;
      sec.classList.add("is-dropped");
      drop.animate([
        { transform: "translateY(-46px) rotate(-8deg)", opacity: 0, offset: 0 },
        { transform: "translateY(0) rotate(0deg)", opacity: 1, offset: 0.5 },
        { transform: "translateY(-9px) rotate(2deg)", offset: 0.68 },
        { transform: "translateY(0) rotate(0deg)", offset: 0.84 },
        { transform: "translateY(-3px)", offset: 0.93 },
        { transform: "translateY(0)", offset: 1 }
      ], { duration: 1050, easing: "cubic-bezier(.33,0,.67,1)", fill: "forwards" });
    }
    var dio = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { dio.disconnect(); play(); } }, { threshold: 0.4, rootMargin: "0px 0px -10% 0px" });
    dio.observe(drop);
    /* red de seguridad: a 1.6 s de asomarse, si no jugó, queda visible sin animar */
    var fio = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { fio.disconnect(); setTimeout(function () { sec.classList.add("is-dropped"); }, 1600); } }, { rootMargin: "0px 0px -25% 0px" });
    fio.observe(drop);
  }
})();
