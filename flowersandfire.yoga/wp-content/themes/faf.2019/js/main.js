$(function(){


/*  ==========================================================================
    links
    ========================================================================== */

	links__init();

	function links__init($context){
		$links = $('a').not('.noline, .noline a, .line--added');

		$links.each(function(){
			var $this = $(this);
			var $icon = $('.fab', $this);

			if($('img', $this).length < 1){
				$this.wrapInner("<span class='linkline'>");
				$this.addClass('line--added');
				if($icon.length > 0){
					if($icon.hasClass('fa--left')){
						$icon.insertBefore($('.linkline', $this));
					}else{
						$icon.insertAfter($('.linkline', $this));
					}
				}
			}
		});
	} // links__init()

/*  ==========================================================================
	Clock 
	========================================================================== */
	var update = function () {
	//currentTime = moment(new Date());
	giliTime = moment.tz("Asia/Makassar");

	//$('.local').html(currentTime.format('hh:mm a'));
	$('.currenttime').html(giliTime.format('ddd, MMM Do hh:mma'));
	};

	$(function(){
	update();
	setInterval(update, 500);
	});



/*  ==========================================================================
    scrolled
    ========================================================================== */

	$(document).scroll(function (evt) {
		var y = $(this).scrollTop();
		if (y > 140) {
			$('body').addClass('hidenav');
		} else {
			$('body').removeClass('hidenav');
		}
		if (y > 140) {
			$('body').addClass('hasscrolled');
			$('body').removeClass('hidenav');
		} else {
			$('body').removeClass('hasscrolled');
		}
	});
	
/*  ==========================================================================
    home hero
    ========================================================================== */

$('.hphero__carousel').owlCarousel({
	autoplay: true,
    autoplayTimeout:2500,
	slideSpeed : 500,
    nav: false,
    dots: false,
	loop: true,
	animateOut: 'fadeOut',
    items:1,
    rewind: true,
    mouseDrag: false,
    touchDrag: false
});
	
/*  ==========================================================================
    waypoints
    ========================================================================== */
$(".pageanchor").waypoint(function(){
   $(this[0,'element']).addClass("inview");
});

var $pageanchor = $("#pageanchor");

$pageanchor.waypoint(function(){
     $('body').toggleClass('inview');      
 },{offset:'100%'});
	
/*  ==========================================================================
    smooth scrolling
    ========================================================================== */

	// Select all links with hashes
	$('a[href*="#"]')
	  // Remove links that don't actually link to anything
	  .not('[href="#"]')
	  .not('[href="#0"]')
	  .click(function(event) {
	    // On-page links
	    if (
	      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
	      && 
	      location.hostname == this.hostname
	    ) {
	      // Figure out element to scroll to
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	      // Does a scroll target exist?
	      if (target.length) {
	        // Only prevent default if animation is actually gonna happen
	        event.preventDefault();
	        $('html, body').animate({
	          scrollTop: target.offset().top
	        }, 1000, function() {
	          // Callback after animation
	          // Must change focus!
	          var $target = $(target);
	          $target.focus();
	          if ($target.is(":focus")) { // Checking if the target was focused
	            return false;
	          } else {
	            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
	            $target.focus(); // Set focus again
	          };
	        });
	      }
	    }
	  });

/*  ==========================================================================
    instagram
    ========================================================================== */
    var imgs = [];
    var feed = new Instafeed({
            userId: 5857510012,
            accessToken: "5857510012.ee47d77.25cf4077644147beab8ef8d20379efbb",
            get: "user",
            limit:9,
            //links:true,
            resolution: "low_resolution",
            template: '<div class="gd-u gd-u-1-2 gd-u-xs-1-4"><a href="{{link}}"><div class="instafeed-image" style="background-image:url({{image}});"></div></a></div>',
            success: function (data) {
                // read the feed data and create owr own data struture.
                var images = data.data;
                var result;
                for (i = 0; i < images.length; i++) {
                    var image = images[i];
                    result = this._makeTemplate(this.options.template, {
                        model: image,
                        id: image.id,
                        image: image.images[this.options.resolution].url
                    });
                    imgs.push(result);
                }
            }
        });
    feed.run();


/*  ==========================================================================
    sharinglinks
    ========================================================================== */

	$('.sharelink--popup').click(function(e){
		e.preventDefault();
		window.open($(this).attr('href'), 'share-dialog', 'width=550,height=436');
	});


/*  ==========================================================================
    faqs
    ========================================================================== */

	$('.faq__question').click(function(){
		$(this).closest('.faq').toggleClass('faq--open');
	});


/*  ==========================================================================
    team
    ========================================================================== */

	$('.teammember__toggle').click(function(){
		$(this).closest('.teammember').toggleClass('teammember--open');
		$('body').toggleClass('teamoverlay');
	});

/*  ==========================================================================
    flexslides
    ========================================================================== */

	var $flexslides = $('.flexslides');

	if($flexslides.length > 0){
		flexslides__init();

  	}

	function flexslides__init(){
		$flexslides.each(function(){
			var $this = $(this);
			var $this_slidecount = $('.flexslide', $this).length
			if($this_slidecount > 1){
				$this.owlCarousel({
					loop: true,
				    nav: false,
				    dots: true,
					items: 1,
					startPosition: $this_slidecount,
					//autoplay: true,
					//autoplayTimeout: 5000,
					autoHeight: true
				}).waypoint({
					handler: function(direction) {
						if(direction == "down" && $this.data('alreadyscrolled') != "true"){
							$this.trigger('next.owl.carousel').data('alreadyscrolled', 'true');
						}
					 },
					 offset: '50%'
				});
			}
		});

		$flexslides.on('resized.owl.carousel',function(){
			$flexslides.trigger('next.owl.carousel');
		});

	} // flexslides__init()


/*  ==========================================================================
    mobnav
    ========================================================================== */

    var $mobnav = $('.mobnav');
    var $mobnavtoggle = $('.mobnav-toggle');
	var mobnavopenclass = 'mobnavopen';

    mobnav__init();

    function mobnav__init(){
        $mobnavtoggle.on("click touchend",function (e) {
	        e.preventDefault();
	        if ($mobnav.attr('data-status') != "open") {
	            // it's not open
	            $mobnav.attr('data-status', 'open');
				$('body').addClass(mobnavopenclass);
	        } else {
	            // it's open
	            $mobnav.attr('data-status', 'closed');
				$('body').removeClass(mobnavopenclass);
	        }
	    });

        $(window).resize(mobnav__resize);
    } // mobnav__init()

    function mobnav__resize() {
	    if ($mobnav.attr('data-status') == "open") {
	        $mobnav.attr('data-status', 'open');
	    }
	} // mobnav__resize()

/*  ==========================================================================
    schedule
    ========================================================================== */

    var $schedule = $('.schedule');
    var $scheduletoggle = $('.schedule-toggle');
	var scheduleopenclass = 'scheduleopen';

    schedule__init();

    function schedule__init(){
        $scheduletoggle.on("click touchend",function (e) {
	        e.preventDefault();
	        if ($schedule.attr('data-status') != "open") {
	            // it's not open
	            $schedule.attr('data-status', 'open');
				$('body').addClass(scheduleopenclass);
	        } else {
	            // it's open
	            $schedule.attr('data-status', 'closed');
				$('body').removeClass(scheduleopenclass);
	        }
	    });

        $(window).resize(schedule__resize);
    } // mobnav__init()

    function schedule__resize() {
	    if ($schedule.attr('data-status') == "open") {
	        $schedule.attr('data-status', 'open');
	    }
	} // mobnav__resize()



/*  ==========================================================================
    fancybox
    ========================================================================== */

	$('a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"], a[href$=".gif"]').fancybox({
		padding: '0',
		live: true,
		helpers: {
		    overlay: {
		      locked: false
		    }
		  }
	});

	$(document).ready(function() {
		$(".various").fancybox({
			maxWidth	: 800,
			maxHeight	: 600,
			fitToView	: false,
			width		: '70%',
			height		: '70%',
			autoSize	: false,
			closeClick	: false,
			openEffect	: 'none',
			closeEffect	: 'none'
		});
	});


/*  ==========================================================================
    effects
    ========================================================================== */

	var $effects = $('.effect');
	//var effectwaypoints = false;

	if($effects.length > 0){
		effects__init();
	}

	function effects__init(){
		$effects.each(function(){
			var $el = $(this);
			$el.waypoint({
				handler: function(direction) {
					if(direction == "down"){
						$el.addClass("effect--ready");
					}
				 },
				 offset: '90%'
			});
		});
	}// effects__init()


/*  ==========================================================================
    pageheader background
    ========================================================================== */

	// Fadein page header imagec
    $('.pageheader__img').bgLoaded({
          afterLoaded : function(){
          	$('body').addClass('pageheaderimg--loaded');
          }
    });

/*  ==========================================================================
    pageheader video background
    ========================================================================== */

	var videoisrunning = false;
	var videosetup = false;
	var touch = Modernizr.touch;
	var $videocontainer = $('.pageheader__video');

	if($videocontainer.length > 0) { pageheadervideo__init(); }

	function pageheadervideo__init(){
		if($videocontainer.length < 1){
			$('body').addClass('noyoutube');
			return false; }

		if(!touch && $videocontainer.length > 0){
			pageheadervideo__setup();
			$('body').addClass('has-videoheader');
		}else{
			$('body').addClass('novideo');
		}
	}// hpvideo__init()

	function pageheadervideo__setup(){
		$videocontainer.vide({
			mp4: $videocontainer.attr('data-video-mp4'),
			webm: $videocontainer.attr('data-video-webm'),
			ogv: $videocontainer.attr('data-video-ogv'),
			poster: $videocontainer.attr('data-video-poster')
		}, {
			muted: true,
			loop: true,
			autoplay: true,
			position: '50% 50%',
			resizing: true,
			posterType: "none"
		});

		var instance = $videocontainer.data('vide');
		var videoinstance = instance.getVideoObject();

		videoinstance.addEventListener('play', function(e) {
			$('body').addClass('has-videoheader--playing');
		}, true);

		videosetup = true;
		videoisrunning = true;
	} // pageheadervideo__setup()


/*  ==========================================================================
    popupsearch
    ========================================================================== */

	var $searchtoggle = $('.searchpopup-toggle');
    var searchtoggleopenclass = "popupsearch--open";
	var $searchform = $('.searchpopupform');
	var $searchinput = $('input[name="s"]', $searchform);
    search__init();

    function search__init(){
        $searchtoggle.on("click touchend",function (e) {
	        e.preventDefault();
	        if (! $('body').hasClass(searchtoggleopenclass)) {
	            // it's not open
				$('body').addClass(searchtoggleopenclass);
				if(! Modernizr.touch){ $searchinput.focus(); }
	        } else {
	            // it's open
				$('body').removeClass(searchtoggleopenclass);
	        }
	    });

		$('.searchsubmit').click(function(e){
			e.preventDefault();
			$searchform.submit();
		});

		$(document).keyup(function(e){
			if($('body').hasClass(searchtoggleopenclass)){
				if(e.keyCode == 27){
					$searchtoggle.first().click();
				}

				if(e.keyCode == 13){
					$searchform.submit();
				}
			}
		});
    } // search__init()


}); // Domready
