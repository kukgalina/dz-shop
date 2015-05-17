$(document).ready(function(){
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
});