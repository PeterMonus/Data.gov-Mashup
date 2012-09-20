(function(){
 	parse.csv("CaltexSites_AU.CSV", function(data){petrolLocations(data)});	
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
		row.innerHTML = '<td>'+i+'</td><td>'+current["brand"] + " " + current["suburb"] + "</td><td>" + current["address"]+ "</td><td>" + current["state"] + "</td><td>" + current["latitude"] +"</td><td>" + current["longitude"] + "</td>";
		list.appendChild(row);
	}
}
