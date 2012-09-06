(function(){
 	var p = new parser();
	var dat = p.csv("Location of European Wasps Nests.csv", processData);
})();

function processData(data)
{
	for(var i = 0; i < data.length; i++)
	{
		if((data[i])["year"] === "2011")
			console.log("There were " + (data[i])["number of nests"] + " nests found in " + (data[i])["suburb"]);
	}
}
