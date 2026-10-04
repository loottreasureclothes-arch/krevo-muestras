(function(){
 var l=document.getElementById("opi-l"); if(!l) return;
 var it=l.children, n=document.getElementById("opi-i");
 function idx(){var x=l.scrollLeft, best=0, d=1e9; for(var i=0;i<it.length;i++){var dd=Math.abs(it[i].offsetLeft-l.offsetLeft-x-parseInt(getComputedStyle(l).paddingLeft,10)); if(dd<d){d=dd;best=i}} return best}
 var ra=null; l.addEventListener("scroll",function(){ if(ra) return; ra=requestAnimationFrame(function(){ra=null; n.textContent=idx()+1}); },{passive:true});
 document.querySelectorAll(".opi-b").forEach(function(b){b.addEventListener("click",function(){
  var i=Math.max(0,Math.min(it.length-1,idx()+(+b.getAttribute("data-d"))));
  l.scrollTo({left:it[i].offsetLeft-it[0].offsetLeft,behavior:"smooth"});
 })});
})();
