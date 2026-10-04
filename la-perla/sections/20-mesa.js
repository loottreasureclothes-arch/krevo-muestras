(function () {
  "use strict";
  var root = document.getElementById("mesa"); if (!root) return;
  var B = {
    centro: { n: "Centro", num: "524499781535", cierra: 3, cierraTxt: "los miércoles", horas: "de 12 p.m. a 7 p.m." },
    poniente: { n: "Poniente", num: "524493009138", cierra: 2, cierraTxt: "los martes", horas: "de 11 a.m. a 7 p.m." }
  };
  var DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  var MAX = 6;
  var st = { slots: ["molcajete", "pina", null, null, null, null], n: 4, d: 6, b: "centro" };
  var dishes = {};
  Array.prototype.forEach.call(root.querySelectorAll(".lp-dish"), function (li) {
    dishes[li.getAttribute("data-id")] = { el: li, name: li.getAttribute("data-name"), img: li.getAttribute("data-img"), label: li.querySelector("h3").textContent };
  });
  var slotEls = root.querySelectorAll(".lp-slot"), hint = document.getElementById("lp-hint"),
      cnt = document.getElementById("lp-count"), cntL = document.getElementById("lp-count-l"),
      out = document.getElementById("n-out"), statusEl = document.getElementById("lp-status"),
      wa = document.getElementById("lp-mesa-wa"),
      segs = root.querySelectorAll(".lp-seg button"), days = root.querySelectorAll(".lp-days button");
  var HINT = "Toca un platillo para ponerlo en la charola.";

  function picked() { return st.slots.filter(Boolean); }
  function list(a) {
    var n = a.map(function (id) { return dishes[id].name; });
    if (n.length <= 1) return n.join("");
    return n.slice(0, -1).join(", ") + " y " + n[n.length - 1];
  }
  function message() {
    var b = B[st.b], p = picked();
    return "Hola La Perla, vi su página. Queremos mesa para " + st.n + " el " + DIAS[st.d] + " en " + b.n + ". " +
      (p.length ? "Se nos antoja: " + list(p) + "." : "Todavía no elegimos platillos.") + " ¿Nos confirman?";
  }
  function render() {
    var p = picked();
    for (var i = 0; i < slotEls.length; i++) {
      var el = slotEls[i], id = st.slots[i], had = el.classList.contains("is-filled");
      if (id) {
        if (el.getAttribute("data-id") !== id) {
          el.innerHTML = '<img src="' + dishes[id].img + '" alt="">';
          el.setAttribute("data-id", id);
          el.classList.remove("is-filled"); void el.offsetWidth; el.classList.add("is-filled");
        }
        el.setAttribute("aria-label", "Quitar " + dishes[id].label);
      } else {
        el.innerHTML = ""; el.removeAttribute("data-id"); el.classList.remove("is-filled");
        el.setAttribute("aria-label", "Lugar vacío");
      }
    }
    Object.keys(dishes).forEach(function (k) {
      var on = st.slots.indexOf(k) > -1, d = dishes[k].el;
      d.classList.toggle("is-on", on);
      d.querySelector(".lp-add").textContent = on ? "Quitar" : "Agregar";
      d.querySelector(".lp-add").setAttribute("aria-pressed", on ? "true" : "false");
    });
    cnt.textContent = p.length; cntL.textContent = p.length === 1 ? "platillo" : (p.length ? "platillos" : "de 6");
    out.textContent = st.n;
    segs.forEach(function (s) { s.setAttribute("aria-pressed", s.getAttribute("data-branch") === st.b ? "true" : "false"); });
    days.forEach(function (d) {
      var v = +d.getAttribute("data-d");
      d.setAttribute("aria-pressed", v === st.d ? "true" : "false");
      d.classList.toggle("is-closed", v === B[st.b].cierra);
    });
    var cur = B[st.b], other = st.b === "centro" ? "poniente" : "centro";
    if (cur.cierra === st.d) {
      statusEl.innerHTML = "<strong>" + cur.n + " cierra " + cur.cierraTxt + ".</strong> " + B[other].n + " sí abre " + B[other].horas + " ";
      var sw = document.createElement("button"); sw.type = "button"; sw.className = "lp-swap"; sw.textContent = "Pasar a " + B[other].n;
      sw.addEventListener("click", function () { st.b = other; render(); });
      statusEl.appendChild(document.createElement("br")); statusEl.appendChild(sw);
    } else {
      statusEl.textContent = cur.n + " abre el " + DIAS[st.d] + " " + cur.horas;
    }
    wa.href = "https://wa.me/" + B[st.b].num + "?text=" + encodeURIComponent(message());
  }
  function say(t, warn) { hint.textContent = t; hint.classList.toggle("is-warn", !!warn); }
  function toggle(id) {
    var at = st.slots.indexOf(id);
    if (at > -1) { st.slots[at] = null; say(HINT); }
    else {
      var free = st.slots.indexOf(null);
      if (free < 0) { say("La charola es de 6. Quita uno, o pide más por WhatsApp.", true); return; }
      st.slots[free] = id; say(dishes[id].label + " ya está en la charola.");
    }
    render();
  }
  Object.keys(dishes).forEach(function (k) {
    dishes[k].el.querySelector(".lp-add").addEventListener("click", function () { toggle(k); });
  });
  slotEls.forEach(function (s) {
    s.addEventListener("click", function () {
      var id = s.getAttribute("data-id");
      if (id) toggle(id); else { var d = root.querySelector(".lp-dishes"); if (d && window.innerWidth < 820) d.scrollIntoView({ block: "nearest", behavior: "auto" }); }
    });
  });
  document.getElementById("n-dec").addEventListener("click", function () { st.n = Math.max(1, st.n - 1); render(); });
  document.getElementById("n-inc").addEventListener("click", function () { st.n = Math.min(20, st.n + 1); render(); });
  segs.forEach(function (s) { s.addEventListener("click", function () { st.b = s.getAttribute("data-branch"); render(); }); });
  days.forEach(function (d) { d.addEventListener("click", function () { st.d = +d.getAttribute("data-d"); render(); }); });
  render();
})();
