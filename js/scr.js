var scroller=jQuery.browser.webkit ? "body": "html";

/* modernize */
function modernize() {
	// placeholder 
	if(!Modernizr.input.placeholder){
		$('[placeholder]').each(function() {
			$(this).watermark($(this).attr('placeholder'));
		});
	}
}

/* scrollUp */
function scrollUp(block,targetBlock) {
	$(block).click(function(e){
		var target = $(targetBlock).offset().top;
		$(scroller).animate({scrollTop:target},800);
		return false;
		e.preventDefault();
	});
}

/* input only Number  */
function inputNumber(block) {	
	$('input', block).keypress(function(e) {
		if (e.which >= 47 && e.which <= 57 ){}
		else return false;
	});
	
	$('input', block).keyup(function() {
		$inputNum = $(this);
		if ($inputNum.val == '' || $inputNum.val() == 0) {
			$inputNum.val('1'); 
		}
	});
}
function slickInit(){
	$('.catalog-list').slick({
	  slidesToShow: 4,
	  slidesToScroll: 1,
	  arrows: true,
	  fade: false,
	  responsive: [
	  	{
	      breakpoint: 960,
	      settings: {
	        slidesToShow: 3,
	        slidesToScroll: 1
	      }
	    },
	  	{
	      breakpoint: 768,
	      settings: {
	        slidesToShow: 2,
	        slidesToScroll: 1
	      }
	    },
	  	{
	      breakpoint: 480,
	      settings: {
	        slidesToShow: 1,
	        slidesToScroll: 1
	      }
	    },
	  ]
	});

	$('.projects-slider').each(function(){
		$slider=$(this);
		$('.slider-for',$slider).slick({
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  arrows: false,
		  fade: true,
		  asNavFor: $('.slider-nav', $slider)
		});
		$('.slider-nav',$slider).slick({
		  slidesToShow: 3,
		  slidesToScroll: 1,
		  asNavFor: $('.slider-for', $slider),
		  dots: false,
		  centerMode: true,
		  centerPadding:'0px',
		  focusOnSelect: true,
		  responsive: [
		  	{
		      breakpoint: 768,
		      settings: {
		        slidesToShow: 4,
		        slidesToScroll: 1
		      }
		    },
		  	{
		      breakpoint: 480,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 1
		      }
		    },
		  ]
		});
	})
}

function galleryLink(){
	$('.gallery-link').fancybox({
		padding: [0,0,0,0],
		openEffect: 'elastic',
		closeEffect: 'elastic',
		prevEffect: 'fade',
		nextEffect: 'fade',
		openSpeed: 350,
		closeSpeed: 350,
		nextSpeed: 500,
		prevSpeed: 500,
		mouseWheel: true,
		 tpl: {
			wrap: '<div class="fancybox-wrap gallerypopup" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
		}
	});
}

function expandTool(){
	$('.expand-subject').slideUp(0);
	$('.expand-tool').click(function(e){
		$(this).siblings('.expand-subject').stop().slideToggle();
		$(this).parent().toggleClass('active');
		e.preventDefault();
	})
}

function navbartoggle(){
	$('.navbar-toggle').click(function(){
		var navbar = $('.navbar-collapse');
		if($(this).is('.active')){
			$(this).removeClass('active');
			navbar.stop().slideUp().removeClass('active');
		}
		else{
			$(this).addClass('active');
			navbar.stop().slideDown().addClass('active');
		}
		return false;
	});
}


$(document).ready(function(){
	modernize();
	navbartoggle();
	slickInit();
	galleryLink();
	$('.footer_placeholder').height($('.footer').outerHeight());

	 $("input[name='phone']").mask("+7 (999) 999-99-99");
});