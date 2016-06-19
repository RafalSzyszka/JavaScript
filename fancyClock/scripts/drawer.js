var Drawer = (function() {
	var drawer = {};	//object to be returned

	/* 	private function
	* 	converts degrees to radians
	*/
	function degToRad(degree) {
		var factor = Math.PI / 180;
		return degree * factor;
	}

	/*	public function
	*	sets style for drawing arcs
	*/
	drawer.setArcDrawingStyle = function(lineWidth, strokeStyle, context) {
		context.lineWidth = lineWidth;
		context.strokeStyle = strokeStyle;
	}

	/*	public function
	*	draws a part of a circle as long as 'time'
	*	x, y	-	coordinates of arc centre
	*	r 		-	radius
	*	time 	-	elapsed time
	*	context - 	object of html canvas
	*/
	drawer.drawTime = function(x, y, r, time, context) {
		context.beginPath();
		context.arc(x, y, r, degToRad(270), degToRad(time - 90), false);
		context.stroke();
	}

	/*	public function
	*	prints given strings on given location
	*	font	-	font type
	*	filling - 	font color
	*	text 	-	text to be printed
	*	x, y	-	coordinates
	*	context -	object of html canvas
	*/
	drawer.printString = function(font, filling, text, x, y, context) {
		context.font = font;
		context.fillStyle = filling;
		context.fillText(text, x, y);
	}

	return drawer;

}());