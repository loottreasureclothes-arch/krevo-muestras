(function(){
  "use strict";
  var doc=document,root=doc.documentElement;
  var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(!reduce)root.classList.add("js");
  var hd=doc.getElementById("hd"),btn=doc.getElementById("hd-btn"),menu=doc.getElementById("hd-menu");
  function onScroll(){hd.classList.toggle("on",(window.scrollY||0)>12)}
  window.addEventListener("scroll",onScroll,{passive:true});onScroll();
  function setMenu(o){menu.classList.toggle("open",o);btn.setAttribute("aria-expanded",o?"true":"false");btn.querySelector(".hd-lbl").textContent=o?"Cerrar":"Menú";doc.body.style.overflow=o?"hidden":""}
  btn.addEventListener("click",function(){setMenu(!menu.classList.contains("open"))});
  menu.addEventListener("click",function(e){if(e.target.closest("a"))setMenu(false)});
  doc.addEventListener("keydown",function(e){if(e.key==="Escape")setMenu(false)});
  /* reveal con red de seguridad a 1.6 s */
  var rv=[].slice.call(doc.querySelectorAll("[data-reveal]"));
  if(rv.length&&"IntersectionObserver"in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12});
    rv.forEach(function(el){io.observe(el)});
  }
  setTimeout(function(){rv.forEach(function(el){el.classList.add("in")})},1600);
  /* momento firma: globos suben al entrar a la seccion y bajan al salir */
  var bl=doc.querySelector(".bleed");
  if(bl&&"IntersectionObserver"in window){
    new IntersectionObserver(function(es){es.forEach(function(e){bl.classList.toggle("in",e.isIntersecting)})},{threshold:.35}).observe(bl);
  }else if(bl){bl.classList.add("in")}
  /* flotante de WhatsApp: se esconde donde ya hay boton verde propio */
  var fl=doc.querySelector("[data-wa-float]"),hide=[].slice.call(doc.querySelectorAll("[data-hide-wa]")),vis=0;
  if(fl&&hide.length&&"IntersectionObserver"in window){
    var hio=new IntersectionObserver(function(es){es.forEach(function(e){vis+=e.isIntersecting?1:-1});fl.classList.toggle("off",vis>0)},{threshold:.2});
    hide.forEach(function(s){hio.observe(s)});
  }
  /* abierto ahora (hora de Aguascalientes) */
  var H={0:0,1:0,2:1,3:1,4:1,5:0,6:0};
  function ags(){
    try{
      var p=new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",weekday:"short",hour:"numeric",minute:"numeric",hour12:false}).formatToParts(new Date()),o={};
      p.forEach(function(x){o[x.type]=x.value});
      var d={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[o.weekday];
      return{d:d,h:(parseInt(o.hour,10)%24)+parseInt(o.minute,10)/60};
    }catch(e){var n=new Date();return{d:n.getDay(),h:n.getHours()+n.getMinutes()/60}}
  }
  var n=ags(),el=doc.getElementById("open-now"),rows=doc.querySelectorAll("#hrs tr");
  rows.forEach(function(r){if(+r.getAttribute("data-d")===n.d)r.classList.add("hoy")});
  var t=H[n.d];
  if(el){el.textContent=t?"Hoy hay visitas. Pregunta la hora.":"Hoy no hay visitas. Visitas martes a jueves."}
})();
