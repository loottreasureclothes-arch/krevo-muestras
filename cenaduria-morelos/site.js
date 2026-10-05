(function(){
  "use strict";
  var $=function(s,r){return (r||document).querySelector(s);};
  var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};
  var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* menú */
  var btn=$(".burger"), menu=$("#menu");
  function setMenu(o){btn.setAttribute("aria-expanded",o?"true":"false");btn.setAttribute("aria-label",o?"Cerrar menú":"Abrir menú");menu.hidden=!o;document.body.style.overflow=o?"hidden":"";}
  btn.addEventListener("click",function(){setMenu(menu.hidden);});
  $$("a",menu).forEach(function(a){a.addEventListener("click",function(){setMenu(false);});});
  document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!menu.hidden){setMenu(false);btn.focus();}});

  /* horario: 16:00 a 23:30 todos los días, hora de Aguascalientes */
  function ahora(){
    try{
      var p=new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",weekday:"short",hour:"2-digit",minute:"2-digit",hour12:false}).formatToParts(new Date()),o={};
      p.forEach(function(x){o[x.type]=x.value;});
      var dias={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};
      return {d:dias[o.weekday],m:(parseInt(o.hour,10)%24)*60+parseInt(o.minute,10)};
    }catch(e){var n=new Date();return {d:n.getDay(),m:n.getHours()*60+n.getMinutes()};}
  }
  var t=ahora(), abierto=t.m>=960&&t.m<1410;
  $$("[data-open]").forEach(function(el){
    var tx=$("[data-open-txt]",el);
    el.classList.add(abierto?"on":"off");
    tx.textContent=abierto?"Abierto ahora · hasta las 11:30 pm":(t.m<960?"Cerrado ahora · abrimos a las 4:00 pm":"Cerrado ahora · abrimos mañana a las 4:00 pm");
  });
  $$("[data-horas] li").forEach(function(li){if(parseInt(li.getAttribute("data-d"),10)===t.d) li.classList.add("hoy");});

  /* reveal con red de seguridad de 1.6 s */
  if(!reduce&&"IntersectionObserver" in window){
    document.documentElement.classList.add("jsrv");
    var els=$$("[data-reveal]");
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});},{rootMargin:"0px 0px 0px 0px"});
    els.forEach(function(el){io.observe(el);});
    setTimeout(function(){
      var h=window.innerHeight*1.5;
      els.forEach(function(el){if(el.getBoundingClientRect().top<h) el.classList.add("in");});
    },1600);
    window.addEventListener("pagehide",function(){els.forEach(function(el){el.classList.add("in");});});
  }

  /* momento firma: el mantel se tiende y cae el sello (reversible) */
  var d=$(".desde");
  if(d){
    if(reduce||!("IntersectionObserver" in window)){d.classList.add("on");}
    else{
      var on=false;
      var io2=new IntersectionObserver(function(es){es.forEach(function(e){var v=e.isIntersecting&&e.intersectionRatio>.35;if(v!==on){on=v;d.classList.toggle("on",v);}});},{threshold:[0,.35,.6]});
      io2.observe(d);
      setTimeout(function(){if(d.getBoundingClientRect().top<window.innerHeight*.9&&d.getBoundingClientRect().bottom>0) d.classList.add("on");},1600);
    }
  }
})();
