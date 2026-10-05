/* Carnitas Mora: menú, mesa (pedido para dictar), persiana, Abierto ahora, reveal. */
(function(){"use strict";
var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var body=document.body;
/* menú */
var btn=document.querySelector(".menu-btn"),menu=document.getElementById("menu");
function setMenu(o){body.classList.toggle("menu-open",o);btn.setAttribute("aria-expanded",o);menu.setAttribute("aria-hidden",!o);btn.querySelector(".menu-lbl").textContent=o?"Cerrar":"Menú";}
btn.addEventListener("click",function(){setMenu(!body.classList.contains("menu-open"));});
menu.addEventListener("click",function(e){if(e.target.closest("a"))setMenu(false);});
document.addEventListener("keydown",function(e){if(e.key==="Escape")setMenu(false);});
/* anclas sin scroll-behavior en CSS */
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a)return;var el=document.querySelector(a.getAttribute("href"));if(!el||a.getAttribute("href").length<2)return;e.preventDefault();
 var top=el.getBoundingClientRect().top+window.scrollY-(el.id==="inicio"?0:60);window.scrollTo({top:Math.max(0,top),behavior:reduce?"auto":"smooth"});});
/* Abierto ahora (hora de México) */
function ahora(){var f=new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",weekday:"short",hour:"numeric",minute:"numeric",hour12:false}).formatToParts(new Date()),o={};f.forEach(function(p){o[p.type]=p.value;});
 var d={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[o.weekday],m=(parseInt(o.hour,10)%24)*60+parseInt(o.minute,10);return{d:d,m:m};}
function openState(){var n=ahora(),ab=n.d!==1&&n.m>=510&&n.m<1050;
 var txt;if(ab)txt="Abierto ahora · cierra a las 17:30";else if(n.d===1)txt="Cerrado hoy · abrimos mañana a las 8:30";else if(n.m<510)txt="Cerrado ahora · abrimos hoy a las 8:30";else txt=(n.d===0?"Cerrado ahora · abrimos el martes a las 8:30":"Cerrado ahora · abrimos mañana a las 8:30");
 if(n.d===1)txt="Cerrado hoy · abrimos el martes a las 8:30";
 [].forEach.call(document.querySelectorAll("[data-open-now]"),function(e){e.textContent=txt;e.classList.toggle("is-open",ab);e.classList.toggle("is-closed",!ab);});
 [].forEach.call(document.querySelectorAll(".horas li"),function(li){li.classList.toggle("hoy",+li.getAttribute("data-dia")===n.d);});}
openState();
/* flotante de llamar: se esconde en zonas con llamada grande */
var zones=document.querySelectorAll("[data-hide-wa],#mesa .ticket,#banquetes");
function wa(){var vh=innerHeight,on=false;for(var i=0;i<zones.length;i++){var r=zones[i].getBoundingClientRect();if(r.top<vh*.8&&r.bottom>vh*.1){on=true;break;}}body.classList.toggle("wa-off",on);}
addEventListener("scroll",wa,{passive:true});addEventListener("resize",wa);wa();
/* reveal */
var rv=document.querySelectorAll("[data-rv]");
function show(){var vh=innerHeight;[].forEach.call(rv,function(e){if(e.classList.contains("in"))return;var r=e.getBoundingClientRect();if(r.top<vh*.92&&r.bottom>0)e.classList.add("in");});}
if(!reduce){addEventListener("scroll",show,{passive:true});addEventListener("resize",show);show();}
/* persiana (momento firma): sube con el scroll, reversible */
var pers=document.querySelector("[data-pers] .pers-ph");
function persiana(){if(!pers||reduce)return;var r=pers.getBoundingClientRect(),vh=innerHeight;var p=(r.top-vh*.35)/(vh*.55);p=Math.max(0,Math.min(1,p));pers.style.setProperty("--p",p.toFixed(3));}
if(pers&&!reduce){addEventListener("scroll",persiana,{passive:true});addEventListener("resize",persiana);persiana();}
/* la mesa: componente firma */
var dishes=[].slice.call(document.querySelectorAll(".dish")),cart={},order=[];
var platos=document.querySelector("[data-platos]"),vacia=document.querySelector("[data-vacia]"),bodyEl=document.querySelector("[data-body]"),note=document.querySelector("[data-note]"),copyBtn=document.querySelector("[data-copy]");
var DEF=note.textContent;
function render(){var ids=order.filter(function(k){return cart[k]>0;});platos.innerHTML="";
 ids.forEach(function(k){var d=document.querySelector('.dish[data-id="'+k+'"]'),img=d.querySelector("img");var li=document.createElement("li");li.className="plato";var im=document.createElement("img");im.src=img.currentSrc||img.src;im.alt=d.getAttribute("data-name");im.width=84;im.height=84;var b=document.createElement("b");b.textContent=cart[k];li.appendChild(im);li.appendChild(b);platos.appendChild(li);});
 vacia.hidden=ids.length>0;
 dishes.forEach(function(d){var k=d.getAttribute("data-id"),n=cart[k]||0;d.querySelector("[data-add]").hidden=n>0;d.querySelector(".step").hidden=n===0;d.querySelector("output").textContent=n;});
 bodyEl.textContent=ids.length?ids.map(function(k){return cart[k]+" × "+document.querySelector('.dish[data-id="'+k+'"]').getAttribute("data-name");}).join("\n"):"Elige arriba";
 note.textContent=DEF;}
function msg(){var ids=order.filter(function(k){return cart[k]>0;});if(!ids.length)return"";return"Pedido para Carnitas Mora: "+ids.map(function(k){return cart[k]+" "+document.querySelector('.dish[data-id="'+k+'"]').getAttribute("data-name");}).join(", ")+".";}
dishes.forEach(function(d){var k=d.getAttribute("data-id");
 d.addEventListener("click",function(e){var t=e.target;if(t.closest("[data-add]")||t.closest("[data-plus]")){cart[k]=(cart[k]||0)+1;if(order.indexOf(k)<0)order.push(k);}
 else if(t.closest("[data-minus]")){cart[k]=Math.max(0,(cart[k]||0)-1);if(!cart[k])order=order.filter(function(x){return x!==k;});}else return;render();});});
copyBtn.addEventListener("click",function(){var m=msg();if(!m){note.textContent="Elige arriba y luego copia tu pedido.";return;}
 function ok(){note.textContent="Copiado. Llama al 449 975 0551 y dicta o pega tu pedido.";}
 if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(m).then(ok,function(){note.textContent=m;});}else{note.textContent=m;}});
render();
})();
