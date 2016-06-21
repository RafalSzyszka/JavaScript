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