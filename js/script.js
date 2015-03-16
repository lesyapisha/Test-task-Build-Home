jQuery(function($) {

	$('.flexslider').flexslider({
		controlNav: true,               
		directionNav: false
		
	});

	$('.accordion-header').click(function(e){
		e.preventDefault();

		$(this).siblings('.accordion-body').slideToggle()
			.parent().toggleClass('active')
			.siblings().removeClass('active')
			.children('.accordion-body').slideUp();

	});
});
