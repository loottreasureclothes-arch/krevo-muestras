(function(){
 "use strict";
 var tabs=document.querySelectorAll(".car-tab"), cats=document.querySelectorAll(".car-cat");
 Array.prototype.forEach.call(tabs,function(t){
  t.addEventListener("click",function(){
   var k=t.getAttribute("data-tab");
   Array.prototype.forEach.call(tabs,function(x){var on=x===t;x.classList.toggle("on",on);x.setAttribute("aria-selected",on?"true":"false")});
   Array.prototype.forEach.call(cats,function(c){c.classList.toggle("on",c.getAttribute("data-cat")===k)});
  });
 });
})();
