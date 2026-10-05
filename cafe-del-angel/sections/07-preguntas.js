(function(){var l=document.querySelectorAll("#preguntas .faq-it");if(!l.length)return;
Array.prototype.forEach.call(l,function(it){var b=it.querySelector(".faq-q"),a=it.querySelector(".faq-a");b.addEventListener("click",function(){var o=!it.classList.contains("is-open");
Array.prototype.forEach.call(l,function(x){x.classList.remove("is-open");x.querySelector(".faq-q").setAttribute("aria-expanded","false");x.querySelector(".faq-a").hidden=true});
if(o){it.classList.add("is-open");b.setAttribute("aria-expanded","true");a.hidden=false}})})})();
