// Модуль формы обратной связи
var searchForm = (function (){ //самовызывающаяся функция

	var init = function(){ // только это будет доступно извне
				console.log('иницилизация модуля форма поиска');
				_setUpListners();
		},

		_setUpListners = function() { //слежка за событиями
			$('#form-search').on('submit', _submitForm);// когда сабмит - вызываем метод сабмитформ
		},
		
		_submitForm = function (ev) {
			console.log('Работа с формой поиска');

			ev.preventDefault();//отменяем сам сабмит формы

		  	var form = $(this),// эта форма
		  		host = form.attr('action'),// адрес php-файла куда будет отправляться наш запрос
		  		resultObject = _ajaxForm(form, host);// результат ajax запроса

		  	

		  	if (resultObject) {  //проверка наличие переменной ajax
		  		resultObject.done(function(ans) {
		  			var mes = ans.mes,
		  			status = ans.status;

		  			if ( status === 'OK'){ //проверка ок - срабатывает этот код
		  				// мы должны перейти на главную страницу уже авторизированными
		  			} else{
		  				
		  			}
		  		});
		  	}
		},
		_ajaxForm = function (form, host) { //здесь сам ajax

			if (validation.validateForm(form)) return false; //ошибка, если не проходит валидацию

			var data = form.serialize();//забираем значения инпутов в data

			return $.ajax({ // возвращаем def Object
				type: 'POST',
				host: host,
				dataType: 'JSON',
				data: data
			}).fail( function(ans){
				console.log('Проблемы в коде php');
				form.find('.error-result').text('На сервере произошла ошибка').show();
			});
		};
	return {
		init: init 
	};
})();

searchForm.init();