require(["../script/config.js"],function(){
	require(["jquery","swiper","common","jqueryCookie","headerJs","bootstrap"],function($,Swiper,pub,jqCookie,comHeader){
		$(function(){


			// 加载头部尾部
			$("#header").load("common/header.html",function(){
				// 页头时间
				$(".phone p").html(pub.createDate());
				comHeader.commonHeader();		//加载头部公共JS，登录状态
			});
			$("#footer").load("common/footer.html");
			
			// 登录验证

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


				let registeJson=JSON.parse(jqCookie.cookie("registeMessiges"));
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
						// 登录成功时，临时存一个该用户的id
						let currentNum=newLogin[0].telNum;
						console.log(currentNum)
						// pub.setCookie("currentUser",currentNum)
						jqCookie.cookie("currentUser",currentNum)

						// 登陆成功跳转
						$("body").append(`<div class="alert alert-success regSuccess" role="alert">登录成功！</div>`);
				      	$(".regSuccess").animate({"top":"10px"},500,"linear",function(){
				      		setTimeout(()=>{
				      			$(this).animate({"top":"-51px"},500,function(){
				      				
									$(location).attr('href', 'personCenter.html');
				      			})
				      		},500)
					      		
				      	})


					}else{
						alert("密码错误！")
					}

				}


			})


		})
	})
})