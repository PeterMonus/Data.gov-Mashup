/****************
 * Initialise the map with the global user location coordinates
 * TODO: Load the map seperately, move to user location on Geolocation accept
 ****************/
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

/*****************
 * Drop the markers, return an array of them for use later.
 ****************/

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
