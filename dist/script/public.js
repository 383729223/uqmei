"use strict";define([],function(){return{delArrarr1:function(e){for(var t={},r=0;r<e.length;r++)t[e[r]]?t[e[r]]++:t[e[r]]=1;var n=[];for(var r in t)n.push(r);return n},delArrarr2:function(e){for(var t=[],r=0;r<e.length;r++)-1==t.indexOf(e[r])&&t.push(e[r]);return t},createDate:function(){var e=new Date,t=e.getFullYear(),r=e.getMonth(),n=e.getDate(),o=e.getDay(),a=e.getHours(),c=e.getMinutes(),i=e.getSeconds();switch(o){case 0:o="星期日";break;case 1:o="星期一";break;case 2:o="星期二";break;case 3:o="星期三";break;case 4:o="星期四";break;case 5:o="星期五";break;case 6:o="星期六"}this.createZero(r+1),this.createZero(n),this.createZero(a),this.createZero(c),this.createZero(i);return t+"年"+this.createZero(r+1)+"月"+this.createZero(n)+"日 "+o},createZero:function(e){return 1==e.length?"0"+e:e},randomNum:function(e,t){return Math.round(Math.random()*(e-t)+t)},createColor:function(){return"#"+this.createZero(randomNum(0,255).toString(16))+this.createZero(randomNum(0,255).toString(16))+this.createZero(randomNum(0,255).toString(16))},dateCha:function(e,t){var r=e.getTime()-t.getTime();return"两个时间相差："+Math.abs(parseInt(r/1e3/60/60/24))+"天"+Math.abs(parseInt(r/1e3/60/60)%24)+"小时"+Math.abs(parseInt(r/1e3/60)%60)+"分钟"+Math.abs(parseInt(r/1e3)%60)+"秒钟"},getStyle:function(e){return e.currentStyle||getComputedStyle(e)},stopBubble:function(e){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0},stopDefault:function(e){e.preventDefault?e.preventDefault():e.returnValue=!1},addEvent:function(e,t,r){e.addEventListener?e.addEventListener(t,r):e.attachEvent("on"+t,r)},removeEvent:function(e,t,r){e.removeEventListener?e.removeEventListener(t,r):e.detachEvent("on"+t,r)},setCookie:function(e,t,r){var n=new Date;n.setDate(n.getDate()+r),document.cookie=null==r?e+"="+t:e+"="+t+";expires="+n},removeCookie:function(e){setCookie(e,1,-1)},getCookie:function(e){for(var t=document.cookie.split("; "),r=0;r<t.length;r++)if(t[r].split("=")[0]==e)return t[r].split("=")[1];return""},mouseFollow:function(){this.addEvent(document,"mousemove",function(e){var t=e||window.event,r=document.createElement("i"),n=document.createElement("s"),o=document.createElement("s");r.appendChild(n),r.appendChild(o),document.body.appendChild(r),n.style.left="-5px",o.style.right="-5px",r.style.backgroundColor=createColor(),n.style.backgroundColor=createColor(),o.style.backgroundColor=createColor(),r.style.left=t.pageX+"px",r.style.top=t.pageY+"px";setInterval(function(){r.remove()},300)})}}});