$(document).ready(function(){

/*-----------------слайдер--------------------*/
	if ($('.product_slides-list').length) { //если этот список есть
		$('.product_slides-list').bxSlider({ //применяем к нему плагин слайдер
			slideWidth: 75, 
			minSlides: 3,
			maxSlides: 3,
			slideMargin: 9,
			pager: false, //убрали нумерацию
			nextText: '>',
			prevText: '<'
		});
	}

/*----------------кнопка наверх----------------------*/
	$(window).scroll(function(){
		var btnUp = $('.btn-up');

		if ($(this).scrollTop() > 100) {
			btnUp.fadeIn();
		}else{
			btnUp.fadeOut();
		}
	});


	$('.btn-up').click(function(){
		var duration = 700;
		$('html, body').animate({scrollTop: 0}, duration);
		return false;
	});

/*----------------плейсхолдеры-----------------------*/
	$('input[placeholder]').placeholder();


/*------------------фон строк таблицы-----------------*/
	$('.product_details-table tr:odd').addClass('bg-tr');
});