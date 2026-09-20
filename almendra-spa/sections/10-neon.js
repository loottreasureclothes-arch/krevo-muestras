/* 10-neon — buscador del hero: escribe lo que te quieres hacer y te baja al menú,
   en esa categoría y con el renglón marcado. Lee los servicios del HTML del menú
   (si el JS del menú no cargara, los renglones siguen estando en la página). */
(function () {
  "use strict";
  function init() {
    var form = document.getElementById("al-busca");
    if (!form) return;
    var q = document.getElementById("al-q"), lista = document.getElementById("al-sug"), msg = document.getElementById("al-busca-msg");
    var marcado = -1, vistos = [];

    function limpia(s) { return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
    function datos() {
      return Array.prototype.map.call(document.querySelectorAll("#menu [data-al-item]"), function (el) {
        return {
          id: el.getAttribute("data-id"),
          nombre: el.getAttribute("data-nombre"),
          cat: el.getAttribute("data-cat"),
          catNombre: el.getAttribute("data-cat-nombre") || "",
          precio: el.getAttribute("data-precio"),
          busca: limpia(el.getAttribute("data-busca") || el.getAttribute("data-nombre"))
        };
      });
    }
    function etiqueta(it) {
      if (!it.precio) return "Pregunta el precio";
      return "$" + Number(it.precio).toLocaleString("es-MX");
    }
    function pinta(arr) {
      vistos = arr.slice(0, 6);
      marcado = -1;
      lista.innerHTML = "";
      if (!vistos.length) { lista.hidden = true; q.setAttribute("aria-expanded", "false"); q.removeAttribute("aria-activedescendant"); return; }
      vistos.forEach(function (it, i) {
        var li = document.createElement("li");
        li.id = "al-sug-" + i;
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", "false");
        li.innerHTML = '<b></b><span></span>';
        li.querySelector("b").textContent = it.nombre;
        li.querySelector("span").textContent = etiqueta(it);
        li.addEventListener("mousedown", function (e) { e.preventDefault(); elige(it); });
        lista.appendChild(li);
      });
      lista.hidden = false;
      q.setAttribute("aria-expanded", "true");
    }
    function marca(i) {
      var hijos = lista.children;
      for (var k = 0; k < hijos.length; k++) hijos[k].setAttribute("aria-selected", k === i ? "true" : "false");
      marcado = i;
      if (i >= 0) { q.setAttribute("aria-activedescendant", hijos[i].id); hijos[i].scrollIntoView({ block: "nearest" }); }
      else q.removeAttribute("aria-activedescendant");
    }
    function cierra() { lista.hidden = true; q.setAttribute("aria-expanded", "false"); q.removeAttribute("aria-activedescendant"); marcado = -1; }
    function elige(it) {
      cierra();
      msg.hidden = true;
      q.value = it.nombre;
      q.blur();
      if (window.AlmMenu && window.AlmMenu.abre) window.AlmMenu.abre(it.cat);
      if (window.AlmIr) window.AlmIr("menu");
      setTimeout(function () { if (window.AlmMenu && window.AlmMenu.enfoca) window.AlmMenu.enfoca(it.id); }, 620);
    }
    function busca(t) {
      var n = limpia(t).trim();
      var todo = datos();
      if (!n) return todo.filter(function (it) { return /gelish-sencillo|pestanas-ext|laminado-ceja|mascara-led|pedicure-spa|masaje-relajante/.test(it.id); });
      return todo.filter(function (it) { return it.busca.indexOf(n) >= 0; });
    }

    q.addEventListener("input", function () { msg.hidden = true; pinta(busca(q.value)); });
    q.addEventListener("focus", function () { if (!lista.children.length || lista.hidden) pinta(busca(q.value)); });
    q.addEventListener("blur", function () { setTimeout(cierra, 160); });
    q.addEventListener("keydown", function (e) {
      if (lista.hidden && (e.key === "ArrowDown" || e.key === "ArrowUp")) { pinta(busca(q.value)); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); marca(Math.min(marcado + 1, vistos.length - 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); marca(Math.max(marcado - 1, -1)); }
      else if (e.key === "Escape") { cierra(); }
      else if (e.key === "Enter" && marcado >= 0) { e.preventDefault(); elige(vistos[marcado]); }
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var r = busca(q.value);
      if (q.value.trim() && r.length) { elige(marcado >= 0 ? vistos[marcado] : r[0]); return; }
      if (!q.value.trim()) { if (window.AlmIr) window.AlmIr("menu"); return; }
      cierra();
      msg.textContent = "Eso no está en la lista de precios publicada: pregúntalo por WhatsApp y te lo confirman.";
      msg.hidden = false;
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
