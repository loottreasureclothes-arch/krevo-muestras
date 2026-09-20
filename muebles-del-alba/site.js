/* Muebles del Alba · fundación: WhatsApp, menú, reveal con rescate, Mi selección, visor y anclas */
(function () {
  "use strict";
  var WA = "524491236034";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var body = document.body;
  var MDA = window.MDA = window.MDA || {};
  document.documentElement.classList.add("js-rv");
  try { history.scrollRestoration = "manual"; } catch (e) {}

  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  MDA.waUrl = waUrl;
  /* Abre WhatsApp; si el navegador bloquea la ventana, cae a location.href y muestra el link de respaldo (L15) */
  MDA.openWa = function (msg, fallbackEl) {
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
  MDA.money = function (n) { return "$" + Math.round(n).toLocaleString("en-US"); };
  MDA.store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) {
      links[i].href = waUrl(links[i].getAttribute("data-wa"));
      links[i].target = "_blank";
      links[i].rel = "noopener";
    }
  }

  /* ---------- Modales: historial para que "atrás" en Android cierre (L13) ---------- */
  var modalStack = [];
  MDA.pushModal = function (closeFn) {
    modalStack.push(closeFn);
    body.classList.add("mda-modal");
    try { history.pushState({ mdaModal: modalStack.length }, ""); } catch (e) {}
  };
  MDA.popModal = function (fromHistory) {
    var fn = modalStack.pop();
    if (!modalStack.length) body.classList.remove("mda-modal");
    if (!fromHistory) { try { history.back(); } catch (e) {} }
    return fn;
  };
  window.addEventListener("popstate", function () {
    if (!modalStack.length) return;
    var fn = MDA.popModal(true);
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
      if (lbl) lbl.textContent = open ? "Cerrar" : "Menú";
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

  /* ---------- Menú: estado activo (que se sienta navegación real, no anclas sueltas) ---------- */
  function initMenuSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".cd-menu-nav a[href^='#']"));
    if (!links.length || !("IntersectionObserver" in window)) return;
    var map = links.map(function (a) {
      return { a: a, sec: document.getElementById(a.getAttribute("href").slice(1)) };
    }).filter(function (m) { return m.sec; });
    if (!map.length) return;
    var current = null;
    function mark(sec) {
      if (sec === current) return;
      current = sec;
      map.forEach(function (m) {
        var on = m.sec === sec;
        m.a.classList.toggle("is-current", on);
        if (on) m.a.setAttribute("aria-current", "true"); else m.a.removeAttribute("aria-current");
      });
    }
    var io = new IntersectionObserver(function (entries) {
      var best = null, bestRatio = 0;
      entries.forEach(function (e) { if (e.isIntersecting && e.intersectionRatio > bestRatio) { best = e.target; bestRatio = e.intersectionRatio; } });
      if (best) mark(best);
    }, { rootMargin: "-45% 0px -45% 0px", threshold: [0, .25, .5, .75, 1] });
    map.forEach(function (m) { io.observe(m.sec); });
  }

  function initRipple() {
    if (reduce) return;
    document.addEventListener("pointerdown", function (e) {
      var b = e.target.closest(".cd-btn:not(.cd-btn--link)");
      if (!b) return;
      var r = b.getBoundingClientRect();
      var s = document.createElement("span");
      s.className = "cd-ripple";
      s.style.left = (e.clientX - r.left) + "px";
      s.style.top = (e.clientY - r.top) + "px";
      b.appendChild(s);
      setTimeout(function () { s.remove(); }, 460);
    });
  }

  /* WA flotante: se esconde donde ya hay contacto (L11: visibility, no opacity) */
  function initWaHide() {
    var zones = document.querySelectorAll("#cierre, #contacto, .cd-foot");
    if (!zones.length || !("IntersectionObserver" in window)) return;
    var on = new Set();
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) on.add(e.target); else on.delete(e.target); });
      body.classList.toggle("cd-wa-off", on.size > 0);
    }, { rootMargin: "0px 0px -18% 0px" });
    Array.prototype.forEach.call(zones, function (z) { io.observe(z); });
    setTimeout(function () { body.classList.add("cd-wa-ready"); }, 2000);
  }

  /* Reveal [data-rv]: IO + rescate a 1.6 s (L5). Sin JS o con movimiento reducido todo ya es visible (CSS). */
  function initReveal() {
    var els = document.querySelectorAll("[data-rv]");
    Array.prototype.forEach.call(document.querySelectorAll(".cd-h2[data-rv]"), function (h) {
      Array.prototype.forEach.call(h.querySelectorAll(".ln"), function (ln, i) { ln.style.setProperty("--li", i); });
    });
    function show(el) { el.classList.add("is-in"); }
    /* El rescate NO anima: pone el estado final de golpe, para que a los 1.6 s el
       bloque ya este visible y no a media transicion. */
    function forzar(el) { if (!el.classList.contains("is-in")) { el.classList.add("rv-now"); el.classList.add("is-in"); } }
    if (reduce || !("IntersectionObserver" in window)) { Array.prototype.forEach.call(els, show); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        show(e.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.01 });
    /* Rescate: CUALQUIER cosa que toque la pantalla se muestra a los 1.6 s, pase lo que
       pase. Sin margen negativo: con fondo negativo, lo que se queda en el cuarto de
       abajo de la pantalla no disparaba nunca y el bloque se quedaba invisible. */
    var io2 = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        io2.unobserve(e.target);
        var el = e.target;
        setTimeout(function () { forzar(el); }, 1400);
      });
    }, { rootMargin: "0px", threshold: 0 });
    Array.prototype.forEach.call(els, function (el) { io.observe(el); io2.observe(el); });
    /* Misma red para los bloques del kit (data-reveal), que traen su propio
       temporizador pero solo corre una vez al cargar. */
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
    /* Rescate total: lo que ya pasó por la pantalla (salto de ancla, recarga a media página) */
    function barrer() {
      Array.prototype.forEach.call(document.querySelectorAll("[data-rv]:not(.is-in), [data-reveal]:not(.is-in), [data-reveal-stagger]:not(.is-in)"), function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom > 0 && r.top < innerHeight * 1.05) forzar(el);
      });
    }
    window.addEventListener("load", function () { setTimeout(barrer, 1600); });
    setTimeout(barrer, 2600);
  }

  /* ---------- Mi selección (compartida) ---------- */
  var SKEY = "mda_sel";
  var sel = [];
  try { sel = JSON.parse(MDA.store.get(SKEY) || "[]") || []; } catch (e) { sel = []; }
  var listeners = [];
  function save() { MDA.store.set(SKEY, JSON.stringify(sel)); listeners.forEach(function (f) { f(sel); }); renderSel(); }
  MDA.sel = {
    items: function () { return sel.slice(); },
    has: function (id) { return sel.some(function (x) { return x.id === id; }); },
    add: function (it) { if (!MDA.sel.has(it.id)) { sel.push(it); save(); bump(); } },
    remove: function (id) { sel = sel.filter(function (x) { return x.id !== id; }); save(); },
    toggle: function (it) { if (MDA.sel.has(it.id)) MDA.sel.remove(it.id); else MDA.sel.add(it); return MDA.sel.has(it.id); },
    clear: function () { sel = []; save(); },
    on: function (f) { listeners.push(f); },
    open: function () { openSel(); }
  };
  var bar, sheet;
  function bump() {
    if (!bar) return;
    bar.classList.remove("bump"); void bar.offsetWidth; bar.classList.add("bump");
  }
  function total() { return sel.reduce(function (s, x) { return s + (x.price || 0); }, 0); }
  function allPriced() { return sel.every(function (x) { return x.price > 0; }); }
  function renderSel() {
    if (!bar) return;
    var n = sel.length;
    bar.hidden = n === 0;
    body.classList.toggle("has-sel", n > 0);
    bar.querySelector(".sel-bar-n").textContent = n;
    bar.querySelector(".sel-bar-sum").textContent = n ? (allPriced() ? "Suma " + MDA.money(total()) : n + (n === 1 ? " mueble" : " muebles")) : "";
    var ul = sheet.querySelector(".sel-list");
    ul.innerHTML = "";
    sel.forEach(function (x) {
      var li = document.createElement("li");
      li.innerHTML = '<img alt="" loading="lazy"><div><b></b><small></small></div><div><span class="sel-p"></span><button type="button" class="sel-rm">Quitar</button></div>';
      var img = li.querySelector("img");
      if (x.img) img.src = x.img; else img.remove();
      li.querySelector("b").textContent = x.name;
      li.querySelector("small").textContent = x.note || "";
      li.querySelector(".sel-p").textContent = x.price ? MDA.money(x.price) : "Pregunta el precio";
      li.querySelector(".sel-rm").addEventListener("click", function () { MDA.sel.remove(x.id); });
      if (!x.img) li.style.gridTemplateColumns = "1fr auto";
      ul.appendChild(li);
    });
    sheet.classList.toggle("has-items", n > 0);
    /* Nunca "$0": si nada trae precio, el total lo confirma el vendedor. */
    var lbl = sheet.querySelector(".sel-total span");
    var tot = total();
    if (!n || tot === 0) {
      sheet.querySelector(".sel-total b").textContent = "te lo confirmamos por WhatsApp";
      if (lbl) lbl.textContent = "Total";
      sheet.querySelector(".sel-total").classList.add("sel-total--ask");
    } else {
      sheet.querySelector(".sel-total b").textContent = allPriced() ? MDA.money(tot) : MDA.money(tot) + " + los que faltan de precio";
      if (lbl) lbl.textContent = "Suma de precios de oferta";
      sheet.querySelector(".sel-total").classList.remove("sel-total--ask");
    }
  }
  function selMsg() {
    var lines = sel.map(function (x) { return "- " + x.name + (x.note ? " (" + x.note + ")" : "") + (x.price ? " " + MDA.money(x.price) : " (pregunta el precio)"); });
    var tot = total();
    var suma = tot === 0 ? "" : "\nSuma de ofertas: " + MDA.money(tot) + (allPriced() ? "" : " + los que faltan de precio");
    return "Hola Muebles del Alba, armé mi paquete en su página:\n" + lines.join("\n") + suma + "\n¿Qué precio de paquete me dan y hay disponibilidad?";
  }
  var lastFocus = null;
  function openSel() {
    if (!sheet || !sheet.hidden) return;
    lastFocus = document.activeElement;
    sheet.hidden = false;
    renderSel();
    MDA.pushModal(closeSelNow);
    setTimeout(function () { sheet.querySelector(".sel-box").focus({ preventScroll: true }); }, 30);
  }
  function closeSelNow() {
    if (!sheet || sheet.hidden) return;
    sheet.hidden = true;
    sheet.querySelector(".sel-fallback").hidden = true;
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  function initSel() {
    bar = document.querySelector(".sel-bar");
    sheet = document.querySelector(".sel-sheet");
    if (!bar || !sheet) return;
    bar.querySelector(".sel-bar-btn").addEventListener("click", openSel);
    sheet.addEventListener("click", function (e) {
      if (e.target.closest("[data-close]")) { closeSelNow(); MDA.popModal(false); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !sheet.hidden) { closeSelNow(); MDA.popModal(false); }
    });
    sheet.querySelector(".sel-send").addEventListener("click", function () {
      if (!sel.length) return;
      MDA.openWa(selMsg(), sheet.querySelector(".sel-fallback"));
    });
    sheet.querySelector(".sel-clear").addEventListener("click", function () { MDA.sel.clear(); });
    renderSel();
  }

  /* ---------- Visor de imagen genérico ---------- */
  var viewer;
  MDA.view = function (src, alt, caption, waMsg) {
    if (!viewer) {
      viewer = document.createElement("div");
      viewer.className = "mda-viewer";
      viewer.hidden = true;
      viewer.innerHTML = '<div class="mda-viewer-veil" data-close></div><button type="button" class="mda-viewer-x" data-close aria-label="Cerrar"><svg aria-hidden="true"><use href="#i-x"/></svg></button><div class="mda-viewer-box" role="dialog" aria-modal="true" aria-label="Imagen" tabindex="-1"><img alt=""><div class="mda-viewer-cap"><p></p><a class="cd-btn cd-btn--wa" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-wa"/></svg><span>Cotizar este</span></a></div></div>';
      body.appendChild(viewer);
      viewer.addEventListener("click", function (e) { if (e.target.closest("[data-close]")) { closeViewer(); MDA.popModal(false); } });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !viewer.hidden) { closeViewer(); MDA.popModal(false); } });
    }
    lastFocus = document.activeElement;
    var img = viewer.querySelector("img");
    img.src = src; img.alt = alt || "";
    viewer.querySelector(".mda-viewer-cap p").textContent = caption || "";
    var a = viewer.querySelector(".mda-viewer-cap a");
    a.hidden = !waMsg;
    if (waMsg) a.href = waUrl(waMsg);
    viewer.hidden = false;
    MDA.pushModal(closeViewer);
    setTimeout(function () { viewer.querySelector(".mda-viewer-box").focus({ preventScroll: true }); }, 30);
  };
  function closeViewer() {
    if (!viewer || viewer.hidden) return;
    viewer.hidden = true;
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  function init() {
    initWa(); initMenu(); initMenuSpy(); initRipple(); initWaHide(); initReveal(); initSel();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

/* Buscador del catálogo (header + arriba del catálogo, y en catalogo.html).
   Genérico: cualquier página que registre bloques en MDA.catalogBlocks (cards +
   restore, que vuelve a pintar lo que había antes de buscar) queda buscable.
   Mientras se escribe: filtra por nombre y tipo, sin recargar, sin límite de 10.
   Si no hay resultados, avisa y ofrece preguntar por WhatsApp. */
(function () {
  "use strict";
  var MDA = window.MDA = window.MDA || {};
  MDA.catalogBlocks = MDA.catalogBlocks || [];
  var reduceQ = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  function norm(s) {
    return (s || "").toString().toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  function run() {
    var inputs = Array.prototype.slice.call(document.querySelectorAll("[data-search-input]"));
    var empties = Array.prototype.slice.call(document.querySelectorAll("[data-search-empty]"));
    if (!inputs.length || !MDA.catalogBlocks.length) return;

    function apply(q) {
      q = norm(q).trim();
      var searching = q.length > 0;
      var total = 0;
      MDA.catalogBlocks.forEach(function (b) {
        if (b.chipsWrap) b.chipsWrap.hidden = searching;
        if (!searching) { b.restore(); return; }
        var shown = 0;
        b.cards.forEach(function (li) {
          var hay = norm(li.getAttribute("data-search") || li.textContent);
          var ok = hay.indexOf(q) !== -1;
          li.hidden = !ok;
          if (ok) shown++;
        });
        total += shown;
      });
      empties.forEach(function (el) { el.hidden = !(searching && total === 0); });
    }

    inputs.forEach(function (inp) {
      inp.addEventListener("input", function () {
        inputs.forEach(function (o) { if (o !== inp) o.value = inp.value; });
        apply(inp.value);
      });
      inp.addEventListener("search", function () { apply(inp.value); });
      var form = inp.closest("form");
      if (form) form.addEventListener("submit", function (e) {
        e.preventDefault();
        apply(inp.value);
        var grid = document.querySelector("[data-grid]") || document.getElementById("catalogo");
        if (grid && grid.scrollIntoView) grid.scrollIntoView({ block: "start", behavior: reduceQ ? "auto" : "smooth" });
      });
    });

    /* llega con ?q= desde el header de otra página (por ejemplo, del inicio a catalogo.html) */
    try {
      var q0 = new URLSearchParams(location.search).get("q");
      if (q0) { inputs.forEach(function (i) { i.value = q0; }); apply(q0); }
    } catch (e) {}
  }

  /* site.js corre antes que los scripts de sección (orden del documento), así que
     los bloques todavía no existen aquí: SIEMPRE se espera a DOMContentLoaded, que
     con scripts defer dispara hasta que el último de sección ya se ejecutó. */
  document.addEventListener("DOMContentLoaded", run);
})();

/* Anclas con scroll suave por JS (sin scroll-behavior en CSS, L4) + data-cat abre la pestaña del catálogo */
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
    var cat = a.getAttribute("data-cat");
    if (cat) document.dispatchEvent(new CustomEvent("mda:cat", { detail: cat }));
    var head = document.querySelector(".k-header");
    var top = el.getBoundingClientRect().top + window.scrollY - (head ? head.offsetHeight : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
    if (history.replaceState) history.replaceState(history.state, "", href);
  });
})();
