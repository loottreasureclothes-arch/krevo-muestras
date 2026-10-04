(function(){
  var t=document.getElementById('tix'),c=document.getElementById('tix-c'),sec=document.getElementById('opiniones');if(!t)return;
  var ks=[].slice.call(t.querySelectorAll('.tk')),n=ks.length;
  function cur(){var x=t.scrollLeft+t.clientWidth/2,b=0,bd=1e9;ks.forEach(function(k,i){var d=Math.abs(k.offsetLeft+k.offsetWidth/2-x);if(d<bd){bd=d;b=i}});return b}
  function upd(){c.textContent=(cur()+1)+' / '+n}
  t.addEventListener('scroll',function(){requestAnimationFrame(upd)},{passive:true});
  document.querySelectorAll('.tix-b').forEach(function(b){b.addEventListener('click',function(){var i=Math.max(0,Math.min(n-1,cur()+parseInt(b.dataset.d,10)));var k=ks[i];t.scrollTo({left:k.offsetLeft-(t.clientWidth-k.offsetWidth)/2,behavior:'smooth'})})});
  t.addEventListener('keydown',function(e){if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();document.querySelector('.tix-b[data-d="'+(e.key==='ArrowRight'?1:-1)+'"]').click()}});
  upd();
  function bi(){var r=sec.getBoundingClientRect();if(r.top<innerHeight*.85){sec.classList.add('bars-in');removeEventListener('scroll',bi)}}
  addEventListener('scroll',bi,{passive:true});bi();setTimeout(function(){sec.classList.add('bars-in')},1600);
})();
