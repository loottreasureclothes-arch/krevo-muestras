/* Comandas: contador y flechas del carrusel en celular */
(function(){
  var l=document.getElementById("pz-coms"),n=document.getElementById("pz-coms-n");if(!l||!n)return;
  var it=l.children,raf=0;
  function idx(){var c=l.scrollLeft+l.clientWidth/2,b=0,d=1e9;for(var i=0;i<it.length;i++){var m=it[i].offsetLeft+it[i].offsetWidth/2,x=Math.abs(m-c);if(x<d){d=x;b=i}}return b}
  function upd(){raf=0;n.textContent=(idx()+1)+" / "+it.length}
  l.addEventListener("scroll",function(){if(!raf)raf=requestAnimationFrame(upd)},{passive:true});
  var bs=document.querySelectorAll(".pz-flecha");
  for(var i=0;i<bs.length;i++)bs[i].addEventListener("click",function(){var k=Math.max(0,Math.min(it.length-1,idx()+(+this.getAttribute("data-dir"))));l.scrollTo({left:it[k].offsetLeft-(l.clientWidth-it[k].offsetWidth)/2,behavior:"smooth"})});
})();
