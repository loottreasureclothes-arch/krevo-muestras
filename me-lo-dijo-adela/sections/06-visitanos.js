(function(){var tabs=[].slice.call(document.querySelectorAll(".vis-tabs [role=tab]")),wa=document.getElementById("vis-wa");if(!tabs.length)return;
function sel(t,f){tabs.forEach(function(x){var on=x===t;x.setAttribute("aria-selected",on);x.tabIndex=on?0:-1;document.getElementById(x.getAttribute("aria-controls")).hidden=!on});
if(wa)wa.href="https://wa.me/524495376787?text="+encodeURIComponent("Hola Adela, quiero pedir en la sucursal "+t.dataset.wa+".");if(f)t.focus()}
tabs.forEach(function(t,i){t.addEventListener("click",function(){sel(t)});t.addEventListener("keydown",function(e){if(e.key==="ArrowRight"||e.key==="ArrowLeft"){e.preventDefault();sel(tabs[(i+(e.key==="ArrowRight"?1:tabs.length-1))%tabs.length],true)}})});
var d=new Date(new Date().toLocaleString("en-US",{timeZone:"America/Mexico_City"})).getDay();
document.querySelectorAll('.vis-hrs li[data-dia="'+d+'"]').forEach(function(li){li.classList.add("hoy")});
})();
