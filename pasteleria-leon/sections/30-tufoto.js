/* #tufoto — componente firma. La foto NO se sube a ningún lado: se lee con FileReader
   y se dibuja en la página del propio visitante. El nombre se comparte con la hoja del
   pedido (window.PL.setNombre) para que el mensaje de WhatsApp salga ya escrito. */
(function () {
  "use strict";
  var file = document.getElementById("tf-file");
  var disc = document.getElementById("tf-disc");
  var photo = document.getElementById("tf-photo");
  var input = document.getElementById("tf-input");
  var name = document.getElementById("tf-name");
  var send = document.getElementById("tf-send");
  if (!disc || !name) return;

  var PH = "su nombre";
  var elegida = false;

  function write(txt) {
    var limpio = (txt || "").replace(/\s+/g, " ").trim();
    name.textContent = limpio || PH;
    name.classList.toggle("is-ph", !limpio);
    name.classList.remove("is-writing");
    /* reflow para poder repetir la animación con cada cambio */
    void name.offsetWidth;
    if (limpio) name.classList.add("is-writing");
    if (window.PL && window.PL.setNombre) window.PL.setNombre(limpio);
  }

  if (input) {
    var t = null;
    input.addEventListener("input", function () {
      if (t) clearTimeout(t);
      var v = input.value;
      t = setTimeout(function () { write(v); }, 220);
    });
  }

  if (file && photo && window.FileReader) {
    file.addEventListener("change", function () {
      var f = file.files && file.files[0];
      if (!f || !/^image\//.test(f.type)) return;
      var r = new FileReader();
      r.onload = function (e) {
        photo.src = e.target.result;
        photo.hidden = false;
        disc.classList.add("has-photo");
        elegida = true;
        if (send) send.href = msgUrl();
      };
      try { r.readAsDataURL(f); } catch (err) {}
    });
  }

  function msgUrl() {
    var L = ["Hola, quiero un pastel de Pastelería León con una foto encima."];
    var n = (input && input.value.trim()) || "";
    if (n) L.push("Es para " + n + ".");
    L.push(elegida ? "Ya tengo la foto, se la mando por aquí." : "Les mando la foto por aquí.");
    L.push("¿Me pasan el precio, por favor?");
    return (window.PL && window.PL.waUrl) ? window.PL.waUrl(L.join("\n")) : (send ? send.href : "#");
  }

  /* <a href> REAL: el click nunca se cancela, solo se reescribe el href antes de seguirlo. */
  if (send) send.addEventListener("click", function () { send.href = msgUrl(); });
})();
