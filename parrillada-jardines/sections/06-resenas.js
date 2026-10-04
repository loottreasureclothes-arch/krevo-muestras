(function(){"use strict";
var t=document.getElementById("pj-rv-track"),f=document.getElementById("pj-rv-fill");if(!t)return;
function upd(){var m=t.scrollWidth-t.clientWidth;var p=m>0?t.scrollLeft/m:1;if(f)f.style.transform="scaleX("+(0.12+0.88*p)+")";}
t.addEventListener("scroll",upd,{passive:true});window.addEventListener("resize",upd);upd();
document.querySelectorAll(".pj-rv-btn").forEach(function(b){b.addEventListener("click",function(){var c=t.querySelector(".pj-rv");var w=c?c.getBoundingClientRect().width+16:300;t.scrollBy({left:w*(+b.dataset.dir),behavior:"auto"});});});
})();
