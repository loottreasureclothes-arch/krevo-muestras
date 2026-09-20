/* 20-menu — el motor del menú que suma: fichas de categoría, renglones que se agregan,
   largo de las acrílicas y el panel pegajoso de la cita (compu).
   Los renglones de la cabina (sección 4) usan los mismos data-al-item: este archivo
   escucha en todo el documento, así que también funcionan allá. */
(function () {
  "use strict";
  /* de una vez (el script va con defer: el HTML ya está): una categoría a la vez, sin parpadeo */
  var cats = document.querySelector(".al-cats");
  if (cats) {
    cats.classList.add("js-lista");
    var prim = cats.querySelector(".al-cat");
    if (prim) prim.classList.add("is-activa");
  }

  function init() {
    var fichas = Array.prototype.slice.call(document.querySelectorAll(".al-ficha"));
    var paneles = Array.prototype.slice.call(document.querySelectorAll(".al-cat"));
    var Cita = window.AlmCita;
    if (!Cita) return;

    /* ---------- categorías ---------- */
    function abre(cat, mueve) {
      var hay = false;
      paneles.forEach(function (p) {
        var v = p.getAttribute("data-cat") === cat;
        p.classList.toggle("is-activa", v);
        if (v) hay = true;
      });
      if (!hay) return;
      fichas.forEach(function (f) {
        var v = f.getAttribute("data-cat") === cat;
        f.setAttribute("aria-selected", v ? "true" : "false");
        if (v && mueve !== false && f.scrollIntoView) f.scrollIntoView({ block: "nearest", inline: "center", behavior: "auto" });
      });
    }
    fichas.forEach(function (f, i) {
      f.addEventListener("click", function () { abre(f.getAttribute("data-cat")); });
      f.addEventListener("keydown", function (e) {
        var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        var n = fichas[(i + d + fichas.length) % fichas.length];
        n.focus(); abre(n.getAttribute("data-cat"));
      });
    });

    /* swipe entre categorías: arrastrar la tira de fichas ya es nativo (overflow-x + snap).
       La pista es el degradado del borde derecho, que se quita al llegar al final. */
    var tira = document.getElementById("al-fichas");
    if (tira) {
      var mira = function () {
        var fin = tira.scrollLeft + tira.clientWidth >= tira.scrollWidth - 4;
        tira.classList.toggle("js-fin", fin);
      };
      tira.addEventListener("scroll", mira, { passive: true });
      window.addEventListener("resize", mira, { passive: true });
      mira();
    }

    /* ---------- agregar y quitar ---------- */
    function itemDe(btn) {
      var fila = btn.closest("[data-al-fila]");
      var op = fila ? fila.querySelector("[data-al-op][aria-pressed='true']") : null;
      var nombre = btn.getAttribute("data-nombre");
      var praw = btn.getAttribute("data-precio");
      if (op) { nombre = nombre + " " + op.getAttribute("data-sufijo"); praw = op.getAttribute("data-precio"); }
      var p = praw === "" || praw === null ? null : Number(praw);
      return { id: btn.getAttribute("data-id"), nombre: nombre, precio: isNaN(p) ? null : p };
    }
    document.addEventListener("click", function (e) {
      var btn = e.target.closest && e.target.closest("[data-al-item]");
      if (btn) { Cita.alterna(itemDe(btn)); return; }
      var op = e.target.closest && e.target.closest("[data-al-op]");
      if (!op) return;
      var fila = op.closest("[data-al-fila]");
      if (!fila) return;
      fila.querySelectorAll("[data-al-op]").forEach(function (o) { o.setAttribute("aria-pressed", o === op ? "true" : "false"); });
      var eco = fila.querySelector("[data-al-eco]");
      var precio = op.getAttribute("data-precio");
      if (eco) eco.textContent = op.getAttribute("data-sufijo") + (precio ? " · " + Cita.pesos(Number(precio)) : "");
      var btn2 = fila.querySelector("[data-al-item]");
      if (btn2 && Cita.tiene(btn2.getAttribute("data-id"))) {
        var it = itemDe(btn2);
        Cita.quitar(it.id);
        Cita.agregar(it);
      }
    });

    /* ---------- pintar el estado de cada renglón ---------- */
    var botones = Array.prototype.slice.call(document.querySelectorAll("[data-al-item]"));
    function pintaFilas() {
      botones.forEach(function (b) { b.setAttribute("aria-pressed", Cita.tiene(b.getAttribute("data-id")) ? "true" : "false"); });
    }

    /* ---------- panel pegajoso (compu) ---------- */
    var lista = document.getElementById("al-panel-lista"),
      vacia = document.getElementById("al-panel-vacia"),
      tot = document.getElementById("al-panel-tot"),
      cot = document.getElementById("al-panel-cot"),
      wa = document.getElementById("al-panel-wa");
    function pintaPanel() {
      if (!lista) return;
      var r = Cita.get();
      lista.innerHTML = "";
      r.items.forEach(function (it) {
        var li = document.createElement("li");
        var b = document.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", "Quitar " + it.nombre);
        b.innerHTML = '<svg aria-hidden="true"><use href="#i-cerrar"/></svg>';
        b.addEventListener("click", function () { Cita.quitar(it.id); });
        var s = document.createElement("span");
        s.textContent = it.nombre;
        var p = document.createElement("b");
        p.textContent = typeof it.precio === "number" ? Cita.pesos(it.precio) : "Pregunta el precio";
        if (typeof it.precio !== "number") p.className = "es-texto";
        li.appendChild(b); li.appendChild(s); li.appendChild(p);
        lista.appendChild(li);
      });
      if (vacia) vacia.hidden = r.items.length > 0;
      if (tot) window.AlmPintaTotal(tot);
      if (cot) {
        cot.hidden = !r.sinPrecio;
        cot.textContent = "Sin precio publicado: " + Cita.sinPrecioNombres().join(", ") + ".";
      }
      if (wa) { wa.href = Cita.url(); wa.setAttribute("data-al-wa", Cita.mensaje()); }
    }

    function pinta() { pintaFilas(); pintaPanel(); }
    window.addEventListener("alm:cita", pinta);
    pinta();

    /* ---------- API para el buscador del hero ---------- */
    window.AlmMenu = {
      abre: abre,
      enfoca: function (id) {
        var b = document.querySelector('[data-al-item][data-id="' + id + '"]');
        if (!b) return;
        var cat = b.getAttribute("data-cat");
        if (cat) abre(cat);
        var alto = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 62;
        var top = b.getBoundingClientRect().top + window.scrollY - alto - 90;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        b.classList.add("is-marcada");
        setTimeout(function () { b.classList.remove("is-marcada"); }, 1500);
        try { b.focus({ preventScroll: true }); } catch (e) { }
      }
    };
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
