(function(){
  "use strict";
  var doc=document;
  function $(s,r){return (r||doc).querySelector(s)}
  function $$(s,r){return Array.prototype.slice.call((r||doc).querySelectorAll(s))}
  /* horario: lun=0 ... dom=6, minutos desde medianoche */
  var HOR=[[840,1380],[840,1380],[840,1380],[840,1380],[840,1440],[840,1440],[840,1320]];
  var DIAS=["lunes","martes","miércoles","jueves","viernes","sábado","domingo"];
  function hhmm(m){var h=Math.floor(m/60)%24,mm=m%60;return (h<10?"0":"")+h+":"+(mm<10?"0":"")+mm}
  function ahora(){
    var p={};
    try{
      new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",weekday:"short",hour:"numeric",minute:"numeric",hour12:false}).formatToParts(new Date()).forEach(function(x){p[x.type]=x.value});
      var wd={Mon:0,Tue:1,Wed:2,Thu:3,Fri:4,Sat:5,Sun:6}[p.weekday];
      return {d:wd,m:(parseInt(p.hour,10)%24)*60+parseInt(p.minute,10)};
    }catch(e){var n=new Date();return {d:(n.getDay()+6)%7,m:n.getHours()*60+n.getMinutes()}}
  }
  function estado(){
    var a=ahora(),h=HOR[a.d];
    if(a.m>=h[0]&&a.m<h[1]) return {on:true,txt:"Abierto ahora · cierra "+hhmm(h[1]),d:a.d};
    if(a.m<h[0]) return {on:false,txt:"Cerrado · abre hoy "+hhmm(h[0]),d:a.d};
    var nd=(a.d+1)%7;
    return {on:false,txt:"Cerrado · abre mañana "+hhmm(HOR[nd][0]),d:a.d};
  }
  function initOpen(){
    var e=estado();
    $$("[data-open]").forEach(function(el){
      el.textContent=e.txt;el.classList.remove("on","off");el.classList.add(e.on?"on":"off");
    });
    $$("[data-dia]").forEach(function(el){
      if(+el.getAttribute("data-dia")===e.d) el.classList.add("hoy");
    });
  }
  function initMenu(){
    var btn=$(".hdr-menu-btn"),menu=$("#menu");
    if(!btn||!menu) return;
    function set(o){
      btn.setAttribute("aria-expanded",o?"true":"false");
      if(o) menu.removeAttribute("hidden"); else menu.setAttribute("hidden","");
      $(".hdr-menu-lbl",btn).textContent=o?"Cerrar":"Menú";
    }
    btn.addEventListener("click",function(){set(menu.hasAttribute("hidden"))});
    menu.addEventListener("click",function(e){if(e.target.closest("a")) set(false)});
    doc.addEventListener("keydown",function(e){if(e.key==="Escape") set(false)});
  }
  function initFab(){
    var fab=$("#fab"),zs=$$("#visitanos .v-btns, #pie");
    if(!fab) return;
    function upd(){
      var vh=window.innerHeight,hide=false;
      zs.forEach(function(z){var r=z.getBoundingClientRect();if(r.top<vh-40&&r.bottom>0) hide=true});
      fab.classList.toggle("off",hide);
    }
    window.addEventListener("scroll",upd,{passive:true});window.addEventListener("resize",upd);upd();
  }
  function initReveal(){
    var els=$$("[data-reveal]");
    if(!("IntersectionObserver" in window)){els.forEach(function(e){e.classList.add("is-in")});return}
    var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add("is-in");io.unobserve(x.target)}})},{rootMargin:"0px 0px -6% 0px"});
    els.forEach(function(e){io.observe(e)});
  }
  function init(){initOpen();initMenu();initFab();initReveal();setInterval(initOpen,60000)}
  if(doc.readyState==="loading") doc.addEventListener("DOMContentLoaded",init); else init();
})();
