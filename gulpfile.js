let gulp = require('gulp');				//加载gulp
let babel = require('gulp-babel');		//加载ES6编译模块
let uglify = require('gulp-uglify');	//加载js压缩模块
let cleancss = require("gulp-clean-css");	//加载css压缩模块
let webserver = require('gulp-webserver');	//加载服务器模块
let sass=require("gulp-sass");			//scss文件编译为css


//压缩js
gulp.task('buildJS', ()=>{
	//只复制,libs下的js文件是已经压缩过的第三方文件
	gulp.src("./src/script/libs/*.js")
		.pipe( gulp.dest("./dist/script/libs"))
	//编译压缩复制
    gulp.src('./src/script/*.js').pipe(babel({
            presets: ['env']
        })).pipe(uglify()).pipe(gulp.dest('./dist/script'))
    gulp.src('./src/pages/*.js').pipe(babel({
            presets: ['env']
        })).pipe(uglify()).pipe(gulp.dest('./dist/pages'))
})


//压缩css,编译scss->css     //on('error', sass.logError) sass出问题不会结束服务器
gulp.task('buildCSS',()=>{
	gulp.src('./src/**/*.scss').pipe(sass().on('error', sass.logError)).pipe(cleancss()).pipe(gulp.dest('./dist'))
	gulp.src('./src/**/*.css').pipe(cleancss()).pipe(gulp.dest('./dist'))
})


gulp.task("buildHTML", ()=>{
	gulp.src("./src/**/*.html").pipe( gulp.dest("./dist") );
})
// 静态数据
gulp.task("buildStaticResource", ()=>{
	gulp.src("./src/img/**/*.*").pipe( gulp.dest("./dist/img") );
	gulp.src("./src/static/**/*.*").pipe( gulp.dest("./dist/static") );
})
// 监听各方法，如果有改变，就执行各命令
gulp.task("watching", ()=>{
	gulp.watch("./src/**/*.scss", ["buildCSS"]);
	gulp.watch("./src/**/*.js", ["buildJS"]);
	gulp.watch("./src/**/*.html", ["buildHTML"]);
	gulp.watch("./src/img/**/*.*", ["buildStaticResource"]);
	gulp.watch("./src/static/**/*.*", ["buildStaticResource"]);
});

//搭建服务器
gulp.task('webserver',["watching"],()=>{
  gulp.src('dist')
    .pipe(webserver({
	    livereload: true,			//实时更新页面
	    directoryListing: true,		//本地显示目录
	    open: true,					//服务器启动直接打开页面
	    // https:true,				//http要和ajax请求的地址头部一致，看情况，时而不加时而加，尝试一下
	    port:1000,				//端口号
	    proxies:[				//本地服务器代理跨域请求
	    	{
	    		source:'/test1',			//ajax的本地路径：localhost:10002/test
	    		target:'https://www.darryring.com/udesk/webtoken'	//目标网站的API接口，一般后面的参数写在ajax的url请求上，一般用来动态更改参数
	    	},
	    	{
	    		source:'/test2',			//ajax的本地路径：localhost:10002/test
	    		target:'https://youpin.mi.com/homepage/main/v1002'	//目标网站的API接口，一般后面的参数写在ajax的url请求上，一般用来动态更改参数
	    	}
	    ]

    }));
});

gulp.task("build", ["buildJS","buildHTML", "buildCSS", "buildStaticResource"])


