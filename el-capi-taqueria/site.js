/* El Capi: menú móvil, WhatsApp, pedido, burro a tu medida, reveal. */
(function () {
  "use strict";
  var WA = "524492645075";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  function money(n) { return "$" + n.toLocaleString("es-MX"); }

  /* enlaces data-wa: el href real ya viene en el HTML; aquí solo se confirma */
  $$("[data-wa]").forEach(function (a) { a.href = waUrl(a.getAttribute("data-wa")); a.target = "_blank"; a.rel = "noopener"; });

  /* header y menú */
  var head = $("#cp-head"), nav = $("#cp-nav"), burger = $(".cp-burger");
  function solid() { head.classList.toggle("is-solid", window.scrollY > 24); }
  window.addEventListener("scroll", solid, { passive: true }); solid();
  function closeMenu() { nav.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
  burger.addEventListener("click", function () {
    var o = nav.classList.toggle("open"); burger.setAttribute("aria-expanded", o ? "true" : "false");
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var href = a.getAttribute("href");
    if (href.length < 2) return;
    var el = $(href);
    if (!el) return;
    e.preventDefault(); closeMenu();
    var top = el.getBoundingClientRect().top + window.scrollY - (head.offsetHeight - 6);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
    if (history.replaceState) history.replaceState(null, "", href);
  });

  /* vigía por sondeo (sin IntersectionObserver) */
  function watch(list, frac, cb, both) {
    var pending = list.slice(), raf = null;
    function tick() {
      raf = null;
      var vh = window.innerHeight;
      for (var i = pending.length - 1; i >= 0; i--) {
        var r = pending[i].getBoundingClientRect();
        var vis = r.top < vh * frac && r.bottom > 0;
        if (both) { cb(pending[i], vis); }
        else if (vis) { var el = pending[i]; pending.splice(i, 1); cb(el); }
      }
      if (pending.length && !both) sched();
    }
    function sched() { if (!raf) raf = requestAnimationFrame(tick); }
    sched(); window.addEventListener("scroll", sched, { passive: true }); window.addEventListener("resize", sched);
  }
  var revs = $$("[data-reveal]");
  if (reduce) revs.forEach(function (e) { e.classList.add("is-in"); });
  else watch(revs, 0.92, function (e) { e.classList.add("is-in"); });

  /* WhatsApp flotante: se esconde donde ya hay un botón verde grande */
  var zones = $$("[data-hide-wa]");
  function waHide() {
    var vh = window.innerHeight, on = false;
    zones.forEach(function (z) { var r = z.getBoundingClientRect(); if (r.top < vh * 0.85 && r.bottom > vh * 0.15) on = true; });
    document.body.classList.toggle("cp-wa-off", on);
  }
  var raf2 = null;
  function s2() { if (!raf2) raf2 = requestAnimationFrame(function () { raf2 = null; waHide(); }); }
  s2(); window.addEventListener("scroll", s2, { passive: true }); window.addEventListener("resize", s2);

  /* ---------- Pedido del menú ---------- */
  var cart = {};
  var list = $("#ped-list"), empty = $("#ped-empty"), totalEl = $("#ped-total"), pedWa = $("#ped-wa");
  var baseMsg = "Hola El Capi, vi su página y quiero hacer un pedido.";
  function lineLabel(l) { return l.qty + " " + l.name + (l.carne ? " de " + l.carne : ""); }
  function render() {
    var keys = Object.keys(cart), total = 0, ask = false, parts = [];
    list.innerHTML = "";
    keys.forEach(function (k) {
      var l = cart[k];
      if (l.price) total += l.price * l.qty; else ask = true;
      parts.push(lineLabel(l) + (l.price ? " (" + money(l.price * l.qty) + ")" : " (precio por confirmar)"));
      var li = document.createElement("li");
      li.innerHTML = '<span class="pl-n">' + l.name + (l.carne ? " de " + l.carne : "") + "<small>" + (l.price ? money(l.price) + " c/u" : "Pregunta el precio") + '</small></span><span class="pl-q"><button type="button" data-k="' + k + '" data-d="-1" aria-label="Quitar uno"><svg aria-hidden="true"><use href="#i-minus"/></svg></button><b>' + l.qty + '</b><button type="button" data-k="' + k + '" data-d="1" aria-label="Agregar uno"><svg aria-hidden="true"><use href="#i-plus"/></svg></button></span>';
      list.appendChild(li);
    });
    empty.hidden = keys.length > 0;
    totalEl.hidden = keys.length === 0;
    if (keys.length) {
      totalEl.innerHTML = (total ? "Total " + money(total) : "Total por confirmar") + (total && ask ? "<small>Más lo que falte por confirmar precio.</small>" : "");
      var msg = "Hola El Capi, quiero pedir: " + parts.join("; ") + "." + (total ? " Total: " + money(total) + (ask ? " más lo que falte por confirmar." : ".") : "") + " ¿Me confirman si hay y cuánto tardan?";
      pedWa.href = waUrl(msg);
    } else pedWa.href = waUrl(baseMsg);
  }
  list.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-k]"); if (!b) return;
    var l = cart[b.getAttribute("data-k")]; if (!l) return;
    l.qty += parseInt(b.getAttribute("data-d"), 10);
    if (l.qty <= 0) delete cart[b.getAttribute("data-k")];
    render();
  });
  $$(".item").forEach(function (it) {
    var carne = it.hasAttribute("data-carnes") ? "pastor" : "";
    $$(".carne", it).forEach(function (c) {
      c.addEventListener("click", function () {
        carne = c.getAttribute("data-carne");
        $$(".carne", it).forEach(function (o) { o.setAttribute("aria-pressed", o === c ? "true" : "false"); });
      });
    });
    $(".add", it).addEventListener("click", function (e) {
      var id = it.getAttribute("data-id"), key = id + "|" + carne, p = it.getAttribute("data-price");
      if (!cart[key]) cart[key] = { name: it.getAttribute("data-name"), price: p ? parseInt(p, 10) : 0, carne: carne, qty: 0 };
      cart[key].qty++;
      render();
      var btn = e.currentTarget; btn.classList.remove("pop"); void btn.offsetWidth; btn.classList.add("pop");
    });
  });
  render();

  /* ---------- Componente firma: el burro a tu medida ---------- */
  var st = { size: "mega", meat: "pastor", aho: "no" };
  var PRICE = { capi: 150, mega: 330 };
  var NAME = { capi: "Capi Burro", mega: "Mega Burro" };
  var ruler = $("#ruler"), fill = $("#ruler-fill");
  function medida() {
    var key = st.size + (st.aho === "si" ? "-aho" : "");
    $$(".stage-img").forEach(function (s) { s.classList.toggle("is-on", s.getAttribute("data-k") === key); });
    fill.style.setProperty("--cut", st.size === "mega" ? "0%" : "52%");
    fill.textContent = st.size === "mega" ? "Mega Burro · 40 cm" : "Capi Burro · el chico";
    var nm = NAME[st.size] + " de " + st.meat + (st.aho === "si" ? ", ahogado" : "");
    $("#m-name").textContent = nm; $("#m-price").textContent = money(PRICE[st.size]);
    $$("[data-size]").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-size") === st.size ? "true" : "false"); });
    $$("[data-meat]").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-meat") === st.meat ? "true" : "false"); });
    $$("[data-aho]").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-aho") === st.aho ? "true" : "false"); });
    var msg = "Hola El Capi, quiero un " + NAME[st.size] + (st.size === "mega" ? " (40 cm)" : "") + " de " + st.meat + (st.aho === "si" ? ", ahogado" : ", seco") + ". Son " + money(PRICE[st.size]) + (st.aho === "si" ? " (confírmenme si el ahogado cambia el precio)" : "") + ". ¿Me confirman si hay y cuánto tardan?";
    $("#m-wa").href = waUrl(msg);
  }
  $$("[data-size]").forEach(function (b) { b.addEventListener("click", function () { st.size = b.getAttribute("data-size"); medida(); }); });
  $$("[data-meat]").forEach(function (b) { b.addEventListener("click", function () { st.meat = b.getAttribute("data-meat"); medida(); }); });
  $$("[data-aho]").forEach(function (b) { b.addEventListener("click", function () { st.aho = b.getAttribute("data-aho"); medida(); }); });
  medida();
  /* Momento firma: la regla se tiende al entrar (reversible); a los 1.6 s queda resuelta pase lo que pase */
  if (reduce) ruler.classList.add("is-live");
  else {
    watch([ruler], 0.85, function (el, vis) { el.classList.toggle("is-live", vis); }, true);
    setTimeout(function () { ruler.classList.add("is-live"); }, 1600);
  }
})();
