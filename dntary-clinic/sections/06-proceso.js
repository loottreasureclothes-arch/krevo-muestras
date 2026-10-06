(function(){
  var s=document.getElementById("steps");if(!s||!("IntersectionObserver" in window)){if(s)s.classList.add("is-in");return}
  new IntersectionObserver(function(es){es.forEach(function(e){s.classList.toggle("is-in",e.isIntersecting)})},{threshold:.35}).observe(s);
  setTimeout(function(){var r=s.getBoundingClientRect();if(r.top<innerHeight*.7&&r.bottom>0)s.classList.add("is-in")},1600);
})();
