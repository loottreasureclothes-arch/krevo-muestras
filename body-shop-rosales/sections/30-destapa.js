/* Destapa lo que se pinta: tablero kraft + muestras de color + nota de orden. Estado en window.BSR (site.js). */
(function () {
  "use strict";
  var B = window.BSR; if (!B) return;
  var sec = document.getElementById("destapa"); if (!sec) return;
  var car = document.getElementById("bs-car");
  var svg = car.querySelector("svg");
  var zonas = {};
  Array.prototype.forEach.call(svg.querySelectorAll("g.z"), function (g) { zonas[g.getAttribute("data-z")] = g; });
  var zBtns = sec.querySelectorAll("[data-z]:not(g)");
  var xBtns = sec.querySelectorAll("[data-x]");
  var cBtns = sec.querySelectorAll("[data-c].bs-sw");
  var imgs = sec.querySelectorAll("#bs-dt-ph img");
  var lbl = document.getElementById("bs-dt-lbl");
  var wa = document.getElementById("bs-dt-wa");
  var auto = document.getElementById("bs-auto");
  var empty = document.getElementById("bs-order-empty");
  var rows = { piezas: ["r-piezas", "o-piezas"], color: ["r-color", "o-color"], extras: ["r-extras", "o-extras"] };
  var FOTO_ETIQUETA = { rojo: "Rojo, ya pintado", azul: "Azul, terminado", plata: "Plata, terminada" };
  var last = {};
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function put(key, txt) {
    var ids = rows[key], row = document.getElementById(ids[0]), span = document.getElementById(ids[1]);
    if (!txt) { row.hidden = true; last[key] = ""; return; }
    row.hidden = false;
    if (last[key] !== txt) {
      span.textContent = txt;
      span.classList.remove("write"); void span.offsetWidth; span.classList.add("write");
      last[key] = txt;
    }
  }
  function render(st, why) {
    wa.href = B.url();
    if (why === "auto") return;
    Object.keys(zonas).forEach(function (id) { zonas[id].classList.toggle("on", st.z.indexOf(id) > -1); });
    Array.prototype.forEach.call(zBtns, function (b) { b.setAttribute("aria-pressed", st.z.indexOf(b.getAttribute("data-z")) > -1 ? "true" : "false"); });
    Array.prototype.forEach.call(xBtns, function (b) {
      var k = b.getAttribute("data-x");
      b.setAttribute("aria-pressed", (k === "todo" ? B.todo() : st[k]) ? "true" : "false");
    });
    Array.prototype.forEach.call(cBtns, function (b) { b.setAttribute("aria-pressed", st.c === b.getAttribute("data-c") ? "true" : "false"); });
    var hex = st.c ? B.COLORES[st.c].hex : "#8C8F92";
    car.style.setProperty("--paint", hex);
    sec.style.setProperty("--paint", hex);
    sec.style.setProperty("--paint-ink", (st.c === "rojo" || st.c === "azul") ? "#FBF3DE" : "#0F1C3A");
    if (st.c && FOTO_ETIQUETA[st.c]) {
      Array.prototype.forEach.call(imgs, function (im) { im.classList.toggle("on", im.getAttribute("data-c") === st.c); });
      lbl.textContent = FOTO_ETIQUETA[st.c];
    }
    put("piezas", st.z.length ? cap(B.todo() ? "todo el auto" : B.piezasTexto()) : "");
    put("color", st.c ? cap(B.COLORES[st.c].nombre) : "");
    var ex = B.extrasArr();
    put("extras", ex.length ? ex.map(cap).join(" · ") : "");
    empty.hidden = !B.vacia() ? true : false;
  }
  var touched = false;
  function touch() { if (!touched) { touched = true; sec.classList.add("bs-touched"); } }
  Array.prototype.forEach.call(zBtns, function (b) {
    b.addEventListener("click", function () { touch(); B.toggleZona(b.getAttribute("data-z")); });
  });
  Array.prototype.forEach.call(xBtns, function (b) {
    b.addEventListener("click", function () {
      touch();
      var k = b.getAttribute("data-x");
      if (k === "todo") B.setTodo(!B.todo()); else B.toggleExtra(k);
    });
  });
  Array.prototype.forEach.call(cBtns, function (b) {
    b.addEventListener("click", function () { touch(); B.setColor(b.getAttribute("data-c")); });
  });
  auto.value = B.state().auto || "";
  auto.addEventListener("input", function () { B.setAuto(auto.value); });
  B.on(render);
  /* estado inicial: sin JS el tablero trae cofre y defensa destapados de ejemplo; con JS manda lo guardado */
  var st0 = B.state();
  Object.keys(zonas).forEach(function (id) { zonas[id].classList.remove("on"); });
  render(st0);
  if (st0.z.length || st0.c || st0.golpe || st0.pulido) touch();
})();
