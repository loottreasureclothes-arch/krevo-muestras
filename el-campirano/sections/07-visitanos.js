(function(){var n=document.getElementById("vis-now");if(!n||!window.ecAbierto)return;var a=window.ecAbierto();if(!a)return;
n.classList.add(a.abierto?"on":"off");n.querySelector("span").textContent=a.abierto?"Abierto ahora · cierra a las 14:30":(a.t<480?"Cerrado · abre hoy a las 8:00":"Cerrado · abre mañana a las 8:00");
var d=a.dia.toLowerCase();[].forEach.call(document.querySelectorAll("#hor li"),function(li){if(li.firstChild.textContent.toLowerCase()===d)li.classList.add("hoy")})})();
