	var userLoc = {};
	var map;
	
	$(document).ready(function(){
	 	navigator.geolocation.getCurrentPosition(initLoc); //Initialise GeoLocation
		map = initMap();//Load the map now. We'll move it later.
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
	
	parse.csv("csv/caltex.csv", function(data){initialize(data, "images/marker_caltex.png")},[""]);	
	parse.csv("csv/shell.csv", function(data){initialize(data, "images/marker_shell.png")},[""]);
	parse.csv("csv/BP.csv", function(data){initialize(data, "images/marker_bp.png" )},[""]);
	parse.csv("csv/mobil.csv", function(data){initialize(data, "images/marker_711.png" )},[""]);
}
		

/**************************
 * Callback function for CSV parser
 *************************/
function initialize(petrol, markerImage) 
{

	var stations = [];
	for(var i = 0; i < petrol.length; i++)
	{
		current = petrol[i];
		//console.log(current["latitude"]);
		//if(distance(current["latitude"],current["longitude"]) < 20)
		//{
			stations.push(new google.maps.LatLng(current["latitude"], current["longitude"]));			
		//}
	}	

	google.maps.event.addListenerOnce(map, 'center_changed', function(){
			drop(stations, map, markerImage);
			});
	centerMap();	

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
