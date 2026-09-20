/* Frutería El Milagro · fundación: WhatsApp, menú, reveal con rescate, El pizarrón, anclas
   ===================================================================================
   API del pizarrón para el catálogo (turno 2), igual que MDA.sel en muebles-del-alba:
     FEM.pizarron.add({ id, name, price })   -- price en numero (pesos); nunca 0/undefined
     FEM.pizarron.remove(id)
     FEM.pizarron.has(id)
     FEM.pizarron.clear()
     FEM.pizarron.items()
     FEM.pizarron.open()
     FEM.money(n)
     FEM.openWa(msg, fallbackEl)
   Blindaje (regla 5 de la hoja de direccion): si el catalogo se agrega sin JS, cada
   renglon del catalogo DEBE traer su propio <a href="https://wa.me/..."> con el nombre
   del paquete como respaldo (el "+"/pizarron nunca es la unica forma de pedir). */
(function () {
  "use strict";
  var WA = "524492151585"; // 449 215 1585, numero principal de pedidos (ver PENDIENTE-DUENO.md #10)
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var body = document.body;
  var FEM = window.FEM = window.FEM || {};
  document.documentElement.classList.add("js-rv");
  try { history.scrollRestoration = "manual"; } catch (e) {}

  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  FEM.waUrl = waUrl;
  /* Abre WhatsApp; si el navegador bloquea la ventana, cae a location.href y muestra el
     link de respaldo (L15). */
  FEM.openWa = function (msg, fallbackEl) {
    var url = waUrl(msg);
    var w = null;
    try { w = window.open(url, "_blank"); } catch (e) {}
    if (w) { try { w.opener = null; } catch (e) {} }
    if (fallbackEl) {
      var a = fallbackEl.querySelector("a");
      if (a) a.href = url;
      fallbackEl.hidden = false;
    }
    if (!w) location.href = url;
    return url;
  };
  FEM.money = function (n) { return "$" + Math.round(n).toLocaleString("en-US"); };
  FEM.store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute("href") || "";
      var m = href.match(/wa\.me\/(\d+)/);
      var num = m ? m[1] : WA;
      links[i].href = "https://wa.me/" + num + "?text=" + encodeURIComponent(links[i].getAttribute("data-wa"));
      links[i].target = "_blank";
      links[i].rel = "noopener";
    }
  }

  /* ---------- Modales: historial para que "atrás" en Android cierre (L13) ---------- */
  var modalStack = [];
  FEM.pushModal = function (closeFn) {
    modalStack.push(closeFn);
    body.classList.add("fem-modal");
    try { history.pushState({ femModal: modalStack.length }, ""); } catch (e) {}
  };
  FEM.popModal = function (fromHistory) {
    var fn = modalStack.pop();
    if (!modalStack.length) body.classList.remove("fem-modal");
    if (!fromHistory) { try { history.back(); } catch (e) {} }
    return fn;
  };
  window.addEventListener("popstate", function () {
    if (!modalStack.length) return;
    var fn = FEM.popModal(true);
    if (fn) fn(true);
  });

  /* ---------- Menú ---------- */
  function initMenu() {
    var btn = document.querySelector(".cd-menu-btn");
    var menu = document.getElementById("cd-menu");
    if (!btn || !menu) return;
    Array.prototype.forEach.call(menu.querySelectorAll(".cd-menu-nav > *"), function (el, i) { el.style.setProperty("--i", i); });
    var links = menu.querySelectorAll("a");
    var lbl = btn.querySelector(".cd-menu-lbl");
    function set(open) {
      var was = body.classList.contains("cd-menu-open");
      if (open === was) return;
      body.classList.toggle("cd-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (lbl) lbl.textContent = open ? "CERRAR" : "MENÚ";
      if (open) setTimeout(function () { links[0].focus({ preventScroll: true }); }, 80);
      else btn.focus({ preventScroll: true });
    }
    btn.addEventListener("click", function () { set(!body.classList.contains("cd-menu-open")); });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a") || e.target.classList.contains("cd-menu-scrim")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("cd-menu-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); return; }
      if (e.key === "Tab") {
        var items = [btn].concat(Array.prototype.slice.call(links));
        var i = items.indexOf(document.activeElement);
        e.preventDefault();
        if (i < 0) i = e.shiftKey ? 0 : -1;
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
  }

  /* WA flotante: se esconde donde ya hay contacto o cuando hay algo en el pizarron
     (L11: visibility, no opacity). */
  function initWaHide() {
    var zones = document.querySelectorAll("#visitanos, .cd-foot");
    if (!zones.length || !("IntersectionObserver" in window)) return;
    var on = new Set();
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) on.add(e.target); else on.delete(e.target); });
      body.classList.toggle("fem-wa-off", on.size > 0);
    }, { rootMargin: "0px 0px -18% 0px" });
    Array.prototype.forEach.call(zones, function (z) { io.observe(z); });
    setTimeout(function () { body.classList.add("fem-wa-ready"); }, 2000);
  }

  /* Reveal [data-rv]: IO + rescate a 1.6 s (L5). Sin JS o con movimiento reducido todo ya
     es visible (CSS). */
  function initReveal() {
    var els = document.querySelectorAll("[data-rv]");
    Array.prototype.forEach.call(document.querySelectorAll(".cd-h2[data-rv]"), function (h) {
      Array.prototype.forEach.call(h.querySelectorAll(".ln"), function (ln, i) { ln.style.setProperty("--li", i); });
    });
    function show(el) { el.classList.add("is-in"); }
    function forzar(el) { if (!el.classList.contains("is-in")) { el.classList.add("rv-now"); el.classList.add("is-in"); } }
    if (reduce || !("IntersectionObserver" in window)) { Array.prototype.forEach.call(els, show); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        show(e.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.01 });
    var io2 = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        io2.unobserve(e.target);
        var el = e.target;
        setTimeout(function () { forzar(el); }, 1400);
      });
    }, { rootMargin: "0px", threshold: 0 });
    Array.prototype.forEach.call(els, function (el) { io.observe(el); io2.observe(el); });
    var kit = document.querySelectorAll("[data-reveal], [data-reveal-stagger]");
    if (kit.length) {
      var io3 = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          io3.unobserve(e.target);
          var el = e.target;
          setTimeout(function () { forzar(el); }, 1400);
        });
      }, { rootMargin: "0px", threshold: 0 });
      Array.prototype.forEach.call(kit, function (el) { io3.observe(el); });
    }
    function barrer() {
      Array.prototype.forEach.call(document.querySelectorAll("[data-rv]:not(.is-in), [data-reveal]:not(.is-in), [data-reveal-stagger]:not(.is-in)"), function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom > 0 && r.top < innerHeight * 1.05) forzar(el);
      });
    }
    window.addEventListener("load", function () { setTimeout(barrer, 1600); });
    setTimeout(barrer, 2600);
  }

  /* ---------- El pizarrón de la banqueta (compartido) ----------
     Cada renglón agregado se escribe con letra de gis, precio a la derecha, y se borra
     con un barrido de clip-path (izquierda a derecha), como el gis. */
  var PKEY = "fem_piz";
  var piz = [];
  try { piz = JSON.parse(FEM.store.get(PKEY) || "[]") || []; } catch (e) { piz = []; }
  var listeners = [];
  function save() { FEM.store.set(PKEY, JSON.stringify(piz)); listeners.forEach(function (f) { f(piz); }); render(); }
  FEM.pizarron = {
    items: function () { return piz.slice(); },
    has: function (id) { return piz.some(function (x) { return x.id === id; }); },
    add: function (it) { if (!FEM.pizarron.has(it.id)) { piz.push(it); save(); bump(); } },
    remove: function (id) { eraseRow(id); },
    clear: function () { piz = []; save(); },
    on: function (f) { listeners.push(f); },
    open: function () { openSheet(); }
  };
  var tab, sheet;
  function bump() {
    if (!tab) return;
    tab.classList.remove("bump"); void tab.offsetWidth; tab.classList.add("bump");
  }
  function total() { return piz.reduce(function (s, x) { return s + (x.price || 0); }, 0); }
  function render() {
    if (!tab) return;
    var n = piz.length;
    tab.hidden = n === 0;
    body.classList.toggle("has-piz", n > 0);
    tab.querySelector(".piz-tab-n").textContent = n;
    var ul = sheet.querySelector(".piz-list");
    ul.innerHTML = "";
    piz.forEach(function (x) {
      var li = document.createElement("li");
      li.setAttribute("data-id", x.id);
      var nameEl = document.createElement("span");
      nameEl.className = "piz-row-name";
      nameEl.textContent = x.name;
      var priceEl = document.createElement("span");
      priceEl.className = "piz-row-price tab";
      priceEl.textContent = x.price ? FEM.money(x.price) : "?";
      var eraseBtn = document.createElement("button");
      eraseBtn.type = "button";
      eraseBtn.className = "piz-erase";
      eraseBtn.setAttribute("aria-label", "Borrar " + x.name);
      eraseBtn.innerHTML = '<svg aria-hidden="true"><use href="#i-eraser"/></svg>';
      eraseBtn.addEventListener("click", function () { eraseRow(x.id); });
      li.appendChild(nameEl); li.appendChild(priceEl); li.appendChild(eraseBtn);
      ul.appendChild(li);
    });
    sheet.classList.toggle("has-items", n > 0);
    sheet.querySelector(".piz-total-val").textContent = n ? FEM.money(total()) : "";
  }
  function eraseRow(id) {
    var li = sheet.querySelector('.piz-list li[data-id="' + id + '"]');
    if (reduce || !li) { piz = piz.filter(function (x) { return x.id !== id; }); save(); return; }
    li.classList.add("is-erasing");
    setTimeout(function () {
      piz = piz.filter(function (x) { return x.id !== id; });
      save();
    }, 180);
  }
  function pizMsg() {
    var lines = piz.map(function (x) { return x.name + (x.price ? " " + FEM.money(x.price) : " (pregunta el precio)"); });
    return "Hola, quiero pedir a domicilio: " + lines.join(", ") + ". Total " + FEM.money(total()) + ". ¿Cuánto sale el envío a mi colonia?";
  }
  var lastFocus = null;
  function openSheet() {
    if (!sheet || !sheet.hidden) return;
    lastFocus = document.activeElement;
    sheet.hidden = false;
    render();
    FEM.pushModal(closeSheetNow);
    setTimeout(function () { sheet.querySelector(".piz-board").focus({ preventScroll: true }); }, 30);
  }
  function closeSheetNow() {
    if (!sheet || sheet.hidden) return;
    sheet.hidden = true;
    sheet.querySelector(".piz-fallback").hidden = true;
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  function initPizarron() {
    tab = document.querySelector(".piz-tab");
    sheet = document.querySelector(".piz-sheet");
    if (!tab || !sheet) return;
    tab.addEventListener("click", openSheet);
    sheet.addEventListener("click", function (e) {
      if (e.target.closest("[data-close]")) { closeSheetNow(); FEM.popModal(false); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !sheet.hidden) { closeSheetNow(); FEM.popModal(false); }
    });
    sheet.querySelector(".piz-send").addEventListener("click", function () {
      if (!piz.length) return;
      FEM.openWa(pizMsg(), sheet.querySelector(".piz-fallback"));
    });
    sheet.querySelector(".piz-clear").addEventListener("click", function () { FEM.pizarron.clear(); });
    render();
  }

  function init() {
    initWa(); initMenu(); initWaHide(); initReveal(); initPizarron();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

/* Anclas con scroll suave por JS (sin scroll-behavior en CSS, L4) */
(function () {
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented) return;
    var href = a.getAttribute("href");
    if (href.length < 2) return;
    var el = document.querySelector(href);
    if (!el) return;
    e.preventDefault();
    var head = document.querySelector(".k-header");
    var top = el.getBoundingClientRect().top + window.scrollY - (head ? head.offsetHeight : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
    if (history.replaceState) history.replaceState(history.state, "", href);
  });
})();
