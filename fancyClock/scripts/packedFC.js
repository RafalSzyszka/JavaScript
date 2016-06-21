/*	I'm happy to introduce a FancyClock, project on which I've started my adventure with JavaScript */

/*	This module use ClockFace and Drawer module to draw a clock state at time, it's function was called */
var FancyClock = ( function() {
	var fancyClock = {};

	var context;

	/*	context is needed for Drawer	*/
	fancyClock.initFancyClock = function(cntxt) {
		context = cntxt;
		Drawer.init(context);	//INITIALIZING DRAWER, PASSING CONTEXT TO DRAWER INSTANCE
	}

	fancyClock.drawFancyBackground = function(bgRect, fCentre, fRadius, sCentre, sRadius, fColor, sColor) {
		//BACKGROUND'S GRADIENT
		var grd = context.createRadialGradient(fCentre.x, fCentre.y, fRadius,
											   sCentre.x, sCentre.y, sRadius);
		grd.addColorStop(0, fColor);
		grd.addColorStop(1, sColor);

		//CREATING THE BACKGROUND
		context.rect(0, 0, bgRect.width, bgRect.height);
		context.fillStyle = grd;
		context.fill();
	}

	/*	draws clock face 	*/
	fancyClock.drawFancyClockFace = function(radius, centre, lSize, sSize, diff) {
		//DRAWING CLOCK FACE
		ClockFace.initDrawer(context);	//INITIALIZE DRAWER JUST FOR SAFTY CAN BE SKIPPED HERE
		ClockFace.printClockFace(radius, centre, lSize, sSize, diff);	//PRINTS THE CLOCK FACE
	};

	fancyClock.drawFancyTime = function(tailStyle, centre, radius, diff, handStyle, handSize) {
		Drawer.setStrokeStyle(tailStyle.lineWidth, tailStyle.lineColor);
		//DRAWING HAND TAILS
		Drawer.drawArcPart(centre.x, centre.y, radius, Clock.getRealHours()*30, 12.5);				
		Drawer.drawArcPart(centre.x, centre.y, radius - diff, Clock.getRealMinutes()*6, 25);
		Drawer.drawArcPart(centre.x, centre.y, radius - 2*diff, Clock.getRealSeconds()*6, 50);
	
		//PRINTING, EASIER TO READ, TIME
		Drawer.printString("20px verdana bold", "#707070", Clock.getDay(), 145, 212);
		Drawer.printString("15px verdana", "#707070", Clock.getTime(), 145, 237);

		//DRAWING HANDS
		Drawer.setStrokeStyle(handStyle.lineWidth, handStyle.lineColor);
		Drawer.setFillStyle(handStyle.fillColor);
		Drawer.drawFilledCircle(Point.getPointOnArc(radius, -(Clock.getRealHours()*30 + 180),
		 		centre.x, centre.y), handSize);
		Drawer.drawFilledCircle(Point.getPointOnArc(radius - 20, -(Clock.getRealMinutes()*6 + 180),
		 		centre.x, centre.y), handSize);
		Drawer.drawFilledCircle(Point.getPointOnArc(radius - 40, -(Clock.getRealSeconds()*6 + 180),
		 		centre.x, centre.y), handSize);
	};

	return fancyClock;
}() );


/*	CLOCK FACE MODULE 	*/
var ClockFace = ( function() {
	var clockFace = {};

	clockFace.initDrawer = function(context) {
		Drawer.init(context);
	}

	/*	prints paths for hour, minute and second hand,
	*	and prints clock face 
	*	s 		- clocks centre
	*	lSize 	- full hour lines lenght
	*	sSize 	- minutes lines length
	*	diff 	- space between hands paths
	*/
	clockFace.printClockFace = function(radius, s, lSize, sSize, diff, lStyle, sStyle, pStyle) {
		var angle = 0;		
		for(i = 0; i < 60; i++) {
			if( i % 5 === 0 ) {	//full hours lines
				Drawer.setStrokeStyle(3, "#6f6f6f");

				Drawer.drawLine(Point.getPointOnArc(radius + lSize, angle, s.x, s.y),
								Point.getPointOnArc(radius - lSize, angle, s.x, s.y));
				angle += 6;
			} else {		//minutes lines
				Drawer.setStrokeStyle(2, "#6f6f6f");

				Drawer.drawLine(Point.getPointOnArc(radius + sSize, angle, s.x, s.y),
								Point.getPointOnArc(radius - sSize, angle, s.x, s.y));
				angle += 6;
			}
			if( i < 3 ) {	//paths
				Drawer.setStrokeStyle(2, "#0f0f0f");
				Drawer.drawArc(s.x, s.y, 
					radius - (i*diff),	//space between each path
					359.999, 0);
			}
		}
	};

	return clockFace;

}());


/*	POINT MODULE 	*/
var Point = ( function() {
	var point = {};
	
	/*	finds point's cors on arc
	*	radius 	- arc radius
	*	angle 	- arc's angle
	*	corX/Y 	- centre point	*/
	point.getPointOnArc = function(radius, angle, corX, corY) {
		return {x : radius * Math.sin(angle * (Math.PI / 180)) + corX,
				y : radius * Math.cos(angle * (Math.PI / 180)) + corY};
	}

	return point;

}());


/*	DRAWER MODULE 	*/
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


/*	CLOCK MODULE 	*/
var Clock = (function () {
	var clock = {};

	/*	'Static' functions return only full hours, minutes or seconds
	*	the 'Real' returns exact */
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