(function(){
  var d=document,b=d.body;
  // reveal
  try{
    var rm=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
    var els=[].slice.call(d.querySelectorAll("[data-reveal]"));
    if(!rm&&"IntersectionObserver" in window&&els.length){
      b.classList.add("js-rv");
      var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{rootMargin:"0px 0px -6% 0px"});
      els.forEach(function(el){io.observe(el)});
      setTimeout(function(){els.forEach(function(el){el.classList.add("in")})},1600);
    }
  }catch(e){}
  // flotante: se oculta en visitanos/completar/pie
  var zones=[].slice.call(d.querySelectorAll("#visitanos,#completar,.pie,#hero"));
  if("IntersectionObserver" in window){
    var vis={};
    var io2=new IntersectionObserver(function(es){es.forEach(function(e){vis[e.target.id||"pie"]=e.isIntersecting});
      var off=Object.keys(vis).some(function(k){return vis[k]});b.classList.toggle("fab-off",off)},{threshold:.15});
    zones.forEach(function(z){io2.observe(z)});
  }
  // momento firma: los arcos de la foto de eventos se abren con el scroll (reversible)
  var ev=d.getElementById("ev-foto");
  if(ev&&!(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)){
    var t=false;
    function upd(){t=false;var r=ev.getBoundingClientRect(),h=window.innerHeight;
      var p=(h-r.top)/(h*.55);p=Math.max(0,Math.min(1,p));ev.style.setProperty("--p",p.toFixed(3))}
    function on(){if(!t){t=true;requestAnimationFrame(upd)}}
    window.addEventListener("scroll",on,{passive:true});window.addEventListener("resize",on);upd();
  }
  // horario: hoy
  try{var dias=["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"],hoy=dias[new Date().getDay()];
    [].forEach.call(d.querySelectorAll("#horario div"),function(r){if(r.firstChild.textContent===hoy)r.classList.add("hoy")});
    var ab=d.querySelector("#abierto span");if(ab)ab.textContent="Abierto ahora, recepción 24 horas";}catch(e){}
})();
