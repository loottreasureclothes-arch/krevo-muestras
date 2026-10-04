/* Momento firma: se prenden las lámparas al llegar; se apagan al salir (reversible) */
(function(){
  "use strict";
  function init(){
    var s=document.getElementById("salon");if(!s||(window.CM&&CM.reduce))return;
    s.classList.add("js-on");var raf=null;
    function u(){raf=null;var r=s.getBoundingClientRect(),vh=innerHeight;s.classList.toggle("lit",r.top<vh*.7&&r.bottom>vh*.1);}
    function q(){if(!raf)raf=requestAnimationFrame(u);}
    q();addEventListener("scroll",q,{passive:true});addEventListener("resize",q);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
