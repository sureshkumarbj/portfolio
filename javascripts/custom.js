$(document).ready(function() {


	$('#opt').find('li').each(function(){

		var color = $('li.active a').attr('class');
		console.log(color);

		$('.knob_box').hide();
		$('.knob.'+color).parent().show();

	});

	$('#opt').find('li a').on('click', function(e){
		e.preventDefault();

		var color = $(this).attr('class');

		$('#color').attr('href','stylesheets/colors/'+color+'.css');
		$('#opt li').removeClass('active');
		$(this).parent().addClass('active');


		$('.knob').parent().hide();
		$('.knob.'+color).parent().show();


	});

	$('#optbut').on('click', function(e){
		e.preventDefault();

		$('#options').animate(
		{left : 0+'px'},
             {
                duration: 'slow',
                    
             },1000);
	});

	$('#opt2').find('li a').on('click', function(e){
		e.preventDefault();

		var el = $(this).attr('class');

		$('body').removeClass();
		$('body').addClass(el+"_prev");
		$('#opt2 li').removeClass('active');
		$(this).parent().addClass('active');

	});
	$('a.close').on('click', function(e){
		e.preventDefault();

		$('#options').animate(
		{left : -150+'px'},
             {
                duration: 'slow',
                    
             },1000);		
	});

});