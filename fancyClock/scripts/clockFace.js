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