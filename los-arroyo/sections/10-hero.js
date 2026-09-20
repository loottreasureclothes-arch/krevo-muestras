/* 10 Hero: video de IA opcional (data-src-m / data-src-d; vacío = foto real), cuadritos con hoja de precios reales del menú 2025. */
(function () {
  "use strict";
  var sec = document.getElementById("hero");
  if (!sec) return;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Video: solo si hay ruta; si falla, se queda la foto ---------- */
  var v = sec.querySelector(".hr-vid");
  if (v) {
    var wide = window.matchMedia && matchMedia("(min-width: 900px)").matches;
    var c = navigator.connection;
    var src = (wide ? v.getAttribute("data-src-d") : v.getAttribute("data-src-m")) || "";
    if (!src || reduce || (c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || "")))) { v.remove(); v = null; }
    else {
      v.src = src; v.preload = "metadata";
      var kill = function () { v.classList.remove("is-on"); try { v.pause(); } catch (e) {} v.remove(); };
      v.addEventListener("playing", function () { v.classList.add("is-on"); });
      v.addEventListener("error", kill, { once: true });
      var tryPlay = function () { var p = v.play(); if (p && p.catch) p.catch(function (e) { if (!e || e.name !== "AbortError") kill(); }); };
      v.addEventListener("canplay", tryPlay, { once: true });
      v.load();
      if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { if (!v.isConnected) return; if (es[0].isIntersecting) { if (v.paused) tryPlay(); } else v.pause(); }).observe(sec);
    }
  }
  /* blindaje: a los 1.6 s el texto queda puesto pase lo que pase */
  setTimeout(function () { sec.getAnimations && sec.getAnimations({ subtree: true }).forEach(function (a) { try { a.finish(); } catch (e) {} }); }, 1600);

  /* ---------- Cuadritos: entran escalonados al asomar #antojo (base CSS = visibles; blindaje 1.6 s) ---------- */
  var antojo = document.getElementById("antojo");
  if (antojo && !reduce && "IntersectionObserver" in window) {
    var tiles = antojo.querySelectorAll(".cu-tile");
    Array.prototype.forEach.call(tiles, function (t, i) { t.style.setProperty("--i", i); });
    antojo.classList.add("cu-js");
    var antojoIn = function () { antojo.classList.add("cu-in"); };
    var ioAntojo = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { antojoIn(); ioAntojo.disconnect(); } }, { threshold: 0.25 });
    ioAntojo.observe(antojo);
    setTimeout(antojoIn, 1600);
  }

  /* ---------- Hoja de los cuadritos ---------- */
  var D = {
    kilo: { t: "Por kilo", go: "Aparta tu kilo", href: "#kilo", rows: [
      ["1/4 de barbacoa", "Para llevar · aquí $195", "$185"],
      ["1/2 de barbacoa", "Para llevar · aquí $380", "$370"],
      ["1 kg de barbacoa", "Para llevar · aquí $760", "$740"],
      ["1 kg especial, pura maciza", "Para llevar · aquí $780", "$770"],
      ["1 kg de pancita o montalayo", "Para llevar · aquí $760", "$740"]] },
    tacos: { t: "Tacos", go: "Pedir tacos", wa: "Hola, quiero pedir tacos de barbacoa en Los Arroyo.", rows: [
      ["Taco de barbacoa de borrego", "Tortilla de maíz azul o blanca, hecha a mano", "$55"],
      ["Taco de pancita de borrego", "", "$55"],
      ["Taco de cabeza de cordero", "", "$55"],
      ["Taco de machito", "Atadito de tripas de cordero dorado a la plancha", "$55"]] },
    consome: { t: "Consomé", go: "Pedir consomé", wa: "Hola, quiero pedir consomé de borrego en Los Arroyo.", rows: [
      ["Consomé chico", "Jugo de la carne del borrego, con garbanzo y arroz", "$45"],
      ["Consomé grande", "", "$55"],
      ["Consomé con carne", "", "$95"],
      ["Litro de consomé", "Para llevar · aquí $115 · con carne $150", "$100"],
      ["Menudo hidrocálido", "Pancita y pata · chico $95", "$110"]] },
    antojitos: { t: "Tlacoyos", go: "Pedir tlacoyos", wa: "Hola, quiero pedir tlacoyos en Los Arroyo.", rows: [
      ["Tlacoyo sencillo", "Requesón o frijol negro", "$39"],
      ["Tlacoyo combinado", "", "$45"],
      ["Quesadilla, gordita o sope", "Sencillo $39 · combinado", "$45"],
      ["Con barbacoa", "Quesadilla, gordita, sope o tlacoyo", "$65"]] }
  };
  var sh = document.querySelector(".cu-sheet");
  if (!sh) return;
  document.body.appendChild(sh); // L12: fuera de padres con transform
  var box = sh.querySelector(".cu-sheet-box"), list = sh.querySelector(".cu-sheet-list"), go = sh.querySelector(".cu-sheet-go");
  var cur = null, lastFocus = null, pushed = false;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function open(k) {
    var d = D[k]; if (!d) return;
    cur = d; lastFocus = document.activeElement;
    sh.querySelector(".cu-sheet-t").textContent = d.t;
    list.innerHTML = d.rows.map(function (r) { return "<li><span>" + esc(r[0]) + (r[1] ? "<small>" + esc(r[1]) + "</small>" : "") + "</span><b>" + esc(r[2]) + "</b></li>"; }).join("");
    go.querySelector("span").textContent = d.go;
    go.setAttribute("href", d.href || (window.LM ? window.LM.waUrl(d.wa) : "#kilo"));
    if (d.wa) { go.target = "_blank"; go.rel = "noopener"; } else { go.removeAttribute("target"); }
    sh.hidden = false;
    document.documentElement.classList.add("lm-mm-lock");
    try { history.pushState({ cuSheet: 1 }, ""); pushed = true; } catch (e) {}
    requestAnimationFrame(function () { requestAnimationFrame(function () { sh.classList.add("is-open"); }); });
    setTimeout(function () { var x = sh.querySelector(".cu-sheet-x"); x && x.focus({ preventScroll: true }); }, 40);
  }
  function close(fromPop) {
    if (sh.hidden) return;
    sh.classList.remove("is-open");
    document.documentElement.classList.remove("lm-mm-lock");
    if (pushed && fromPop !== true) { pushed = false; try { history.back(); } catch (e) {} }
    pushed = false;
    setTimeout(function () { sh.hidden = true; }, reduce ? 0 : 280);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  window.addEventListener("popstate", function () { if (!sh.hidden && sh.classList.contains("is-open")) close(true); });
  Array.prototype.forEach.call(document.querySelectorAll("#antojo [data-sheet]"), function (b) {
    b.addEventListener("click", function () { open(b.getAttribute("data-sheet")); });
  });
  sh.addEventListener("click", function (e) {
    if (e.target.closest("[data-close]")) { close(); return; }
    var a = e.target.closest("a[href^='#']");
    if (a) close(true); /* el ancla reemplaza la entrada del historial; sin back() para no brincar el scroll */
  });
  go.addEventListener("click", function (e) {
    if (cur && cur.wa && window.LM) { e.preventDefault(); window.LM.openWa(cur.wa); }
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !sh.hidden) close(); });
})();
