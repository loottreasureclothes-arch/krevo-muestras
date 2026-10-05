/* Componente firma: El espejo del look */
(function () {
  var root = document.getElementById("look");
  if (!root) return;
  var imgs = root.querySelectorAll(".esp-img"), tonos = root.querySelectorAll(".tono"), dias = root.querySelectorAll(".dia");
  var tag = document.getElementById("esp-tag"), msg = document.getElementById("esp-msg"), go = document.getElementById("esp-go");
  var glint = root.querySelector(".esp-glint");
  var look = "cobre", nombre = "Cobre con brillo", dia = dias[0].getAttribute("data-dia");
  function texto() {
    return "Hola Emmanuel, vi la página de EG Salón de Belleza. Quiero el look: " + nombre + ". Me acomoda: " + dia + ". ¿Qué horario tienes disponible?";
  }
  function pinta(destello) {
    Array.prototype.forEach.call(imgs, function (im) { im.classList.toggle("is-on", im.getAttribute("data-look") === look); });
    tag.textContent = nombre;
    var t = texto();
    msg.textContent = "“" + t + "”";
    go.href = window.EG ? window.EG.waUrl(t) : go.href;
    go.setAttribute("data-wa", t);
    if (destello && glint) { glint.classList.remove("go"); void glint.offsetWidth; glint.classList.add("go"); }
  }
  function marca(list, el) {
    Array.prototype.forEach.call(list, function (b) { var on = b === el; b.classList.toggle("is-on", on); b.setAttribute("aria-checked", on ? "true" : "false"); });
  }
  Array.prototype.forEach.call(tonos, function (b) {
    b.addEventListener("click", function () { look = b.getAttribute("data-look"); nombre = b.getAttribute("data-name"); marca(tonos, b); pinta(true); });
  });
  Array.prototype.forEach.call(dias, function (b) {
    b.addEventListener("click", function () { dia = b.getAttribute("data-dia"); marca(dias, b); pinta(false); });
  });
  pinta(false);
})();
