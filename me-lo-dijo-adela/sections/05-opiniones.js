(function(){var r=document.getElementById("opi-rail"),c=document.getElementById("opi-count");if(!r)return;
var n=r.children.length;
function cur(){var w=r.children[0].getBoundingClientRect().width+14;return Math.round(r.scrollLeft/w)}
r.addEventListener("scroll",function(){c.textContent=Math.min(n,cur()+1)+" / "+n},{passive:true});
document.querySelectorAll(".opi-arr").forEach(function(b){b.addEventListener("click",function(){var i=Math.max(0,Math.min(n-1,cur()+ +b.dataset.d));var el=r.children[i];r.scrollTo({left:el.offsetLeft-r.offsetLeft-(r.clientWidth-el.offsetWidth)/2,behavior:"smooth"})})});
})();
