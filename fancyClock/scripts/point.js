var Point = ( function() {
	var point = {};
	
	/*	public section	*/
	point.getPointOnArc = function(radius, degree, corX, corY) {
		return {x : radius * Math.sin(degree * (Math.PI / 180)) + corX,
				y : radius * Math.cos(degree * (Math.PI / 180)) + corY};
	}

	return point;

}());