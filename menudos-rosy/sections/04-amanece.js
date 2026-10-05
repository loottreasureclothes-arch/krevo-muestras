(function(){
var sky=document.getElementById("dawn-sky"),glow=document.getElementById("dawn-glow"),sec=document.getElementById("amanece");
if(!sky||!sec)return;
var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function upd(){var r=sec.getBoundingClientRect(),vh=innerHeight;var p=1-(r.top+r.height*.25)/(vh+r.height*.25);p=Math.max(0,Math.min(1,p));
 sky.style.opacity=(.9*(1-p)).toFixed(3);glow.style.opacity=(.8*p).toFixed(3)}
if(reduce){sky.style.opacity=0;glow.style.opacity=.5;return}
addEventListener("scroll",upd,{passive:true});addEventListener("resize",upd);upd();
})();
