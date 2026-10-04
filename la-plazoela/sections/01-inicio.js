/* Momento firma: el papel picado cae al entrar y vuelve a caer cada vez que regresas arriba. Reversible, listo a 1.6 s. */
(function(){
  var box=document.getElementById('pz-picado'); if(!box) return;
  var n=Math.ceil(innerWidth/42); if(n>40)n=40;
  var h=''; for(var i=0;i<n;i++) h+='<i style="--n:'+i+'"></i>';
  box.innerHTML=h;
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var hero=document.getElementById('inicio'), fuera=false;
  box.classList.add('fuera');
  requestAnimationFrame(function(){requestAnimationFrame(function(){box.classList.remove('fuera')})});
  setTimeout(function(){box.classList.remove('fuera')},1600);
  function chk(){var r=hero.getBoundingClientRect(),v=r.bottom>120;if(!v&&!fuera){fuera=true;box.classList.add('fuera')}else if(v&&fuera){fuera=false;box.classList.remove('fuera')}}
  window.addEventListener('scroll',function(){requestAnimationFrame(chk)},{passive:true});
})();
