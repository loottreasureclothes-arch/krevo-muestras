/* Los Abolengos · FUNDACIÓN (turno 1, 20 sep 2026): WhatsApp, menú, hoja "Aparta tu mesa",
   franja de la mañana (componente firma), header que se compacta, blindaje.
   API para secciones:
     window.AB.WA            número (524498050420)
     window.AB.waUrl(msg)    link wa.me con el texto codificado
     window.AB.openWa(msg)   abre WhatsApp; si el navegador lo bloquea cae a location.href
     window.AB.franjaState() {open, frac, minsLeft} con la hora del VISITANTE
     window.AB.selectedHour  hora elegida en la franja ("8:00".."12:30") o null
   [data-wa="mensaje"] en cualquier <a> arma su link solo. [data-hide-wa] esconde el WA flotante.
   [data-open-sheet] abre la hoja "Aparta tu mesa"; puede llevar data-hour="9:00" para preseleccionar. */
(function () {
  "use strict";
  var WA = "524498050420"; // Los Abolengos, WhatsApp real (research/hechos.md)
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  try { if ("scrollRestoration" in history) history.scrollRestoration = "manual"; } catch (e) {}

  function waUrl(msg) { return "https://wa.me/" + WA + (msg ? "?text=" + encodeURIComponent(msg) : ""); }
  function openWa(msg) {
    var url = waUrl(msg), w = null;
    try { w = window.open(url, "_blank"); if (w) w.opener = null; } catch (e) { w = null; }
    if (!w) { try { location.href = url; } catch (e2) {} }
    return url;
  }

  /* ---------- Franja de la mañana: 8:00 a 1:00 pm, hora del dispositivo del visitante ---------- */
  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  function franjaState() {
    var now = new Date();
    var h = now.getHours() + now.getMinutes() / 60;
    var open = h >= 8 && h < 13;
    var frac = open ? Math.max(0, Math.min(1, (h - 8) / 5)) : (h < 8 ? 0 : 1);
    var minsLeft = open ? Math.round((13 - h) * 60) : null;
    return { open: open, frac: frac, minsLeft: minsLeft, h: h };
  }
  function fmtMins(m) {
    var hh = Math.floor(m / 60), mm = m % 60;
    if (hh <= 0) return mm + " min";
    return hh + " h" + (mm ? " " + mm : "");
  }
  var selectedHour = null;

  /* ---------- Carrito "Mi pedido" (turno 2): catálogo -> hoja -> WhatsApp.
     [data-add-item][data-item-id][data-item-name][data-item-price] agrega 1.
     [data-item-inc="id"] / [data-item-dec="id"] suman o restan.
     Se refleja en [data-item-id] (clase .has-qty + [data-item-qty]), en la
     barra fija [data-cart-bar] y dentro de la hoja (#ab-cart-block/list/total). */
  var CART_KEY = "ab_cart_v1";
  var cart = {};
  function loadCart() {
    try { var raw = localStorage.getItem(CART_KEY); if (raw) cart = JSON.parse(raw) || {}; } catch (e) { cart = {}; }
  }
  function saveCart() { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {} }
  function cartCount() { var n = 0; for (var k in cart) n += cart[k].qty; return n; }
  function cartTotal() { var t = 0; for (var k in cart) t += cart[k].qty * cart[k].price; return t; }
  function fmtMoney(n) { return "$" + Math.round(n || 0).toLocaleString("es-MX"); }
  function cartSet(id, qty, name, price) {
    qty = Math.max(0, Math.min(20, qty));
    if (qty <= 0) { delete cart[id]; }
    else { cart[id] = { name: name || (cart[id] && cart[id].name) || id, price: price != null ? price : (cart[id] && cart[id].price) || 0, qty: qty }; }
    saveCart(); renderCart();
  }
  function renderCart() {
    var n = cartCount();
    var bars = document.querySelectorAll("[data-cart-bar]");
    for (var i = 0; i < bars.length; i++) {
      bars[i].classList.toggle("is-visible", n > 0);
      var cEl = bars[i].querySelector("[data-cart-count]");
      if (cEl) cEl.textContent = n;
    }
    var cards = document.querySelectorAll("[data-item-id]");
    for (var j = 0; j < cards.length; j++) {
      var id = cards[j].getAttribute("data-item-id");
      var qty = (cart[id] && cart[id].qty) || 0;
      cards[j].classList.toggle("has-qty", qty > 0);
      var q = cards[j].querySelector("[data-item-qty]");
      if (q) q.textContent = qty;
    }
    var listEl = document.getElementById("ab-cart-list");
    if (listEl) {
      listEl.innerHTML = "";
      for (var k in cart) {
        var it = cart[k], li = document.createElement("li");
        li.className = "ab-cart-row";
        li.innerHTML = '<span class="ab-cart-row-name">' + it.qty + "&times; " + it.name + '</span><span class="ab-cart-row-p tab-num">' + fmtMoney(it.qty * it.price) + "</span>";
        listEl.appendChild(li);
      }
    }
    var totalEl = document.getElementById("ab-cart-total");
    if (totalEl) totalEl.textContent = fmtMoney(cartTotal());
    var block = document.getElementById("ab-cart-block");
    if (block) block.hidden = n === 0;
    var titleEl = document.getElementById("ab-sheet-t");
    if (titleEl) titleEl.textContent = n > 0 ? "Tu pedido" : "Aparta tu mesa";
  }
  function initCart() {
    loadCart();
    document.addEventListener("click", function (e) {
      var add = e.target.closest && e.target.closest("[data-add-item]");
      if (add) {
        e.preventDefault();
        var id = add.getAttribute("data-item-id");
        cartSet(id, ((cart[id] && cart[id].qty) || 0) + 1, add.getAttribute("data-item-name"), parseFloat(add.getAttribute("data-item-price")));
        return;
      }
      var inc = e.target.closest && e.target.closest("[data-item-inc]");
      if (inc) { var id2 = inc.getAttribute("data-item-inc"); cartSet(id2, ((cart[id2] && cart[id2].qty) || 0) + 1); return; }
      var dec = e.target.closest && e.target.closest("[data-item-dec]");
      if (dec) { var id3 = dec.getAttribute("data-item-dec"); cartSet(id3, ((cart[id3] && cart[id3].qty) || 0) - 1); return; }
    });
    renderCart();
  }

  function renderFranja() {
    var st = franjaState();
    document.body.classList.toggle("ab-closed", !st.open);
    var fullText = st.open
      ? "Faltan " + "<b>" + fmtMins(st.minsLeft) + "</b>" + " para que cierre la cocina."
      : "Mañana abrimos a las <b>8:00</b>.";
    var miniText = st.open ? "faltan " + fmtMins(st.minsLeft) : "mañana abrimos 8:00";
    var apartarLabel = st.open ? "APARTAR MESA" : "APARTAR PARA MAÑANA";

    var fills = document.querySelectorAll("[data-franja-fill]");
    for (var i = 0; i < fills.length; i++) fills[i].style.width = (st.open ? st.frac * 100 : 100) + "%";

    var texts = document.querySelectorAll("[data-franja-text]");
    for (var j = 0; j < texts.length; j++) texts[j].innerHTML = fullText;

    var minis = document.querySelectorAll("[data-franja-mini-text]");
    for (var k = 0; k < minis.length; k++) minis[k].textContent = miniText;

    var marks = document.querySelectorAll(".ab-franja-mark");
    for (var m = 0; m < marks.length; m++) {
      var hh = parseFloat(marks[m].getAttribute("data-hour"));
      marks[m].setAttribute("data-active", st.open && hh <= st.h ? "true" : "false");
    }

    var labels = document.querySelectorAll("[data-apartar-label]");
    for (var n = 0; n < labels.length; n++) labels[n].textContent = apartarLabel;

    return st;
  }

  function initFranjaClicks() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest && e.target.closest(".ab-franja-mark");
      if (!btn) return;
      var marks = document.querySelectorAll(".ab-franja-mark");
      for (var i = 0; i < marks.length; i++) marks[i].classList.remove("is-sel");
      btn.classList.add("is-sel");
      selectedHour = btn.getAttribute("data-label") || null;
      var sel = document.getElementById("ab-sheet-hour");
      if (sel && selectedHour) { try { sel.value = selectedHour; } catch (e2) {} }
    });
  }

  window.AB = { WA: WA, waUrl: waUrl, openWa: openWa, franjaState: franjaState, get selectedHour() { return selectedHour; } };

  /* ---------- [data-wa] ---------- */
  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) {
      var a = links[i], msg = a.getAttribute("data-wa");
      if (a.tagName !== "A") continue;
      a.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg && msg.length > 3 ? msg : "Hola, quiero apartar mesa en Los Abolengos.");
      a.target = "_blank"; a.rel = "noopener";
    }
  }

  /* ---------- Header: placa que se compacta a los 40px (mismo umbral que kit.js usa para is-solid) ---------- */
  function initHeaderScroll() {
    var ticking = false;
    function update() { ticking = false; document.body.classList.toggle("ab-scrolled", (window.scrollY || window.pageYOffset) > 40); }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- Menú (hamburguesa) ---------- */
  function initNav() {
    var btn = document.querySelector(".ab-burger"), nav = document.getElementById("ab-nav");
    if (!btn || !nav) return;
    var body = document.body, pushed = false;
    Array.prototype.forEach.call(nav.querySelectorAll(".ab-nav-list > a"), function (a, i) { a.style.setProperty("--i", i); });
    var links = nav.querySelectorAll("a, button");
    function set(open, fromPop) {
      if (open === body.classList.contains("ab-nav-open")) return;
      body.classList.toggle("ab-nav-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      nav.setAttribute("aria-hidden", open ? "false" : "true");
      if (open) {
        try { history.pushState({ abNav: 1 }, ""); pushed = true; } catch (e) {}
        setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 80);
      } else {
        if (pushed && !fromPop) { pushed = false; try { history.back(); } catch (e) {} }
        pushed = false;
        btn.focus({ preventScroll: true });
      }
    }
    window.addEventListener("popstate", function () {
      if (body.classList.contains("ab-nav-open")) { set(false, true); return; }
      if (body.classList.contains("ab-sheet-open")) { closeSheet(true); }
    });
    btn.addEventListener("click", function () { set(!body.classList.contains("ab-nav-open")); });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") || e.target.classList.contains("ab-nav-scrim")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("ab-nav-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); }
    });
  }

  /* ---------- Estado activo del panel de navegación (nav real, no solo anclas muertas) ---------- */
  function initNavActive() {
    var links = document.querySelectorAll(".ab-nav-list > a[data-section]");
    if (!links.length || !("IntersectionObserver" in window)) return;
    var map = {};
    links.forEach(function (a) {
      var id = a.getAttribute("data-section"), el = document.getElementById(id);
      if (el) map[id] = map[id] || []; if (el) map[id].push(a);
    });
    var current = null;
    function mark(id) {
      if (id === current) return;
      current = id;
      links.forEach(function (a) { a.removeAttribute("aria-current"); });
      (map[id] || []).forEach(function (a) { a.setAttribute("aria-current", "true"); });
    }
    var io = new IntersectionObserver(function (entries) {
      var best = null, bestRatio = 0;
      entries.forEach(function (e) {
        if (e.isIntersecting && e.intersectionRatio > bestRatio) { bestRatio = e.intersectionRatio; best = e.target.id; }
      });
      if (best) mark(best);
    }, { threshold: [0.15, 0.3, 0.5, 0.7] });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }

  /* ---------- Hoja: Aparta tu mesa ---------- */
  var sheetPushed = false;
  function closeSheet(fromPop) {
    document.body.classList.remove("ab-sheet-open");
    if (sheetPushed && !fromPop) { sheetPushed = false; try { history.back(); } catch (e) {} }
    sheetPushed = false;
  }
  function openSheet(hour) {
    document.body.classList.add("ab-sheet-open");
    try { history.pushState({ abSheet: 1 }, ""); sheetPushed = true; } catch (e) {}
    var sel = document.getElementById("ab-sheet-hour");
    if (sel) {
      var h = hour || selectedHour;
      if (h) { try { sel.value = h; } catch (e2) {} }
      else {
        var st = franjaState();
        if (!st.open) sel.value = "8:00";
      }
    }
  }
  function initSheet() {
    var sheet = document.getElementById("ab-sheet");
    if (!sheet) return;
    document.addEventListener("click", function (e) {
      var opener = e.target.closest && e.target.closest("[data-open-sheet]");
      if (opener) { e.preventDefault(); openSheet(opener.getAttribute("data-hour")); return; }
      if (e.target.closest && e.target.closest("[data-sheet-close]")) { closeSheet(); return; }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("ab-sheet-open")) closeSheet();
    });
    var stepper = sheet.querySelector(".ab-stepper");
    if (stepper) {
      var input = stepper.querySelector("input");
      stepper.addEventListener("click", function (e) {
        var b = e.target.closest("button[data-step]");
        if (!b) return;
        var v = Math.max(1, Math.min(20, (parseInt(input.value, 10) || 1) + parseInt(b.getAttribute("data-step"), 10)));
        input.value = v;
      });
    }
    var send = document.getElementById("ab-sheet-send");
    if (send) {
      send.addEventListener("click", function (e) {
        e.preventDefault();
        var hour = (document.getElementById("ab-sheet-hour") || {}).value || "8:00";
        var people = (document.getElementById("ab-sheet-people") || {}).value || "2";
        var msg;
        if (cartCount() > 0) {
          var lines = [];
          for (var k in cart) lines.push(cart[k].qty + "x " + cart[k].name + " (" + fmtMoney(cart[k].qty * cart[k].price) + ")");
          msg = "Hola, quiero este pedido en Los Abolengos:\n" + lines.join("\n") +
            "\nHora: " + hour + " · Personas: " + people +
            "\nTotal: " + fmtMoney(cartTotal()) +
            "\nTarjeta en línea: me confirman el link, por favor.";
        } else {
          msg = "Hola, quiero apartar mesa en Los Abolengos a las " + hour + " para " + people + " personas.";
        }
        openWa(msg);
      });
    }
  }

  /* ---------- WA flotante: fuera sobre [data-hide-wa] y el pie ---------- */
  function initWaHide() {
    setTimeout(function () { document.body.classList.add("ab-wa-ready"); }, 2000);
    if (!("IntersectionObserver" in window)) return;
    var on = new Set();
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) on.add(e.target); else on.delete(e.target); });
      document.body.classList.toggle("ab-wa-off", on.size > 0);
    }, { rootMargin: "0px 0px -12% 0px" });
    var seen = [];
    function scan() {
      Array.prototype.forEach.call(document.querySelectorAll("[data-hide-wa], .ab-foot"), function (z) {
        if (seen.indexOf(z) < 0) { seen.push(z); io.observe(z); }
      });
    }
    scan(); setTimeout(scan, 1500);
  }

  /* ---------- Blindaje: a 1.6s de asomarse, [data-reveal] queda visible pase lo que pase ---------- */
  function initRevealSafety() {
    var els = document.querySelectorAll("[data-reveal], [data-reveal-stagger]");
    function show(el) { el.classList.add("is-in"); }
    if (reduce || !("IntersectionObserver" in window)) { Array.prototype.forEach.call(els, show); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var el = e.target;
        setTimeout(function () { show(el); }, 1600);
      });
    }, { rootMargin: "0px" });
    Array.prototype.forEach.call(els, function (el) { io.observe(el); });
  }

  function initRipple() {
    if (reduce) return;
    document.addEventListener("pointerdown", function (e) {
      var b = e.target.closest && e.target.closest(".ab-btn:not(.ab-btn--link), .k-btn");
      if (!b) return;
      var r = b.getBoundingClientRect(), s = document.createElement("span");
      s.style.cssText = "position:absolute;z-index:-1;width:180px;height:180px;margin:-90px 0 0 -90px;pointer-events:none;background:radial-gradient(closest-side,rgba(255,255,255,.35),rgba(255,255,255,0));border-radius:50%;animation:ab-ripple 420ms " + "cubic-bezier(.23,1,.32,1)" + " forwards;";
      s.style.left = (e.clientX - r.left) + "px"; s.style.top = (e.clientY - r.top) + "px";
      b.appendChild(s); setTimeout(function () { s.remove(); }, 460);
    });
  }

  function scrollToEl(el) {
    var head = document.querySelector(".k-header");
    var top = el.getBoundingClientRect().top + window.scrollY - (head ? head.offsetHeight : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href");
      if (href.length < 2 || href.indexOf("?") > -1) return;
      var el; try { el = document.querySelector(href); } catch (x) { return; }
      if (!el) return;
      e.preventDefault();
      scrollToEl(el);
      try { history.replaceState(history.state, "", href); } catch (x2) {}
    });
  }

  function init() {
    renderFranja(); setInterval(renderFranja, 60000);
    initFranjaClicks(); initWa(); initHeaderScroll(); initNav(); initNavActive(); initSheet(); initCart();
    initWaHide(); initRevealSafety(); initRipple(); initAnchors();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  var style = document.createElement("style");
  style.textContent = "@keyframes ab-ripple{from{opacity:1;transform:scale(.3)}to{opacity:0;transform:scale(1.6)}}";
  document.head.appendChild(style);
})();

/* ---------- Títulos [data-drop]: caen desde arriba y pegan con rebote corto, una vez al asomar.
   Reposo del CSS = título puesto (blindaje); a 1.6s de asomarse queda puesto pase lo que pase. ---------- */
(function () {
  "use strict";
  var els = document.querySelectorAll("[data-drop]");
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!els.length || reduce || !document.body.animate || !("IntersectionObserver" in window)) return;
  document.body.classList.add("ab-titles-js");

  function spring(n, amp, turns, decay) {
    var k = [];
    for (var i = 0; i <= n; i++) {
      var t = i / n;
      k.push(i === n ? 0 : amp * Math.exp(-decay * t) * Math.sin(turns * Math.PI * 2 * t));
    }
    return k;
  }
  function play(el) {
    var ND = 9, NB = 14, total = ND + NB, frames = [], i, t, e, y, start = -42;
    for (i = 0; i <= ND; i++) { t = i / ND; e = t * t * t; y = start * (1 - e); frames.push({ transform: "translateY(" + y.toFixed(2) + "px)", opacity: i === 0 ? 0 : 1, offset: i / total }); }
    var bounce = spring(NB, 6, 1.4, 4.8);
    for (i = 1; i <= NB; i++) { frames.push({ transform: "translateY(" + bounce[i - 1].toFixed(2) + "px)", opacity: 1, offset: (ND + i) / total }); }
    el.animate(frames, { duration: 640, easing: "linear" });
    el.classList.add("is-dropped");
  }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (!e.isIntersecting) return; io.unobserve(e.target); play(e.target); });
  }, { threshold: 0.1, rootMargin: "0px 0px -8% 0px" });
  Array.prototype.forEach.call(els, function (el) { io.observe(el); });

  var safe = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      safe.unobserve(e.target);
      var el = e.target;
      setTimeout(function () { el.classList.add("is-dropped"); }, 1600);
    });
  }, { threshold: 0 });
  Array.prototype.forEach.call(els, function (el) { safe.observe(el); });
})();
