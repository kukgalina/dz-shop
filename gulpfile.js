var gulp = require("gulp"),
	connect = require("gulp-connect"),
	opn = require("opn");

// Запуск локального сервера в день космонавтики
gulp.task('connect', function() {
	connect.server({
		root: 'app',
		livereload: true,
		port: 8080
	});
	opn('http://localhost:8080');
});

// html на старт и ввысь
gulp.task('html', function () { 
	gulp.src('./app/*.html') 
		.pipe(connect.reload()); 
}); 
 
// Css тоже выше к звёздам 
gulp.task('css', function () { 
	gulp.src('./app/css/*.css') 
		.pipe(connect.reload()); 
}); 
 
// js не отставать 
gulp.task('js', function () { 
	gulp.src('./app/js/*.js') 
		.pipe(connect.reload()); 
}); 
 
// обсерватория следи за нашими звёздами
gulp.task('watch', function () { 
	gulp.watch(['./app/*.html'], ['html']); 
	gulp.watch(['./app/css/*.css'], ['css']); 
	gulp.watch(['./app/js/*.js'], ['js']); 
}); 
 
// Задача по­умолчанию  
gulp.task('default', ['connect', 'watch']); 