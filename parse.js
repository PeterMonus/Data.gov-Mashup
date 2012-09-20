var parser = function(){this.types=["csv"];};
parser.prototype.csv = function(csvName, callback)
{	
	$.get(csvName, function(data) {dat = parsecsv(data); callback(dat)}, "text");
}
parsecsv = function(data){
	var dat = [];
	data = data.replace(/\n/g, "");
	var lines = data.split("\r");
	var headers = lines[0].toLowerCase().split(',');
	for(var i = 1; i < lines.length; i++)
	{
		var lineArr = lines[i].split(',');
		var line = {};
		if(lineArr.length > 1)
		{
			for(var l = 0; l < lineArr.length; l++)
			{
				line[headers[l]] = (lineArr[l].length > 0) ? lineArr[l] : " ";
			}
			dat[i - 1] = line;
		}
	}
	return dat;
}

var parse = new parser();
