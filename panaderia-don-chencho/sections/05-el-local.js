(function(){
  var g=document.getElementById("gl");if(!g)return;
  var items=g.querySelectorAll(".gl-i"),n=document.getElementById("glN");
  function cur(){var c=g.scrollLeft+g.clientWidth/2,b=0,bd=1e9;items.forEach(function(it,i){var m=it.offsetLeft+it.offsetWidth/2,d=Math.abs(m-c);if(d<bd){bd=d;b=i}});return b}
  var raf=0;g.addEventListener("scroll",function(){if(!raf)raf=requestAnimationFrame(function(){raf=0;n.textContent=(cur()+1)+" / "+items.length})},{passive:true});
  document.querySelectorAll(".gl-b").forEach(function(b){b.addEventListener("click",function(){var i=Math.max(0,Math.min(items.length-1,cur()+ +b.dataset.d)),it=items[i];g.scrollTo({left:it.offsetLeft-(g.clientWidth-it.offsetWidth)/2,behavior:"smooth"})})});
})();
