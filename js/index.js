$(function () {
	// new WOW().init();
	window.onresize = function () {
		var bigW = $(window).width();
		if (bigW < 1440) {
			$(".indexTop").css("background-size", "auto 100%");
			$(".indexTwo").css("background-size", "auto 100%");
			$(".indexThree").css("background-size", "auto 100%");
		}
		if (bigW > 1440) {
			$(".indexTop").css("background-size", "100% auto");
			$(".indexTwo").css("background-size", "100% auto");
			$(".indexThree").css("background-size", "100% auto");
		}
	}
})
