(function(){
"use strict";
var WA="524492858816",$=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches;
/* reveal: CSS base = visible; con JS se esconde y a los 1.6 s todo queda visible */
if(!reduce&&"IntersectionObserver" in window){
  document.documentElement.classList.add("jsrv");
  var io=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle("in",e.isIntersecting||e.boundingClientRect.top<0)})},{threshold:.12,rootMargin:"0px 0px -6% 0px"});
  $$("[data-reveal],[data-floor]").forEach(function(el){io.observe(el)});
  setTimeout(function(){$$("[data-reveal],[data-floor]").forEach(function(el){el.classList.add("in")})},1600);
}
/* menu */
var mb=$(".hd-menu"),nav=$("#hd-nav");
function tog(o){nav.hidden=!o;mb.setAttribute("aria-expanded",o)}
mb.addEventListener("click",function(){tog(nav.hidden)});
$$("a",nav).forEach(function(a){a.addEventListener("click",function(){tog(false)})});
document.addEventListener("keydown",function(e){if(e.key==="Escape")tog(false)});
/* horarios */
var HR={
 colosio:[[11,21],[11,21],[11,21],[11,21],[11,21],[[9,15],[16,18]],[[12,17]]],
 universidad:[[11,20],[11,20],[11,20],[11,20],[11,20],[[10,18]],null]};
function now(){
  var p=new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",weekday:"short",hour:"numeric",minute:"numeric",hour12:false}).formatToParts(new Date()),o={};
  p.forEach(function(x){o[x.type]=x.value});
  var d={Mon:0,Tue:1,Wed:2,Thu:3,Fri:4,Sat:5,Sun:6}[o.weekday];
  return {d:d,h:(+o.hour%24)+(+o.minute)/60};
}
function ranges(k,d){var r=HR[k][d];if(!r)return[];return typeof r[0]==="number"?[r]:r}
function fmt(h){return h+":00"}
function status(k){
  var n=now(),rs=ranges(k,n.d),i;
  for(i=0;i<rs.length;i++)if(n.h>=rs[i][0]&&n.h<rs[i][1])return {open:true,txt:"Abierto ahora · cierra "+fmt(rs[i][1])+" h"};
  for(i=0;i<rs.length;i++)if(n.h<rs[i][0])return {open:false,txt:"Cerrado · abre hoy "+fmt(rs[i][0])+" h"};
  return {open:false,txt:"Cerrado ahora"};
}
function today(k){var n=now(),rs=ranges(k,n.d);if(!rs.length)return "Hoy cerrado";return "Hoy: "+rs.map(function(r){return fmt(r[0])+" a "+fmt(r[1])}).join(" y ")}
$$("[data-open]").forEach(function(el){var s=status(el.getAttribute("data-open"));el.textContent=s.txt;el.classList.add(s.open?"open":"closed")});
var td=now().d;
$$("[data-hrs] li").forEach(function(li){if(+li.getAttribute("data-d")===td)li.classList.add("hoy")});
/* tabs */
$$(".tab").forEach(function(t){t.addEventListener("click",function(){
  var k=t.getAttribute("data-t");
  $$(".tab").forEach(function(x){var on=x===t;x.classList.toggle("on",on);x.setAttribute("aria-selected",on)});
  $$(".vz-p").forEach(function(p){p.hidden=p.getAttribute("data-p")!==k});
})});
/* Tu silla (componente firma) */
var BARB={Colosio:["Emanuel","Alex"],Universidad:["Yair","El Güero"]};
var st={suc:"Colosio",bar:"Emanuel",srv:"corte"},barBox=$("#bar-opts"),pole=$("#tk-pole"),spin=0;
function renderBar(){
  barBox.innerHTML="";
  BARB[st.suc].concat(["Quien esté libre"]).forEach(function(b,i){
    var x=document.createElement("button");x.type="button";x.className="opt"+(i===0?" on":"");x.setAttribute("data-v",b);x.textContent=b;barBox.appendChild(x);
  });
  st.bar=BARB[st.suc][0];
}
function upd(){
  var who=st.bar==="Quien esté libre"?"La que esté libre":"Silla de "+st.bar;
  $("#tk-who").textContent=who;
  $("#tk-line").textContent=st.suc+" · "+st.srv;
  $("#tk-hrs").textContent=today(st.suc.toLowerCase());
  var msg="Hola Tres46, quiero apartar mi silla en "+st.suc+" "+(st.bar==="Quien esté libre"?"con quien esté libre":"con "+st.bar)+" para "+st.srv+". ¿Qué horario tienen hoy?";
  $("#tk-go").href="https://wa.me/"+WA+"?text="+encodeURIComponent(msg);
  spin+=1;pole.style.transform="translateY("+((spin%2)*-30)+"px)";
}
$("#picker").addEventListener("click",function(e){
  var b=e.target.closest(".opt");if(!b)return;
  var g=b.parentNode,k=g.getAttribute("data-grp");
  $$(".opt",g).forEach(function(x){x.classList.toggle("on",x===b)});
  st[k]=b.getAttribute("data-v");
  if(k==="suc")renderBar();
  upd();
});
renderBar();upd();
/* flotante de WhatsApp: se esconde donde ya hay botón propio */
var fl=$(".wa-float"),zones=$$("[data-hide-wa]");
if("IntersectionObserver" in window&&fl){
  var inz={};
  var io2=new IntersectionObserver(function(es){es.forEach(function(e){inz[e.target.id||e.target.className]=e.isIntersecting});
    fl.classList.toggle("off",Object.keys(inz).some(function(k){return inz[k]}))},{threshold:.35});
  zones.forEach(function(z){io2.observe(z)});
}
})();
