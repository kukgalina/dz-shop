/* модуль тултипы */

$.fn.tooltip = function(options) {
	options = {
		position : options.position || 'top',
		content : options.content || 'вы не ввели'
	};

	var
		markup = ' <div class="tooltip-box tooltip-' + options.position + ' "> <div class="tooltip"> ' + options.content + ' </div> <div class="tooltip-pointer"></div> </div>';

	var 
		$this = $(this),
		body = $('body'),
		elemWidth = $this.outerWidth(true),
		elemHeight = $this.outerHeight(true),
		topSide = $this.offset().top,
		bottomSide = topSide + elemHeight,
		leftSide = $this.offset().left,
		rightSide = leftSide + elemWidth;


	$this.after(markup);

		// меряем тултип
	var 
		createdTooltip = body.find('.tooltip-box').last(), //находим последний тултип
		tooltipWidth = createdTooltip.outerWidth(true),//измерим ширину тултипа
		tooltipHeight = createdTooltip.outerHeight(true), //измерим высоту тултипа
		leftCentered = (elemWidth / 2) - (tooltipWidth/ 2),//расcчитываем горизонтальное выравнивание
		topCentered = (elemHeight / 2) - (tooltipHeight / 2);//вертикальное выравнивание

	//позиции
var positions = {}; 

	switch (options.position) {
		case 'top' :
			positions = { 
				left : leftSide + leftCentered, 
				top : topSide - tooltipHeight
			};
			break;

		case 'right' :
			positions = {
				left : rightSide,
				top : topSide + topCentered
			};
			break;

		case 'bottom' :
			positions = {
				left : leftSide + leftCentered,
				top : bottomSide
			};
			break;

		case 'left' :
			positions = {
				left : leftSide - tooltipWidth,
				top : topSide + topCentered
			};
			break;
	}

	createdTooltip
		.offset(positions);

};

