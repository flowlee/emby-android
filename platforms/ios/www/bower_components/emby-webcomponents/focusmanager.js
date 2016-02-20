define([],function(){function t(t,n){var o=t.querySelector("*[autofocus]");o?e(o):n!==!1&&(o=a(t)[0],o&&e(o))}function e(t){var e=t.tagName;("PAPER-INPUT"==e||"PAPER-DROPDOWN-MENU"==e||"EMBY-DROPDOWN-MENU"==e)&&(t=t.querySelector("input")),t.focus()}function n(t){return-1!=P.indexOf(t.tagName)?!0:t.classList&&t.classList.contains("focusable")?!0:!1}function o(t){for(;!n(t);)if(t=t.parentNode,!t)return null;return t}function i(t){return t.disabled?!1:"-1"==t.getAttribute("tabindex")?!1:null===t.offsetParent?!1:!0}function a(t){for(var e=(t||document).querySelectorAll(E),n=[],o=0,a=e.length;a>o;o++){var r=e[o];i(r)&&n.push(r)}return n}function r(t,e){if(-1!=b.indexOf(t.tagName))return!0;if(2>e){if(t.classList.contains("focuscontainer-x"))return!0}else if(3==e&&t.classList.contains("focuscontainer-down"))return!0;return!1}function f(t,e){for(;!r(t,e);)if(t=t.parentNode,!t)return document.body;return t}function u(t,e){var n={top:0,left:0};if(!e)return n;var o=e.documentElement;t.getBoundingClientRect&&(n=t.getBoundingClientRect());var i=e.defaultView;return{top:n.top+i.pageYOffset-o.clientTop,left:n.left+i.pageXOffset-o.clientLeft}}function c(t){var e=t.ownerDocument,n=u(t,e),o=e.defaultView,i=n.top-o.pageXOffset,a=n.left-o.pageYOffset,r=t.offsetWidth,f=t.offsetHeight;return{left:a,top:i,width:r,height:f,right:a+r,bottom:i+f}}function s(n,a){n=n||document.activeElement,n&&(n=o(n));var r=n?f(n,a):document.body;if(!n)return void t(r,!0);for(var u=l(n,"focusable"),s=c(n),d=[],P=r.querySelectorAll(E),b=0,p=P.length;p>b;b++){var g=P[b];if(g!=n&&g!=u&&i(g)){var m=c(g);switch(a){case 0:if(m.left>=s.left)continue;if(m.right==s.right)continue;break;case 1:if(m.right<=s.right)continue;if(m.left==s.left)continue;break;case 2:if(m.top>=s.top)continue;if(m.bottom>=s.bottom)continue;break;case 3:if(m.bottom<=s.bottom)continue;if(m.top<=s.top)continue}d.push({element:g,clientRect:m})}}var v=h(d,s,a);if(v.length){var N=v[0].node,R=l(N,"focusable");R&&R!=N&&n&&l(n,"focusable")!=R&&(N=R),e(N)}}function l(t,e){for(;!t.classList||!t.classList.contains(e);)if(t=t.parentNode,!t)return null;return t}function h(t,e,n){for(var o=[],i=parseFloat(e.left)||0,a=parseFloat(e.top)||0,r=parseFloat(i+e.width-1)||i,f=parseFloat(a+e.height-1)||a,u=Math.min,c=Math.max,s=e.left+e.width/2,l=e.top+e.height/2,h=0,P=t.length;P>h;h++){var b,E,p=t[h],g=p.element,m=p.clientRect,v=m.left,N=m.top,R=v+m.width-1,A=N+m.height-1,O=c(v,i),M=u(R,r),T=c(N,a),w=u(A,f),D=M>=O,U=w>=T,B=m.left+m.width/2,L=m.top+m.height/2;switch(n){case 0:b=D?0:Math.abs(i-R),E=U?0:Math.abs(l-L);break;case 1:b=D?0:Math.abs(v-r),E=U?0:Math.abs(l-L);break;case 2:E=U?0:Math.abs(a-A),b=D?0:Math.abs(s-B);break;case 3:E=U?0:Math.abs(N-f),b=D?0:Math.abs(s-B)}var I=Math.sqrt(b*b+E*E);o.push({node:g,distX:b,distY:E,distT:I})}return o.sort(d),o}function d(t,e){return t.distT-e.distT}var P=["INPUT","TEXTAREA","SELECT","BUTTON","A","PAPER-BUTTON","PAPER-INPUT","PAPER-TEXTAREA","PAPER-ICON-BUTTON","PAPER-FAB","PAPER-CHECKBOX","PAPER-ICON-ITEM","PAPER-MENU-ITEM","PAPER-DROPDOWN-MENU","EMBY-DROPDOWN-MENU"],b=["BODY","PAPER-DIALOG"],E=P.join(",")+",.focusable";return{autoFocus:t,focus:e,focusableParent:o,getFocusableElements:a,moveLeft:function(t){s(t,0)},moveRight:function(t){s(t,1)},moveUp:function(t){s(t,2)},moveDown:function(t){s(t,3)}}});