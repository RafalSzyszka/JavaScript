var Drawer = (function() {
	var drawer = {};	//object to be returned

	var context

	/* 	private function
	* 	converts degrees to radians
	*/
	function degToRad(degree) {
		return degree * (Math.PI / 180);
	}

	/*	"Constructor"	*/
	drawer.init = function(cntxt) {
		context = cntxt;
	}

	/*	public function
	*	sets style for drawing arcs
	*/
	drawer.setStrokeStyle = function(lineWidth, strokeStyle) {
		context.lineWidth = lineWidth;
		context.strokeStyle = strokeStyle;
	};

	/*	public function
	*	sets style for filling
	*/
	drawer.setFillStyle = function(fillStyle) {
		context.fillStyle = fillStyle;
	}

	/*	public function
	*	draws a part of a circle, starts at top and ends at 'end'
	*	x, y	-	coordinates of arc centre
	*	r 		-	radius
	*	time 	-	elapsed time
	*	context - 	object of html canvas
	*/
	drawer.drawArcPart = function(x, y, r, end, tail) {
		context.beginPath();
		context.arc(x, y, r, degToRad(end - 90 - tail), degToRad(end - 90), false);
		context.stroke();
	};

	drawer.drawArc = function(x, y, r, end) {
		context.beginPath();
		context.arc(x, y, r, degToRad(270), degToRad(end - 90), false);
		context.stroke();
	};

	/*	public function
	*	prints given strings on given location
	*	font	-	font type
	*	filling - 	font color
	*	text 	-	text to be printed
	*	x, y	-	coordinates
	*	context -	object of html canvas
	*/
	drawer.printString = function(font, filling, text, x, y) {
		context.font = font;
		context.fillStyle = filling;
		context.fillText(text, x, y);
	};

	/*	public function
	*	draw a straight line
	*/
	drawer.drawLine = function(begin, end) {
		context.beginPath();
		context.moveTo(begin.x, begin.y);
		context.lineTo(end.x, end.y);
		context.stroke();
	};

	/*	public function
	*	draws a filled circle
	*/
	drawer.drawFilledCircle = function(s, r) {
		context.beginPath();
		context.arc(s.x, s.y, r, 0, Math.PI * 2, false);
		context.fill();
		context.stroke();
	};

	return drawer;

}());