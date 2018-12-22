require(["../script/config.js"],function(){
	require(["jquery","swiper","common","template","jqueryCookie","headerJs","bootstrap"],function($,Swiper,pub,template,jqCookie,comHeader){
		$(function(){
			
		

			// 加载头部尾部
			$("#header").load("common/header.html",function(){
				// 页头时间
				$(".phone p").html(pub.createDate());
				comHeader.commonHeader();		//加载头部公共JS，登录状态
			});
			$("#footer").load("common/footer.html");
			
			// 加载模板引擎
			let $temp=$("<div class='temp'></div>");
			$("body").append($temp);




			if(pub.getCookie("message")){

				

				$(".shopBoxLists").removeClass("emptyStyle")
				let cookieJson = JSON.parse(jqCookie.cookie("message"));

				// 判断是否已经清空购物车，这个判断为了解决刷新页面thead依然存在的问题
				if(cookieJson.length==0){
					$(".shopBoxLists").addClass("emptyStyle")
					$temp.load("./templates/templates_shopCar.html",function(){
						let shopCarTable=template("shopCarEmpty");
						$(".shopBoxLists").html(shopCarTable)
					})
				}else{

					$temp.load("./templates/templates_shopCar.html",function(){
						let shopCarTable=template("shopCarItems",{list:cookieJson});
						$(".shopBoxLists").html(shopCarTable)
					})
				}

				// 增减商品数量
				let count=1;
				$(".shopBoxLists").on("focus",".shopCount",function(){
					$(this).val("");
				})

				// 商品单价*商品数量的封装
				function shopSumPrice(_this){
					_this.parent().find("input").val(count);
					// console.log($(this).parent().siblings().eq(2).text());
					let shopPrice=_this.parent().siblings().eq(2).text(); //获取商品价格	
					let intPrice=parseInt(shopPrice.slice(1,shopPrice.length));	//将价格转为数字
					// console.log(intPrice)
					let shopCount=parseInt(_this.parent().find("input").val());

					_this.parent().siblings().eq(3).text("￥"+intPrice*shopCount);
				};

				// 实时监听input标签的商品数量
				$(".shopBoxLists").on("change",".shopCount",function(){
					if(/^\d+$/.test($(this).val())){
						count=parseInt($(this).val());
						shopSumPrice($(this));
						shopSum()
					}else{
						$(this).val("请写数字");
					}
				})

				$(".shopBoxLists").on("click",".downbtn",function(){
					console.log("-")
					console.log($(this).parent().find("input").val())

					count--;
					if(count<=0){
						count=0;
					}
					shopSumPrice($(this));
					shopSum()
				})
				$(".shopBoxLists").on("click",".upbtn",function(){
					console.log("+")
					count++;
					shopSumPrice($(this));
					shopSum()
				})



				// 删除本条商品及Cookie
				
				$(".shopBoxLists").on("click",".delbtn",function(){

					$(this).parent().parent().remove();

					for(let i=0;i<cookieJson.length;i++){
						if(cookieJson[i].goodsId===$(this).attr("goodsid")){
							cookieJson.splice(i,1);
						}
					}
					jqCookie.cookie("message",JSON.stringify(cookieJson),{
						expires:7
					});
					// console.log(typeof(pub.getCookie("message")))
					if(cookieJson.length==0){
						$(".shopBoxLists").addClass("emptyStyle")
						$temp.load("./templates/templates_shopCar.html",function(){
							let shopCarTable=template("shopCarEmpty");
							$(".shopBoxLists").html(shopCarTable)
						})

					}
					shopSum()
				})
				
				// 购物车结算栏
				function shopSum(){
					let arr=$(".shopSum").text().split("￥");
					arr.shift();
					let sum=0;
					arr.forEach(function(value){
						sum+=parseInt(value)
					})

					$(".shopBoxPay em i").text(`￥${sum}`);
				}

				$temp.load("./templates/templates_shopCar.html",function(){
					let shopCarPay=template("shopCarPay");
					$(".shopBoxPay").html(shopCarPay);
					shopSum()
					
				})

				


			}else{
				$(".shopBoxLists").addClass("emptyStyle")

				$temp.load("./templates/templates_shopCar.html",function(){
					let shopCarTable=template("shopCarEmpty");
					$(".shopBoxLists").html(shopCarTable)
				})

			}








		})
	})
})