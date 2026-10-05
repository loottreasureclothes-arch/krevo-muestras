(function(){
  var hs=document.getElementById("hs");
  if(!hs||!("IntersectionObserver" in window)){if(hs) hs.classList.add("on");return}
  /* momento firma: las barras de humo se llenan al entrar y se vacían al salir (reversible) */
  new IntersectionObserver(function(es){es.forEach(function(e){hs.classList.toggle("on",e.isIntersecting)})},{threshold:.6}).observe(hs);
  setTimeout(function(){hs.classList.add("on")},1600);
})();
