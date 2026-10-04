(function(){var H={0:[14,20],1:[14,22],2:[14,23],3:[14,23],4:[14,23],5:[14,24],6:[14,24]};
var el=document.getElementById("vis-now");if(!el)return;var t=el.querySelector("span");
var p;try{p=new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",weekday:"short",hour:"numeric",minute:"numeric",hour12:false}).formatToParts(new Date())}catch(e){return}
var g=function(k){for(var i=0;i<p.length;i++)if(p[i].type===k)return p[i].value};
var d=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(g("weekday")),h=(+g("hour"))%24+(+g("minute"))/60;
var li=document.querySelector('#hrs li[data-d="'+d+'"]');if(li)li.classList.add("hoy");
function f(x){x=x%24;return x===0?"12 am":x===12?"12 pm":(x>12?x-12+" pm":x+" am")}
var r=H[d];if(h>=r[0]&&h<r[1]){el.classList.add("abierto");t.textContent="Abierto ahora, cierra a las "+f(r[1])}
else if(h<r[0]){el.classList.add("cerrado");t.textContent="Cerrado, hoy abre a las 2 pm"}
else{el.classList.add("cerrado");t.textContent="Cerrado, mañana abre a las 2 pm"}})();
