/* Reseñas: papeletas colgadas que se deslizan; flechas y contador. */
(function(){
  "use strict";
  var row = document.getElementById("pp-row"); if (!row) return;
  var items = [].slice.call(row.children), out = document.getElementById("pp-i");
  function idx(){
    var x = row.scrollLeft, best = 0, d = 1e9;
    items.forEach(function(el, i){ var dd = Math.abs(el.offsetLeft - row.offsetLeft - x - 20); if (dd < d) { d = dd; best = i; } });
    return best;
  }
  function upd(){ if (out) out.textContent = (idx() + 1) + " / " + items.length; }
  row.addEventListener("scroll", function(){ window.requestAnimationFrame(upd); }, { passive: true });
  [].forEach.call(document.querySelectorAll(".pp-b"), function(b){
    b.addEventListener("click", function(){
      var i = Math.max(0, Math.min(items.length - 1, idx() + (+b.getAttribute("data-dir"))));
      row.scrollTo({ left: items[i].offsetLeft - row.offsetLeft - 20 });
    });
  });
  upd();
})();
