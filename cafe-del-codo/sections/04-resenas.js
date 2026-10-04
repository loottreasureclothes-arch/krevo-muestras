(function(){var t=document.getElementById("rs-track");if(!t)return;var c=document.getElementById("rs-cont"),cards=t.querySelectorAll(".rs-c"),n=cards.length;
function idx(){var best=0,d=1e9,l=t.getBoundingClientRect().left;for(var i=0;i<n;i++){var x=Math.abs(cards[i].getBoundingClientRect().left-l);if(x<d){d=x;best=i;}}return best;}
function go(k){var i=Math.max(0,Math.min(n-1,idx()+k));cards[i].scrollIntoView({block:"nearest",inline:"start"});upd();}
var r=null;function upd(){r=null;c.textContent=(idx()+1)+" / "+n;}
t.addEventListener("scroll",function(){if(!r)r=requestAnimationFrame(upd);},{passive:true});
document.getElementById("rs-prev").addEventListener("click",function(){go(-1);});
document.getElementById("rs-next").addEventListener("click",function(){go(1);});})();
