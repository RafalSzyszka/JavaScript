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

