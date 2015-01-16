var temp;
var full;
// CarouFredSel: a circular, responsive jQuery carousel.
$(window).load(function () {
	
	var aniConf = {
		queue: false,
		duration: 300
	};
	$("#carousel-list").carouFredSel({
		items : {
			visible : 5,
			width: "variable",
		},
		onCreate : function(data) {
			var visibleItems = data.items;
			
			var centerItem = visibleItems[2];
			$(centerItem).addClass('active-item');
			/*
			var normalHeight = $('.active-item').height();
			//var normalMargin = 650 - normalHeight;
			visibleItems.each( function() {
				$(this).css({height: normalHeight+'px'});
			});*/
			$(centerItem).css({width:'450px', height: '550px', marginTop: '50px'});
			temp = $(centerItem).html();
			
			$(centerItem).empty();
			var newContent = $('.full-display').removeClass('hide');
			newContent.appendTo($(centerItem));
			/*$(centerItem).replaceWith(function() {
				return $('.full-display').removeClass('hide').hide().fadeIn();
			});*/
			$("#carousel-list").trigger("updateSizes");
		},
		scroll : {
			items : 1,
			onBefore : function(data) {
				var direction = data.scroll.direction;
				/*direction=next? prev? */
				//var normalHeight = $('.active-item').next().height()+'px';
				full = $('.full-display');
				$('.active-item').empty();
				$(temp).appendTo($('.active-item'));
				
				$('.active-item').animate({width:'150px', height: '348px', marginTop: '150px'}, aniConf);
				
				if (direction == "prev") {
					var nextCenter = $('.active-item').prev();
				} else if (direction == "next") {
					var nextCenter = $('.active-item').next();
				}
				
				$('.active-item').removeClass('active-item');
				$(nextCenter).addClass('active-item');
				
				temp = $('.active-item').html();
				/*
				aniConf.step = function(now, fx) {
					if (now == 50) {
						$('.active-item').empty();
						$(full).removeClass('hide').hide().fadeIn().appendTo($('.active-item'));
					}
				}
				*/
				//aniConf.complete = function() {
				$('.active-item').empty();
				$(full).removeClass('hide').hide().fadeIn().appendTo($('.active-item'));
				//};
				$('.active-item').animate({width:'450px', height: '550px', marginTop: '50px'}, aniConf);
				$(document).foundationAccordion();
				$("#carousel-list").trigger("updateSizes");
			}
		},
		align: "center",
		width: "variable",
		auto: false,
		next : {
			button : "#carousel-next-btn",
			key : "right"
		},
		prev : {
			button : "#carousel-prev-button",
			key : "left"
		}	
		//responsive : true,
	});

});
