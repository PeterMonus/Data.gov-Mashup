	var userLoc = {};
	$(document).ready(function(){
	 	navigator.geolocation.getCurrentPosition(initLoc); //Initialise GeoLocation

		/********************
		 * The following code initiallises tab click for *all* tabs
		 * Even ones we might add later.
		 ********************/
		$(".tab").each(function(){
			$(this).click(function(){
				selectTab(this);
				});
			});

		/****************
		 * Initialise search button click
		 ***************/
		$("#search").click(function(){
			clickSearch();
			});
	 });

/**************************
 * Callback function for loaded geolocation position
 **************************/
function initLoc(position){
	userLoc["lat"] = position.coords.latitude;
	userLoc["long"] = position.coords.longitude;
 	parse.csv("csv/caltex.csv", function(data){initialize(data)},[""]);
}
		

/**************************
 * Callback function for CSV parser
 * TODO: Split out maps stuff to let the map load seperately.
 *************************/
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

/*********************
 * Shiny Tab Clicking Panel Sliding...stuff.
 *******************/
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

/********************
 * Search button click.
 * TODO: Add actual search logic
 ********************/
function clickSearch()
{
		$("#dvServices").slideUp();
		document.querySelectorAll("#dvServicesTab")[0].className = "tab";
}
