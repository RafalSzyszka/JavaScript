var Point = ( function() {
	var point = {};
	
	/*	public section	*/

	point.getXOnArc = function(radius, degree, centre) {
		return radius * Math.sin(degree * (Math.PI / 180)) + centre;
	}

	point.getYOnArc = function(radius, degree, centre) {
		return radius * Math.cos(degree * (Math.PI / 180)) + centre;
	}

	return point;

}());