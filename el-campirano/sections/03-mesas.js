(function(){var mx=document.getElementById("mx");if(!mx)return;
var S={ad:4,ni:2},MAX=24,floor=document.getElementById("mx-floor"),say=document.getElementById("mx-say"),hint=document.getElementById("mx-hint"),copy=document.getElementById("mx-copy"),
nEl=document.getElementById("mx-n"),uEl=document.getElementById("mx-u"),ppEl=document.getElementById("mx-pp"),tables=[],first=true,lastPer=0;
function pl(n,a,b){return n+" "+(n===1?a:b)}
function mesas(){return Math.max(1,Math.ceil((S.ad+S.ni)/4))}
function recado(){var tb=mesas(),s="Somos "+pl(S.ad,"adulto","adultos");if(S.ni)s+=" y "+pl(S.ni,"niño","niños");
return s+(tb===1?", ¿nos dan una mesa de 4?":", ¿nos juntan "+tb+" mesas?")}
function per(){floor.style.setProperty("--tw",Math.min(104,Math.floor((floor.clientWidth-28)/4))+"px");return 4}
function mkTable(){var t=document.createElement("div");t.className="tb";var h='<i class="tb-top"></i><i class="tb-seam"></i>';for(var c=0;c<4;c++)h+='<span class="ch c'+c+'"></span>';t.innerHTML=h;return t}
function render(){var tb=mesas(),p=per(),t=S.ad+S.ni,i,r,rows,row,k,c,seats;
if(p!==lastPer){floor.innerHTML="";lastPer=p}
rows=Math.ceil(tb/p);
while(floor.children.length<rows){row=document.createElement("div");row.className="mx-rw";floor.appendChild(row)}
while(floor.children.length>rows)floor.removeChild(floor.lastChild);
for(i=tables.length-1;i>=tb;i--){if(tables[i].parentNode)tables[i].parentNode.removeChild(tables[i]);tables.pop()}
for(i=0;i<tb;i++){var nuevo=!tables[i];if(nuevo)tables[i]=mkTable();row=floor.children[Math.floor(i/p)];
if(tables[i].parentNode!==row)row.appendChild(tables[i]);
if(nuevo&&!first&&i>0){(function(el){el.classList.add("llega");el.addEventListener("animationend",function f(){el.classList.remove("llega");el.removeEventListener("animationend",f)})})(tables[i])}
seats=tables[i].querySelectorAll(".ch");for(c=0;c<4;c++){k=i*4+c;seats[c].className="ch c"+c+(k<S.ad?" a":k<t?" n":"")}}
first=false;
nEl.textContent=tb;uEl.textContent=tb===1?"mesa de 4":"mesas de 4 juntas";
ppEl.textContent=pl(tb*4,"lugar","lugares")+" · "+pl(S.ad,"adulto","adultos")+(S.ni?" y "+pl(S.ni,"niño","niños"):"");
say.textContent="“"+recado()+"”";
hint.textContent=t>=8?"En fin de semana se llena mucho. Con grupo grande, llama antes de salir.":S.ni?"Hay juegos infantiles para los chicos.":"Entre semana se disfruta con más calma, cuentan sus clientes.";
document.getElementById("o-ad").textContent=S.ad;document.getElementById("o-ni").textContent=S.ni}
mx.addEventListener("click",function(e){var b=e.target.closest(".step button");if(!b)return;var k=b.getAttribute("data-k"),d=+b.getAttribute("data-d");var a=S.ad+(k==="ad"?d:0),n=S.ni+(k==="ni"?d:0);if(a<1||n<0||a+n>MAX)return;S.ad=a;S.ni=n;render()});
var rt;window.addEventListener("resize",function(){clearTimeout(rt);rt=setTimeout(function(){per()},150)});
copy.addEventListener("click",function(){var txt=recado();function ok(){copy.textContent="Copiado";setTimeout(function(){copy.textContent="Copiar el recado"},1800)}
function fb(){var ta=document.createElement("textarea");ta.value=txt;ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.select();try{document.execCommand("copy");ok()}catch(e){}document.body.removeChild(ta)}
if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(ok,fb)}else fb()});
render();
})();
