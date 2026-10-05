
(function(){
var NOM={alitas:"Alitas",boneless:"Boneless",ceviche:"Ceviche de pollo"};
var st={base:"alitas",sal:[],modo:"comer aquí"};
function $(s,r){return (r||document).querySelector(s)}function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function msg(){
  var s=st.sal.length?" con salsa "+st.sal.join(" y "):" (ayúdenme a escoger la salsa)";
  var m={"comer aquí":"Lo quiero para comer aquí.","para llevar":"Es para llevar.","a domicilio":"Es a domicilio."}[st.modo];
  return "Hola, The Crunchy Corner. Quiero armar mi charola: "+NOM[st.base]+s+". "+m+" ¿Me ayudan a pedir?";
}
function paint(){
  $$(".base").forEach(function(b){var on=b.dataset.base===st.base;b.classList.toggle("on",on);b.setAttribute("aria-pressed",on)});
  var order=["alitas","boneless","ceviche"];
  $$(".tph").forEach(function(im,i){im.classList.toggle("on",order[i]===st.base)});
  $$(".modo").forEach(function(b){var on=b.dataset.modo===st.modo;b.classList.toggle("on",on);b.setAttribute("aria-pressed",on)});
  $$(".sal").forEach(function(b){var i=st.sal.indexOf(b.dataset.n);b.setAttribute("aria-pressed",i>-1);b.classList.toggle("p1",i===0);b.classList.toggle("p2",i===1)});
  var cups=$$(".cup");
  cups.forEach(function(c,i){var n=st.sal[i];var has=!!n;c.classList.toggle("has",has);
    var btn=has?$$(".sal").filter(function(b){return b.dataset.n===n})[0]:null;
    c.style.setProperty("--sc",btn?btn.dataset.c:"transparent");
    $("em",c).textContent=has?n:"Salsa "+(i+1)});
  $("#cha-res").textContent=NOM[st.base]+(st.sal.length?" · "+st.sal.join(" + "):" · elige tus salsas")+" · "+st.modo;
  var a=$("#cha-wa");a.href="https://wa.me/524492436096?text="+encodeURIComponent(msg());a.target="_blank";a.rel="noopener";
}
document.addEventListener("click",function(e){
  var t=e.target.closest&&e.target.closest("button,a[data-base]");if(!t)return;
  if(t.classList.contains("base")||t.hasAttribute("data-base")){if(NOM[t.dataset.base]){st.base=t.dataset.base;paint()}}
  else if(t.classList.contains("modo")){st.modo=t.dataset.modo;paint()}
  else if(t.classList.contains("sal")){var n=t.dataset.n,i=st.sal.indexOf(n);if(i>-1)st.sal.splice(i,1);else{st.sal.push(n);if(st.sal.length>2)st.sal.shift()}paint()}
});
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",paint);else paint();
})();
