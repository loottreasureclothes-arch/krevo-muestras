/* 10 hero: la foto entra desde blur cuando decodifica (el blindaje inline la deja visible a los 1.6 s pase lo que pase). */
(function () {
  "use strict";
  var fig = document.querySelector(".hero-photo");
  if (!fig) return;
  var img = fig.querySelector("img");
  function go() { fig.classList.add("is-in"); }
  if (!img) { go(); return; }
  if (img.complete && img.naturalWidth) { go(); return; }
  if (img.decode) img.decode().then(go, go); else { img.addEventListener("load", go); img.addEventListener("error", go); }
})();
