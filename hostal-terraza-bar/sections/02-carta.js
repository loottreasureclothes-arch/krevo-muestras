(function () {
  var TB = window.TB; if (!TB) return;
  var its = document.querySelectorAll("#carta-grid .it");
  Array.prototype.forEach.call(its, function (li) {
    var b = li.querySelector(".add"), id = li.getAttribute("data-id");
    b.addEventListener("click", function () {
      var i = TB.carta.indexOf(id), on = i < 0;
      if (on) TB.carta.push(id); else TB.carta.splice(i, 1);
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.textContent = on ? "En tu mesa" : "Agregar";
      TB.emit();
    });
  });
})();
