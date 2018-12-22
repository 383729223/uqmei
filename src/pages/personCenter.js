require(["../script/config.js"],function(){
	require(["jquery","swiper","common","jqueryCookie","headerJs","bootstrap"],function($,Swiper,pub,jqCookie,comHeader){
		$(function(){

			// console.log(jqCookie.cookie("currentUser"),456)

			// 加载头部尾部
			$("#header").load("common/header.html",function(){
				// 页头时间
				$(".phone p").html(pub.createDate());
				comHeader.commonHeader();		//加载头部公共JS，登录状态
			});
			$("#footer").load("common/footer.html");
			
			// console.log(JSON.parse(pub.getCookie("currentUser")));
			// console.log(JSON.parse(jqCookie.cookie("registeMessiges")));

			let currentUserTel=JSON.parse(jqCookie.cookie("currentUser"));
			let registeMessigesArr=JSON.parse(jqCookie.cookie("registeMessiges"));

			for(let i=0;i<registeMessigesArr.length;i++){
				if(registeMessigesArr[i].telNum == currentUserTel){
					$(".currentUserName").html(registeMessigesArr[i].name)
					$(".currentUserTel").html(registeMessigesArr[i].telNum)
				}
			}

		})
	})
})