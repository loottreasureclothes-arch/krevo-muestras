(function(){
  "use strict";
  function f(h){return (h>12?h-12:h)+(h>=12?" pm":" am");}
  function init(){
    var ul=document.getElementById("cm-hr");if(!ul||!window.CM)return;
    var n=CM.hoy(),d=String(n.dow);
    [].forEach.call(ul.children,function(li){if(li.dataset.d===d)li.classList.add("hoy");});
    var el=document.getElementById("cm-ahora");if(!el)return;
    var hr=CM.horario(n.dow),ab=n.h>=hr.a&&n.h<hr.c,t;
    if(ab)t="Abierto ahora · cierra a las "+f(hr.c);
    else if(n.h<hr.a)t="Cerrado ahora · abre hoy a las "+f(hr.a);
    else t="Cerrado ahora · abre mañana a las "+f(CM.horario((n.dow+1)%7).a);
    el.querySelector("span").textContent=t;el.classList.add(ab?"on":"off");
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
