"use strict";require(["../script/config.js"],function(){require(["jquery","swiper","common","template","bootstrap"],function(l,o,s,c){console.log(c),l("#header").load("common/header.html",function(){l(".phone p").html(s.createDate())}),l("#footer").load("common/footer.html");var m=l("<div class='temp'></div>");l("body").append(m),l(document).scroll(function(){100<l(document).scrollTop()?l("#backTop").css({opacity:"1"}):l("#backTop").css({opacity:"0"})}),l("#backTop").on("click",function(){l(document).scrollTop(0)}),l("#nav>ul>li").on("mouseenter",function(){l(this).find("ul").show(),l(this).find("ul").on("mouseenter","li",function(){l(this).siblings().removeClass("active"),l(this).addClass("active")}),l(this).find("ul").on("mouseleave","li",function(){l(this).removeClass("active").siblings().removeClass("active")})}),l("#nav>ul>li").on("mouseleave",function(){l(this).find("ul").hide()}),l("#nav>ul>li").eq(1).on("mouseenter",function(){l.ajax({url:"../static/json/provinces.json",dataType:"json",success:function(i){console.log(i.provinces),m.load("./templates/templates_index.html",function(){var o=c("provincesList",{list:i.provinces});l("#nav>ul>li").eq(1).find("ul").append(o)})}}),l(this).find("ul").on("mouseenter","li",function(){l(this).siblings().removeClass("active"),l(this).addClass("active")})}),l("#nav>ul>li").eq(1).on("mouseleave",function(){l("#nav>ul>li").eq(1).find("li").remove()});var i=new o(".swiper-container-banner",{autoplay:!0,loop:!0,pagination:{el:".banner-navs",clickable:!0}});l(".swiper-container-banner").on("mouseenter",function(){i.autoplay.stop()}),l(".swiper-container-banner").on("mouseleave",function(){i.autoplay.start()}),l.ajax({url:"https://dms-dataapi.meizu.com/data/jsdata.jsonp?blockIds=233,266,267",dataType:"jsonp",success:function(a){console.log(a);for(var o=0;o<a.block_266[3].floorAllocations.length;o++){var i=l("<li>"),n=l("<li>");i.html('<a class="over" href="'+a.block_266[3].floorAllocations[o].href+'">'+a.block_266[3].floorAllocations[o].name+"</a><i>&gt;</i>"),n.html('<i>&lt;</i><a class="over" href="'+a.block_266[2].floorAllocations[o].href+'">'+a.block_266[2].floorAllocations[o].name+"</a>"),l(".mainTopBox-body-L .mainTopBox-body-lists").append(i),l(".mainTopBox-body-R .mainTopBox-body-lists").append(n)}l(".mainTopBox-body-img").height(l(".mainTopBox-body-lists").height()),l(".mainTopBox-body-L .mainTopBox-body-img").find("img").remove(),l(".mainTopBox-body-R .mainTopBox-body-img").find("img").remove();var t=l("<img>");t.attr("src",a.block_266[3].floorAllocations[0].img),l(".mainTopBox-body-L .mainTopBox-body-img").append(t);var e=l("<img>");e.attr("src",a.block_266[2].floorAllocations[0].img),l(".mainTopBox-body-R .mainTopBox-body-img").append(e),l(".mainTopBox-body-L").on("mouseenter","li",function(){l(".mainTopBox-body-img").height(l(".mainTopBox-body-lists").height()),l(".mainTopBox-body-L .mainTopBox-body-img").find("img").remove();for(var o=l(this).find("a").attr("href"),i=l("<img>"),n=0;n<a.block_266[3].floorAllocations.length;n++){a.block_266[3].floorAllocations[n].href==o&&i.attr("src",a.block_266[3].floorAllocations[n].img)}l(".mainTopBox-body-L .mainTopBox-body-img").append(i)}),l(".mainTopBox-body-R").on("mouseenter","li",function(){l(".mainTopBox-body-img").height(l(".mainTopBox-body-lists").height()),l(".mainTopBox-body-R .mainTopBox-body-img").find("img").remove();for(var o=l(this).find("a").attr("href"),i=l("<img>"),n=0;n<a.block_266[2].floorAllocations.length;n++){a.block_266[2].floorAllocations[n].href==o&&i.attr("src",a.block_266[2].floorAllocations[n].img)}l(".mainTopBox-body-R .mainTopBox-body-img").append(i)}),m.load("./templates/templates_index.html",function(){var o=c("box",{list:a.block_266[0].floorAllocations});l(".mainBox1Lists").append(o),l(".mainBox1Lists2").append(o)}),l(".mainBox1Tittle-tab li").eq(0).addClass("active"),l(".mainBox1Tittle-tab2 li").eq(0).addClass("active"),l(".mainBox1Tittle-tab li").on("click",function(){var i=this;l(this).addClass("active").siblings().removeClass("active"),l(".mainBox1Lists li").remove(),m.load("./templates/templates_index.html",function(){var o=c("box-tab",{list2:a.block_266[l(i).index()].floorAllocations});l(".mainBox1Lists").append(o)})}),l(".mainBox1Tittle-tab2 li").on("click",function(){var i=this;l(this).addClass("active").siblings().removeClass("active"),l(".mainBox1Lists2 li").remove(),m.load("./templates/templates_index.html",function(){var o=c("box-tab",{list2:a.block_266[l(i).index()].floorAllocations});l(".mainBox1Lists2").append(o)})}),l(".mainBox1>ul").on("click","li",function(){var i={img:l(this).find("img").attr("src"),name:l(this).find("span").text(),price:l(this).find("em").text(),goodsId:l(this).find("button").attr("goodsid")},o=[];s.getCookie("message")?0==(o=JSON.parse(s.getCookie("message"))).filter(function(o){return o.goodsId===i.goodsId}).length&&(o.push(i),console.log(o)):o=[i];s.setCookie("message",JSON.stringify(o))})}})})});