(function(){
var doc=document.documentElement,WA="524492412077";
doc.classList.add("js");
function url(t){return"https://wa.me/"+WA+"?text="+encodeURIComponent(t)}
function wire(){var l=document.querySelectorAll("[data-wa]");for(var i=0;i<l.length;i++){var t=l[i].getAttribute("data-wa");if(t)l[i].href=url(t)}}
wire();
/* reveal */
var els=document.querySelectorAll(".sec h2,.sec .eyebrow,.sv-list li,.rv,.gl img,.tl-pic,.vs-map,.ck li,.bh-app");
for(var i=0;i<els.length;i++)els[i].setAttribute("data-r","");
if("IntersectionObserver"in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{rootMargin:"0px 0px -6% 0px"});for(i=0;i<els.length;i++)io.observe(els[i])}
setTimeout(function(){doc.classList.add("rv-done")},1600);
/* flotante se esconde en el hero */
var fl=document.querySelector(".wa-float"),hero=document.querySelector("[data-hide-wa]");
function fw(){if(!fl||!hero)return;fl.classList.toggle("off",hero.getBoundingClientRect().bottom>window.innerHeight*.6)}
addEventListener("scroll",fw,{passive:true});fw();
/* firma: el auto en la bahia */
var app=document.getElementById("bh");
if(app){
 var img=document.getElementById("bh-img"),cap=document.getElementById("bh-cap"),sum=document.getElementById("bh-sum"),go=document.getElementById("bh-go"),ceil=app.querySelector(".bh-ceil");
 var veh="sedán",art="un";var arts={"sedán":"un","camioneta":"una","pickup":"una","compacto":"un"};
 function render(){
  var s=[].map.call(app.querySelectorAll(".hexb.on"),function(b){return b.getAttribute("data-s")});
  var list=s.length?(s.length>1?s.slice(0,-1).join(", ")+" y "+s[s.length-1]:s[0]):"cotizar mi carro";
  var txt="Hola Chex Detailer, tengo "+arts[veh]+" "+veh+" y quiero "+(s.length?list:"que me cotizan el servicio")+". ¿Me cotizas?";
  if(!s.length)txt="Hola Chex Detailer, tengo "+arts[veh]+" "+veh+" y quiero cotizar. ¿Qué me recomiendan?";
  sum.textContent=s.length?"Tu "+veh+": "+list+".":"Tu "+veh+": elige qué le hacemos.";
  go.href=url(txt);go.setAttribute("data-wa",txt);
 }
 [].forEach.call(app.querySelectorAll(".bh-veh button"),function(b){b.addEventListener("click",function(){
  [].forEach.call(app.querySelectorAll(".bh-veh button"),function(o){o.classList.remove("on");o.setAttribute("aria-checked","false")});
  b.classList.add("on");b.setAttribute("aria-checked","true");veh=b.getAttribute("data-v");
  img.style.opacity=0;var src=b.getAttribute("data-src");setTimeout(function(){img.src=src;img.style.opacity=1},160);
  cap.textContent=b.querySelector("span").textContent;ceil.style.opacity=1;setTimeout(function(){ceil.style.opacity=.65},300);render()})});
 [].forEach.call(app.querySelectorAll(".hexb"),function(b){b.addEventListener("click",function(){var on=b.classList.toggle("on");b.setAttribute("aria-pressed",on);ceil.style.opacity=1;setTimeout(function(){ceil.style.opacity=.65},300);render()})});
 render();
}
})();
