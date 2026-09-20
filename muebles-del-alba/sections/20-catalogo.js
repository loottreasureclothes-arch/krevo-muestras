/* 20-catalogo: chips que filtran, interruptor de acabado (componente firma),
   "Ver los 76 muebles" y el "+" que manda a Mi casa. */
(function () {
  "use strict";
  var sec = document.getElementById("catalogo");
  if (!sec) return;

  var chips = sec.querySelector("[data-chips]");
  var cards = Array.prototype.slice.call(sec.querySelectorAll("[data-grid] .s-cat-card"));
  var more = sec.querySelector("[data-more]");
  var cat = "todos";
  var todo = false;

  function pinta() {
    cards.forEach(function (li) {
      var suya = li.getAttribute("data-cat") === cat;
      li.hidden = !(cat === "todos" ? (todo || li.hasAttribute("data-top")) : suya);
    });
    if (more) {
      more.hidden = cat !== "todos";
      more.setAttribute("aria-expanded", todo ? "true" : "false");
      more.firstChild.nodeValue = todo ? "Ver solo lo más pedido" : "Ver los " + cards.length + " muebles del piso";
    }
  }

  if (chips) {
    chips.addEventListener("click", function (ev) {
      var b = ev.target.closest(".s-chip");
      if (!b) return;
      cat = b.getAttribute("data-chip");
      Array.prototype.forEach.call(chips.querySelectorAll(".s-chip"), function (c) {
        var on = c === b;
        c.classList.toggle("is-on", on);
        c.setAttribute("aria-selected", on ? "true" : "false");
      });
      pinta();
      if (b.scrollIntoView) b.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    });
    document.addEventListener("mda:cat", function (ev) {
      var b = chips.querySelector('[data-chip="' + ev.detail + '"]');
      if (b) b.click();
    });
  }
  if (more) more.addEventListener("click", function () { todo = !todo; pinta(); });
  pinta();

  /* ---------- Interruptor de acabado (componente firma) ---------- */
  Array.prototype.forEach.call(sec.querySelectorAll("[data-fin-group]"), function (group) {
    var card = group.closest(".s-cat-card");
    var photo = card.querySelector(".s-cat-photo--fin");
    var addBtn = card.querySelector("[data-fin-carry]");
    group.addEventListener("click", function (ev) {
      var b = ev.target.closest(".s-fin-sw");
      if (!b) return;
      var fin = b.getAttribute("data-fin");
      Array.prototype.forEach.call(group.querySelectorAll(".s-fin-sw"), function (s) {
        var on = s === b;
        s.classList.toggle("is-on", on);
        s.setAttribute("aria-pressed", on ? "true" : "false");
      });
      if (photo) Array.prototype.forEach.call(photo.querySelectorAll("[data-fin-img]"), function (img) {
        img.classList.toggle("is-on", img.getAttribute("data-fin-img") === fin);
      });
      var label = card.querySelector("[data-fin-label]");
      if (label) label.textContent = fin;
      if (addBtn) {
        addBtn.setAttribute("data-fin", fin);
        var img = photo && photo.querySelector('[data-fin-img="' + fin + '"]');
        if (img) addBtn.setAttribute("data-img", img.getAttribute("src"));
      }
    });
  });

  /* ---------- Agregar a Mi casa ---------- */
  sec.addEventListener("click", function (ev) {
    var b = ev.target.closest("[data-add]");
    if (!b) return;
    var fin = b.getAttribute("data-fin");
    var name = b.getAttribute("data-name") + (fin ? " en " + fin : "");
    window.MDA && MDA.sel.add({
      id: b.getAttribute("data-add") + (fin ? "-" + fin : ""),
      name: name,
      price: Number(b.getAttribute("data-price")) || 0,
      note: b.getAttribute("data-note") || "",
      img: b.getAttribute("data-img") || ""
    });
    b.classList.remove("is-added"); void b.offsetWidth; b.classList.add("is-added");
    setTimeout(function () { b.classList.remove("is-added"); }, 700);
  });
})();
