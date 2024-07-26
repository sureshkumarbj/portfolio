(function($){  
  $(function(){

/***************************************************
    Hero Image Animation
***************************************************/

$('.hero-image').addClass('hero_animate');

$('.pos').animate({
  opacity: 1
},900);

// hide #back-top / back to top link
$("#back-top").hide();

// fade in #back-top / back to top link
  $(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $('#back-top').fadeIn();
      } else {
        $('#back-top').fadeOut();
      }
    });

    // scroll body to 0px on click
    $('#back-top a').click(function () {
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
    });
  });

/***************************************************
    MAIN NAVIGATION
***************************************************/

$('.main_nav li a, a.more').on('click',function(e){
    e.preventDefault();
    var anchor = $(this);

    //animate content scroll
    // $('html, body').stop().animate({
    //   scrollTop: $(anchor.attr('href')).offset().top
    // }, 900,'easeInOutExpo');

    $('html, body').stop().animate({
      scrollTop: $(anchor.attr('href')).offset().top
    }, 1000);
}); 

/***************************************************
    ACHIEVEMENT LIST HOVER
***************************************************/

$(".achievement_list a").hover(
  function () {
    var self = $(this);
    var title = self.attr('data-title');
    var subtitle = self.attr('data-subtitle');
    var description = self.attr('data-description');


    $('#hovercard h2').append(title);
    $('#hovercard p.subtitle').append(subtitle);
    $('#hovercard p.description').append(description);

      // positioning
      var card_w = 300;
      var below = 6;
      var offset = self.offset();
      var el_w = self.outerWidth();
      var el_h = self.outerHeight();
      $('#hovercard').css({
        top: offset.top + el_h - below,
        left: offset.left - card_w/2 + el_w/2,
      }).show();  
}, 
function () {
    $('#hovercard').hide();
    $('#hovercard h2, #hovercard p.subtitle, #hovercard p.description').empty();
    
});

/***************************************************
    JQUERY ISOTOPE / PORTFOLIO FILTER
***************************************************/

    $.Isotope.prototype._getCenteredMasonryColumns = function() {
        this.width = this.element.width();
        var parentWidth = this.element.parent().width();
        // i.e. options.masonry && options.masonry.columnWidth
        var colW = this.options.masonry && this.options.masonry.columnWidth ||
        // or use the size of the first item
        this.$filteredAtoms.outerWidth(true) ||
        // if there's no items, use size of container
        parentWidth;
        var cols = Math.floor(parentWidth / colW);
        cols = Math.max(cols, 1);
        // i.e. this.masonry.cols = ....
        this.masonry.cols = cols;
        // i.e. this.masonry.columnWidth = ...
        this.masonry.columnWidth = colW;
    };

    $.Isotope.prototype._masonryReset = function() {
        // layout-specific props
        this.masonry = {};
        // FIXME shouldn't have to call this again
        this._getCenteredMasonryColumns();
        var i = this.masonry.cols;
        this.masonry.colYs = [];
        while (i--) {
            this.masonry.colYs.push(0);
        }
    };

    $.Isotope.prototype._masonryResizeChanged = function() {
        var prevColCount = this.masonry.cols;
        // get updated colCount
        this._getCenteredMasonryColumns();
        return (this.masonry.cols !== prevColCount);
    };

    $.Isotope.prototype._masonryGetContainerSize = function() {
        var unusedCols = 0,
            i = this.masonry.cols;
        // count unused columns
        while (--i) {
            if (this.masonry.colYs[i] !== 0) {
                break;
            }
            unusedCols++;
        }
        return {
            height: Math.max.apply(Math, this.masonry.colYs),
            // fit container to columns that have been used;
            width: (this.masonry.cols - unusedCols) * this.masonry.columnWidth
        };
    };

    var $container = $('#portfolio_items'),
        $body = $('body'),
        colW = 0,
        columns = null;

    $container.isotope({
        masonry: {
            columnWidth: colW
        },
        animationEngine : 'jquery',
        animationOptions: {
          duration: 250,
          easing: 'linear',
          queue: false
        }
    });


// filter items when filter link is clicked
$('#portfolio_filter a').click(function(e){
  e.preventDefault();
    
    var selector = $(this).attr('data-filter');
    $container.isotope({ filter: selector });
    
    $("#portfolio_filter li").removeClass("current");
    $(this).closest("li").addClass("current");
    
    return false;
});


/***************************************************
    JQUERY WAYPOINTS / CURRENT AREA ON PAGE
***************************************************/

$('.content-wrapper').waypoint({ offset: '75%' });

$('body').delegate('.content-wrapper', 'waypoint.reached', function(event, direction) {
  var $active = $(this);

  if (direction === "up") {
    $active = $active.prev();
  }

  if (!$active.length) $active = $active.end();
  
  $('.section-active').removeClass('section-active');
  $active.addClass('section-active');
  
  $('.link-active').removeClass('link-active');
  $('.main_nav li a[href=#'+$active.attr('id')+']').addClass('link-active');
  
}); 

/***************************************************
    SKILLS ANIMATION IF ACTIVE
***************************************************/
$(window).scroll(function(){      

    //here you can activate Skills bars
    if($('.main_nav li a[href="#skills"]').hasClass('link-active')){
      setTimeout(function(){
          loadSkills();
      }, 700, 'easeInOutExpo');
    }  
});


/***************************************************
    JQUERY COLORBOX / PORTFOLIO COLORBOX
***************************************************/

$("a.colorbox").colorbox({
  rel:'gal',
  maxWidth: "98%",
  maxHeight: "98%"
});

// here you can change iframe width and height
$("a.iframe").colorbox({
    iframe:true, 
    innerWidth: "100%", 
    innerHeight: "100%",
    maxWidth: "98%",
    maxHeight: "98%",
    rel:'video'
});


/*-----------------------------------------------------------------------------------*/
/*  LOAD SKILLS
/*-----------------------------------------------------------------------------------*/
function loadSkills(){
    $('.skill_set').each(function() {
        var skill = $(this);
        var skill_width = $(this).attr('data-skill');  

       // skill.css('width', skill_width+'%');     
        skill.animate({
            width: skill_width+'%'
        },1000);

    });
}

/***************************************************
    JQUERY KNOB / AWESOMNESS LEVEL
***************************************************/
$(".knob").knob().addClass('knob_box');

});

/***************************************************
                 CONTACT FORM SUBMIT 
***************************************************/

$('#contact_form').submit(function(e){
	e.preventDefault();
	$('#submit_msg').html('');
	$('#submit_msg').removeClass('success').removeClass('error');
	
	var validate = validate_form();
	
	if(validate == true){
			var $f = $(this);		
		$.post('ajax/form_submit.php', $f.serialize(), function(response) {
			eval('var response='+response);
			if(response.status == false){
				$('#submit_msg').addClass('error');
	 		} else {
				$('#submit_msg').addClass('success');
	 		}
	 		$('#submit_msg').html(response.msg);
		});
	}
	
	});
	
/***************************************************
                 REFRESH CAPTCHA
***************************************************/
$('#refresh_captcha').click(function(e){
	e.preventDefault();
	refresh_captcha();
});
	
})(jQuery);


$(document).ready(function() {
	refresh_captcha();
});


/***************************************************
                 GENERATE CAPTCHA
***************************************************/
function refresh_captcha(){
	$.post('ajax/generate_captcha.php', '', function(response) {	
				eval('var response='+response);
				if(response.status == true){
			 		$('#form_captcha').html('<img src="'+response.image_src+'"/>');
			 	} else {
			 		$('#form_captcha').closest("li").remove();
			 	}
			});
}

/***************************************************
                 VALIDATE FORM
***************************************************/
function validate_form() {
        //define values
        var status = true;
        var name = $("input#name").val(); 
        var email = $("input#email").val(); 
        var message = $("textarea#message").val();        
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 

        //input fields and textbox
        var input_name = $("input#name");
        var input_email = $("input#email");
        var input_message = $("#message");
        
        //name
        if(name == ""){
            input_name.addClass('error-form');
            setTimeout( function() {
                input_name.removeClass('error-form');
            }, 3000 );
            status = false;
        }
        
        // Email
        if(email == "" || reg.test(email) == false){
            input_email.addClass('error-form');
            setTimeout( function() {
                input_email.removeClass('error-form');
            }, 3000 );
            status = false;
        }

        //Text message
        if(message == ""){
            input_message.addClass('error-form');
            setTimeout( function() {
                input_message.removeClass('error-form');
            }, 3000 );
            status = false;
        }
       
       return status;
}