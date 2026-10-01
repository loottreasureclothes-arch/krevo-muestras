/* 20 · El perchero y tu probador: filtro, ganchos que se mecen, "Al probador" (cae a la ficha), máx. 3 */
(function () {
  "use strict";
  function ready(fn) { if (window.Bx) fn(); else window.addEventListener("DOMContentLoaded", fn); }
  ready(function () {
    var Bx = window.Bx;
    var rail = document.getElementById("bx-rail");
    var form = document.getElementById("ficha");
    if (!rail || !form) return;
    var cards = Array.prototype.slice.call(rail.querySelectorAll(".bx-pch[data-msg]"));
    var discs = Array.prototype.slice.call(form.querySelectorAll(".bx-disc"));
    var caps = Array.prototype.slice.call(form.querySelectorAll(".bx-disc-cap"));
    var empty = document.getElementById("bx-empty");
    var count = document.getElementById("bx-count");
    var countA = count && count.parentNode;
    var reduce = Bx.reduce;
    var byId = {};
    cards.forEach(function (c) { byId[c.getAttribute("data-id")] = c; Bx.registerPercha(c.getAttribute("data-id"), c.getAttribute("data-msg")); });

    /* ---------- pintar el estado ---------- */
    function thumb(id) { var im = byId[id] && byId[id].querySelector(".bx-pch-ph img"); return im ? im.currentSrc || im.src : ""; }
    function paint() {
      var sel = Bx.state.sel;
      cards.forEach(function (c) {
        var on = sel.indexOf(c.getAttribute("data-id")) > -1;
        var b = c.querySelector(".bx-pch-add");
        b.setAttribute("aria-pressed", on ? "true" : "false");
        c.classList.toggle("is-in-room", on);
      });
      discs.forEach(function (d, i) {
        var id = sel[i], im = d.querySelector("img");
        if (id) {
          if (!im) { im = document.createElement("img"); im.alt = ""; d.appendChild(im); }
          im.src = thumb(id);
          d.classList.add("is-full");
          d.setAttribute("aria-label", "Quitar la percha " + id + " de tu probador");
          caps[i].textContent = "Percha " + id;
        } else {
          if (im) im.remove();
          d.classList.remove("is-full");
          d.setAttribute("aria-label", "Lugar " + (i + 1) + " del probador, vacío");
          caps[i].textContent = "";
        }
      });
      if (count) { count.textContent = sel.length; countA.classList.toggle("is-full", sel.length >= 3); }
      if (empty && !empty.getAttribute("data-msg")) empty.textContent = sel.length ? (sel.length === 3 ? "Tu probador está lleno. Toca un disco para quitar uno." : "Puedes llevar hasta " + (3 - sel.length) + " más.") : "Escoge hasta 3 del perchero.";
    }
    function say(t) { if (!empty) return; empty.textContent = t; empty.setAttribute("data-msg", "1"); setTimeout(function () { empty.removeAttribute("data-msg"); paint(); }, 2600); }

    /* ---------- "Al probador": la foto chica cae al primer disco libre (220 ms) ---------- */
    function fly(card, slot) {
      var im = card.querySelector(".bx-pch-ph img"), d = discs[slot];
      if (reduce || !im || !d || !im.animate) return;
      var a = im.getBoundingClientRect(), b = d.getBoundingClientRect();
      if (!a.width || !b.width) return;
      var g = document.createElement("img");
      g.src = im.currentSrc || im.src; g.alt = ""; g.setAttribute("aria-hidden", "true");
      g.style.cssText = "position:fixed;left:" + a.left + "px;top:" + a.top + "px;width:" + a.width + "px;height:" + a.height + "px;object-fit:cover;z-index:120;pointer-events:none;transform-origin:0 0;will-change:transform;border-radius:0 0 28px 0";
      document.body.appendChild(g);
      var s = b.width / a.width, dx = b.left - a.left, dy = b.top - a.top + (b.height - a.height * s) / 2;
      var an = g.animate([{ transform: "none", opacity: 1 }, { transform: "translate(" + dx + "px," + dy + "px) scale(" + s + ")", opacity: 0.9, borderRadius: "50%" }], { duration: 220, easing: "cubic-bezier(.55,0,.8,.4)", fill: "forwards" });
      var done = function () { g.remove(); d.animate && d.animate([{ transform: "scale(1.08)" }, { transform: "scale(1)" }], { duration: 180, easing: "cubic-bezier(.23,1,.32,1)" }); };
      an.onfinish = done; setTimeout(function () { if (g.parentNode) done(); }, 400);
    }
    function add(id, card) {
      var sel = Bx.state.sel.slice();
      var i = sel.indexOf(id);
      if (i > -1) { sel.splice(i, 1); Bx.set({ sel: sel }); paint(); return; }
      if (sel.length >= 3) {
        say("Tu probador tiene 3. Quita uno para cambiarlo.");
        discs.forEach(function (d) { d.classList.remove("is-shake"); void d.offsetWidth; d.classList.add("is-shake"); });
        return;
      }
      sel.push(id); Bx.set({ sel: sel });
      paint();
      fly(card, sel.length - 1);
    }
    cards.forEach(function (c) {
      c.querySelector(".bx-pch-add").addEventListener("click", function () { add(c.getAttribute("data-id"), c); });
    });
    discs.forEach(function (d, i) {
      d.addEventListener("click", function () {
        var sel = Bx.state.sel.slice();
        if (!sel[i]) { if (window.BxIr) { var r = document.getElementById("bx-rail"); if (r) window.BxIr(r); } return; }
        sel.splice(i, 1); Bx.set({ sel: sel }); paint();
      });
    });

    /* ---------- filtro: TODOS · NOVIA · XV ---------- */
    var fb = Array.prototype.slice.call(document.querySelectorAll(".bx-f"));
    fb.forEach(function (b) {
      b.addEventListener("click", function () {
        var f = b.getAttribute("data-f");
        fb.forEach(function (x) { var on = x === b; x.classList.toggle("is-on", on); x.setAttribute("aria-pressed", on ? "true" : "false"); });
        Array.prototype.forEach.call(rail.querySelectorAll(".bx-pch"), function (c) {
          var k = c.getAttribute("data-kind");
          c.hidden = !(f === "todos" || k === f || k === "fin");
        });
        rail.scrollTo({ left: 0, behavior: "auto" });
        swing(0.0);
      });
    });

    /* ---------- ganchos: se mecen al arrastrar (±3°, resorte que asienta en 300 ms) y una vez al entrar ---------- */
    var hangs = Array.prototype.slice.call(rail.querySelectorAll(".bx-pch-hang"));
    function swing(deg) { hangs.forEach(function (h, i) { h.style.setProperty("--sw", (i % 2 ? -deg : deg) + "deg"); }); }
    if (!reduce) {
      var last = rail.scrollLeft, tmo = null;
      rail.addEventListener("scroll", function () {
        var dx = rail.scrollLeft - last; last = rail.scrollLeft;
        if (!dx) return;
        var deg = Math.max(-3, Math.min(3, -dx * 0.22));
        hangs.forEach(function (h) { h.classList.add("is-dragging"); });
        swing(deg);
        clearTimeout(tmo);
        tmo = setTimeout(function () { hangs.forEach(function (h) { h.classList.remove("is-dragging"); }); swing(0); }, 110);
      }, { passive: true });
      var once = false;
      window.BxWatch([rail], 0.8, function () {
        if (once) return; once = true;
        setTimeout(function () { swing(2.4); setTimeout(function () { swing(0); }, 330); }, 700);
      });
    }

    /* ---------- flechas y arrastre con mouse (compu) ---------- */
    Array.prototype.forEach.call(document.querySelectorAll(".bx-arrow"), function (b) {
      b.addEventListener("click", function () {
        var step = (byId["01"] ? byId["01"].offsetWidth : 224) + 28;
        rail.scrollBy({ left: step * 2 * (+b.getAttribute("data-dir")), behavior: reduce ? "auto" : "smooth" });
      });
    });
    var drag = null, moved = false;
    rail.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse" || e.button !== 0 || (e.target.closest && e.target.closest("button,a"))) return;
      drag = { x: e.clientX, left: rail.scrollLeft }; moved = false;
    });
    window.addEventListener("pointermove", function (e) {
      if (!drag) return;
      var dx = e.clientX - drag.x;
      if (!moved && Math.abs(dx) > 5) { moved = true; rail.classList.add("is-drag"); }
      if (moved) rail.scrollLeft = drag.left - dx;
    });
    window.addEventListener("pointerup", function () { if (!drag) return; drag = null; rail.classList.remove("is-drag"); });

    /* ---------- campos de la ficha ---------- */
    var hoy = Bx.hoyISO();
    var fecha = document.getElementById("bx-fecha"); fecha.min = hoy;
    var st = Bx.state;
    if (st.para) { var r = form.querySelector('input[name="para"][value="' + st.para.replace(/"/g, "") + '"]'); if (r) r.checked = true; }
    if (st.vienen) { var r2 = form.querySelector('input[name="vienen"][value="' + st.vienen + '"]'); if (r2) r2.checked = true; }
    if (st.fecha && st.fecha >= hoy) fecha.value = st.fecha; else if (st.fecha) Bx.set({ fecha: "" });
    var acc = document.getElementById("bx-acc"); acc.checked = !!st.acc;
    var nom = document.getElementById("bx-nombre"); nom.value = st.nombre || "";
    form.addEventListener("change", function (e) {
      var t = e.target;
      if (t.name === "para") Bx.set({ para: t.value });
      else if (t.name === "vienen") Bx.set({ vienen: t.value });
      else if (t === fecha) Bx.set({ fecha: fecha.value && fecha.value >= hoy ? fecha.value : "" });
      else if (t === acc) Bx.set({ acc: acc.checked });
    });
    fecha.addEventListener("input", function () { Bx.set({ fecha: fecha.value && fecha.value >= hoy ? fecha.value : "" }); });
    nom.addEventListener("input", function () { Bx.set({ nombre: nom.value }); });
    /* cuando otra parte de la página cambia el estado */
    Bx.on(paint);
    paint();
  });
})();
