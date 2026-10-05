(function(){
  var s=document.getElementById("noche");if(!s)return;
  function tick(){
    var r=s.getBoundingClientRect(),vh=window.innerHeight||600;
    s.classList.toggle("is-lit",r.top<vh*.55&&r.bottom>vh*.25);
  }
  var raf=null;function sch(){if(!raf)raf=requestAnimationFrame(function(){raf=null;tick()})}
  window.addEventListener("scroll",sch,{passive:true});window.addEventListener("resize",sch);tick();
})();
