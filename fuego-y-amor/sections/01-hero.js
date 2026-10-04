(function(){var h=document.querySelector(".hero");if(!h)return;
function open(){h.classList.add("open")}
requestAnimationFrame(function(){requestAnimationFrame(function(){setTimeout(open,60)})});
setTimeout(open,1500);})();
