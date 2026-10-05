(function () {
  var root = document.getElementById("mesa"); if (!root) return;
  var qty = {}, order = [], pers = 4, dia = "hoy", TEL = "+524499635657";
  var list = document.getElementById("tk-list"), empty = document.getElementById("tk-empty");
  var meta = document.getElementById("tk-meta"), persEl = document.getElementById("pers");
  var tk = document.getElementById("ticket"), msg = document.getElementById("tk-msg");
  var dishes = root.querySelectorAll(".dish");
  function name(el) { return el.getAttribute("data-name"); }
  function renderCtl(el) {
    var id = el.getAttribute("data-id"), q = qty[id] || 0, c = el.querySelector(".ctl");
    el.classList.toggle("is-on", q > 0);
    if (!q) { c.innerHTML = '<button type="button" class="add">Agregar</button>'; return; }
    c.innerHTML = '<div class="qty"><button type="button" data-d="-1" aria-label="Quitar uno">&minus;</button><output>' + q + '</output><button type="button" data-d="1" aria-label="Agregar uno">+</button></div>';
  }
  function texto() {
    var t = "Hola, buenas tardes. Quiero mesa para " + pers + (pers === 1 ? " persona " : " personas ") + dia + ".";
    if (order.length) {
      t += " Quisiera: " + order.map(function (id) { return qty[id] + " " + nameOf(id); }).join(", ") + ". ¿Cuánto sería?";
    }
    return t;
  }
  function nameOf(id) { for (var i = 0; i < dishes.length; i++) if (dishes[i].getAttribute("data-id") === id) return name(dishes[i]); return id; }
  function paint() {
    meta.textContent = pers + (pers === 1 ? " persona · " : " personas · ") + dia.replace("el ", "");
    persEl.textContent = pers;
    list.innerHTML = order.map(function (id) { return "<li><span>" + nameOf(id) + "</span><b>x" + qty[id] + "</b></li>"; }).join("");
    tk.classList.toggle("tk-has", order.length > 0);
    var n = 0; order.forEach(function (id) { n += qty[id]; });
    barN.textContent = n; barT.textContent = n === 1 ? "platillo en tu recado" : "platillos en tu recado";
    bar.hidden = !(n > 0 && inMesa && !tkSeen);
  }
  var bar = document.getElementById("tk-bar"), barN = document.getElementById("tk-bar-n"), barT = document.getElementById("tk-bar-t");
  var inMesa = false, tkSeen = false;
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.target === tk) tkSeen = en.isIntersecting; else inMesa = en.isIntersecting; });
      paint();
    }).observe(root);
    new IntersectionObserver(function (es) { es.forEach(function (en) { tkSeen = en.isIntersecting; }); paint(); }, { rootMargin: "0px 0px -80px 0px" }).observe(tk);
  }
  Array.prototype.forEach.call(dishes, renderCtl);
  paint();
  root.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    var el = b.closest(".dish");
    if (el) {
      var id = el.getAttribute("data-id");
      if (b.classList.contains("add")) { qty[id] = 1; order.push(id); }
      else if (b.hasAttribute("data-d")) {
        qty[id] = (qty[id] || 0) + parseInt(b.getAttribute("data-d"), 10);
        if (qty[id] <= 0) { qty[id] = 0; order = order.filter(function (x) { return x !== id; }); }
        if (qty[id] > 20) qty[id] = 20;
      }
      renderCtl(el); paint(); msg.hidden = true; return;
    }
    if (b.hasAttribute("data-pers")) { pers = Math.max(1, Math.min(30, pers + parseInt(b.getAttribute("data-pers"), 10))); paint(); return; }
    if (b.hasAttribute("data-dia")) {
      dia = b.getAttribute("data-dia");
      Array.prototype.forEach.call(root.querySelectorAll("[data-dia]"), function (x) { x.setAttribute("aria-checked", x === b ? "true" : "false"); });
      paint(); return;
    }
    if (b.id === "tk-copy") {
      var t = texto();
      function ok() { msg.textContent = "Copiado. Pégalo o dícteselo al llamar."; msg.hidden = false; }
      function fallback() { var ta = document.createElement("textarea"); ta.value = t; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0"; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); ok(); } catch (x) { msg.textContent = t; msg.hidden = false; } document.body.removeChild(ta); }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(ok, fallback); else fallback();
    }
  });
  document.getElementById("tk-call").addEventListener("click", function () {
    if (order.length) { try { navigator.clipboard && navigator.clipboard.writeText(texto()); } catch (x) {} }
  });
  window.CascadasMesa = { texto: texto };
})();
