(function(){
 "use strict";
 var d=document, b=d.body, reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 d.documentElement.classList.add("js");

 /* menú */
 var btn=d.querySelector(".hd-btn"), menu=d.getElementById("hd-menu"), lbl=btn&&btn.querySelector(".hd-btn-lbl");
 function setMenu(open){
  if(open===b.classList.contains("menu-open")) return;
  b.classList.toggle("menu-open",open); btn.setAttribute("aria-expanded",open?"true":"false"); menu.setAttribute("aria-hidden",open?"false":"true");
  lbl.textContent=open?"Cerrar":"Menú";
 }
 if(btn&&menu){
  btn.addEventListener("click",function(){setMenu(!b.classList.contains("menu-open"))});
  menu.addEventListener("click",function(e){if(e.target.closest("a")||e.target===menu)setMenu(false)});
  d.addEventListener("keydown",function(e){if(e.key==="Escape")setMenu(false)});
 }

 /* anclas sin scroll-behavior en CSS */
 function irA(el){
  var top=el.getBoundingClientRect().top+window.scrollY-(el.id==="inicio"?0:(parseInt(getComputedStyle(d.documentElement).getPropertyValue("--hdh"),10)||60)+4);
  window.scrollTo({top:Math.max(0,top),behavior:reduce?"auto":"smooth"});
 }
 window.SakanaIr=irA;
 d.addEventListener("click",function(e){
  var a=e.target.closest&&e.target.closest('a[href^="#"]'); if(!a) return;
  var h=a.getAttribute("href"); if(h.length<2) return; var el=d.querySelector(h); if(!el) return;
  e.preventDefault(); setMenu(false); irA(el);
  if(history.replaceState) history.replaceState(null,"",h);
 });

 /* reveal por sondeo (no depende de IntersectionObserver) */
 var els=Array.prototype.slice.call(d.querySelectorAll("[data-reveal]"));
 function tick(){
  var vh=window.innerHeight;
  els=els.filter(function(el){var r=el.getBoundingClientRect(); if(r.top<vh*.92&&r.bottom>0){el.classList.add("is-in");return false} return true});
 }
 if(reduce) els.forEach(function(el){el.classList.add("is-in")}); else {tick(); window.addEventListener("scroll",tick,{passive:true}); window.addEventListener("resize",tick);}
 /* seguro: a los 1.6 s todo queda visible pase lo que pase */
 setTimeout(function(){els.forEach(function(el){el.classList.add("is-in")});els=[]},1600);

 /* flotantes: se esconden donde ya hay llamada o caja grande */
 var zFab=d.querySelectorAll("#carta,#caja,#lugar,#dudas,#pendientes,.pie"), zPill=d.querySelectorAll("#caja");
 function inView(list,f){var vh=window.innerHeight;for(var i=0;i<list.length;i++){var r=list[i].getBoundingClientRect();if(r.top<vh*f&&r.bottom>vh*(1-f))return true}return false}
 function upd(){b.classList.toggle("fab-off",inView(zFab,.75));b.classList.toggle("pill-off",inView(zPill,.8))}
 var ra=null; function sch(){if(!ra)ra=requestAnimationFrame(function(){ra=null;upd()})}
 window.addEventListener("scroll",sch,{passive:true}); window.addEventListener("resize",sch); sch();
})();
