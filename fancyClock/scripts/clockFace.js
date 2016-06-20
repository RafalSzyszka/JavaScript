var ClockFace = ( function() {
	var clockFace = {};

	clockFace.initDrawer = function(context) {
		Drawer.init(context);
	}

	clockFace.printClockFace = function(radius, s, lSize, sSize, diff) {
		var degree = 0;
		for(i = 0; i < 60; i++) {
			if( i % 5 === 0 ) {
				Drawer.setStrokeStyle(3, "#6f6f6f");

				Drawer.drawLine(Point.getPointOnArc(radius + lSize, degree, s.x, s.y),
								Point.getPointOnArc(radius - lSize, degree, s.x, s.y));
				degree += 6;
			} else {
				Drawer.setStrokeStyle(2, "#6f6f6f");

				Drawer.drawLine(Point.getPointOnArc(radius + sSize, degree, s.x, s.y),
								Point.getPointOnArc(radius - sSize, degree, s.x, s.y));
				degree += 6;
			}
			if( i < 3 ) {
				Drawer.setStrokeStyle(2, "#0f0f0f");
				Drawer.drawArc(s.x, s.y, 
					radius - (i*20),
					359.999, 0);
			}
		}
	};

	return clockFace;

}());