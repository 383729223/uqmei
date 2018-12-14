require(["../script/config.js"],function(){
	require(["jquery","swiper","common","jqueryValidate","bootstrap",],function($,Swiper,pub){

		$(function(){


			// 加载头部尾部
			$("#header").load("common/header.html",function(){
				// 页头时间
				$(".phone p").html(pub.createDate())
			});
			$("#footer").load("common/footer.html");
			


			// jqueryValidate 表单验证
			// 初始化
			$.validator.setDefaults({
			    submitHandler: function() {
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

		})

	})
})