(function(){
var D=[["Aguachile",0],["Pulpo",1],["Ostiones",2],["Ceviche",3],["Cóctel",4],["Camarones",5]];
var L=["Poquito","Picoso","Bien picoso","Estilo Sinaloa"];
var st={dish:0,lvl:0,n:1,mode:"Para comer aquí"};
var imgs=document.querySelectorAll("#pc-stage img"),dish=document.getElementById("pc-dish"),ch=document.getElementById("pc-chiles");
D.forEach(function(x,i){var b=document.createElement("button");b.type="button";b.setAttribute("aria-pressed",i===0);b.innerHTML='<img alt="" src="'+imgs[i].src.replace(/-\d+\.webp/,'-480.webp')+'" loading="lazy"><span>'+x[0]+"</span>";b.onclick=function(){st.dish=i;up();};dish.appendChild(b);});
for(var i=0;i<4;i++){(function(i){var b=document.createElement("button");b.type="button";b.setAttribute("aria-label","Nivel "+(i+1)+": "+L[i]);b.innerHTML='<svg viewBox="0 0 24 40"><use href="#i-chile"/></svg>';b.onclick=function(){st.lvl=i;up();};ch.appendChild(b);})(i);}
function msg(){var x=D[st.dish][0].toLowerCase();return "Hola, quiero pedir en El Camarón Guasaveño: "+st.n+" "+(st.dish===4?"cóctel":x)+(st.n>1&&st.dish<4?"":"")+", nivel de chile: "+L[st.lvl].toLowerCase()+". "+st.mode+". ¿Me confirman precio y tiempo?";}
function up(){
 imgs.forEach(function(im,i){im.classList.toggle("on",i===st.dish);});
 [].forEach.call(dish.children,function(b,i){b.setAttribute("aria-pressed",i===st.dish);});
 [].forEach.call(ch.children,function(b,i){b.setAttribute("aria-pressed",i===st.lvl);b.classList.toggle("fill",i<=st.lvl);});
 document.getElementById("pc-tag").textContent=D[st.dish][0];
 document.getElementById("pc-heat").style.setProperty("--h",st.lvl*.3);
 document.getElementById("pc-lvl").textContent=L[st.lvl];
 document.getElementById("pc-n").textContent=st.n;
 document.getElementById("pc-res").textContent=st.n+" "+D[st.dish][0]+" · "+L[st.lvl]+" · "+st.mode;
 document.getElementById("pc-wa").href="https://wa.me/524492570789?text="+encodeURIComponent(msg());
}
document.getElementById("pc-minus").onclick=function(){st.n=Math.max(1,st.n-1);up();};
document.getElementById("pc-plus").onclick=function(){st.n=Math.min(12,st.n+1);up();};
document.querySelectorAll("#pc-seg button").forEach(function(b){b.onclick=function(){st.mode=b.dataset.v;document.querySelectorAll("#pc-seg button").forEach(function(o){o.setAttribute("aria-pressed",o===b);});up();};});
up();
})();
