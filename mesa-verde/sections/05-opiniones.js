(function(){var t=document.getElementById('op-track'),p=document.getElementById('op-pos');if(!t)return;var c=t.children;
function idx(){var r=t.getBoundingClientRect(),best=0,d=1e9;for(var i=0;i<c.length;i++){var b=c[i].getBoundingClientRect(),x=Math.abs(b.left-r.left-(r.width-b.width)/2);if(x<d){d=x;best=i}}return best}
var raf;t.addEventListener('scroll',function(){cancelAnimationFrame(raf);raf=requestAnimationFrame(function(){p.textContent=(idx()+1)+' / '+c.length})},{passive:true});
document.querySelectorAll('.op-arr').forEach(function(b){b.addEventListener('click',function(){var i=Math.max(0,Math.min(c.length-1,idx()+(+b.getAttribute('data-dir'))));t.scrollTo({left:c[i].offsetLeft-(t.clientWidth-c[i].clientWidth)/2,behavior:'auto'})})});})();
