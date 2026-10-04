(function(){var r=document.getElementById("opi-rail"),n=document.getElementById("opi-n");if(!r)return;var c=r.querySelectorAll(".opi-c");
function idx(){var x=r.scrollLeft+r.clientWidth/2,b=0,d=1e9;for(var i=0;i<c.length;i++){var m=c[i].offsetLeft+c[i].offsetWidth/2,k=Math.abs(m-x);if(k<d){d=k;b=i}}return b}
function go(i){i=Math.max(0,Math.min(c.length-1,i));r.scrollTo({left:c[i].offsetLeft-(r.clientWidth-c[i].offsetWidth)/2,behavior:window.CDA&&CDA.reduce?"auto":"smooth"})}
var t;r.addEventListener("scroll",function(){clearTimeout(t);t=setTimeout(function(){n.textContent=(idx()+1)+" / "+c.length},80)},{passive:true});
document.querySelectorAll(".opi-b").forEach(function(b){b.addEventListener("click",function(){go(idx()+ +b.getAttribute("data-d"))})});})();
