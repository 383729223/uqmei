require(["../script/config.js"],function(){
	require(["jquery","swiper","common","jqueryCookie","jqueryValidate","bootstrap",],function($,Swiper,pub,jqCookie){
		$(function(){


			// 加载头部尾部
			$("#header").load("common/header.html",function(){
				// 页头时间
				$(".phone p").html(pub.createDate());
				require(["headerJs"],function(){});
			});
			$("#footer").load("common/footer.html");
			


			// jqueryValidate 表单验证
			// 初始化
			$.validator.setDefaults({
			    submitHandler: function() {
			      	
			    }
			});
			
			// 制定验证规则
			$("#regLists").validate({
			    rules: {
			      firstname: "required",
			      username: {
			        required: true,
			        minlength: 2
			      },
			      password: {
			        required: true,
			        minlength: 5
			      },
			      confirm_password: {
			        required: true,
			        minlength: 5,
			        equalTo: "#inputPassword3"	//密码input的ID名
			      },
			      email: {
			        required: true,
			        email: true
			      },
			      number:{
			      	required: true,
			      	maxlength:11,
			      	minlength:11
			      }
			    },
			    messages: {
			      firstname: "请输入您的名字",
			      username: {
			        required: "请输入用户名",
			        minlength: "用户名至少由两个字符组成"
			      },
			      password: {
			        required: "请输入密码",
			        minlength: "密码长度不能小于 5 个字母"
			      },
			      confirm_password: {
			        required: "请输入密码",
			        minlength: "密码长度不能小于 5 个字母",
			        equalTo: "两次密码输入不一致"
			      },
			      email: "请输入一个正确的邮箱",
			      number: "请输入11位有效的数字",
			    },
			 // 	errorContainer: "div.error",
				// errorLabelContainer: $("#regLists div.error"),
				// wrapper: "li"
		    })

			// 注册成功时的弹出框
			function successAlert(){
				// alert("注册成功!");
		      	$("body").append(`<div class="alert alert-success regSuccess" role="alert">注册成功！</div>`);
		      	$(".regSuccess").animate({"top":"10px"},500,"linear",function(){
		      		setTimeout(()=>{
		      			$(this).animate({"top":"-51px"},500,function(){
		      				
							$(location).attr('href', 'login.html');
		      			})
		      		},500)
			      		
		      	})
			}

			function errorAlert(YN){
				// alert("注册失败!");
		      	$("body").append(`<div class="alert alert-danger regError" role="alert">${YN}</div>`);
		      	$(".regSuccess").animate({"top":"10px"},500,"linear",function(){
		      		setTimeout(()=>{
		      			$(this).animate({"top":"-51px"},500)
		      		},500)
			      		
		      	})
			}
			
			// 存数据
			$(".registeBtn").on("click",function(){
				// 判断是否符合注册标准
				if($(".personName").val()=="" || $(".personTel").val()=="" || $(".personPassword").val()=="" || $(".personRePassword").val()=="" || $(".personTel").val().length != 11 || $(".personPassword").val() != $(".personRePassword").val() || $(".personPassword").val() < 5 || $(".personRePassword").val() < 5 ){
					alert("请正确填写信息");
					// $(".regError").remove();
					// let str="请正确填写信息";
					// errorAlert(str);
				}else{

					let registeMessige={
						"name":$(".personName").val(),
						// "username":$(".personUsername").val(),
						"telNum":$(".personTel").val(),
						"password":$(".personPassword").val()
					}
					
					let registeCookie=[];

					if(jqCookie.cookie("registeMessiges")){
						registeCookie=JSON.parse(jqCookie.cookie("registeMessiges"));
						let newArr=registeCookie.filter(function(regedCookies){
							return regedCookies.telNum===registeMessige.telNum;
						})
						if(newArr.length==0){
							registeCookie.push(registeMessige);
							// 注册成功时的反馈
						    successAlert();
						}else{
							alert("该手机号已注册！！")
							// $(".regError").remove();
							// let str1="该手机号已注册！！";
							// errorAlert(str1);


							$(".personTel").parent().addClass("has-error")
							$(".personTel").focus(function(){
								$(this).parent().removeClass("has-error");
							})

						}

						
					}else{
						registeCookie=[registeMessige];
						// 注册成功时的反馈
					    successAlert();
					}


					jqCookie.cookie("registeMessiges",JSON.stringify(registeCookie),{
						expires:15
					})
				}

			})



		})
	})
})