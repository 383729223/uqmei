require(["../script/config.js"],function(){
	require(["jquery","swiper","common","template","bootstrap"],function($,Swiper,pub,template){

		// 加载头部尾部
		$("#header").load("common/header.html",function(){
			// 页头时间
			$(".phone p").html(pub.createDate())
		});
		$("#footer").load("common/footer.html");
		


		// 放大镜-------------------------------------------------------------------------------------------------
		//计算smallCursor的真实大小
		//$("#smallCursor").width()/$("#smallImg").width() == $("#bigCursor").width()/$("#bigImg").width();
		// 小方块的宽 =====  大方块的宽 / 大图片的宽 * 小图片的宽
		$("#smallCursor").width( $("#bigCursor").width()/$("#bigImg").width()*$("#smallImg").width() );
		$("#smallCursor").height( $("#bigCursor").height()/$("#bigImg").height()*$("#smallImg").height() );
		


		$("#smallImg").hover(function(){
			$("#smallCursor").show();
			$("#bigCursor").show();
		}, function(){
			$("#smallCursor").hide();
			$("#bigCursor").hide();
		})
		
		//大图小图的比例
		var scale = $("#bigImg").height()/$("#smallImg").height();

		$("#smallImg").on("mousemove", function(e){
			var _left = e.pageX - $(this).offset().left - $("#smallCursor").width()/2;
			var _top = e.pageY - $(this).offset().top - $("#smallCursor").height()/2;
			$("#smallCursor").css({
				left: Math.min(Math.max(0, _left), $("#smallImg").width()-$("#smallCursor").width()), 
				top:  Math.min(Math.max(0, _top), $("#smallImg").height()-$("#smallCursor").height())
			})
			$("#bigImg").css({
				left : -$("#smallCursor").position().left*scale-60,
				top : -$("#smallCursor").position().top*scale-80
			})
		})



		// 放大镜END---------------------------------------------------------------------------------------------

		let productData=JSON.parse(pub.getCookie("productMessage"))[0];
		console.log(productData.img)
		$("#smallImg").css({"backgroundImage":"url('"+productData.img+"')","backgroundPosition":"center"})
		$("#bigImg").attr("src",productData.img)


	})
})