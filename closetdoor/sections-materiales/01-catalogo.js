/* materiales.html · filtros por lugar, visor a pantalla completa con swipe, "Mi selección" en localStorage.
   Clave compartida con el cotizador: localStorage 'cd_materiales' = [{id, nombre, lugar}] */
(function () {
  var cat = document.getElementById("mat-catalogo");
  if (!cat) return;

  var KEY = "cd_materiales";
  var WA = "https://wa.me/524494463411";
  var items = [].slice.call(cat.querySelectorAll(".mt-item"));
  var byId = {};
  items.forEach(function (li) { byId[li.dataset.id] = li; });
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Selección ---------- */
  function load() {
    try {
      var a = JSON.parse(localStorage.getItem(KEY) || "[]");
      return Array.isArray(a) ? a.filter(function (x) { return x && x.id; }) : [];
    } catch (e) { return []; }
  }
  var sel = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(sel)); } catch (e) {} }
  function has(id) { return sel.some(function (x) { return x.id === id; }); }
  function toggle(id) {
    var li = byId[id];
    if (!li) return false;
    if (has(id)) sel = sel.filter(function (x) { return x.id !== id; });
    else sel.push({ id: id, nombre: li.dataset.nombre, lugar: li.dataset.lugar });
    save();
    render();
    return has(id);
  }
  function waHref() {
    var msg;
    if (!sel.length) {
      msg = "Hola Closet&Door, vi su catálogo de materiales y quiero cotizar un mueble.";
    } else {
      msg = "Hola Closet&Door, armé mi selección de materiales en su página y quiero cotizar:\n" +
        sel.map(function (x) { return "• " + x.nombre + " (" + x.lugar + ")"; }).join("\n") +
        "\n\n¿Me ayudan con el diseño y el precio?";
    }
    return WA + "?text=" + encodeURIComponent(msg);
  }

  var bar = document.querySelector(".mt-bar");
  var barBtn = bar.querySelector(".mt-bar-sel");
  var stack = bar.querySelector(".mt-bar-stack");
  var countEl = bar.querySelector(".mt-count");
  var countLbl = bar.querySelector(".mt-count-lbl");
  var sheet = document.getElementById("mt-sheet");
  var list = sheet.querySelector(".mt-sheet-list");
  var ctas = [bar.querySelector(".mt-bar-cta"), sheet.querySelector(".mt-sheet-cta")];
  var lastCount = sel.length;

  function thumb(id) { return "img/materiales/" + id + "-400.webp"; }
  function render() {
    var n = sel.length;
    bar.dataset.empty = n ? "false" : "true";
    countEl.textContent = n;
    countLbl.textContent = n === 1 ? "material" : "materiales";
    if (n !== lastCount && !reduce) {
      countEl.classList.remove("is-bump"); void countEl.offsetWidth; countEl.classList.add("is-bump");
    }
    lastCount = n;
    stack.innerHTML = sel.slice(-3).map(function (x) { return '<img src="' + thumb(x.id) + '" alt="">'; }).join("");
    ctas.forEach(function (a) { a.href = waHref(); });
    // corazones en la rejilla
    items.forEach(function (li) {
      var b = li.querySelector(".mt-like");
      var on = has(li.dataset.id);
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.setAttribute("aria-label", (on ? "Quitar de mi selección: " : "Me gusta ") + li.dataset.nombre);
    });
    // lista de la hoja
    sheet.classList.toggle("is-empty", !n);
    list.innerHTML = "";
    sel.forEach(function (x) {
      var row = document.createElement("li");
      row.innerHTML = '<img src="' + thumb(x.id) + '" alt="" width="52" height="52"><span class="mt-s-t"><b></b><span></span></span><button type="button" class="mt-s-rm">Quitar</button>';
      row.querySelector("b").textContent = x.nombre;
      row.querySelector(".mt-s-t span").textContent = x.lugar;
      row.querySelector(".mt-s-rm").addEventListener("click", function () { toggle(x.id); });
      list.appendChild(row);
    });
    syncViewer();
  }
  function pop(el) {
    if (reduce) return;
    el.classList.remove("is-pop"); void el.offsetWidth; el.classList.add("is-pop");
  }

  items.forEach(function (li) {
    var like = li.querySelector(".mt-like");
    like.addEventListener("click", function () { toggle(li.dataset.id); pop(like); });
    li.querySelector(".mt-card").addEventListener("click", function () { openViewer(li.dataset.id); });
  });

  /* ---------- Hoja "Mi selección" ---------- */
  var lastFocus = null;
  function openSheet() {
    lastFocus = document.activeElement;
    sheet.hidden = false;
    barBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("mt-lock");
    void sheet.offsetWidth; sheet.classList.add("is-open");
    sheet.querySelector(".mt-x").focus({ preventScroll: true });
  }
  function closeSheet() {
    sheet.classList.remove("is-open");
    barBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("mt-lock");
    setTimeout(function () { sheet.hidden = true; }, reduce ? 0 : 360);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  barBtn.addEventListener("click", openSheet);
  sheet.addEventListener("click", function (e) { if (e.target.closest("[data-close]")) closeSheet(); });

  /* ---------- Filtros por lugar ---------- */
  var chips = [].slice.call(document.querySelectorAll(".mt-chip"));
  var groups = [].slice.call(cat.querySelectorAll(".mt-group"));
  var status = cat.querySelector(".mt-status");
  var current = "todos";
  var filterSafe = 0;
  function setFilter(f, scroll, quiet) {
    current = f;
    chips.forEach(function (c) { c.setAttribute("aria-pressed", c.dataset.f === f ? "true" : "false"); });
    groups.forEach(function (g) { g.hidden = !(f === "todos" || g.dataset.f === f); });
    var n = visible().length;
    status.textContent = n + " materiales";
    var active = chips.filter(function (c) { return c.dataset.f === f; })[0];
    if (!quiet && active) {
      var box = active.parentNode;
      box.scrollTo({ left: active.offsetLeft - box.clientWidth / 2 + active.offsetWidth / 2, behavior: reduce ? "auto" : "smooth" });
    }
    if (scroll) {
      var top = cat.getBoundingClientRect().top + window.scrollY - stickyTop();
      if (window.scrollY > top) window.scrollTo({ top: top, behavior: "auto" });
    }
    if (!quiet && !reduce && window.gsap) {
      var shown = cat.querySelectorAll(".mt-group:not([hidden]) .mt-item");
      try {
        window.gsap.fromTo(shown, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.36, ease: "power3.out", stagger: 0.03, clearProps: "transform,opacity" });
      } catch (e) {}
      // blindaje: si el reloj de GSAP se congela (WhatsApp/Instagram), a los 1.6 s todo queda visible
      clearTimeout(filterSafe);
      filterSafe = setTimeout(function () {
        try { window.gsap.killTweensOf(shown); } catch (e) {}
        Array.prototype.forEach.call(shown, function (el) {
          el.style.removeProperty("opacity"); el.style.removeProperty("transform"); el.style.removeProperty("translate");
          if (el._gsap) el._gsap.uncache = 1;
        });
      }, 1600);
    }
  }
  chips.forEach(function (c) { c.addEventListener("click", function () { setFilter(c.dataset.f, true); }); });
  function visible() {
    return items.filter(function (li) { return current === "todos" || li.dataset.f === current; });
  }

  // filtros pegados justo debajo del header
  function stickyTop() {
    var h = document.querySelector(".k-header");
    return h ? Math.round(h.getBoundingClientRect().height) : 0;
  }
  function setSticky() { document.body.style.setProperty("--mt-sticky", stickyTop() + "px"); }
  setSticky();
  window.addEventListener("resize", setSticky);

  /* ---------- Visor a pantalla completa ---------- */
  var viewer = document.querySelector(".mt-viewer");
  var track = viewer.querySelector(".mt-v-track");
  var pos = viewer.querySelector(".mt-v-pos");
  var vLugar = viewer.querySelector(".mt-v-lugar");
  var vN = viewer.querySelector(".mt-v-n");
  var vU = viewer.querySelector(".mt-v-u");
  var vSrc = viewer.querySelector(".mt-v-src");
  var vLike = viewer.querySelector(".mt-v-like");
  var vCta = viewer.querySelector(".mt-v-cta");
  var vCtaN = viewer.querySelector(".mt-v-cta-n");
  var prev = viewer.querySelector(".mt-v-prev");
  var next = viewer.querySelector(".mt-v-next");
  var list_ = [];
  var idx = 0;
  var isOpen = false;
  var pushed = false;
  var vFocus = null;

  function buildSlides() {
    list_ = visible();
    track.innerHTML = "";
    list_.forEach(function (li, i) {
      var s = document.createElement("div");
      s.className = "mt-v-slide";
      s.setAttribute("role", "group");
      s.setAttribute("aria-roledescription", "material");
      s.setAttribute("aria-label", (i + 1) + " de " + list_.length + ": " + li.dataset.nombre);
      var fr = document.createElement("div");
      fr.className = "mt-v-frame";
      var img = document.createElement("img");
      img.alt = li.querySelector(".mt-card img").alt;
      img.decoding = "async";
      img.width = 2400; img.height = 2400;
      // la foto se recorta en cuadro dentro del recuadro: su lado real = el mayor del recuadro
      img.setAttribute("sizes", "(min-width: 900px) min(1100px, 80vw), 75vh");
      img.dataset.srcset = "img/materiales/" + li.dataset.id + "-1200.webp 1200w, img/materiales/" + li.dataset.id + "-2400.webp 2400w";
      img.dataset.src = "img/materiales/" + li.dataset.id + "-1200.webp";
      fr.appendChild(img);
      s.appendChild(fr);
      track.appendChild(s);
    });
  }
  function loadNear(i) {
    [i - 1, i, i + 1].forEach(function (k) {
      var s = track.children[k];
      if (!s) return;
      var img = s.querySelector("img");
      if (img.dataset.src) { img.srcset = img.dataset.srcset; img.src = img.dataset.src; delete img.dataset.src; delete img.dataset.srcset; }
    });
  }
  function syncViewer() {
    if (!isOpen || !list_[idx]) return;
    var li = list_[idx];
    var on = has(li.dataset.id);
    vLike.setAttribute("aria-pressed", on ? "true" : "false");
    vLike.querySelector("span").textContent = on ? "En mi selección" : "Me gusta este";
    vCtaN.textContent = sel.length ? String(sel.length) : "";
    vCta.href = waHref();
  }
  function show(i) {
    idx = Math.max(0, Math.min(list_.length - 1, i));
    var li = list_[idx];
    pos.textContent = (idx + 1) + " / " + list_.length;
    vLugar.textContent = li.dataset.lugar;
    vN.textContent = li.dataset.nombre;
    vU.textContent = li.dataset.uso;
    vSrc.textContent = li.dataset.real === "1" ? "Foto de un proyecto Closet&Door." : "Muestra ilustrativa · pregunta por disponibilidad.";
    vSrc.classList.toggle("is-ref", li.dataset.real !== "1");
    prev.disabled = idx === 0;
    next.disabled = idx === list_.length - 1;
    loadNear(idx);
    syncViewer();
  }
  function goTo(i, smooth) {
    i = Math.max(0, Math.min(list_.length - 1, i));
    track.scrollTo({ left: i * track.clientWidth, behavior: smooth && !reduce ? "smooth" : "auto" });
    show(i);
  }
  var raf = 0;
  track.addEventListener("scroll", function () {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(function () {
      var i = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
      if (i !== idx) show(i);
    });
  }, { passive: true });

  function openViewer(id, fromHash) {
    buildSlides();
    var i = list_.findIndex(function (li) { return li.dataset.id === id; });
    if (i < 0) { setFilter("todos", false, true); buildSlides(); i = list_.findIndex(function (li) { return li.dataset.id === id; }); }
    if (i < 0) return;
    vFocus = document.activeElement;
    viewer.hidden = false;
    isOpen = true;
    document.body.classList.add("mt-lock");
    goTo(i, false);
    track.scrollLeft = i * track.clientWidth; void viewer.offsetWidth; viewer.classList.add("is-open");
    if (!fromHash) { try { history.pushState({ mtv: 1 }, "", "#m-" + id); pushed = true; } catch (e) {} }
    viewer.querySelector(".mt-v-close").focus({ preventScroll: true });
  }
  function closeViewer(fromPop) {
    if (!isOpen) return;
    isOpen = false;
    viewer.classList.remove("is-open");
    document.body.classList.remove("mt-lock");
    var li = list_[idx];
    setTimeout(function () { viewer.hidden = true; track.innerHTML = ""; }, reduce ? 0 : 220);
    if (!fromPop && pushed) { pushed = false; history.back(); }
    else if (!fromPop) { try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {} }
    if (li) {
      var card = li.querySelector(".mt-card");
      var r = card.getBoundingClientRect();
      if (r.top < 80 || r.bottom > window.innerHeight - 90) li.scrollIntoView({ block: "center" });
      card.focus({ preventScroll: true });
    } else if (vFocus) vFocus.focus({ preventScroll: true });
  }
  window.addEventListener("popstate", function () {
    if (isOpen) { pushed = false; closeViewer(true); }
  });
  viewer.querySelector(".mt-v-close").addEventListener("click", function () { closeViewer(false); });
  prev.addEventListener("click", function () { goTo(idx - 1, true); });
  next.addEventListener("click", function () { goTo(idx + 1, true); });
  vLike.addEventListener("click", function () { if (list_[idx]) { toggle(list_[idx].dataset.id); pop(vLike); } });
  document.addEventListener("keydown", function (e) {
    if (isOpen) {
      if (e.key === "Escape") closeViewer(false);
      else if (e.key === "ArrowRight") goTo(idx + 1, true);
      else if (e.key === "ArrowLeft") goTo(idx - 1, true);
      else if (e.key === "Tab") trap(e, viewer);
    } else if (!sheet.hidden) {
      if (e.key === "Escape") closeSheet();
      else if (e.key === "Tab") trap(e, sheet);
    }
  });
  function trap(e, root) {
    var f = [].slice.call(root.querySelectorAll("button:not([disabled]), a[href]")).filter(function (el) { return el.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  window.addEventListener("resize", function () { if (isOpen) track.scrollLeft = idx * track.clientWidth; });

  /* ---------- Entrada por enlace: materiales.html#m-nogal-catedral o #mi-seleccion ---------- */
  render();
  setFilter("todos", false, true);
  function fromHash() {
    var h = decodeURIComponent(location.hash || "");
    if (h.indexOf("#m-") === 0 && byId[h.slice(3)]) {
      // deja una entrada de historial para que "atrás" cierre el visor y no salga de la página
      try { history.replaceState(null, "", location.pathname + location.search); history.pushState({ mtv: 1 }, "", h); pushed = true; } catch (e) {}
      openViewer(h.slice(3), true);
    } else if (h === "#mi-seleccion") {
      openSheet();
    }
  }
  fromHash();
})();
