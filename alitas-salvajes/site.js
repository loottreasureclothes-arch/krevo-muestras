/* Alitas Salvajes: header, menu, WhatsApp, reveal, estado de horario y Arma tu kilo. */
(function () {
  "use strict";
  var WA = "524494399848";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  /* El href ya nace real en el HTML; aqui solo se confirma el mensaje. */
  function initWa() {
    $$("[data-wa]").forEach(function (a) { a.href = waUrl(a.getAttribute("data-wa")); a.target = "_blank"; a.rel = "noopener"; });
  }

  /* Menu */
  var closeMenu = function () {};
  function initMenu() {
    var btn = $(".as-menu-btn"), menu = $("#as-menu");
    if (!btn || !menu) return;
    var lbl = $(".as-menu-lbl", btn), body = document.body;
    function set(open) {
      body.classList.toggle("as-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (lbl) lbl.textContent = open ? "Cerrar" : "Menú";
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("as-menu-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a") || e.target === menu) set(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }

  /* Vigia por sondeo (sin IntersectionObserver) */
  function watchVisible(list, frac, cb) {
    var pending = list.slice(), raf = null;
    if (!pending.length) return;
    function tick() {
      raf = null;
      var vh = window.innerHeight;
      for (var i = pending.length - 1; i >= 0; i--) {
        var r = pending[i].getBoundingClientRect();
        if (r.top < vh * frac && r.bottom > 0) { cb(pending[i]); pending.splice(i, 1); }
      }
    }
    function sch() { if (!raf) raf = requestAnimationFrame(tick); }
    sch(); window.addEventListener("scroll", sch, { passive: true }); window.addEventListener("resize", sch);
  }
  function initReveal() {
    var els = $$("[data-reveal]");
    if (reduce) { els.forEach(function (e) { e.classList.add("is-in"); }); return; }
    watchVisible(els, 0.92, function (el) { el.classList.add("is-in"); });
  }

  /* WA flotante se esconde donde ya hay boton grande */
  function initWaHide() {
    var zones = $$("#visita, #arma, .as-foot, #listo");
    var raf = null;
    function update() {
      raf = null;
      var vh = window.innerHeight, on = false;
      zones.forEach(function (z) { var r = z.getBoundingClientRect(); if (r.top < vh * 0.7 && r.bottom > vh * 0.3) on = true; });
      document.body.classList.toggle("as-wa-off", on);
    }
    function sch() { if (!raf) raf = requestAnimationFrame(update); }
    sch(); window.addEventListener("scroll", sch, { passive: true }); window.addEventListener("resize", sch);
  }

  /* Anclas */
  function go(el) {
    var head = $(".as-bar");
    var top = el.getBoundingClientRect().top + window.scrollY - (head ? head.offsetHeight + 8 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href");
      if (href.length < 2) { if (href === "#") return; }
      var el = href === "#top" ? document.body : $(href);
      if (!el) return;
      e.preventDefault(); closeMenu();
      if (href === "#top") window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); else go(el);
    });
  }

  /* Horario real: Mie-Sab 14:30-22:30, Dom 14:30-19:00, Lun-Mar cerrado */
  var DIAS = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
  var HOR = { 0: [870, 1140], 1: null, 2: null, 3: [870, 1350], 4: [870, 1350], 5: [870, 1350], 6: [870, 1350] };
  function nowMx() {
    var s = new Date().toLocaleString("en-US", { timeZone: "America/Mexico_City", hour12: false, weekday: "short", hour: "2-digit", minute: "2-digit" });
    var m = s.match(/(\w{3}),? (\d{1,2}):(\d{2})/);
    var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    var h = parseInt(m[2], 10) % 24;
    return { d: map[m[1]], min: h * 60 + parseInt(m[3], 10) };
  }
  function status() {
    var n = nowMx(), t = HOR[n.d];
    if (t && n.min >= t[0] && n.min < t[1]) return { open: true, label: "Abierto ahora", short: "Abierto ahora" };
    if (t && n.min < t[0]) return { open: false, label: "Hoy abrimos 2:30 pm", short: "Hoy abrimos 2:30 pm" };
    for (var i = 1; i <= 7; i++) {
      var d = (n.d + i) % 7;
      if (HOR[d]) return { open: false, label: "Cerrado. Abrimos " + (i === 1 ? "mañana" : "el " + DIAS[d]) + " 2:30 pm", short: "Abrimos " + (i === 1 ? "mañana" : DIAS[d]) + " 2:30 pm" };
    }
    return { open: false, label: "Cerrado", short: "Cerrado" };
  }
  function initStatus() {
    var st; try { st = status(); } catch (e) { return; }
    $$("[data-open-label]").forEach(function (el) { el.textContent = st.short; });
    var o = $("#as-open"); if (o) { o.textContent = st.label; o.classList.toggle("is-on", st.open); }
    var n; try { n = nowMx(); } catch (e) { return; }
    $$("#as-hor li").forEach(function (li) { li.classList.toggle("is-today", parseInt(li.getAttribute("data-dow"), 10) === n.d); });
    var neon = $("#as-neon"), hero = $("#inicio");
    if (neon && hero) {
      var raf = null;
      function upd() { raf = null; neon.classList.toggle("is-off", hero.getBoundingClientRect().bottom < 80); }
      window.addEventListener("scroll", function () { if (!raf) raf = requestAnimationFrame(upd); }, { passive: true });
    }
  }

  /* ---------- Arma tu kilo ---------- */
  var SAUCES = [
    ["BBQ", "#6b2a12"], ["Parmesano", "#e8d9a8"], ["Pimienta limón", "#c9c24a"], ["Especial", "#c43b1c"],
    ["Tamarindo", "#8c4a1b"], ["Búfalo", "#e0541f"], ["Mango habanero", "#f29a1f"]
  ];
  var SIDES = [
    { id: "gajo", n: "Papas gajo", p: 50, g: "papas" },
    { id: "ond", n: "Papas onduladas", p: 50, g: "papas" },
    { id: "aros", n: "Aros de cebolla", p: 60 },
    { id: "dedos", n: "Dedos de queso", p: 80 },
    { id: "tiras", n: "Tiras de pollo 400 gr", p: 140 }
  ];
  function initArma() {
    var tray = $("#as-tray"); if (!tray) return;
    var NS = "http://www.w3.org/2000/svg";
    var st = { size: 1, half: "A", a: 0, b: 5, sides: {} };
    var POS = [[96, 84, -35], [62, 138, 20], [104, 150, -10], [78, 200, 40], [124, 108, 60], [112, 206, -30], [66, 92, -60], [130, 160, 25], [92, 118, 10]];
    var gA = $("#as-wingsA"), gB = $("#as-wingsB");
    function wing(g, x, y, rot, i) {
      var w = document.createElementNS(NS, "g"); w.setAttribute("class", "w"); w.dataset.i = i;
      w.setAttribute("transform", "translate(" + x + " " + y + ") rotate(" + rot + ")");
      var inner = document.createElementNS(NS, "g");
      inner.innerHTML = '<path class="body" d="M-10 0 C-4 -16 22 -16 30 0 C22 16 -4 16 -10 0Z"/><circle cx="-12" cy="0" r="4.5" fill="#f6ead7"/><ellipse cx="10" cy="-6" rx="9" ry="3" fill="#fff" opacity=".28"/>';
      w.appendChild(inner); g.appendChild(w); return w;
    }
    POS.forEach(function (p, i) { wing(gA, p[0], p[1], p[2], i); wing(gB, 300 - p[0], p[1], 180 - p[2] + (i % 3) * 8, i); });
    var chips = $("#as-sauces");
    SAUCES.forEach(function (s, i) {
      var b = document.createElement("button"); b.type = "button"; b.className = "as-sauce"; b.dataset.i = i;
      b.innerHTML = '<i style="background:' + s[1] + '"></i><span>' + s[0] + '</span><span class="tag"></span>';
      chips.appendChild(b);
    });
    var sides = $("#as-sides");
    SIDES.forEach(function (s) {
      var b = document.createElement("button"); b.type = "button"; b.className = "as-side"; b.dataset.id = s.id; b.setAttribute("aria-pressed", "false");
      b.innerHTML = "<span>" + s.n + "</span><b>$" + s.p + "</b>"; sides.appendChild(b);
    });
    function paint(g, color, count) {
      $$(".w", g).forEach(function (w) {
        w.classList.toggle("gone", +w.dataset.i >= count);
        var pth = $(".body", w); pth.setAttribute("fill", color); pth.setAttribute("stroke", "rgba(0,0,0,.35)"); pth.setAttribute("stroke-width", "1");
      });
    }
    function render() {
      var one = st.size === 1;
      var sa = SAUCES[st.a], sb = SAUCES[one ? st.b : st.a];
      paint(gA, sa[1], one ? 9 : 5); paint(gB, sb[1], one ? 9 : 5);
      $("#as-split").style.opacity = one ? 1 : 0;
      var halves = $("#as-halves"); halves.hidden = !one;
      $$("button", halves).forEach(function (b) { var on = b.dataset.half === st.half; b.classList.toggle("is-on", on); b.setAttribute("aria-pressed", on); });
      $("#as-which").textContent = one ? "(toca la mitad y escoge)" : "(una sola)";
      $$(".as-sauce").forEach(function (c) {
        var i = +c.dataset.i, isA = i === st.a, isB = one && i === st.b;
        c.classList.toggle("is-a", isA); c.classList.toggle("is-b", isB);
        $(".tag", c).textContent = isA && isB ? "A+B" : isA ? "A" : isB ? "B" : "";
      });
      $$("#as-size button").forEach(function (b) { var on = parseFloat(b.dataset.size) === st.size; b.classList.toggle("is-on", on); b.setAttribute("aria-pressed", on); });
      $("#as-cap").textContent = one ? "Mitad A: " + sa[0] + ". Mitad B: " + sb[0] + "." : "Todo en " + sa[0] + ".";
      var total = one ? 229 : 129, names = [];
      SIDES.forEach(function (s) { if (st.sides[s.id]) { total += s.p; names.push(s.n + " ($" + s.p + ")"); } });
      $$(".as-side").forEach(function (b) { b.setAttribute("aria-pressed", st.sides[b.dataset.id] ? "true" : "false"); });
      var desc = one ? "1 kg de alitas (mitad " + sa[0] + ", mitad " + sb[0] + ")" : "1/2 kg de alitas (" + sa[0] + ")";
      var msg = "Hola Alitas Salvajes, quiero armar mi pedido: " + desc + (names.length ? " + " + names.join(" + ") : "") + ". Total: $" + total + ". ¿Me confirman?";
      $("#as-sum").textContent = desc.replace(/ de alitas/, "") + (names.length ? ", " + names.map(function (n) { return n.replace(/ \(\$\d+\)/, ""); }).join(", ") : "");
      var t = $("#as-tot"); if (t.textContent !== "$" + total) { t.textContent = "$" + total; t.classList.add("bump"); setTimeout(function () { t.classList.remove("bump"); }, 250); }
      var a = $("#as-send"); a.href = waUrl(msg); a.setAttribute("data-wa", msg);
    }
    $("#as-size").addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; st.size = parseFloat(b.dataset.size); render(); });
    $("#as-halves").addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; st.half = b.dataset.half; render(); });
    chips.addEventListener("click", function (e) {
      var c = e.target.closest(".as-sauce"); if (!c) return; var i = +c.dataset.i;
      if (st.size === 1 && st.half === "B") st.b = i; else st.a = i;
      render();
    });
    sides.addEventListener("click", function (e) {
      var b = e.target.closest(".as-side"); if (!b) return; var s = SIDES.filter(function (x) { return x.id === b.dataset.id; })[0];
      var on = !st.sides[s.id];
      if (on && s.g) SIDES.forEach(function (o) { if (o.g === s.g) st.sides[o.id] = false; });
      st.sides[s.id] = on; render();
    });
    render();
  }

  function init() { initWa(); initMenu(); initReveal(); initWaHide(); initAnchors(); initStatus(); initArma(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
