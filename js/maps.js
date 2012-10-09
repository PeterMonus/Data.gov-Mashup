function initMap()
{
	var mapOptions = 
	{
		center: new google.maps.LatLng(userLoc["lat"], userLoc["long"]),
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	return new google.maps.Map(document.getElementById("map_canvas"),
	mapOptions);
}

function drop(stations, map, image) {
	var markers = [];
	for (var i = 0; i < stations.length; i++) {
		markers.push(new google.maps.Marker({
			position: stations[i],
			map: map,
			draggable: false,
			icon: image,
			animation: google.maps.Animation.DROP
		}));
	}
	return markers;
}
