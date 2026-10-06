/* Momento firma: la ola roja y blanca de su carta corre con el scroll (reversible, parada = estado final). */
(function(){
  var run=document.getElementById("ola-run");if(!run)return;
  if(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  var t=false;
  function u(){t=false;var x=-((window.scrollY*0.35)%80);run.style.transform="translate3d("+x+"px,0,0)";}
  addEventListener("scroll",function(){if(!t){t=true;requestAnimationFrame(u);}},{passive:true});u();
})();
