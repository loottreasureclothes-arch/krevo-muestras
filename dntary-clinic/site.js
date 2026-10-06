(function(){
  "use strict";
  var WA="524492047733";
  var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  /* WhatsApp: los href ya nacen reales; aqui solo se confirman */
  $("[data-wa]").forEach(function(a){if(a.hasAttribute("data-dyn"))return;a.href="https://wa.me/"+WA+"?text="+encodeURIComponent(a.getAttribute("data-wa"));a.target="_blank";a.rel="noopener"});
  var sm=document.getElementById("smile-wa");if(sm){sm.target="_blank";sm.rel="noopener"}
  /* header solido al bajar */
  var head=document.querySelector(".head");
  function hd(){head.classList.toggle("is-solid",scrollY>40)}
  hd();addEventListener("scroll",hd,{passive:true});
  /* menu */
  var btn=document.querySelector(".menu-btn"),menu=document.getElementById("menu"),lbl=btn.querySelector(".lbl");
  function setMenu(o){menu.classList.toggle("is-open",o);btn.setAttribute("aria-expanded",o);menu.setAttribute("aria-hidden",!o);lbl.textContent=o?"Cerrar":"Menú";document.body.style.overflow=o?"hidden":""}
  btn.addEventListener("click",function(){setMenu(!menu.classList.contains("is-open"))});
  addEventListener("keydown",function(e){if(e.key==="Escape")setMenu(false)});
  /* anclas sin scroll-behavior en CSS */
  document.addEventListener("click",function(e){
    var a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a)return;
    var h=a.getAttribute("href");if(h.length<2)return;var el=document.querySelector(h);if(!el)return;
    e.preventDefault();setMenu(false);
    var top=el.getBoundingClientRect().top+scrollY-(h==="#top"?0:56);
    scrollTo({top:Math.max(0,top),behavior:reduce?"auto":"smooth"});
    if(history.replaceState)history.replaceState(null,"",h);
  });
  /* flotante de WhatsApp se esconde donde ya hay CTA grande */
  var zones=$("#sonrisa .smile-act,#visitanos,#pendientes,.foot");
  var raf=null;
  function upd(){raf=null;var vh=innerHeight,on=false;zones.forEach(function(z){var r=z.getBoundingClientRect();if(r.top<vh*.85&&r.bottom>0)on=true});document.body.classList.toggle("wa-off",on)}
  function sch(){if(!raf)raf=requestAnimationFrame(upd)}
  sch();addEventListener("scroll",sch,{passive:true});addEventListener("resize",sch);
  /* reveal: visible a los 1.6 s pase lo que pase una vez que le toca */
  var els=$("[data-reveal]");
  function show(el){el.classList.add("is-in")}
  if(reduce||!("IntersectionObserver" in window)){els.forEach(show)}
  else{
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){show(e.target);io.unobserve(e.target)}})},{rootMargin:"0px 0px -6% 0px"});
    els.forEach(function(e){io.observe(e)});
    function safety(){els.forEach(function(e){if(!e.classList.contains("is-in")&&e.getBoundingClientRect().top<innerHeight)show(e)})}
    setTimeout(safety,1600);
    addEventListener("scroll",function(){clearTimeout(safety.t);safety.t=setTimeout(safety,1600)},{passive:true});
  }
  /* Abierto ahora (hora de Aguascalientes, UTC-6 todo el año) */
  var H={0:null,1:[11,21],2:[11,21],3:[11,21],4:[11,21],5:[11,21],6:[11,15]};
  function ags(){var n=new Date(),u=n.getTime()+n.getTimezoneOffset()*60000;return new Date(u-6*3600000)}
  function open(){
    var d=ags(),day=d.getDay(),t=d.getHours()+d.getMinutes()/60,h=H[day],el=document.getElementById("open-now");
    $("#hrs li").forEach(function(li){li.classList.toggle("today",+li.getAttribute("data-d")===day)});
    var on=h&&t>=h[0]&&t<h[1];
    el.textContent=on?"Abierto ahora · cierra "+(h[1]===21?"9 p.m.":"3 p.m."):"Cerrado ahora";
    el.classList.toggle("on",!!on);
  }
  open();setInterval(open,60000);
})();
