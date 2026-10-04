/* La Plazoela: estado abierto/cerrado en vivo, horario de hoy, flotante de WhatsApp, reveal. */
(function(){
  "use strict";
  var WA="524499153815";
  function waUrl(m){return "https://wa.me/"+WA+"?text="+encodeURIComponent(m)}
  var links=document.querySelectorAll("[data-wa]");
  for(var i=0;i<links.length;i++){links[i].href=waUrl(links[i].getAttribute("data-wa"));links[i].target="_blank";links[i].rel="noopener"}
  document.getElementById("pz-fab").target="_blank";
  /* Horario: abre 17:30; cierra 24:00 lun, 00:30 mie a dom (cruza la medianoche); martes cerrado. */
  function ahora(){
    var d=new Date(),dia=d.getDay(),min=d.getHours()*60+d.getMinutes();
    var dis=function(x){return x!==2}; /* dia con servicio */
    var abierto=false,txt="";
    if(min>=1050&&dis(dia)){abierto=true;txt="Abierto, cerramos "+((dia===1)?"a las 12 am":"a las 12:30 am")}
    else if(min<30&&dis((dia+6)%7)&&(dia+6)%7!==1){abierto=true;txt="Abierto, cerramos a las 12:30 am"}
    else if(dia===2){txt="Hoy cerrado, abrimos mañana 5:30 pm"}
    else if(min<1050&&dis(dia)){txt="Abrimos hoy a las 5:30 pm"}
    else{txt="Abrimos mañana a las 5:30 pm"}
    return {abierto:abierto,txt:txt,dia:dia}
  }
  var e=document.getElementById("pz-estado"),hoy=document.getElementById("pz-hoy"),a=ahora();
  if(e){e.classList.add(a.abierto?"on":"off");e.querySelector("span").textContent=a.abierto?"Abierto ahora":"Cerrado ahora"}
  if(hoy)hoy.textContent=a.txt+".";
  var dh=a.dia; if(new Date().getHours()<1&&new Date().getMinutes()<30)dh=(dh+6)%7;
  var li=document.querySelector('#pz-hrs [data-d="'+dh+'"]'); if(li)li.classList.add("hoy");
  /* Flotante: se esconde donde ya hay un botón verde grande */
  var fab=document.getElementById("pz-fab"),zs=document.querySelectorAll("#inicio .pz-hero-btns,#pozole .pz-send,#visita .pz-vis-btns"),raf=0;
  function upd(){raf=0;var vh=innerHeight,on=false;for(var i=0;i<zs.length;i++){var r=zs[i].getBoundingClientRect();if(r.top<vh&&r.bottom>0){on=true;break}}fab.classList.toggle("off",on)}
  function sch(){if(!raf)raf=requestAnimationFrame(upd)}
  upd();addEventListener("scroll",sch,{passive:true});addEventListener("resize",sch);
  /* Reveal */
  var els=document.querySelectorAll("[data-reveal]"),pend=[].slice.call(els),r2=0;
  function tick(){r2=0;var vh=innerHeight;for(var i=pend.length-1;i>=0;i--){var r=pend[i].getBoundingClientRect();if(r.top<vh+40&&r.bottom>-40){pend[i].classList.add("in");pend.splice(i,1)}}}
  function sc(){if(!r2)r2=requestAnimationFrame(tick)}
  tick();addEventListener("scroll",sc,{passive:true});addEventListener("resize",sc);
  /* Anclas sin scroll-behavior en CSS */
  document.addEventListener("click",function(ev){
    var l=ev.target.closest&&ev.target.closest('a[href^="#"]');if(!l)return;var el=document.querySelector(l.getAttribute("href"));if(!el||l.getAttribute("href").length<2)return;
    ev.preventDefault();var h=document.querySelector(".pz-bar");
    scrollTo({top:Math.max(0,el.getBoundingClientRect().top+scrollY-(h?h.offsetHeight-1:0)),behavior:"auto"});
  });
})();
