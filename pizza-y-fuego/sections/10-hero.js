/* 10 Hero: (1) video opcional por forma de pantalla (data-src-m / data-src-d); si están vacíos, se queda la foto.
 * Se salta con ahorro de datos o 2g y cae a la foto si play() falla.
 * (2) Cuadritos: abren una hoja con la carta real de esa categoría (la lee del menú, sección 25). Cada renglón abre el
 * platillo para elegir tamaño y agregarlo al pedido. La hoja se mueve a <body> y "Atrás" en Android la cierra. */
(function () {
  "use strict";
  var sec = document.getElementById("hero");
  if (!sec) return;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Video ---------- */
  var v = sec.querySelector(".hr-vid");
  (function video() {
    if (!v) return;
    var wide = window.matchMedia && matchMedia("(min-aspect-ratio: 1/1)").matches;
    var src = v.getAttribute(wide ? "data-src-d" : "data-src-m") || "";
    var c = navigator.connection;
    if (!src || reduce || (c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || "")))) { v.remove(); v = null; return; }
    if (wide) v.poster = v.getAttribute("data-poster-d");
    v.hidden = false; v.preload = "metadata"; v.src = src;
    function kill() { if (!v) return; v.classList.remove("is-on"); try { v.pause(); } catch (e) {} v.remove(); v = null; }
    v.addEventListener("playing", function () { v && v.classList.add("is-on"); });
    v.addEventListener("error", kill, { once: true });
    function tryPlay() { if (!v) return; var p = v.play(); if (p && p.catch) p.catch(function (e) { if (!e || e.name !== "AbortError") kill(); }); }
    if (v.readyState >= 2) tryPlay(); else v.addEventListener("canplay", tryPlay, { once: true });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) { if (!v) return; if (es[0].isIntersecting) { if (v.paused) tryPlay(); } else v.pause(); }).observe(sec);
    }
  })();

  /* Blindaje: si a los 1.6 s el texto no terminó de entrar, se termina */
  setTimeout(function () { sec.getAnimations && sec.getAnimations({ subtree: true }).forEach(function (a) { try { a.finish(); } catch (e) {} }); }, 1600);

  /* ---------- Hoja de la carta ---------- */
  var sheet = sec.querySelector(".hr-sheet");
  if (!sheet) return;
  document.body.appendChild(sheet);
  var box = sheet.querySelector(".hr-sheet-box"), list = sheet.querySelector(".hr-sheet-list");
  var titleEl = sheet.querySelector(".hr-sheet-t"), descEl = sheet.querySelector(".hr-sheet-d"), go = sheet.querySelector(".hr-sheet-go");
  var cur = null, lastFocus = null;
  var TX = {
    "m-pizzas": ["Pizzas a la leña", "Chica 25 cm, mediana 32 cm o grande 36 cm. Toca una para elegir tamaño.", "Ver pizzas con fotos"],
    "m-pastas": ["Pastas y lasaña", "Toca una para agregarla a tu pedido.", "Ver pastas con fotos"]
  };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function fill(cat) {
    var catEl = document.getElementById(cat);
    var t = TX[cat] || [cat, "", "Ver en el menú"];
    titleEl.textContent = t[0]; descEl.textContent = t[1];
    go.innerHTML = '<svg aria-hidden="true"><use href="#i-arrow"/></svg>' + esc(t[2]);
    list.innerHTML = "";
    if (!catEl) return;
    Array.prototype.forEach.call(catEl.querySelectorAll(".pf-mm-card"), function (card) {
      var li = document.createElement("li");
      li.innerHTML = '<button type="button"><span><b></b><small></small></span><i aria-hidden="true">+</i></button>';
      li.querySelector("b").textContent = card.dataset.name;
      li.querySelector("small").textContent = card.dataset.desc || "";
      li.querySelector("button").setAttribute("aria-label", "Agregar " + card.dataset.name);
      li.querySelector("button").addEventListener("click", function () {
        close();
        var hit = card.querySelector(".pf-mm-hit");
        setTimeout(function () { if (hit) hit.click(); }, 200); // espera a que "atrás" de la hoja termine
      });
      list.appendChild(li);
    });
  }
  function open(cat, from) {
    cur = cat; lastFocus = from || document.activeElement;
    fill(cat);
    sheet.hidden = false;
    document.documentElement.classList.add("pf-sheet-lock");
    if (window.pfLayer) window.pfLayer.open("hoja", function () { close(true); });
    requestAnimationFrame(function () { sheet.classList.add("is-open"); });
    setTimeout(function () { var x = sheet.querySelector(".hr-sheet-x"); x && x.focus({ preventScroll: true }); }, 40);
  }
  function close(fromPop) {
    if (sheet.hidden) return;
    if (fromPop !== true && window.pfLayer) window.pfLayer.close("hoja");
    sheet.classList.remove("is-open");
    sheet.hidden = true;
    document.documentElement.classList.remove("pf-sheet-lock");
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  Array.prototype.forEach.call(sec.querySelectorAll("[data-hoja]"), function (a) {
    a.addEventListener("click", function (e) {
      if (!document.getElementById(a.getAttribute("data-hoja"))) return; // sin menú: el ancla normal
      e.preventDefault();
      open(a.getAttribute("data-hoja"), a);
    });
  });
  Array.prototype.forEach.call(sheet.querySelectorAll("[data-close]"), function (b) { b.addEventListener("click", function () { close(); }); });
  go.addEventListener("click", function () {
    var cat = cur;
    close();
    if (window.pfMenuCat) window.pfMenuCat(cat, true);
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !sheet.hidden) close(); });
  /* arrastrar hacia abajo para cerrar (celular) */
  var y0 = null;
  box.addEventListener("touchstart", function (e) { if (box.scrollTop <= 0) y0 = e.touches[0].clientY; }, { passive: true });
  box.addEventListener("touchmove", function (e) { if (y0 !== null && e.touches[0].clientY - y0 > 90) { y0 = null; close(); } }, { passive: true });
  box.addEventListener("touchend", function () { y0 = null; }, { passive: true });
})();
