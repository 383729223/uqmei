"use strict";require(["../script/config.js"],function(){require(["jquery","swiper","common","jqueryValidate","bootstrap"],function(r,e,i){r(function(){r("#header").load("common/header.html",function(){r(".phone p").html(i.createDate())}),r("#footer").load("common/footer.html"),r.validator.setDefaults({submitHandler:function(){r("body").append('<div class="alert alert-success regSuccess" role="alert">注册成功！</div>'),r(".regSuccess").animate({top:"10px"},500,"linear",function(){var e=this;setTimeout(function(){r(e).animate({top:"-51px"},500,function(){r(location).attr("href","login.html")})},500)})}}),r("#regLists").validate({rules:{firstname:"required",username:{required:!0,minlength:2},password:{required:!0,minlength:5},confirm_password:{required:!0,minlength:5,equalTo:"#inputPassword3"},email:{required:!0,email:!0},number:{required:!0,maxlength:11,minlength:11}},messages:{firstname:"请输入您的名字",username:{required:"请输入用户名",minlength:"用户名至少由两个字符组成"},password:{required:"请输入密码",minlength:"密码长度不能小于 5 个字母"},confirm_password:{required:"请输入密码",minlength:"密码长度不能小于 5 个字母",equalTo:"两次密码输入不一致"},email:"请输入一个正确的邮箱",number:"请输入11位有效的数字"}})})})});