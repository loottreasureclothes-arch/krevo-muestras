/* Closet&Door: enlaces de WhatsApp con mensaje, proceso animado y cotizador */
(function () {
  "use strict";
  var WA = "524494463411";
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }

  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) {
      links[i].href = waUrl(links[i].getAttribute("data-wa"));
      links[i].target = "_blank";
      links[i].rel = "noopener";
    }
  }

  function initSteps() {
    var ol = document.querySelector(".cd-steps");
    if (!ol) return;
    var items = ol.children;
    for (var i = 0; i < items.length; i++) items[i].style.setProperty("--i", i);
    if (!("IntersectionObserver" in window)) { ol.classList.add("is-run"); return; }
    var io = new IntersectionObserver(function (es) {
      if (es[0].isIntersecting) { ol.classList.add("is-run"); io.disconnect(); }
    }, { threshold: 0.25 });
    io.observe(ol);
  }

  function initForm() {
    var f = document.getElementById("cd-form");
    if (!f) return;
    var err = document.getElementById("cd-err");
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var tipo = f.querySelector('input[name="tipo"]:checked');
      var med = f.medidas.value.trim();
      var col = f.colonia.value.trim();
      var nom = f.nombre.value.trim();
      var miss = [];
      f.colonia.classList.toggle("is-bad", !col);
      f.nombre.classList.toggle("is-bad", !nom);
      if (!tipo) miss.push("el mueble");
      if (!col) miss.push("tu colonia");
      if (!nom) miss.push("tu nombre");
      if (miss.length) {
        err.textContent = "Falta " + miss.join(", ").replace(/, ([^,]*)$/, " y $1") + ".";
        err.hidden = false;
        return;
      }
      err.hidden = true;
      var msg = "Hola Closet&Door, soy " + nom + ". Quiero cotizar: " + tipo.value + "." +
        (med ? "\nMedidas aprox.: " + med + "." : "") +
        "\nColonia: " + col + ".";
      window.open(waUrl(msg), "_blank", "noopener");
    });
    f.addEventListener("input", function (e) {
      if (e.target.classList) e.target.classList.remove("is-bad");
    });
  }

  function initClip() {
    var els = document.querySelectorAll(".cd-clip");
    if (!("IntersectionObserver" in window)) { for (var i = 0; i < els.length; i++) els[i].classList.add("is-in"); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { threshold: 0.2 });
    for (var j = 0; j < els.length; j++) io.observe(els[j]);
  }

  /* Hero: titulo por palabras con mascara, lista y foto entran solas al cargar */
  function initHero() {
    var hero = document.querySelector(".cd-hero");
    if (!hero) return;
    var h = hero.querySelector("[data-split]");
    if (h) {
      var label = h.textContent.replace(/\s+/g, " ").trim();
      var n = 0;
      Array.prototype.slice.call(h.childNodes).forEach(function (node) {
        if (node.nodeType === 3) {
          var frag = document.createDocumentFragment();
          node.textContent.split(/(\s+)/).forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(" ")); return; }
            var o = document.createElement("span"); o.className = "cd-split-w";
            var i = document.createElement("span"); i.textContent = p; i.style.setProperty("--w", n++);
            o.appendChild(i); frag.appendChild(o);
          });
          h.replaceChild(frag, node);
        } else if (node.nodeType === 1) {
          var o2 = document.createElement("span"); o2.className = "cd-split-w";
          var i2 = document.createElement("span"); i2.style.setProperty("--w", n++);
          h.replaceChild(o2, node); i2.appendChild(node); o2.appendChild(i2);
        }
      });
      h.setAttribute("aria-label", label);
    }
    var groups = hero.querySelectorAll(".cd-hero-list li, .cd-hero-facts li");
    var li = 0, fi = 0;
    for (var k = 0; k < groups.length; k++) {
      var inFacts = groups[k].parentNode.classList.contains("cd-hero-facts");
      groups[k].style.setProperty("--i", inFacts ? fi++ : li++);
    }
    var img = hero.querySelector(".cd-hero-fig img");
    var go = function () { requestAnimationFrame(function () { requestAnimationFrame(function () { hero.classList.add("is-go"); }); }); };
    if (img && !img.complete && img.decode) {
      var done = false;
      var once = function () { if (!done) { done = true; go(); } };
      img.decode().then(once, once);
      setTimeout(once, 1200);
    } else go();
  }

  /* Enlaces del hero que saltan a una slide del slider */
  function initGo() {
    var links = document.querySelectorAll("[data-go]");
    var slider = document.querySelector(".cd-slider");
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", function () {
        var idx = parseInt(this.getAttribute("data-go"), 10);
        if (slider && slider.kSlider && typeof slider.kSlider.go === "function") {
          setTimeout(function () { slider.kSlider.go(idx); }, 350);
        }
      });
    }
  }

  function init() { initWa(); initHero(); initGo(); initSteps(); initClip(); initForm(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
