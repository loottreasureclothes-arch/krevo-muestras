(function(){
 var t=document.getElementById("op-track"),n=document.getElementById("op-n"); if(!t) return;
 var items=t.querySelectorAll(".tk");
 function cur(){var c=t.getBoundingClientRect(),best=0,bd=1e9;for(var i=0;i<items.length;i++){var r=items[i].getBoundingClientRect(),d=Math.abs(r.left-c.left-16);if(d<bd){bd=d;best=i}}return best}
 function upd(){n.textContent=(cur()+1)+" / "+items.length}
 t.addEventListener("scroll",function(){requestAnimationFrame(upd)},{passive:true});
 document.querySelectorAll(".op-b").forEach(function(b){b.addEventListener("click",function(){var i=Math.max(0,Math.min(items.length-1,cur()+(+b.dataset.dir)));items[i].scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"})})});
})();
