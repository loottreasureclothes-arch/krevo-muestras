(function(){
  var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  /* reveal: visible a los 1.6 s pase lo que pase */
  var els=document.querySelectorAll("[data-reveal]");
  if(!reduce&&"IntersectionObserver" in window){
    document.documentElement.classList.add("rv");
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("is-in");io.unobserve(e.target)}})},{threshold:.12});
    Array.prototype.forEach.call(els,function(el){io.observe(el)});
    setTimeout(function(){Array.prototype.forEach.call(els,function(el){el.classList.add("is-in")})},1600);
  }
  /* flotante de llamada: se esconde donde ya hay botones de llamar grandes */
  var fab=document.querySelector(".call-fab");
  var zones=document.querySelectorAll("#hero-btns,#visitanos,#cierre,.pie");
  if(fab&&"IntersectionObserver" in window){
    var vis={};
    var io2=new IntersectionObserver(function(es){es.forEach(function(e){vis[e.target.id||e.target.className]=e.isIntersecting});
      var any=Object.keys(vis).some(function(k){return vis[k]});fab.classList.toggle("is-hidden",any)},{threshold:.15});
    Array.prototype.forEach.call(zones,function(z){io2.observe(z)});
  }
  /* ruta de la central al hotel */
  var ruta=document.getElementById("ruta");
  if(ruta&&"IntersectionObserver" in window){
    var io3=new IntersectionObserver(function(es){es.forEach(function(e){ruta.classList.toggle("go",e.isIntersecting)})},{threshold:.5});
    io3.observe(ruta);
  } else if(ruta){ruta.classList.add("go")}
})();
