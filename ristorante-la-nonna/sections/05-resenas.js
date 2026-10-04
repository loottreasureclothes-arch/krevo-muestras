(function(){
  var c=document.getElementById("comandas"),pos=document.getElementById("res-pos");
  if(!c)return;var it=c.children,n=it.length;
  function idx(){var m=c.scrollLeft+c.clientWidth/2,b=0,bd=1e9;for(var i=0;i<n;i++){var e=it[i],d=Math.abs(e.offsetLeft+e.offsetWidth/2-m);if(d<bd){bd=d;b=i}}return b}
  var raf=null;c.addEventListener("scroll",function(){if(!raf)raf=requestAnimationFrame(function(){raf=null;if(pos)pos.textContent=(idx()+1)+" / "+n})},{passive:true});
  [].forEach.call(document.querySelectorAll(".res-flecha"),function(b){b.addEventListener("click",function(){var i=Math.max(0,Math.min(n-1,idx()+(+b.getAttribute("data-dir"))));var e=it[i];c.scrollTo({left:e.offsetLeft-(c.clientWidth-e.offsetWidth)/2,behavior:"smooth"})})});
})();
