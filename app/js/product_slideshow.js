(function() {
			$('.product_slides-link').on('click', function(e){
			e.preventDefault();

			var $this = $(this),
				item = $this.closest('.product_slides-item'),
				container = $this.closest('.product_slideshow'),
				display = container.find('.product_slideshow-display'),
				path = item.find('img').attr('src'),
				duration = 700;

			if (item.hasClass('active'))
				item.addClass('active').siblings().removeClass('active');

				display.find('img').fadeOut(duration, function(){
					$(this).attr('src', path).fadeIn(duration);
				});
	});
}());