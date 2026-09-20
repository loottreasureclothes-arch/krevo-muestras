/* 1 · LA MEDIDA (hero): la foto entra desde el desenfoque y el buscador "¿Qué te quieres hacer?"
   baja al servicio y lo deja ELEGIDO en la cita. El buscador va en tinta, nunca en verde. */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- la foto: se enseña en cuanto decodifica (y a los 900 ms pase lo que pase) ---- */
  (function foto() {
    var caja = document.querySelector(".s-hero-foto");
    if (!caja) return;
    var img = caja.querySelector("img");
    function ya() { caja.classList.add("is-in"); }
    if (!img || reduce) { ya(); return; }
    if (img.complete) ya();
    else if (img.decode) img.decode().then(ya, ya);
    else img.addEventListener("load", ya);
    setTimeout(ya, 900);
  })();

  /* ---- buscador ---- */
  var form = document.getElementById("s-buscar");
  if (!form || !window.MimoCita) return;
  var input = document.getElementById("s-q");
  var lista = document.getElementById("s-sug");

  function llano(s) {
    return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }
  function buscar(q) {
    var t = llano(q).trim();
    if (t.length < 2) return [];
    return window.MimoCita.SERVICIOS.filter(function (s) {
      return llano(s.nombre + " " + s.busca).indexOf(t) >= 0;
    });
  }
  function pintar(res, q) {
    lista.textContent = "";
    if (!res.length) { lista.hidden = true; input.setAttribute("aria-expanded", "false"); return; }
    res.slice(0, 5).forEach(function (s) {
      var li = document.createElement("li");
      li.setAttribute("role", "option");
      var b = document.createElement("button");
      b.type = "button";
      var i = llano(s.nombre).indexOf(llano(q).trim());
      if (i >= 0) {
        b.appendChild(document.createTextNode(s.nombre.slice(0, i)));
        var fuerte = document.createElement("b");
        fuerte.textContent = s.nombre.slice(i, i + q.trim().length);
        b.appendChild(fuerte);
        b.appendChild(document.createTextNode(s.nombre.slice(i + q.trim().length)));
      } else { b.textContent = s.nombre; }
      b.addEventListener("click", function () { elegir(s.slug); });
      li.appendChild(b);
      lista.appendChild(li);
    });
    lista.hidden = false;
    input.setAttribute("aria-expanded", "true");
  }
  /* Deja el servicio ELEGIDO en la cita y baja a su ficha, marcándola un momento. */
  function elegir(slug) {
    window.MimoCita.setServicio(slug, true);
    lista.hidden = true;
    input.setAttribute("aria-expanded", "false");
    input.blur();
    var ficha = document.querySelector('[data-serv="' + slug + '"]');
    var destino = ficha || document.getElementById("servicios") || document.getElementById("cita");
    if (!destino) return;
    if (window.MimoIr) window.MimoIr(destino, ficha ? 0.26 : 0);
    if (ficha && !reduce) {
      ficha.classList.add("is-marcado");
      setTimeout(function () { ficha.classList.remove("is-marcado"); }, 1800);
    }
    /* si la ficha vive en un carrusel, se trae al frente */
    var car = ficha && ficha.closest(".s-serv-riel");
    if (car) setTimeout(function () {
      car.scrollTo({ left: Math.max(0, ficha.offsetLeft - 16), behavior: reduce ? "auto" : "smooth" });
    }, 420);
  }
  window.MimoElegirServicio = elegir;

  input.addEventListener("input", function () { pintar(buscar(input.value), input.value); });
  input.addEventListener("focus", function () { if (input.value.trim().length > 1) pintar(buscar(input.value), input.value); });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var res = buscar(input.value);
    if (res.length) { elegir(res[0].slug); return; }
    var s = document.getElementById("servicios");
    if (s && window.MimoIr) window.MimoIr(s);
  });
  document.addEventListener("click", function (e) {
    if (!form.contains(e.target)) { lista.hidden = true; input.setAttribute("aria-expanded", "false"); }
  });
  input.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { lista.hidden = true; input.setAttribute("aria-expanded", "false"); }
    if (e.key === "ArrowDown" && !lista.hidden) {
      var b = lista.querySelector("button");
      if (b) { e.preventDefault(); b.focus(); }
    }
  });
})();
