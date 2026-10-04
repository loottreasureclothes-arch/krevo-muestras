(function(){var r=document.getElementById("resRiel");if(!r)return;
Array.prototype.forEach.call(document.querySelectorAll(".res-fl"),function(b){b.addEventListener("click",function(){var c=r.querySelector(".r");var w=c?c.getBoundingClientRect().width+14:300;r.scrollBy({left:w*(+b.getAttribute("data-dir")),behavior:"auto"});});});})();
