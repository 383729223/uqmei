"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};require(["../script/config.js"],function(){require(["jquery","swiper","common","template","bootstrap"],function(a,t,p,i){a(function(){a("#header").load("common/header.html",function(){a(".phone p").html(p.createDate())}),a("#footer").load("common/footer.html");var o=a("<div class='temp'></div>");if(a("body").append(o),p.getCookie("message")){var t=function(t){t.parent().find("input").val(n);var o=t.parent().siblings().eq(2).text(),s=parseInt(o.slice(1,o.length)),e=parseInt(t.parent().find("input").val());t.parent().siblings().eq(3).text("￥"+s*e)},s=function(){var t=a(".shopSum").text().split("￥");t.shift();var o=0;t.forEach(function(t){o+=parseInt(t)}),a(".shopBoxPay em i").text("￥"+o)};a(".shopBoxLists").removeClass("emptyStyle");var e=JSON.parse(p.getCookie("message"));0==e.length?(a(".shopBoxLists").addClass("emptyStyle"),o.load("./templates/templates_shopCar.html",function(){var t=i("shopCarEmpty");a(".shopBoxLists").html(t)})):o.load("./templates/templates_shopCar.html",function(){var t=i("shopCarItems",{list:e});a(".shopBoxLists").html(t)});var n=1;a(".shopBoxLists").on("focus",".shopCount",function(){a(this).val("")}),a(".shopBoxLists").on("change",".shopCount",function(){/^\d+$/.test(a(this).val())?(n=parseInt(a(this).val()),t(a(this)),s()):a(this).val("请写数字")}),a(".shopBoxLists").on("click",".downbtn",function(){console.log("-"),console.log(a(this).parent().find("input").val()),--n<=0&&(n=0),t(a(this)),s()}),a(".shopBoxLists").on("click",".upbtn",function(){console.log("+"),n++,t(a(this)),s()}),a(".shopBoxLists").on("click",".delbtn",function(){a(this).parent().parent().remove();for(var t=0;t<e.length;t++)e[t].goodsId===a(this).attr("goodsid")&&e.splice(t,1);p.setCookie("message",JSON.stringify(e),7),console.log(_typeof(p.getCookie("message"))),0==e.length&&(a(".shopBoxLists").addClass("emptyStyle"),o.load("./templates/templates_shopCar.html",function(){var t=i("shopCarEmpty");a(".shopBoxLists").html(t)})),s()}),o.load("./templates/templates_shopCar.html",function(){var t=i("shopCarPay");a(".shopBoxPay").html(t),s()})}else a(".shopBoxLists").addClass("emptyStyle"),o.load("./templates/templates_shopCar.html",function(){var t=i("shopCarEmpty");a(".shopBoxLists").html(t)})})})});