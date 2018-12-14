require(["../script/config.js"],function(){
	require(["jquery","swiper","common","template","bootstrap"],function($,Swiper,pub,template){

		// 加载头部尾部
		$("#header").load("common/header.html",function(){
			// 页头时间
			$(".phone p").html(pub.createDate())
		});
		$("#footer").load("common/footer.html");
		


		// 拿到对应商品的cookie信息
		let productData=JSON.parse(pub.getCookie("productMessage"))[0];
		console.log(productData.price)
		// $("#smallImg").css({"backgroundImage":"url('"+productData.img+"')","backgroundPosition":"center"});//cookie加载小图片
		$("#smallImg img").attr("src",productData.img);
		$("#bigImg").attr("src",productData.img);	//cookie加载大图片

		// 放大镜-------------------------------------------------------------------------------------------------
		//计算smallCursor的真实大小
		//$("#smallCursor").width()/$("#smallImg").width() == $("#bigCursor").width()/$("#bigImg").width();
		// 小方块的宽 =====  大方块的宽 / 大图片的宽 * 小图片的宽
		$("#smallCursor").width( $("#bigCursor").width()/$("#bigImg").width()*$("#smallImg img").width() );
		$("#smallCursor").height( $("#bigCursor").height()/$("#bigImg").height()*$("#smallImg img").height() );
		
		console.log($("#bigCursor").width(),$("#bigImg").width(),$("#smallImg img").width(),$("#smallImg img").height())


		$("#smallImg").hover(function(){
			$("#smallCursor").show();
			$("#bigCursor").show();
		}, function(){
			$("#smallCursor").hide();
			$("#bigCursor").hide();
		})
		
		//大图小图的比例
		var scale = $("#bigImg").height()/$("#smallImg").height();

		$("#smallImg").on("mousemove", function(e){
			var _left = e.pageX - $(this).offset().left - $("#smallCursor").width()/2;
			var _top = e.pageY - $(this).offset().top - $("#smallCursor").height()/2;
			$("#smallCursor").css({
				left: Math.min(Math.max(0, _left), $("#smallImg").width()-$("#smallCursor").width()), 
				top:  Math.min(Math.max(0, _top), $("#smallImg").height()-$("#smallCursor").height())
			})
			$("#bigImg").css({
				left : -$("#smallCursor").position().left*scale,
				top : -$("#smallCursor").position().top*scale
			})
		})



		// 放大镜END---------------------------------------------------------------------------------------------


		
		$("#productBox .nav .navBefore").text(productData.name);	//左上角导航链接
		$(".productMessage").children().eq(0).text(productData.name);		//h3商品名称
		$(".productMessage").children().eq(1).find("em").text(productData.price.slice(1));

		// 增减商品数量·············
		let count=1;
		$(".productNum").on("focus",".productCount",function(){
			$(this).val("");
		})

		// 实时监听input标签的商品数量
		$(".productNum").on("change",".productCount",function(){
			if(/^\d+$/.test($(this).val())){
				count=parseInt($(this).val());
				$(this).parent().find("input").val(count);
			
			}else{
				$(this).val("请写数字");
			}
		})

		$(".productNum").on("click",".downbtn",function(){
			console.log("-")
			console.log($(this).parent().find("input").val())

			count--;
			if(count<=0){
				count=0;
			}
			$(this).parent().find("input").val(count);
		})
		$(".productNum").on("click",".upbtn",function(){
			console.log("+")
			count++;
			$(this).parent().find("input").val(count);
		})
		// 增减商品数量END·············



	})
})