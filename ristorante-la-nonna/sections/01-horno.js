(function(){
  var arch=document.querySelector(".hero-arch"),hero=document.getElementById("horno");
  if(!arch||!hero)return;
  /* el arco se abre al entrar (se resuelve a los 0.9 s; respaldo a 1.6 s) */
  requestAnimationFrame(function(){requestAnimationFrame(function(){arch.classList.add("is-in")})});
  setTimeout(function(){arch.classList.add("is-in")},1600);
  /* el fuego se apaga al bajar y vuelve al subir (reversible) */
  var raf=0;
  function upd(){raf=0;var h=hero.offsetHeight||1,p=Math.min(1,Math.max(0,window.scrollY/(h*.7)));hero.style.setProperty("--fuego",(.9-.75*p).toFixed(2))}
  window.addEventListener("scroll",function(){if(!raf)raf=requestAnimationFrame(upd)},{passive:true});
})();
