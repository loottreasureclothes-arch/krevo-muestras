(function(){
var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
var WA="524492436096";
function $(s,r){return (r||document).querySelector(s)}function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function initWa(){$$("[data-wa]").forEach(function(a){a.href="https://wa.me/"+WA+"?text="+encodeURIComponent(a.getAttribute("data-wa"));a.target="_blank";a.rel="noopener"})}
function initMenu(){
  var btn=$(".kc-menu-btn"),menu=$("#kc-menu");if(!btn||!menu)return;var b=document.body,lbl=$(".kc-lbl",btn);
  function set(o){b.classList.toggle("menu-open",o);btn.setAttribute("aria-expanded",o);menu.setAttribute("aria-hidden",!o);lbl.textContent=o?"Cerrar":"Menú"}
  btn.addEventListener("click",function(){set(!b.classList.contains("menu-open"))});
  menu.addEventListener("click",function(e){if(e.target.closest("a")||e.target===menu)set(false)});
  document.addEventListener("keydown",function(e){if(e.key==="Escape")set(false)});
  window.kcCerrar=function(){set(false)};
}
function watch(list,frac,cb){
  var p=list.slice(),raf=null;
  function tick(){raf=null;var vh=innerHeight;for(var i=p.length-1;i>=0;i--){var r=p[i].getBoundingClientRect();if(r.top<vh*frac&&r.bottom>0){var el=p[i];p.splice(i,1);cb(el)}}if(p.length)sch()}
  function sch(){if(!raf)raf=requestAnimationFrame(tick)}
  sch();addEventListener("scroll",sch,{passive:true});addEventListener("resize",sch);
}
function initReveal(){
  var els=$$("[data-reveal]");if(!els.length)return;
  if(reduce){els.forEach(function(e){e.classList.add("is-in")});return}
  document.documentElement.classList.add("rv-on");
  watch(els,.92,function(e){e.classList.add("is-in")});
}
function initWaHide(){
  var z=$$("#visitanos,#pie,#charola");if(!z.length)return;var raf=null;
  function up(){raf=null;var on=false;z.forEach(function(e){var r=e.getBoundingClientRect();if(r.top<innerHeight*.7&&r.bottom>innerHeight*.3)on=true});document.body.classList.toggle("wa-off",on)}
  function sch(){if(!raf)raf=requestAnimationFrame(up)}
  sch();addEventListener("scroll",sch,{passive:true});addEventListener("resize",sch);
}
function go(el){var top=el.getBoundingClientRect().top+scrollY-70;scrollTo({top:Math.max(0,top),behavior:reduce?"auto":"smooth"})}
function initAnchors(){
  document.addEventListener("click",function(e){
    var a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a||e.defaultPrevented)return;
    var h=a.getAttribute("href");if(h.length<2)return;var el=$(h);if(!el)return;
    e.preventDefault();if(window.kcCerrar)window.kcCerrar();go(el);
    if(history.replaceState)history.replaceState(null,"",h);
  });
}
function init(){initWa();initMenu();initWaHide();initReveal();initAnchors()}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
