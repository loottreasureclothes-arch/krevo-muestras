(function(){var c=document.getElementById("coms");if(!c)return;var it=c.querySelectorAll(".com"),lab=document.getElementById("coms-i"),n=it.length;
function cur(){var m=c.scrollLeft+c.clientWidth/2,b=0,d=1e9;for(var i=0;i<n;i++){var x=it[i].offsetLeft+it[i].offsetWidth/2,k=Math.abs(x-m);if(k<d){d=k;b=i}}return b}
function pad(v){return (v<10?"0":"")+v}
function upd(){lab.textContent=pad(cur()+1)+" / "+pad(n)}
function go(i){i=Math.max(0,Math.min(n-1,i));var el=it[i];c.scrollTo({left:el.offsetLeft-(c.clientWidth-el.offsetWidth)/2,behavior:"smooth"})}
document.querySelector(".cn-p").addEventListener("click",function(){go(cur()-1)});
document.querySelector(".cn-n").addEventListener("click",function(){go(cur()+1)});
var t;c.addEventListener("scroll",function(){clearTimeout(t);t=setTimeout(upd,60)},{passive:true});upd();})();
