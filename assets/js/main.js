$(document).ready(function() {

	// Load shots
	$.jribbble.setToken('3a1add5ac3f184a28a43b384fe2b67b7471d740f43bee3ae7330e5f2ba2f742b');
	// edit username
	$.jribbble.users('andrewtang').shots({ per_page: 36 }).then(function(data) {
		$('.loading').remove();
		var output = [];

		$.each(data, function(i, shot) {
		console.log(shot);
			output.push('<div class="folio__item"><a href="' + shot.html_url + '" target="_blank"><img src="' + shot.images.teaser + '" alt="' + shot.title + '"><span>View on Dribbble</span></a></div>');
		});
		$('.folio').append(output.join(''));
	});

	// Sticky sidebar
	var sticky = function() {
		var top = 1;
		$(window).scroll(function (event) {
			// what the y position of the scroll is
			var y = $(this).scrollTop();
			var width = $('.sidebar__content').width() + 'px';

			// whether that's below the form
			if (y >= top) {
				// if so, ad the fixed class
				$('.sidebar__content').addClass('fixed').css({ width: width });
			} else {
				// otherwise remove it
				$('.sidebar__content').removeClass('fixed').css({ width: 'auto' });
			}
		});
	};
	if($(window).width() > 768) sticky();

});
