require(["../script/config.js"],function(){
	require(["jquery","swiper","common","jqueryCookie","bootstrap"],function($,Swiper,pub,jqCookie){
		$(function(){


			// 加载头部尾部
			$("#header").load("common/header.html",function(){
				// 页头时间
				$(".phone p").html(pub.createDate());
				require(["headerJs"],function(){});
			});
			$("#footer").load("common/footer.html");
			
			console.log(JSON.parse(pub.getCookie("currentUser")));
			console.log(JSON.parse(jqCookie.cookie("registeMessiges")));

			let currentUserTel=JSON.parse(pub.getCookie("currentUser"));
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