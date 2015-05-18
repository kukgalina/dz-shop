'use strict'; //строгий режим

var gulp = require('gulp'),
	jade = require('gulp-jade'),
	browserSync = require('browser-sync'), //лок.сервер
	prettify = require('gulp-prettify'),
	wiredep = require('wiredep').stream, //указываем, что мы работаем с потоком
	useref = require('gulp-useref'),
	uglify = require('gulp-uglify'),
	gulpif = require('gulp-if'),
	size = require('gulp-size'),
	minifyCss = require('gulp-minify-css'),
	clean = require('gulp-clean'),
	filter = require('gulp-filter'),
	imagemin = require('gulp-imagemin'),
	reload = browserSync.reload;




//------------------------------------------
//-----ЛОКАЛЬНАЯ РАЗРАБОТКА В ПАПКЕ APP-----
//------------------------------------------

// Компиляция jade в html
gulp.task('jade', function () { 
	gulp.src('app/templates/pages/*.jade') // мы компилируем только страницы 
		.pipe(jade()) 
		.on('error', log) //если ошибка, то фунция log
		.pipe(prettify({indent_size: 2}))
		.pipe(gulp.dest('app/')) //куда складываем результат
		.pipe(reload({stream: true})); 
});

//подключим через Bower пути на сторонние библиотеки
gulp.task('wiredep',  function () {
	gulp.src('app/templates/common/*.jade') //заходит в jade-файлы
	.pipe(wiredep({
		ignorePath: /^(\.\.\/)*\.\./ //убираем лишние вложенности
	})) //прописывает пути
	.pipe(gulp.dest('app/templates/common/')) //путь куда положить
}); 

// Запускаем лок.сервер (но после компиляции jade)
gulp.task('server', ['jade'], function() {
	browserSync({
		notify: false, 
		port: 9000,
		server: {
			baseDir: 'app' //папка, которую открывать
		}
	});
});

// Следим и запускаем задачи
gulp.task('watch', function() {
	gulp.watch('app/templates/**/*.jade', ['jade']); //за шаблонами jade и запускаем задачу jade
	gulp.watch('bower.json', ['wiredep']); // за настройками сторонних библиотек
	gulp.watch([
		'app/js/**/*.js',
		'app/css/**/*.css'
	]).on('change', reload); // если изменилось, то перезагружает браузер
});

// Задача по умолчанию
gulp.task('default', ['server', 'watch']);




//---------------------------
//-----СБОРКА ПАПКА DIST-----
//---------------------------

// Очистка папки 
gulp.task('clean', function() { // удаляем содержимое папки и записываем по новому
	return gulp.src('dist')
		.pipe(clean());
});

// Переносим всё в папку dist
gulp.task('useref', function() {
	var assets = useref.assets();
	return gulp.src('app/*.html') // берёт html из app
		.pipe(assets) // берёт js, css
		.pipe(gulpif('*.js', uglify())) // минифицирует js
		.pipe(gulpif('*.css', minifyCss())) // то же самое с css и склеивает
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest('dist')); // всё это поместить в папку dist
});

// перенос шрифтов в папку dist
gulp.task('font', function() {
	gulp.src('app/font/*')
		.pipe(filter(['*.eot','*.svg', '*.ttf', '*.woff', '*.woff2']))
		.pipe(gulp.dest('dist/font/'))
});

// перенос картинок в папку dist
gulp.task('images', function() {
	return gulp.src('app/img/**/*') // достаём картинки из папки app
		.pipe(imagemin({ // сжатие картинок 
			progressive:true,
			interlaced: true
		}))
		.pipe(gulp.dest('dist/img')); // перемещаем картинки в dist
});

// Файлы, остальные favicon.ico
gulp.task('extras', function () {
	return gulp.src([
		'app/*.*',
		'!app/*.html'
	]).pipe(gulp.dest('dist'));
});

//  сборка и вывод размера dist
gulp.task('dist', ['useref', 'images', 'font', 'extras'], function () {
	return gulp.src('dist/**/*').pipe(size({title: 'build'}));
});

// Сборка dist только после компиляции jade и очищения папки
gulp.task('build', ['clean', 'jade'], function (){
	gulp.start('dist');
});



//-----------------------------------
//-----ФУНКЦИЯ ДЛЯ ВЫВОДА ОШИБКИ-----
// выводим ошибки более красиво
var log = function (error) {
  console.log([
    '',
    "----------ERROR MESSAGE START----------",
    ("[" + error.name + " in " + error.plugin + "]"),
    error.message,
    "----------ERROR MESSAGE END----------",
    ''
  ].join('\n'));
  this.end();
}