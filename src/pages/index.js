require(["../script/config.js"],function(){
	require(["jquery","swiper","common","template","bootstrap"],function($,Swiper,pub,template){
		console.log(template)

		// 加载头部尾部
		$("#header").load("common/header.html",function(){
			// 页头时间
			$(".phone p").html(pub.createDate())
		});
		$("#footer").load("common/footer.html");

		// 模板引擎放置
		let $temp=$("<div class='temp'></div>");
		$("body").append($temp);

		// 置顶按钮
		$(document).scroll(function(){
			if($(document).scrollTop()>100){
				$("#backTop").css({"opacity":"1"})
			}else{
				$("#backTop").css({"opacity":"0"})
			}
		})
		$("#backTop").on("click",function(){
			$(document).scrollTop(0);
		})

		// nav的下拉菜单
		$("#nav>ul>li").on("mouseenter",function(){
			$(this).find("ul").show();
			$(this).find("ul").on("mouseenter","li",function(){
				$(this).siblings().removeClass("active");
				$(this).addClass("active");
			});
			$(this).find("ul").on("mouseleave","li",function(){

				$(this).removeClass("active").siblings().removeClass("active");
			});
		})
		$("#nav>ul>li").on("mouseleave",function(){
			$(this).find("ul").hide();
		})

		$("#nav>ul>li").eq(1).on("mouseenter",function(){
			$.ajax({
				url:`../static/json/provinces.json`,
				dataType:"json",
				success:function(resopnse){
					console.log(resopnse.provinces);
					// for(let i=0;i<resopnse.provinces.length;i++){
					// 	let li=$("<li>");
					// 	li.html(`<a href="">${resopnse.provinces[i].provinceName}</a>`);
					// 	$("#nav>ul>li").eq(1).find("ul").append(li);
					// }
					$temp.load("./templates/templates_index.html",function(){

						var strProvinces=template("provincesList",{list:resopnse.provinces});
						// console.log(strhtml);
						$("#nav>ul>li").eq(1).find("ul").append(strProvinces);
					})

				}
			})
			$(this).find("ul").on("mouseenter","li",function(){
				$(this).siblings().removeClass("active");
				$(this).addClass("active");
			});
		})

		$("#nav>ul>li").eq(1).on("mouseleave",function(){
			$("#nav>ul>li").eq(1).find("li").remove();
		})

		// swiper首页轮播图
		var mySwiperBanner = new Swiper('.swiper-container-banner', {
			autoplay: true,//可选选项，自动滑动
			loop:true,
			pagination: {
			    el: '.banner-navs',
			    clickable :true,
		  	},
		})
		$('.swiper-container-banner').on("mouseenter",function(){
	  		mySwiperBanner.autoplay.stop();
		})
		$('.swiper-container-banner').on("mouseleave",function(){
	  		mySwiperBanner.autoplay.start();
		})
		// ----------------------- ajax -----------------------------------
		// 商品推荐请求数据

		$.ajax({
			url:`https://dms-dataapi.meizu.com/data/jsdata.jsonp?blockIds=233,266,267`,
			// url:`https://localhost:1000/test2`,
			// type:"POST",
			// data:"platform=pc",
			dataType:"jsonp",
			// dataType:"text",
			success:function(response){

				console.log(response);
				// ------------------------------------------------------------
				// 顶部两栏的请求
				// 请求到的列表加载
				for(let i=0;i<response.block_266[3].floorAllocations.length;i++){
					let li= $("<li>");
					let li2= $("<li>");
					li.html(`<a class="over" href="${response.block_266[3].floorAllocations[i].href}">${response.block_266[3].floorAllocations[i].name}</a><i>&gt;</i>`);
					li2.html(`<i>&lt;</i><a class="over" href="${response.block_266[2].floorAllocations[i].href}">${response.block_266[2].floorAllocations[i].name}</a>`)
					$(".mainTopBox-body-L .mainTopBox-body-lists").append(li);
					$(".mainTopBox-body-R .mainTopBox-body-lists").append(li2);
				}

				// 页面加载先显示第一张图片
				$(".mainTopBox-body-img").height($(".mainTopBox-body-lists").height());
				$(".mainTopBox-body-L .mainTopBox-body-img").find("img").remove();
				$(".mainTopBox-body-R .mainTopBox-body-img").find("img").remove();
				let oimg1=$("<img>");
				oimg1.attr("src",response.block_266[3].floorAllocations[0].img);
				$(".mainTopBox-body-L .mainTopBox-body-img").append(oimg1);
				let oimg2=$("<img>");
				oimg2.attr("src",response.block_266[2].floorAllocations[0].img);
				$(".mainTopBox-body-R .mainTopBox-body-img").append(oimg2);





				// 请求到的图片加载
				$(".mainTopBox-body-L").on("mouseenter","li",function(){
					// console.log($(this).find("a").attr("href"));

					$(".mainTopBox-body-img").height($(".mainTopBox-body-lists").height());
					$(".mainTopBox-body-L .mainTopBox-body-img").find("img").remove();

					let aHref=$(this).find("a").attr("href");
					let img=$("<img>");
					for(let i=0;i<response.block_266[3].floorAllocations.length;i++){
						let jnHref=response.block_266[3].floorAllocations[i].href;
						if(jnHref==aHref){

							img.attr("src",response.block_266[3].floorAllocations[i].img)
						}
					};
					$(".mainTopBox-body-L .mainTopBox-body-img").append(img);
					
				})
				
				$(".mainTopBox-body-R").on("mouseenter","li",function(){
					// console.log($(this).find("a").attr("href"));

					$(".mainTopBox-body-img").height($(".mainTopBox-body-lists").height());
					$(".mainTopBox-body-R .mainTopBox-body-img").find("img").remove();

					let aHref=$(this).find("a").attr("href");
					let img=$("<img>");
					for(let i=0;i<response.block_266[2].floorAllocations.length;i++){
						let jnHref=response.block_266[2].floorAllocations[i].href;
						if(jnHref==aHref){

							img.attr("src",response.block_266[2].floorAllocations[i].img)
						}
					};
					$(".mainTopBox-body-R .mainTopBox-body-img").append(img);
					
				})

				// ------------------------------------------------------------
				// 商品推荐的请求

				// 页面首次加载的产品展示
				// template模板引擎
				
				$temp.load("./templates/templates_index.html",function(){

					var strhtml=template("box",{list:response.block_266[0].floorAllocations});
					// console.log(strhtml);
					$(".mainBox1Lists").append(strhtml);
					$(".mainBox1Lists2").append(strhtml);
				})
				// 点击tab切换商品目录
				$(".mainBox1Tittle-tab li").eq(0).addClass("active");
				$(".mainBox1Tittle-tab2 li").eq(0).addClass("active");


				// box1产品加载
				$(".mainBox1Tittle-tab li").on("click",function(){
					$(this).addClass("active").siblings().removeClass("active");
					// console.log($(this).index())

					$(".mainBox1Lists li").remove();

					$temp.load("./templates/templates_index.html",()=>{

							var strhtml1=template("box-tab",{list2:response.block_266[$(this).index()].floorAllocations});

							$(".mainBox1Lists").append(strhtml1);
						})

				})
				// box2产品加载
				$(".mainBox1Tittle-tab2 li").on("click",function(){
					$(this).addClass("active").siblings().removeClass("active");
					// console.log($(this).index())

					$(".mainBox1Lists2 li").remove();
					$temp.load("./templates/templates_index.html",()=>{

							var strhtml2=template("box-tab",{list2:response.block_266[$(this).index()].floorAllocations});

							$(".mainBox1Lists2").append(strhtml2);
						})

				})


				// 点击加入购物车，存储cookie
				$(".mainBox1>ul").on("click","li",function(){
					// console.log($(this).find("img").attr("src"))
					// console.log($(this).find("span").html())
					// console.log($(this).find("em").html())
					// console.log($(this).find("button").attr("goodsid"))
					
					// 此处碰壁，必须先将数据存为变量再传入，不然会出现问题
					let imgsrc=$(this).find("img").attr("src");
					let nameC=$(this).find("span").text();
					let priceC=$(this).find("em").text();
					let goodsIdC=$(this).find("button").attr("goodsid");

					let goods={
						"img":imgsrc,
						"name":nameC,
						"price":priceC,
						"goodsId":goodsIdC
					}
					let newJson=[];
					// console.log(pub.getCookie("message"))
					// 判断是否有cookie
					if(pub.getCookie("message")){
						// 如果有，判断避免重复添加商品
						newJson= JSON.parse(pub.getCookie("message"));
						
						let newArr=newJson.filter(function(cookieGoods){
							return cookieGoods.goodsId === goods.goodsId;
						})
						
						if(newArr.length==0){
							newJson.push(goods);
							console.log(newJson)
						}
					}else{
						// 如果之前没有cookie，直接存入
						newJson=[goods];
						// console.log(newJson);
					}

					pub.setCookie("message",JSON.stringify(newJson))
				})


				

			}	//success回调函数EDN
		})	//ajax-EDN






	})
})