
(function(){
 	parse.csv("BP.CSV", function(data){petrolLocations(data)}, ["nsw"]);
})();

	var markers = [];
	var stations = [];
	var content = [];
	var iterator = 0;
	var map;
    var image = "";
	
(function(){
 	parse.csv("CaltexSites_AU.CSV", function(data){initialize(data)},[""]);
})();
		
function initialize(petrol) 
{
	var mapOptions = 
	{
		center: new google.maps.LatLng(-23.7000, 133.8700),
		zoom: 5,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map_canvas"),
	mapOptions);
	
	for(var i = 0; i < petrol.length; i++)
	{
		current = petrol[i];
		stations.push(new google.maps.LatLng(current["latitude"], current["longitude"]));
	}
	
	image = "images/marker_caltex.png";
	drop();
}

function drop() {
	for (var i = 0; i < stations.length; i++) {
		addMarker();		
	}
}

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