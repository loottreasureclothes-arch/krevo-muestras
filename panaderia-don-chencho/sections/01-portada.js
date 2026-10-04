(function(){
  var h=document.getElementById("portada");if(!h)return;
  var rm=matchMedia("(prefers-reduced-motion: reduce)").matches;
  var scrolled=false;
  function cut(){var p=Math.min(1,Math.max(0,scrollY/(h.offsetHeight*.75)));h.style.setProperty("--cut",(p*100).toFixed(1)+"%")}
  if(!rm){
    h.classList.add("pre");
    requestAnimationFrame(function(){requestAnimationFrame(function(){
      h.classList.remove("pre");h.classList.add("go");
      setTimeout(function(){h.classList.remove("go");cut();addEventListener("scroll",function(){cut()},{passive:true})},1100);
    })});
  }
})();
