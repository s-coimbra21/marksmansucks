!function(e){"use strict"
var t=function(t,n,r){function o(e){return i.body?e():void setTimeout(function(){o(e)})}function l(){d.addEventListener&&d.removeEventListener("load",l),d.media=r||"all"}var a,i=e.document,d=i.createElement("link")
if(n)a=n
else{var s=(i.body||i.getElementsByTagName("head")[0]).childNodes
a=s[s.length-1]}var u=i.styleSheets
d.rel="stylesheet",d.href=t,d.media="only x",o(function(){a.parentNode.insertBefore(d,n?a:a.nextSibling)})
var f=function(e){for(var t=d.href,n=u.length;n--;)if(u[n].href===t)return e()
setTimeout(function(){f(e)})}
return d.addEventListener&&d.addEventListener("load",l),d.onloadcssdefined=f,f(l),d}
"undefined"!=typeof exports?exports.loadCSS=t:e.loadCSS=t}("undefined"!=typeof global?global:this),function(e){if(e.loadCSS){var t=loadCSS.relpreload={}
if(t.support=function(){try{return e.document.createElement("link").relList.supports("preload")}catch(t){}},t.poly=function(){for(var t=e.document.getElementsByTagName("link"),n=0;n<t.length;n++){var r=t[n]
"preload"===r.rel&&"style"===r.getAttribute("as")&&(e.loadCSS(r.href,r),r.rel=null)}},!t.support()){t.poly()
var n=e.setInterval(t.poly,300)
e.addEventListener&&e.addEventListener("load",function(){e.clearInterval(n)})}}}(this)
