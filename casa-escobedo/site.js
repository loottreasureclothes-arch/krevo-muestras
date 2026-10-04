(function(){
  var WA="524495290113";
  function waUrl(m){return "https://wa.me/"+WA+"?text="+encodeURIComponent(m);}
  window.CE={waUrl:waUrl};
  // wa.me: el JS solo reescribe el href
  var l=document.querySelectorAll("[data-wa]");
  for(var i=0;i<l.length;i++)l[i].href=waUrl(l[i].getAttribute("data-wa"));
  // menu
  var b=document.querySelector(".menu-btn"),m=document.getElementById("menu"),lbl=b&&b.querySelector(".menu-lbl");
  function set(o){b.setAttribute("aria-expanded",o);m.hidden=!o;lbl.textContent=o?"Cerrar":"Menú";document.body.style.overflow=o?"hidden":"";}
  if(b){b.addEventListener("click",function(){set(m.hidden);});
   m.addEventListener("click",function(e){if(e.target.tagName==="A")set(false);});
   document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!m.hidden)set(false);});}
  // flotante se esconde donde ya hay boton grande
  var zones=document.querySelectorAll("[data-hide-wa]"),raf=null;
  function upd(){raf=null;var vh=innerHeight,on=false;for(var i=0;i<zones.length;i++){var r=zones[i].getBoundingClientRect();if(r.top<vh*.85&&r.bottom>0){on=true;break;}}document.body.classList.toggle("wa-off",on);}
  function sch(){if(!raf)raf=requestAnimationFrame(upd);}
  sch();addEventListener("scroll",sch,{passive:true});addEventListener("resize",sch);
})();
