(function(){"use strict";
document.querySelectorAll(".gh").forEach(function(b){b.addEventListener("click",function(){var g=b.parentNode,ul=g.querySelector("ul"),o=ul.hidden;ul.hidden=!o;g.classList.toggle("is-open",o);b.setAttribute("aria-expanded",o)})});
})();
