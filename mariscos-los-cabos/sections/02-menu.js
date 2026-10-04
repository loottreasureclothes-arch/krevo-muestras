(function(){
  var tiles=[].slice.call(document.querySelectorAll(".lc-tile")),l=document.getElementById("lc-pedido-l"),b=document.getElementById("lc-pedir"),bt=document.getElementById("lc-pedir-t");
  if(!tiles.length||!b)return;
  function join(a){return a.length<2?a.join(""):a.slice(0,-1).join(", ")+" y "+a[a.length-1];}
  function paint(){
    var on=tiles.filter(function(t){return t.classList.contains("is-on");}).map(function(t){return t.getAttribute("data-name");});
    var m;
    if(!on.length){l.textContent="Toca Agregar en lo que se te antoje.";bt.textContent="Pedir el menú";m="Hola Mariscos Los Cabos, vi su página. ¿Me pasan el menú con precios?";}
    else{l.textContent="Tu pedido: "+join(on)+".";bt.textContent="Pedir esto";m="Hola Mariscos Los Cabos, vi su página. Quiero pedir: "+join(on)+". ¿Cuánto sale y qué sucursal me queda?";}
    b.setAttribute("data-wa",m);b.href=window.Cabos?window.Cabos.waUrl(m):b.href;
  }
  tiles.forEach(function(t){
    var btn=t.querySelector(".lc-add"),s=btn.querySelector("span");
    btn.addEventListener("click",function(){
      var o=t.classList.toggle("is-on");btn.setAttribute("aria-pressed",o?"true":"false");s.textContent=o?"Quitar":"Agregar";paint();
    });
  });
})();
