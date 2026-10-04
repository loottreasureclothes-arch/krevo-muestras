(function(){var H={0:[9,23],1:[11,23],2:[11,23],3:[11,23],4:[11,23],5:[11,23],6:[9,23]};
var N=["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
function f(h){return (h>12?h-12:h)+(h>=12?" p.m.":" a.m.")}
try{var p=new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",weekday:"short",hour:"numeric",minute:"numeric",hour12:false}).formatToParts(new Date()),o={};p.forEach(function(x){o[x.type]=x.value});
var d=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(o.weekday),h=(+o.hour%24)+(+o.minute)/60;}catch(e){return}
var r=document.querySelector('.hor tr[data-d="'+d+'"]');if(r)r.classList.add("is-hoy");
var box=document.getElementById("hoy"),e=document.getElementById("hoy-e"),s=document.getElementById("hoy-d"),t=H[d];
if(h>=t[0]&&h<t[1]){box.classList.add("is-open");e.textContent="Abierto ahora";s.textContent="Cierra a las "+f(t[1])}
else{box.classList.add("is-closed");e.textContent="Cerrado ahora";var nd=h<t[0]?d:(d+1)%7;s.textContent="Abre "+(nd===d?"hoy":"el "+N[nd])+" a las "+f(H[nd][0])}})();
