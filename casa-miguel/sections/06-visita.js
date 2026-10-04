(function(){
  "use strict";
  function init(){
    var ul=document.getElementById("cm-hr");if(!ul||!window.CM)return;
    var d=String(CM.hoy().dow);
    [].forEach.call(ul.children,function(li){if((" "+li.dataset.d+" ").indexOf(" "+d+" ")>-1)li.classList.add("hoy");});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
