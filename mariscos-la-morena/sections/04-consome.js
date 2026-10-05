(function(){
  var sec=document.getElementById('consome'),fig=document.getElementById('cons-ph');
  if(!sec||!fig||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  sec.classList.add('clip');
  var cur=24,tgt=24,raf=0,seen=0,timer=0;
  function calc(){
    var r=fig.getBoundingClientRect(),vh=innerHeight||800;
    var p=(vh*1.0-r.top)/(vh*0.62);p=Math.max(0,Math.min(1,p));
    var vis=r.bottom>0&&r.top<vh;
    if(vis){if(!seen){seen=1;timer=setTimeout(function(){tgt=140;loop()},1600)}}
    else{seen=0;clearTimeout(timer)}
    tgt=24+p*116;
  }
  function loop(){
    cur+=(tgt-cur)*.14;if(Math.abs(tgt-cur)<.3)cur=tgt;
    fig.firstElementChild.style.setProperty('--r',cur+'%');sec.style.setProperty('--r',cur+'%');
    raf=(cur!==tgt)?requestAnimationFrame(loop):0;
  }
  function on(){calc();if(!raf)raf=requestAnimationFrame(loop)}
  addEventListener('scroll',on,{passive:true});addEventListener('resize',on);on();
})();
