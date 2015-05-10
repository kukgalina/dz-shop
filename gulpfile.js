'use strict'; //строгий режим

var gulp = require('gulp'),
	jade = require('gulp-jade'),
	browserSync = require('browser-sync'), //лок.сервер
	prettify = require('gulp-prettify'),
	wiredep = require('wiredep').stream, //указываем, что мы работаем с потоком
	opn = require('opn'),
	reload = browserSync.reload;

//------------------------------------------
//-----ЛОКАЛЬНАЯ РАЗРАБОТКА В ПАПКЕ APP-----
//------------------------------------------

// Компиляция jade в html
gulp.task('jade', function () { 
	gulp.src('app/templates/*.jade') // мы компилируем только страницы 
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