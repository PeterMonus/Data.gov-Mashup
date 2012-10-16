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

function SelectDirTab()
{
	if(document.querySelectorAll("#dvDirectionsTab")[0].className.indexOf("Selected") == -1)
	{
	$("#dvServices").slideUp();
	$("#dvDirectionServices").slideDown();
	document.querySelectorAll("#dvServicesTab")[0].className = "tab";
	document.querySelectorAll("#dvDirectionsTab")[0].className = "tab Selected";
	} else {
		$("#dvDirectionServices").slideUp();
		document.querySelectorAll("#dvDirectionsTab")[0].className = "tab";
	}

}

function SelectServicesTab()
{
	if(document.querySelectorAll("#dvServicesTab")[0].className.indexOf("Selected") == -1)
	{
	$("#dvServices").slideDown();
	$("#dvDirectionServices").slideUp();
	document.querySelectorAll("#dvServicesTab")[0].className = "tab Selected";
	document.querySelectorAll("#dvDirectionsTab")[0].className = "tab";	
	} else { clickSearch() }


}

function clickSearch()
{
		$("#dvServices").slideUp();
		document.querySelectorAll("#dvServicesTab")[0].className = "tab";
}
