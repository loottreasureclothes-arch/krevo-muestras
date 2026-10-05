(function(){
  var tabs=[].slice.call(document.querySelectorAll('.cp-tabs [role=tab]'));
  if(!tabs.length)return;
  function sel(t,focus){
    tabs.forEach(function(b){var on=b===t;b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1;
      var p=document.getElementById(b.getAttribute('aria-controls'));p.hidden=!on;});
    if(focus)t.focus();
  }
  tabs.forEach(function(b,i){
    b.addEventListener('click',function(){sel(b)});
    b.addEventListener('keydown',function(e){
      var n=e.key==='ArrowRight'?i+1:e.key==='ArrowLeft'?i-1:null;
      if(n===null)return;e.preventDefault();sel(tabs[(n+tabs.length)%tabs.length],true);
    });
  });
})();
