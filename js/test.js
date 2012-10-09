	var userLoc = {};
	(function(){navigator.geolocation.getCurrentPosition(initLoc);})();
	
function initLoc(position){
	userLoc["lat"] = position.coords.latitude;
	userLoc["long"] = position.coords.longitude;
 	parse.csv("csv/caltex.csv", function(data){initialize(data)},[""]);
}
		
function initialize(petrol) 
{
	var map = initMap();	

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

	var caltex = "images/marker_caltex.png";

	google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
			drop(stations, map, caltex);
			});
}
