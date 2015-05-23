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

	var options = {
		data: getData(),
		header: "Chart of the site visits"
	};

	createDiagram(options);
});

function getData() {
	var data = [
	    {
	        "label" : "06-10-2015",
	        "data" : 287
	    },
	    {
	        "label" : "07-10-2015",
	        "data" : 784
	    },
	    {
	        "label" : "08-10-2015",
	        "data" : 1010
	    },
	    {
	        "label" : "09-10-2015",
	        "data" : 2599
	    },
	    {
	        "label" : "10-10-2015",
	        "data" : 4700
	    },
	    {
	        "label" : "01-11-2015",
	        "data" : 1526
	    },
	    {
	        "label" : "02-11-2015",
	        "data" : 880
	    },
	    {
	        "label" : "03-11-2015",
	        "data" : 336.5
	    },
	    {
	        "label" : "04-11-2015",
	        "data" : 501
	    },
	    {
	        "label" : "05-11-2015",
	        "data" : 123
	    },
	    {
	        "label" : "06-11-2015",
	        "data" : 287
	    },
	    {
	        "label" : "07-11-2015",
	        "data" : 784
	    },
	    {
	        "label" : "08-11-2015",
	        "data" : 1010
	    },
	    {
	        "label" : "09-11-2015",
	        "data" : 2599
	    },
	    {
	        "label" : "10-11-2015",
	        "data" : 4700
	    }

	];
	return data; 
}
