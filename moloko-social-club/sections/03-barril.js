(function(){
  var s=document.getElementById("barril");if(!s||!("IntersectionObserver" in window))return;
  if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  s.classList.add("pre");
  new IntersectionObserver(function(e){
    var r=e[0];
    if(r.intersectionRatio>0.3)s.classList.remove("pre");
    else if(r.intersectionRatio<0.08)s.classList.add("pre");
  },{threshold:[0,0.08,0.3,0.6]}).observe(s);
  setTimeout(function(){var r=s.getBoundingClientRect();if(r.top<window.innerHeight&&r.bottom>0)s.classList.remove("pre");},1600);
})();
