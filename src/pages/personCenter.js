require(["../script/config.js"],function(){
	require(["jquery","swiper","common","bootstrap"],function($,Swiper,pub){
		$(function(){


			// 加载头部尾部
			$("#header").load("common/header.html",function(){
				// 页头时间
				$(".phone p").html(pub.createDate())
			});
			$("#footer").load("common/footer.html");
			
			
		})
	})
})