require(["../script/config.js"],function(){
	require(["jquery","swiper","common","bootstrap",],function($,Swiper,pub){

		// 页头时间
		$(".phone p").html(pub.createDate());
		

	})
})