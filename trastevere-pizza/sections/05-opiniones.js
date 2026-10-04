(function(){
var el=document.getElementById("ops-big");if(!el)return;
if("IntersectionObserver" in window){new IntersectionObserver(function(es){es.forEach(function(e){el.classList.toggle("is-in",e.isIntersecting)})},{threshold:.35}).observe(el)}else el.classList.add("is-in");
})();
