/* 20-aparador: "Los tres aparadores" (filtra el catálogo) + Beat C del momento firma + el carrito
   "Mi apartado" (barra del header, ya en template.html, la llena este archivo) + la hoja del pedido.
   API que deja para otras secciones: window.OSCart.add({name, price}) agrega una pieza.
   La ventana activa viaja al mensaje de WhatsApp (HOJA §4) — el del carrito y el del flotante.
   NUNCA se escribe un total en cero (HOJA §8.15): sin precio va "Pregunta el precio" y el total se confirma
   por WhatsApp. La lista tiene alto mínimo fijo (el del grupo más alto) para que la página no se
   acorte al filtrar. */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var root = document.documentElement;

  /* Departamento activo: arranca en CALZADO (HOJA §4) y viaja a los dos mensajes de WhatsApp. */
  var DEPT = "calzado";
  var DEPT_TXT = { carteras: "sus carteras y mochilas", calzado: "su calzado", ropa: "su ropa" };
  function saludo() { return "Hola, vi " + (DEPT_TXT[DEPT] || "su catálogo") + " en la página"; }
  function actualizarFlotante() {
    var a = document.querySelector(".k-wa");
    if (!a) return;
    var msg = saludo() + " y quiero preguntar por una pieza.";
    a.setAttribute("data-wa", msg);
    a.href = window.OS ? window.OS.waUrl(msg) : ("https://wa.me/524491371706?text=" + encodeURIComponent(msg));
  }

  /* ---------------- Beat C: se prenden los tres aparadores al entrar la sección ---------------- */
  function initBeatC() {
    var photo = document.getElementById("os-ap-photo");
    if (!photo) return;
    function lit() { photo.classList.add("is-lit"); }
    if (reduce || !("IntersectionObserver" in window)) { lit(); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { lit(); io.disconnect(); } });
    }, { threshold: 0.2, rootMargin: "0px 0px -10% 0px" });
    io.observe(photo);
    window.setTimeout(function () {
      var r = photo.getBoundingClientRect(), vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.bottom > 0 && r.top < vh) lit();
    }, 1600);
  }

  /* ---------------- Los tres aparadores: filtran el catálogo ---------------- */
  function initZones() {
    var zones = Array.prototype.slice.call(document.querySelectorAll(".os-ap-zone"));
    var wrap = document.getElementById("os-ap-list-wrap");
    var groups = Array.prototype.slice.call(document.querySelectorAll("[data-dept-group]"));
    var calzadoFoto = document.querySelector('[data-dept-photo="calzado"]');
    if (!zones.length || !groups.length || !wrap) return;

    /* el grupo activo arranca en flujo normal: su alto es el alto natural, sin hueco de sobra */
    groups.forEach(function (g) { g.classList.toggle("is-active", g.getAttribute("data-dept-group") === "calzado"); });

    function setDept(dept) {
      DEPT = dept;
      actualizarFlotante();
      renderCart();
      var oldGroup = groups.filter(function (g) { return g.classList.contains("is-active"); })[0];
      var newGroup = groups.filter(function (g) { return g.getAttribute("data-dept-group") === dept; })[0];
      if (!newGroup || newGroup === oldGroup) return;

      zones.forEach(function (z) {
        var on = z.getAttribute("data-dept") === dept;
        z.classList.toggle("is-active", on);
        z.classList.toggle("is-dim", !on);
        z.setAttribute("aria-pressed", on ? "true" : "false");
      });
      if (calzadoFoto) {
        if (dept === "calzado") calzadoFoto.removeAttribute("hidden");
        else calzadoFoto.setAttribute("hidden", "");
      }

      if (reduce) {
        if (oldGroup) oldGroup.classList.remove("is-active");
        newGroup.classList.add("is-active");
        return;
      }

      var startH = wrap.offsetHeight;
      if (oldGroup) oldGroup.style.opacity = "0";
      window.setTimeout(function () {
        if (oldGroup) oldGroup.classList.remove("is-active");
        newGroup.classList.add("is-active");
        newGroup.style.opacity = "0";
        var endH = newGroup.scrollHeight;
        wrap.style.height = startH + "px";
        void wrap.offsetHeight; /* fuerza reflow */
        wrap.style.height = endH + "px";
        requestAnimationFrame(function () { newGroup.style.opacity = "1"; });
        window.setTimeout(function () { wrap.style.height = ""; }, 280);
      }, 160);
    }

    /* Alto mínimo = el del grupo más alto (carteras, 7 renglones). Así el filtro no acorta la
       página. Se mide con los tres grupos dibujados, después de que cargan las fuentes. */
    function medirMinimo() {
      wrap.style.setProperty("--os-ap-min", "0px");
      var alto = 0;
      groups.forEach(function (g) {
        var activo = g.classList.contains("is-active");
        if (!activo) { g.style.display = "block"; g.style.position = "absolute"; g.style.visibility = "hidden"; g.style.left = "0"; g.style.right = "0"; g.style.top = "0"; }
        alto = Math.max(alto, g.scrollHeight);
        if (!activo) { g.style.display = ""; g.style.position = ""; g.style.visibility = ""; g.style.left = ""; g.style.right = ""; g.style.top = ""; }
      });
      if (alto > 0) wrap.style.setProperty("--os-ap-min", Math.ceil(alto) + "px");
    }
    medirMinimo();
    if (document.fonts && document.fonts.ready && document.fonts.ready.then) document.fonts.ready.then(medirMinimo);
    window.setTimeout(medirMinimo, 1600);
    var reMedir = null;
    window.addEventListener("resize", function () {
      window.clearTimeout(reMedir);
      reMedir = window.setTimeout(medirMinimo, 200);
    }, { passive: true });

    zones.forEach(function (z) {
      z.addEventListener("click", function () { setDept(z.getAttribute("data-dept")); });
    });
  }

  /* ---------------- Carrito "Mi apartado" ---------------- */
  var CART = []; /* {id, name, price:number|null, qty} */

  function money(n) { return "$" + Math.round(n).toLocaleString("es-MX"); }

  function findItem(id) {
    for (var i = 0; i < CART.length; i++) if (CART[i].id === id) return CART[i];
    return null;
  }

  function addItem(name, price) {
    var id = name;
    var it = findItem(id);
    if (it) { it.qty++; }
    else CART.push({ id: id, name: name, price: (price === "" || price == null || isNaN(price)) ? null : Number(price), qty: 1 });
    renderCart();
  }
  function setQty(id, qty) {
    var it = findItem(id);
    if (!it) return;
    it.qty = qty;
    if (it.qty <= 0) CART = CART.filter(function (x) { return x.id !== id; });
    renderCart();
  }

  function totalCount() { return CART.reduce(function (s, i) { return s + i.qty; }, 0); }

  function renderCart() {
    var n = totalCount();
    var barN = document.getElementById("os-cart-n");
    if (barN) barN.textContent = String(n);
    document.body.setAttribute("data-cart-n", String(n));
    root.classList.toggle("os-cart-has", CART.length > 0);

    var list = document.getElementById("os-cart-items");
    if (list) {
      list.innerHTML = "";
      CART.forEach(function (it) {
        var li = document.createElement("li");
        li.className = "os-cart-item";
        var priceTxt = it.price == null ? "Pregunta el precio" : money(it.price) + " c/u";
        li.innerHTML =
          '<div class="os-cart-item-t"><p class="os-cart-item-name">' + escapeHtml(it.name) + '</p>' +
          '<p class="os-cart-item-price">' + priceTxt + '</p></div>' +
          '<span class="os-cart-item-qty">' +
          '<button type="button" data-qty="-1" aria-label="Quitar una">−</button>' +
          '<b>' + it.qty + '</b>' +
          '<button type="button" data-qty="1" aria-label="Agregar una">+</button>' +
          '</span>';
        li.querySelectorAll("[data-qty]").forEach(function (b) {
          b.addEventListener("click", function () { setQty(it.id, it.qty + Number(b.getAttribute("data-qty"))); });
        });
        list.appendChild(li);
      });
    }

    var hasAsk = CART.some(function (i) { return i.price == null; });
    var totalNum = CART.reduce(function (s, i) { return s + (i.price || 0) * i.qty; }, 0);
    var totalEl = document.getElementById("os-cart-total-n");
    if (totalEl) {
      var frase = true;
      if (CART.length && !hasAsk) { totalEl.textContent = money(totalNum); frase = false; }
      else if (CART.length && hasAsk && totalNum > 0) totalEl.textContent = money(totalNum) + " + las que preguntaste";
      else totalEl.textContent = "Te lo confirmamos por WhatsApp";
      totalEl.classList.toggle("is-frase", frase);
    }

    var send = document.getElementById("os-cart-send");
    if (send) {
      var lines = CART.map(function (i) {
        return "• " + i.name + " x" + i.qty + (i.price == null ? " (pregunta el precio)" : " — " + money(i.price * i.qty));
      });
      var msg;
      if (!CART.length) {
        /* carrito vacío: ni lista ni renglón de total (ni un total en cero) */
        msg = saludo() + " y quiero apartar una pieza.";
      } else {
        msg = saludo() + " y quiero apartar:\n" + lines.join("\n") +
          "\n\nTotal: " + (hasAsk ? (totalNum > 0 ? money(totalNum) + " + lo que me confirmen" : "me lo confirman por WhatsApp") : money(totalNum));
      }
      send.href = window.OS ? window.OS.waUrl(msg) : ("https://wa.me/524491371706?text=" + encodeURIComponent(msg));
    }
  }

  function escapeHtml(s) { return String(s).replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }); }

  function initAddButtons() {
    document.querySelectorAll("[data-add]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        addItem(btn.getAttribute("data-name"), btn.getAttribute("data-price"));
        btn.classList.add("is-added");
        window.setTimeout(function () { btn.classList.remove("is-added"); }, 260);
      });
    });
  }

  /* ---------------- Hoja: abrir / cerrar con historial (L13) ---------------- */
  function initSheet() {
    var sheet = document.getElementById("os-cart-sheet");
    var bar = document.getElementById("os-cart-bar");
    var closeBtn = document.querySelector(".os-cart-close");
    var scrim = document.querySelector(".os-cart-scrim");
    if (!sheet) return;
    var pushed = false;

    function set(open, fromPop) {
      if (open === root.classList.contains("os-cart-open")) return;
      root.classList.toggle("os-cart-open", open);
      sheet.setAttribute("aria-hidden", open ? "false" : "true");
      if (open) {
        try { history.pushState({ osCart: 1 }, ""); pushed = true; } catch (e) {}
        window.setTimeout(function () { if (closeBtn) closeBtn.focus({ preventScroll: true }); }, 90);
      } else {
        if (pushed && !fromPop) { pushed = false; try { history.back(); } catch (e) {} }
        pushed = false;
        if (bar) bar.focus && bar.focus({ preventScroll: true });
      }
    }
    window.addEventListener("popstate", function () { if (root.classList.contains("os-cart-open")) set(false, true); });

    if (bar) {
      bar.setAttribute("role", "button");
      bar.setAttribute("tabindex", "0");
      bar.addEventListener("click", function () { set(true); });
      bar.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); set(true); } });
    }
    if (closeBtn) closeBtn.addEventListener("click", function () { set(false); });
    if (scrim) scrim.addEventListener("click", function () { set(false); });
    document.addEventListener("keydown", function (e) {
      if (!root.classList.contains("os-cart-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); }
    });
  }

  function init() { initBeatC(); initZones(); initAddButtons(); initSheet(); renderCart(); actualizarFlotante(); }
  window.OSCart = { add: addItem };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
