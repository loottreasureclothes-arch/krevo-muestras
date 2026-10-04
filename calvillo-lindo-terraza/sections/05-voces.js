(function(){var t=document.getElementById("rv-track");if(!t)return;var cs=[].slice.call(t.children),d=document.getElementById("rv-dots");
cs.forEach(function(c,i){var e=document.createElement("i");e.style.height=(6+(i%3)*6)+"px";d.appendChild(e)});var ds=[].slice.call(d.children);
function cur(){var m=t.scrollLeft+t.clientWidth/2,b=0,bd=1e9;cs.forEach(function(c,i){var x=Math.abs(c.offsetLeft+c.offsetWidth/2-m);if(x<bd){bd=x;b=i}});return b}
function upd(){var k=cur();ds.forEach(function(e,i){e.classList.toggle("on",i===k)})}
function go(k){k=Math.max(0,Math.min(cs.length-1,k));var c=cs[k];t.scrollTo({left:c.offsetLeft-(t.clientWidth-c.offsetWidth)/2})}
t.addEventListener("scroll",function(){requestAnimationFrame(upd)},{passive:true});
document.getElementById("rv-prev").onclick=function(){go(cur()-1)};document.getElementById("rv-next").onclick=function(){go(cur()+1)};
upd();})();
