var Clock = (function () {
	var clock = {};

	clock.getStaticHours = function() {
		return new Date().getHours();
	};

	clock.getStaticMinutes = function() {
		return new Date().getMinutes();
	};

	clock.getStaticSeconds = function() {
		return new Date().getSeconds();
	};

	clock.getRealHours = function() {
		var date = new Date();
		var rHour = date.getHours() + ((date.getMinutes()/100) * (5/3)) + ((date.getSeconds()/10000) * (5/3));
		return ( rHour < 12 ) ? rHour : rHour - 12;
	};

	clock.getRealMinutes = function() {
		return new Date().getMinutes() + ((new Date().getSeconds()/100) * (5/3));
	};

	clock.getRealSeconds = function() {
		return new Date().getSeconds() + new Date().getMilliseconds()/1000;
	};

	clock.getDay = function() {
		return new Date().toDateString();
	};

	clock.getTime = function() {
		return new Date().toLocaleTimeString();
	};

	return clock;

}());