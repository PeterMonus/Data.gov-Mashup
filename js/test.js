	var userLoc = {};
	$(document).ready(function(){
	 	navigator.geolocation.getCurrentPosition(initLoc);
		$(".tab").each(function(){
			$(this).click(function(){
				selectTab(this);
				});
			});
	 });
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

function selectTab(elem)
{
	if($(elem).hasClass("Selected"))
	{
		$("#" + $(elem).data("show")).slideUp();
		$(elem).removeClass("Selected");
	} else {
		console.log(elem);
		$(elem).addClass("Selected");
		$("#" + $(elem).data("hide")).slideUp();
		$("#" + $(elem).data("show")).slideDown();
		$("#" + $(elem).data("hide") + "Tab").removeClass("Selected");
	}
}

function clickSearch()
{
		$("#dvServices").slideUp();
		document.querySelectorAll("#dvServicesTab")[0].className = "tab";
}
