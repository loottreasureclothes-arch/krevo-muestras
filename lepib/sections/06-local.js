(function(){var n=document.getElementById("lp-now");if(!n)return;
var H={0:[13,22],1:null,2:null,3:[14,23],4:[14,23],5:[14,23],6:[14,23]},D=["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
function ags(){var p=new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",weekday:"short",hour:"numeric",minute:"numeric",hour12:false}).formatToParts(new Date()),o={};p.forEach(function(x){o[x.type]=x.value});return{d:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(o.weekday),h:(+o.hour%24)+(+o.minute)/60}}
function f(h){var x=h>12?h-12:h;return x+(h>=12?" pm":" am")}
var t=ags(),r=H[t.d],s=n.querySelector("span");
var li=document.querySelector('#lp-hrs li[data-d="'+t.d+'"]');if(li)li.classList.add("today");
if(r&&t.h>=r[0]&&t.h<r[1]){n.classList.add("open");s.textContent="Abierto ahora · cierra a las "+f(r[1])}
else{n.classList.add("closed");var k=t.d,first=true;for(var i=0;i<8;i++){var q=H[k];if(q&&(!first||t.h<q[0])){s.textContent="Cerrado · abrimos "+(i===0?"hoy":i===1?"mañana":"el "+D[k])+" a las "+f(q[0]);break}first=false;k=(k+1)%7}}
})();
