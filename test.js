var wasps;
var schools;
var play;
(function(){

 	parse.csv("Location of European Wasps Nests.csv", function(data){ wasps = data});
 	parse.csv("ACT - PLAYGROUNDS - V_NM_PLGR_IAMS15092009.csv", function(data){play = data});
	parse.csv("schools.csv", function(data){schools = data; processData();});
	
	
 })();

function processData()
{
      console.log(wasps);
	var mostWasps = wasps[2]
		for(var i = 3; i < wasps.length; i++)
		{
			if((wasps[i]))
			{
				if((wasps[i])["suburb"].toLowerCase() != "total")
				{
					if(parseInt((wasps[i])["number of nests"]) > parseInt(mostWasps["number of nests"]))
						mostWasps = wasps[i];
				}
			}
		}
	var waspSchool = [];
	for(var i = 0; i < schools.length; i++)
	{
		if((schools[i])["l_addr_2"].toLowerCase() === mostWasps["suburb"].toLowerCase())
		{
				waspSchool[waspSchool.length] = schools[i];
		}
	}

	var holder = document.createElement("div");
	holder.innerHTML = 'The following schools (located in ' + mostWasps["suburb"] + ') were near the highest number of wasp nests in ' + mostWasps["year"] + ':<br/><ul id="list">'
		document.body.appendChild(holder);
	var list = document.getElementById('list');
	for(var i = 0; i < waspSchool.length; i++)
	{
		var ul = document.createElement("li");
		ul.innerHTML = (waspSchool[i])["cmps_name"];
		list.appendChild(ul);
	}


	var playCounts = {};
	var mostPlayCount = 0;
	var mostPlay;
	for(var i = 0; i < play.length; i++)
	{
		if(playCounts[(play[i])["contract_unit"]])
		{
			playCounts[(play[i])["contract_unit"]] += 1;
			if(playCounts[(play[i])["contract_unit"]] > mostPlayCount)
			{
				mostPlay = play[i];
				mostPlayCount = playCounts[(play[i])["contract_unit"]];
			}
		} else{ playCounts[(play[i])["contract_unit"]] = 1; }
	}
	
	var holder2 = document.createElement('div');
	holder2.innerHTML ="The suburb with the most playgrounds is " + mostPlay["contract_unit"];
	document.body.appendChild(holder2);
}
