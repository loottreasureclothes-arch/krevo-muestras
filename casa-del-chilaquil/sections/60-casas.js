(function(){"use strict";
var tabs=[].slice.call(document.querySelectorAll('.cc-vis-tabs [role=tab]'));
function sel(t){tabs.forEach(function(x){var on=x===t;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;document.getElementById(x.getAttribute('aria-controls')).hidden=!on;});}
tabs.forEach(function(t,i){t.addEventListener('click',function(){sel(t);});t.addEventListener('keydown',function(e){if(e.key==='ArrowRight'||e.key==='ArrowLeft'){var n=tabs[(i+(e.key==='ArrowRight'?1:tabs.length-1))%tabs.length];sel(n);n.focus();}});});
/* Hora de Aguascalientes (America/Mexico_City, sin horario de verano) */
var d,h,m;try{var p=new Intl.DateTimeFormat('en-US',{timeZone:'America/Mexico_City',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date());var o={};p.forEach(function(x){o[x.type]=x.value;});d=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(o.weekday);h=+o.hour%24;m=+o.minute;}catch(e){var n=new Date();d=n.getDay();h=n.getHours();m=n.getMinutes();}
var t=h*60+m,open=t>=510&&t<780,txt;
if(open){txt='Abierto ahora · cierra a la 1:00 p.m.';}else if(t<510){txt='Cerrado · abre hoy a las 8:30 a.m.';}else{txt='Cerrado · abre mañana a las 8:30 a.m.';}
document.querySelectorAll('[data-now]').forEach(function(el){el.textContent=txt;el.classList.toggle('is-open',open);});
document.querySelectorAll('.cc-vis-days li[data-d="'+d+'"]').forEach(function(li){li.classList.add('is-today');});
})();
