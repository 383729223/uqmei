define(["jquery","common","jqueryCookie"],function($,pub,jqCookie){
	$(function(){
		

		
		console.log(pub.getCookie("currentUser"))

		if(pub.getCookie("currentUser")){
			let currentUserTel=JSON.parse(pub.getCookie("currentUser"));
			let registeMessigesArr=JSON.parse(jqCookie.cookie("registeMessiges"));

			for(let i=0;i<registeMessigesArr.length;i++){
				if(registeMessigesArr[i].telNum == currentUserTel){
					$(".buycar-b").html(`<a href="personCenter.html">欢迎：${registeMessigesArr[i].name}</a><a class="lotout">注销账户</a>`)
				}
			}
			
			$(".lotout").on("click",function(){
				pub.removeCookie("currentUser");
				$(".buycar-b").html(`<a href="registe.html">会员注册</a>
				<a href="login.html">会员登录</a>`)
				$(location).attr('href', 'login.html');
			})



		}else{
			$(".buycar-b").html(`<a href="registe.html">会员注册</a>
				<a href="login.html">会员登录</a>`)
		}




	})

})