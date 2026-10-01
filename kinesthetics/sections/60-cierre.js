/* El cierre repite la frase armada del visitante; sin datos invita a empezar por el area. */
(function () {
  "use strict";
  var has = document.getElementById("ks-r-has"), none = document.getElementById("ks-r-none");
  var frase = document.getElementById("ks-r-frase"), send = document.getElementById("ks-r-send");
  if (!has || !none || !frase || !send) return;
  function set(sentence, url) {
    has.hidden = !sentence; none.hidden = !!sentence;
    frase.textContent = sentence || "";
    if (url) send.href = url;
  }
  window.addEventListener("ks:frase", function (e) { set(e.detail.sentence, e.detail.url); });
  if (window.KSFrase) set(window.KSFrase.sentence(), window.KSFrase.url());
})();
