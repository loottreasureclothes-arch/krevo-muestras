(function(){var r=document.getElementById("vz-rail"),n=document.getElementById("vz-n");if(!r||!n)return;var c=r.children,t=c.length;
function idx(){var x=r.scrollLeft+r.clientWidth/2,b=0,d=1e9;for(var i=0;i<t;i++){var m=c[i].offsetLeft+c[i].offsetWidth/2,k=Math.abs(m-x);if(k<d){d=k;b=i}}return b}
function go(s){var i=Math.max(0,Math.min(t-1,idx()+s));r.scrollTo({left:c[i].offsetLeft-(r.clientWidth-c[i].offsetWidth)/2})}
r.addEventListener("scroll",function(){n.textContent=(idx()+1)+" / "+t},{passive:true});
var p=document.querySelector(".vz-b-prev"),q=document.querySelector(".vz-b-next");if(p)p.addEventListener("click",function(){go(-1)});if(q)q.addEventListener("click",function(){go(1)});})();
