/* 20-mesa: la mesa de cuatro platos (carta, platos, comanda, sucursal, mensaje a WhatsApp) */
(function () {
  "use strict";
  var M = window.RomaMesa;
  var root = document.getElementById("mesa");
  if (!M || !root) return;
  var rows = Array.prototype.slice.call(root.querySelectorAll(".rm-row"));
  var lugares = Array.prototype.slice.call(root.querySelectorAll(".rm-lugar"));
  var comL = root.querySelector(".rm-com-l"), comE = root.querySelector(".rm-com-e");
  var comS = root.querySelector(".rm-com-s"), comP = root.querySelector(".rm-com-p");
  var chips = Array.prototype.slice.call(root.querySelectorAll(".rm-chip"));
  var nombre = root.querySelector("#rm-nombre");
  var lastAdded = null;
  var shown = [];

  function renderCarta() {
    var full = M.full();
    rows.forEach(function (row) {
      var id = row.getAttribute("data-id"), on = M.has(id);
      var b = row.querySelector(".rm-add"), cap = row.querySelector(".cap"), use = b.querySelector("use");
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.setAttribute("aria-disabled", full && !on ? "true" : "false");
      use.setAttribute("href", on ? "#i-check" : "#i-plus");
      cap.textContent = on ? "PUESTO" : (full ? "MESA LLENA" : "");
      b.setAttribute("aria-label", (on ? "Quitar de tu mesa: " : "Agregar a tu mesa: ") + M.dishes[id].name);
    });
  }
  function renderMesa() {
    lugares.forEach(function (l, i) {
      var id = M.state.items[i], p = l.querySelector(".rm-plato"), n = l.querySelector(".rm-plato-n");
      var cur = p.getAttribute("data-id") || "";
      if ((id || "") === cur) return;
      p.setAttribute("data-id", id || "");
      var num = p.querySelector(".num");
      Array.prototype.slice.call(p.querySelectorAll("img,.x")).forEach(function (e) { e.remove(); });
      p.classList.remove("is-drop");
      if (id) {
        var d = M.dishes[id];
        p.disabled = false; p.classList.add("is-on");
        if (num) num.style.display = "none";
        var im = document.createElement("img"); im.src = d.img; im.alt = ""; im.width = 160; im.height = 160; p.appendChild(im);
        var x = document.createElement("span"); x.className = "x"; x.innerHTML = '<svg aria-hidden="true"><use href="#i-x"/></svg>'; p.appendChild(x);
        p.setAttribute("aria-label", "Quitar " + d.name + " de tu mesa");
        n.textContent = d.name;
        if (id === lastAdded) { void p.offsetWidth; p.classList.add("is-drop"); }
      } else {
        p.disabled = true; p.classList.remove("is-on");
        if (num) num.style.display = "";
        p.setAttribute("aria-label", "Lugar " + (i + 1) + ", vacío");
        n.textContent = "";
      }
    });
  }
  function renderComanda() {
    var items = M.state.items;
    comL.innerHTML = "";
    items.forEach(function (id) {
      var d = M.dishes[id], li = document.createElement("li");
      if (id === lastAdded && shown.indexOf(id) < 0) li.className = "is-new";
      li.innerHTML = '<span class="n"></span><span class="d" aria-hidden="true"></span><span class="p"></span>';
      li.querySelector(".n").textContent = d.name;
      li.querySelector(".p").textContent = d.price != null ? M.money(d.price) : "por confirmar";
      comL.appendChild(li);
    });
    shown = items.slice();
    comE.hidden = items.length > 0;
    var t = M.total();
    if (items.length && t.sum > 0) { comS.hidden = false; comS.textContent = "SUMA " + M.money(t.sum); } else { comS.hidden = true; }
    if (t.pending > 0) { comP.hidden = false; comP.textContent = t.pending + " por confirmar por WhatsApp"; } else { comP.hidden = true; }
  }
  function renderSuc() {
    chips.forEach(function (c) { c.setAttribute("aria-pressed", c.getAttribute("data-suc") === M.state.branch ? "true" : "false"); });
  }
  function renderAll() { renderCarta(); renderMesa(); renderComanda(); renderSuc(); }

  rows.forEach(function (row) {
    row.querySelector(".rm-add").addEventListener("click", function () {
      var id = row.getAttribute("data-id");
      if (M.has(id)) { lastAdded = null; M.remove(id); }
      else if (!M.full()) { lastAdded = id; M.add(id); }
    });
  });
  lugares.forEach(function (l) {
    l.querySelector(".rm-plato").addEventListener("click", function () {
      var id = this.getAttribute("data-id");
      if (id) { lastAdded = null; M.remove(id); }
    });
  });
  chips.forEach(function (c) {
    c.addEventListener("click", function () {
      var b = c.getAttribute("data-suc");
      M.setBranch(M.state.branch === b ? "" : b);
    });
  });
  if (nombre) {
    nombre.value = M.state.name || "";
    nombre.addEventListener("input", function () { M.setName(nombre.value); });
  }
  window.addEventListener("rm:change", renderAll);
  renderAll();
})();
