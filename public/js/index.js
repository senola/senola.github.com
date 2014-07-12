
setTimeout(function() {
	$('li').each(function(e) {
	    $(this).delay(500*e).fadeIn(500);
	});
}, 1000);


/*
Adapted from http://tympanus.net/codrops/2011/10/19/blur-menu-with-css3-transitions/
*/