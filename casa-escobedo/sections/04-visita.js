(function(){
  var ev=document.getElementById("v-evento");if(!ev)return;
  var st={e:"una boda",r:"el arco de piedra",n:60},MAX=145,MIN=10;
  var imgs=document.querySelectorAll(".v-arco img"),tabs=document.querySelectorAll(".v-tabs button"),
      nombre=document.getElementById("v-nombre"),out=document.getElementById("v-n"),fill=document.getElementById("v-fill"),
      prev=document.getElementById("v-prev"),wa=document.getElementById("v-wa");
  function msg(){return "Hola Casa Escobedo, quiero ver "+st.r+" para "+st.e+" de "+st.n+" invitados. ¿Qué fechas tienen disponibles?";}
  function paint(){
    out.textContent=st.n;fill.style.transform="scaleX("+(st.n/MAX).toFixed(3)+")";
    prev.textContent="“"+msg()+"”";wa.href=window.CE.waUrl(msg());
    nombre.textContent=st.r.charAt(0).toUpperCase()+st.r.slice(1);
  }
  ev.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;
    Array.prototype.forEach.call(ev.children,function(x){x.setAttribute("aria-checked",x===b);});
    st.e=b.getAttribute("data-v");paint();});
  Array.prototype.forEach.call(tabs,function(t,i){t.addEventListener("click",function(){
    Array.prototype.forEach.call(tabs,function(x,j){x.setAttribute("aria-checked",j===i);imgs[j].classList.toggle("on",j===i);imgs[j].setAttribute("aria-hidden",j!==i);});
    st.r=imgs[i].getAttribute("data-r");paint();});});
  document.getElementById("v-mas").addEventListener("click",function(){st.n=Math.min(MAX,st.n+5);paint();});
  document.getElementById("v-menos").addEventListener("click",function(){st.n=Math.max(MIN,st.n-5);paint();});
  paint();
})();
