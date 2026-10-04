(function(){"use strict";
var t=document.getElementById("cc-rv-track"),c=document.getElementById("cc-rv-count");if(!t)return;
var cards=t.querySelectorAll(".cc-rv");
function idx(){var w=cards[0].getBoundingClientRect().width+14;return Math.round(t.scrollLeft/w);}
function upd(){if(c)c.textContent=Math.min(idx()+1,cards.length)+" / "+cards.length;}
document.querySelectorAll(".cc-rv-btn").forEach(function(b){b.addEventListener("click",function(){var w=cards[0].getBoundingClientRect().width+14;t.scrollBy({left:w*(+b.getAttribute("data-dir")),behavior:"auto"});setTimeout(upd,60);});});
t.addEventListener("scroll",function(){window.requestAnimationFrame(upd);},{passive:true});
})();
