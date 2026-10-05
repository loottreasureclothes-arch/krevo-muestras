(function(){
"use strict";
var TEL="+524499187428";
var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var b=document.body;
/* menu */
var btn=$(".hd-btn"),menu=$("#menu");
function setMenu(o){b.classList.toggle("menu-open",o);btn.setAttribute("aria-expanded",o);menu.setAttribute("aria-hidden",!o);$(".lbl",btn).textContent=o?"Cerrar":"Menú"}
btn.addEventListener("click",function(){setMenu(!b.classList.contains("menu-open"))});
menu.addEventListener("click",function(e){if(e.target.closest("a"))setMenu(false)});
document.addEventListener("keydown",function(e){if(e.key==="Escape")setMenu(false)});
/* anclas sin scroll-behavior */
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a)return;var h=a.getAttribute("href");if(h.length<2)return;var el=$(h);if(!el)return;e.preventDefault();
 var y=el.getBoundingClientRect().top+scrollY-(h==="#inicio"?0:58);window.scrollTo({top:Math.max(0,y),behavior:reduce?"auto":"smooth"})});
/* reveal: visible a los 1.6 s pase lo que pase */
var rv=$$("[data-reveal]");
if(!reduce&&rv.length){document.documentElement.classList.add("rv-on");
 var pend=rv.slice();
 function chk(){var vh=innerHeight;for(var i=pend.length-1;i>=0;i--){var r=pend[i].getBoundingClientRect();if(r.top<vh*1.0&&r.bottom>0){var el=pend[i];pend.splice(i,1);el.classList.add("in")}}}
 addEventListener("scroll",chk,{passive:true});addEventListener("resize",chk);chk();
 setTimeout(function(){rv.forEach(function(el){var r=el.getBoundingClientRect();if(r.top<innerHeight*1.1)el.classList.add("in")})},1600);
 setTimeout(function(){rv.forEach(function(el){var r=el.getBoundingClientRect();if(r.top<innerHeight*1.1)el.classList.add("in")})},1600);
}
/* flotante: se esconde donde ya hay llamada grande */
var zones=$$(".hero,.vis,.foot");
function fab(){var vh=innerHeight,on=false;zones.forEach(function(z){var r=z.getBoundingClientRect();if(r.top<vh*.7&&r.bottom>vh*.3)on=true});b.classList.toggle("fab-off",on&&scrollY>40||(scrollY<=40))}
addEventListener("scroll",fab,{passive:true});fab();
/* momento firma: cae la noche con el scroll (reversible) */
var night=$("#night"),mad=$(".mad"),bigN=$(".mad-big");
function noche(){if(!mad)return;var r=mad.getBoundingClientRect(),vh=innerHeight;var p=1-(r.top+r.height*.3)/(vh+r.height*.3);p=Math.max(0,Math.min(1,p));
 night.style.opacity=(.25+.6*p).toFixed(3);bigN.style.setProperty("--glow",p.toFixed(3))}
if(!reduce){addEventListener("scroll",noche,{passive:true});addEventListener("resize",noche)}noche();
/* abierto ahora (hora de Aguascalientes) */
var CIERRE={0:3,1:3,2:3,3:3,4:4,5:5,6:5};
function ahora(){var d=new Date(),dow,h,m;
 try{var f=new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",weekday:"short",hour:"numeric",minute:"numeric",hour12:false}).formatToParts(d),o={};f.forEach(function(p){o[p.type]=p.value});dow={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[o.weekday];h=parseInt(o.hour,10)%24;m=parseInt(o.minute,10)}catch(e){dow=d.getDay();h=d.getHours();m=d.getMinutes()}
 var t=h+m/60,prev=(dow+6)%7,open=false,close=0;
 if(t>=9){open=true;close=CIERRE[dow]}else if(t<CIERRE[prev]){open=true;close=CIERRE[prev]}
 return{dow:dow,open:open,close:close}}
function pintaHorario(){var s=ahora();
 $$(".mad-now").forEach(function(el){el.classList.toggle("open",s.open);$("span",el).textContent=s.open?"Abierto ahora, hasta las "+s.close+":00 a.m.":"Cerrado ahora, abren a las 9:00 a.m."});
 $$("#hrs li").forEach(function(li){li.classList.toggle("today",+li.getAttribute("data-d")===s.dow)})}
pintaHorario();setInterval(pintaHorario,60000);
/* talón */
var items={},rows=$$(".row"),lines=$("#t-lines"),totalEl=$("#t-total"),noteEl=$("#t-note"),say=$("#t-say"),copyBtn=$("#t-copy"),nombre=$("#t-nombre"),talon=$("#talon");
rows.forEach(function(r){var id=r.dataset.id;items[id]={row:r,s:r.dataset.s,p:r.dataset.p,price:r.dataset.price===""?null:+r.dataset.price,n:0};
 var nm=$(".nm",r).textContent;
 r.addEventListener("click",function(e){
  if(e.target.closest(".add")){set(id,1);var o=$(".stp output",r);var plus=$(".stp .plus",r);if(plus)plus.focus()}
  else if(e.target.closest(".minus"))set(id,items[id].n-1);
  else if(e.target.closest(".plus"))set(id,items[id].n+1)})});
function money(n){return "$"+n.toLocaleString("es-MX")}
function set(id,n){var it=items[id];n=Math.max(0,Math.min(40,n));it.n=n;var r=it.row,nm=$(".nm",r).textContent;
 var st=$(".stp",r),add=$(".add",r);
 if(n>0&&!st){add.style.display="none";st=document.createElement("div");st.className="stp";st.innerHTML='<button type="button" class="minus" aria-label="Quitar uno: '+nm+'">−</button><output>'+n+'</output><button type="button" class="plus" aria-label="Agregar uno: '+nm+'">+</button>';r.appendChild(st)}
 else if(n>0)$("output",st).textContent=n;
 else if(st){st.remove();add.style.display=""}
 r.classList.toggle("on",n>0);render()}
function nom(it){return it.n===1?it.s:it.p}
function render(){var sel=Object.keys(items).map(function(k){return items[k]}).filter(function(i){return i.n>0});
 lines.innerHTML="";
 if(!sel.length){lines.innerHTML='<li class="t-empty">Elige arriba</li>';totalEl.textContent="Elige arriba";noteEl.textContent="Precios de referencia en apps.";say.textContent="Dile esto por teléfono: elige arriba lo que se te antoja.";copyBtn.disabled=true;copyBtn.textContent="Copiar pedido";return}
 var total=0,ask=false;
 sel.forEach(function(i){var li=document.createElement("li"),a=document.createElement("span"),c=document.createElement("span");a.textContent=i.n+" × "+i.s.replace(/^./,function(x){return x.toUpperCase()});if(i.n>1)a.textContent=i.n+" × "+i.p.replace(/^./,function(x){return x.toUpperCase()});
  if(i.price==null){ask=true;c.textContent="Pregunta"}else{total+=i.price*i.n;c.textContent=money(i.price*i.n)}li.appendChild(a);li.appendChild(c);lines.appendChild(li)});
 if(ask){totalEl.textContent="Pregunta el precio";noteEl.textContent="Hay platillos sin precio de referencia."+(total?" Suma de los demás: "+money(total)+".":"")}
 else{totalEl.textContent=money(total);noteEl.textContent="Precios de referencia en apps. El mostrador puede variar."}
 var txt=sel.map(function(i){return i.n+" "+nom(i)}).join(", ");
 var nmv=(nombre.value||"").trim();
 var msg="Hola, quiero pedir: "+txt+"."+(nmv?" A nombre de "+nmv+".":"");
 say.textContent="Dile esto por teléfono: "+msg;copyBtn.disabled=false;copyBtn.dataset.msg=msg;
 talon.classList.remove("print");void talon.offsetWidth;if(!reduce)talon.classList.add("print")}
nombre.addEventListener("input",function(){if(!copyBtn.disabled)render()});
copyBtn.addEventListener("click",function(){var m=copyBtn.dataset.msg;if(!m)return;
 function ok(){copyBtn.textContent="Copiado";setTimeout(function(){copyBtn.textContent="Copiar pedido"},1800)}
 if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(m).then(ok,ok);else{var t=document.createElement("textarea");t.value=m;document.body.appendChild(t);t.select();try{document.execCommand("copy")}catch(e){}t.remove();ok()}});
})();
