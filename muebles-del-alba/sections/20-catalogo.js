/* 20-catalogo: el piso partido en 3 bloques (banda a sangre -> productos, y otra vez,
   como lo pidio Emanuel). Cada bloque manda sus propios chips y su propia rejilla;
   ningun chip muestra menos de 10 piezas. Ademas: interruptor de acabado (componente
   firma) y el "+" que manda a Mi casa. */
(function () {
  "use strict";
  var sec = document.getElementById("catalogo");
  if (!sec) return;

  var MAX = 10; // Emanuel: "10 piezas por grupo, no 4 ni 8". Ningun grupo tiene menos de 10.
  var bloques = [];

  Array.prototype.forEach.call(sec.querySelectorAll("[data-block]"), function (blk) {
    var chips = blk.querySelector("[data-chips]");
    var cards = Array.prototype.slice.call(blk.querySelectorAll("[data-grid] .s-cat-card"));
    var on = chips && chips.querySelector(".s-chip.is-on");
    var b = { el: blk, chips: chips, cards: cards, cat: on ? on.getAttribute("data-chip") : "" };
    bloques.push(b);

    function pinta() {
      var shown = 0;
      b.cards.forEach(function (li) {
        var visible = li.getAttribute("data-cat") === b.cat && shown < MAX;
        li.hidden = !visible;
        if (visible) shown++;
      });
    }
    b.pinta = pinta;

    if (chips) {
      chips.addEventListener("click", function (ev) {
        var bt = ev.target.closest(".s-chip");
        if (!bt) return;
        b.cat = bt.getAttribute("data-chip");
        Array.prototype.forEach.call(chips.querySelectorAll(".s-chip"), function (c) {
          var sel = c === bt;
          c.classList.toggle("is-on", sel);
          c.setAttribute("aria-selected", sel ? "true" : "false");
        });
        pinta();
        if (bt.scrollIntoView) bt.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
      });
    }
    pinta();
  });

  /* Los botones del hero ("Compra ahora") caen en el bloque de esa categoria */
  document.addEventListener("mda:cat", function (ev) {
    for (var i = 0; i < bloques.length; i++) {
      var b = bloques[i];
      var bt = b.chips && b.chips.querySelector('[data-chip="' + ev.detail + '"]');
      if (!bt) continue;
      bt.click();
      if (b.el.scrollIntoView) b.el.scrollIntoView({ block: "start", behavior: "smooth" });
      return;
    }
  });

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
