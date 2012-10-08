<<<<<<< HEAD
(function(){
 	parse.csv("BP.CSV", function(data){petrolLocations(data)}, ["nsw"]);
})();

function petrolLocations(petrol)
{
	console.log(petrol);
	var holder = document.createElement("div");
	holder.innerHTML = 'Locations of all caltex stores in australia:<br/><table id="list"><tr><th>store ID</th><th>Store Name</th><th>State</th><th>Street Address</th><th>Lat</th><th>Long</th></tr>';
	document.body.appendChild(holder);
	var list = document.getElementById("list");
	for(var i = 0; i < petrol.length; i++)
	{
		current = petrol[i];
		var row = document.createElement('tr');
		row.innerHTML = '<td>'+i+'</td><td>'+current["name"] + " " + current["town"] + "</td><td>" + current["state"]+ "</td><td>" + current["street"] + "</td>";
		list.appendChild(row);
	}
}
=======
	var markers = [];
	var stations = [];
	var iterator = 0;
	var map;
	
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
	//console.log("petrol " + petrol);
	
	for(var i = 0; i < petrol.length; i++)
	{
		current = petrol[i];
		console.log(current["latitude"]);
		stations.push(new google.maps.LatLng(current["latitude"], current["longitude"]));			
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

>>>>>>> Added gmaps, retailer markers
