require(["../script/config.js"],function(){
	require(["jquery","swiper","common","template","bootstrap",],function($,Swiper,pub,template){

		// 加载头部尾部
		$("#header").load("common/header.html",function(){
			// 页头时间
			$(".phone p").html(pub.createDate())
		});
		$("#footer").load("common/footer.html");
		
		// 加载模板引擎
		let $temp=$("<div class='temp'></div>");
		$("body").append($temp);


		if(pub.getCookie("message")){
			let cookieJson = JSON.parse(pub.getCookie("message"));
			// console.log(cookieJson)
			$temp.load("./templates/templates_shopCar.html",function(){
				let shopCarTable=template("shopCarItems",{list:cookieJson});
				$(".shopBoxLists").html(shopCarTable)
			})

			console.log($(".shopBoxLists table").find("button"))
			// 删除本条商品及Cookie
			$(".shopBoxLists table").find("button").click(function(){
				console.log(11);
				$(this).parent().parent().remove();
			})

			
		}else{
			$(".shopBoxLists").html(`购物车内未添加商品，请先选购！`)
		}

		

	})
})