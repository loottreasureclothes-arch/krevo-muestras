(function(){
  "use strict";
  var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  /* menu */
  var body=document.body,btn=document.querySelector(".hdr-menu-btn"),menu=document.getElementById("menu");
  function setMenu(o){
    body.classList.toggle("menu-open",o);
    btn.setAttribute("aria-expanded",o?"true":"false");
    menu.setAttribute("aria-hidden",o?"false":"true");
    var l=btn.querySelector(".hdr-menu-lbl");if(l)l.textContent=o?"Cerrar":"Menú";
  }
  if(btn&&menu){
    btn.addEventListener("click",function(){setMenu(!body.classList.contains("menu-open"))});
    menu.addEventListener("click",function(e){if(e.target.closest("a"))setMenu(false)});
    document.addEventListener("keydown",function(e){if(e.key==="Escape")setMenu(false)});
  }
  /* anclas sin scroll-behavior en CSS */
  document.addEventListener("click",function(e){
    var a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a||e.defaultPrevented)return;
    var h=a.getAttribute("href");if(h.length<2)return;
    var el=document.querySelector(h);if(!el)return;
    e.preventDefault();
    var hh=document.querySelector(".hdr");
    var top=el.getBoundingClientRect().top+window.scrollY-(hh?hh.offsetHeight:0)+(h==="#top"?0:1);
    window.scrollTo({top:Math.max(0,top),behavior:reduce?"auto":"smooth"});
    if(history.replaceState)history.replaceState(null,"",h);
  });
  /* reveal por sondeo (no depende de IntersectionObserver) */
  var pend=[].slice.call(document.querySelectorAll("[data-reveal]"));
  function sweep(){
    var vh=window.innerHeight||600;
    for(var i=pend.length-1;i>=0;i--){var r=pend[i].getBoundingClientRect();if(r.top<vh*.92&&r.bottom>0){pend[i].classList.add("is-in");pend.splice(i,1)}}
  }
  window.addEventListener("scroll",sweep,{passive:true});window.addEventListener("resize",sweep);sweep();
  /* horario: Abierto ahora (hora de Aguascalientes) */
  var H={0:[1140,1410],1:[1140,1440],2:[1140,1440],3:[1140,1440],4:[1140,1440],5:[1140,1440],6:[1140,1440]};
  var DN=["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
  function now(){
    try{
      var p=new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",weekday:"short",hour:"2-digit",minute:"2-digit",hour12:false}).formatToParts(new Date()),o={};
      p.forEach(function(x){o[x.type]=x.value});
      var w={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[o.weekday];
      return {d:w,m:(parseInt(o.hour,10)%24)*60+parseInt(o.minute,10)};
    }catch(e){var n=new Date();return {d:n.getDay(),m:n.getHours()*60+n.getMinutes()}}
  }
  function status(){
    var n=now(),h=H[n.d],open=n.m>=h[0]&&n.m<h[1];
    if(open)return {open:true,short:"Abierto ahora",long:"Abierto ahora · cierra "+(h[1]===1440?"a las 24:00":"a las 23:30")};
    if(n.m<h[0])return {open:false,short:"Abre 19:00",long:"Cerrado · abre hoy a las 19:00"};
    var nx=DN[(n.d+1)%7];
    return {open:false,short:"Abre 19:00",long:"Cerrado · abre mañana a las 19:00 ("+nx+")"};
  }
  function paintStatus(){
    var s=status(),a=document.getElementById("hdr-open"),b=document.getElementById("vis-now"),c=document.getElementById("hero-now");
    if(a){a.textContent=s.short;a.classList.toggle("is-open",s.open)}
    if(b){b.textContent=s.long;b.classList.toggle("is-open",s.open)}
    if(c)c.textContent=s.long;
    var n=now(),li=document.querySelectorAll("#vis-h li");
    for(var i=0;i<li.length;i++)li[i].classList.toggle("is-today",+li[i].getAttribute("data-d")===n.d);
  }
  paintStatus();setInterval(paintStatus,60000);
  /* flotante: se esconde donde ya hay botones de llamar grandes */
  var fab=document.querySelector("[data-hide-fab]"),zones=[document.getElementById("visitanos"),document.getElementById("pie"),document.getElementById("inicio")];
  function fabTick(){
    if(!fab)return;var vh=window.innerHeight||600,off=false;
    zones.forEach(function(z){if(!z)return;var r=z.getBoundingClientRect();if(r.top<vh*.6&&r.bottom>vh*.4)off=true});
    fab.classList.toggle("is-off",off);
  }
  var raf=null;function sch(){if(!raf)raf=requestAnimationFrame(function(){raf=null;fabTick()})}
  window.addEventListener("scroll",sch,{passive:true});window.addEventListener("resize",sch);fabTick();
})();
