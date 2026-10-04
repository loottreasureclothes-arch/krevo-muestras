(function(){
  var h=document.querySelector(".lc-hero"),w=h&&h.querySelector(".lc-tide");
  if(!w||(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches))return;
  var t=false;
  function u(){t=false;var y=Math.min(window.scrollY||0,1200);w.style.setProperty("--tx",(-(y*0.35)%120).toFixed(1)+"px");}
  window.addEventListener("scroll",function(){if(!t){t=true;requestAnimationFrame(u);}},{passive:true});u();
})();
