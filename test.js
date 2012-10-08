	var markers = [];
	var stations = [];
	var iterator = 0;
	var map;
	var userLoc = {};
	(function(){navigator.geolocation.getCurrentPosition(initLoc);})();
	
function initLoc(position){
	userLoc["lat"] = position.coords.latitude;
	userLoc["long"] = position.coords.longitude;
 	parse.csv("CaltexSites_AU.CSV", function(data){initialize(data)},[""]);
}
		
function initialize(petrol) 
{
		console.log(userLoc);
	var mapOptions = 
	{
		center: new google.maps.LatLng(userLoc["lat"], userLoc["long"]),
		zoom: 9,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map_canvas"),
	mapOptions);
	
	for(var i = 0; i < petrol.length; i++)
	{
		current = petrol[i];
		//console.log(current["latitude"]);
		if(distance(current["latitude"],current["longitude"]) < 100)
		{
		stations.push(new google.maps.LatLng(current["latitude"], current["longitude"]));			
		}
	}
	drop();
}

function drop() {
	for (var i = 0; i < stations.length; i++) {
		addMarker();		
	}
}

var image = "images/marker_caltex.png";

function addMarker() {
	markers.push(new google.maps.Marker({
		position: stations[iterator],
		map: map,
		draggable: false,
		icon: image
		//animation: google.maps.Animation.DROP
	}));
	iterator++;
}

function distance(lat2, lon2)
{
	if (typeof(Number.prototype.toRad) === "undefined") {
		  Number.prototype.toRad = function() {
			      return this * Math.PI / 180;
			        }
	}

	lat2 = lat2 * 1;
	lon2 = lon2 * 1;
	
	var lat1 = userLoc["lat"];
	var lon1 = userLoc["long"];
	var R = 6371; // Radius of the earth in km
	var dLat = (lat2-lat1).toRad();  // Javascript functions in radians
	var dLon = (lon2-lon1).toRad(); 
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
			        Math.sin(dLon/2) * Math.sin(dLon/2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; // Distance in km
	return d;
}
