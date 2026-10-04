(function(){var t=document.querySelector(".op-tira"),p=document.querySelectorAll(".op-pasos i");if(!t||!p.length)return;var c=t.querySelectorAll(".op"),raf=0;
function u(){raf=0;var m=t.scrollWidth-t.clientWidth,k=m>0?Math.round(t.scrollLeft/m*(c.length-1)):0;for(var i=0;i<p.length;i++)p[i].classList.toggle("on",i===k);}
t.addEventListener("scroll",function(){if(!raf)raf=requestAnimationFrame(u);},{passive:true});})();
