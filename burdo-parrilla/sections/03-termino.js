(function () {
  "use strict";
  var NAMES = ["Rojo", "Medio", "Tres cuartos", "Bien cocido"];
  var LV = [
    { c2: "#c9514c", s2: 1, c3: "#9a1420", s3: 1, heat: .25 },
    { c2: "#d9776d", s2: .92, c3: "#b32a33", s3: .68, heat: .5 },
    { c2: "#cf8f7e", s2: .74, c3: "#b84a48", s3: .32, heat: .72 },
    { c2: "#a5714f", s2: .5, c3: "#a5714f", s3: .001, heat: .95 }
  ];
  var DISH = [["parrillada", "Parrillada en piedra"], ["cortes", "Cortes a la parrilla"], ["pizza-arrachera", "Pizza de arrachera con chorizo"], ["pizza-arugula", "Pizza de arúgula"], ["ensalada", "Ensalada"], ["cocteles", "Cocteles"]];
  function init() {
    var B = window.Burdo, st = { t: 1, n: 4 };
    var svg = document.querySelector(".bd-cut"), nameEl = document.getElementById("bd-cut-name");
    var segs = document.querySelectorAll(".bd-seg button"), nEl = document.getElementById("bd-n");
    var chipsEl = document.getElementById("bd-chips"), tk = document.getElementById("bd-ticket-m"), send = document.getElementById("bd-send");
    if (!svg) return;
    var chips = DISH.map(function (d) {
      var b = document.createElement("button"); b.type = "button"; b.className = "bd-chip"; b.textContent = d[1]; b.setAttribute("data-key", d[0]); b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", function () { B.toggle(d[0]); }); chipsEl.appendChild(b); return b;
    });
    function lista() {
      var n = DISH.filter(function (d) { return B.has(d[0]); }).map(function (d) { return d[1].toLowerCase(); });
      if (n.length < 2) return n.join("");
      return n.slice(0, -1).join(", ") + " y " + n[n.length - 1];
    }
    function msg() {
      var m = "Hola Burdo, vi su página. Somos " + st.n + (st.n === 1 ? " persona" : " personas") + ".";
      var l = lista();
      if (l) m += " Nos late: " + l + ".";
      m += " Término: " + NAMES[st.t].toLowerCase() + ". ¿Tienen mesa?";
      return m;
    }
    function paint() {
      var v = LV[st.t];
      svg.style.setProperty("--c2", v.c2); svg.style.setProperty("--s2", v.s2);
      svg.style.setProperty("--c3", v.c3); svg.style.setProperty("--s3", v.s3); svg.style.setProperty("--heat", v.heat);
      nameEl.textContent = NAMES[st.t]; nEl.textContent = st.n;
      [].forEach.call(segs, function (s) { s.setAttribute("aria-checked", String(+s.getAttribute("data-t") === st.t)); });
      chips.forEach(function (c) { c.setAttribute("aria-pressed", String(B.has(c.getAttribute("data-key")))); });
      var m = msg(); tk.textContent = m; send.href = B.waUrl(m);
    }
    [].forEach.call(segs, function (s) { s.addEventListener("click", function () { st.t = +s.getAttribute("data-t"); paint(); svg.classList.remove("is-hot"); void svg.getBoundingClientRect(); svg.classList.add("is-hot"); }); });
    [].forEach.call(document.querySelectorAll(".bd-st-b"), function (b) { b.addEventListener("click", function () { st.n = Math.max(1, Math.min(20, st.n + (+b.getAttribute("data-d")))); paint(); }); });
    B.on(paint); paint();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
