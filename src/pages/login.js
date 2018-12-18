require(["../script/config.js"],function(){
	require(["jquery","swiper","common","bootstrap"],function($,Swiper,pub){
		$(function(){


			// 加载头部尾部
			$("#header").load("common/header.html",function(){
				// 页头时间
				$(".phone p").html(pub.createDate())
			});
			$("#footer").load("common/footer.html");
			
			// 登录验证
			console.log(JSON.parse(pub.getCookie("registeMessiges")))

			$(".loginBtn").on("click",function(){

				// 真实开发时，ajax请求数据------------
				// $.ajax({
				// 	url:"",			//后台接口
				// 	success:function(response){
				// 		console.log(response)
				// 	},
				// 	error:function(a,b){
				// 		console.log(a,b)
				// 	}
				// })

				// cookie模拟登录---------------------


				let registeJson=JSON.parse(pub.getCookie("registeMessiges"));
				// $(".loginUsername")
				// $(".loginPassword")

				let newLogin=registeJson.filter(function(jsonChecks){
					return jsonChecks.telNum === $(".loginUsername").val()
				})
				console.log(newLogin)
				if(newLogin.length==0){
					alert("请输入正确的账号");
				}else if(newLogin.length==1){

					if(newLogin[0].telNum==$(".loginUsername").val() && newLogin[0].password==$(".loginPassword").val() ){
						alert("登录成功！")
					}else{
						alert("密码错误！")
					}

				}


			})


		})
	})
})