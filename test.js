	var markers = [];
	var content = [];
	var map;
	var userLoc = {};
	(function(){navigator.geolocation.getCurrentPosition(initLoc);})();
    var image = "";
	
function initLoc(position){
	userLoc["lat"] = position.coords.latitude;
	userLoc["long"] = position.coords.longitude;
 	parse.csv("CaltexSites_AU.CSV", function(data){initialize(data)},[""]);
}
		
function initialize(petrol) 
{
	var mapOptions = 
	{
		center: new google.maps.LatLng(userLoc["lat"], userLoc["long"]),
		zoom: 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map_canvas"),
	mapOptions);
	
	var stations = [];
	for(var i = 0; i < petrol.length; i++)
	{
		current = petrol[i];
		//console.log(current["latitude"]);
		if(distance(current["latitude"],current["longitude"]) < 20)
		{
		stations.push(new google.maps.LatLng(current["latitude"], current["longitude"]));			
		}
	}
	
	image = "images/marker_caltex.png";
	
		google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
			drop(stations);
		});

}

