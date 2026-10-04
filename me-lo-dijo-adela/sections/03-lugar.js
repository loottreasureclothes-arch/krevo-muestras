/* Momento firma "el tabique calado": entra y el muro se abre; sale y se cierra. Resuelto a 1.6 s. */
(function(){
  var el=document.querySelector("[data-moment]");if(!el)return;
  var forced=false;
  function chk(){var r=el.getBoundingClientRect(),vh=innerHeight;var inV=r.top<vh*.7&&r.bottom>vh*.25;el.classList.toggle("is-open",forced&&!inV?false:(inV||forced))}
  addEventListener("scroll",chk,{passive:true});addEventListener("resize",chk);chk();
  setTimeout(function(){forced=true;el.classList.add("is-open");
    /* despues de resolver, vuelve a ser reversible con el scroll */
    setTimeout(function(){forced=false;chk()},900)},1600);
})();
