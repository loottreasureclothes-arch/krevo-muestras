/* Ticket de fiesta: suma los extras y los manda en el WhatsApp */
(function () {
  var l = document.getElementById("fi-lista"), tot = document.getElementById("fi-tot"), wa = document.getElementById("fi-wa");
  if (!l || !tot || !wa) return;
  function up() {
    var c = l.querySelectorAll("input:checked"), s = 0, it = [];
    c.forEach(function (x) { s += +x.getAttribute("data-p"); it.push(x.value); });
    tot.textContent = "$" + s; tot.classList.add("bump"); setTimeout(function () { tot.classList.remove("bump"); }, 220);
    var msg = "Hola Camen Repostería, tengo una fiesta y quiero pedir un pastel." + (it.length ? " También quiero: " + it.join(", ") + " ($" + s + " de extras). ¿Me confirman?" : "");
    wa.setAttribute("data-wa", msg); wa.href = "https://wa.me/" + wa.getAttribute("data-wa-num") + "?text=" + encodeURIComponent(msg);
  }
  l.addEventListener("change", up);
})();
