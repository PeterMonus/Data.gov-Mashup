var parser = function(){this.types = ["csv"];};
parser.prototype.csv = function(csvName, callback, filter)
{	
	$.get(csvName, function(data) {dat = parsecsv(data, regex(filter), callback);}, "text");
}
parsecsv = function(data, filter, callBack){
	var dat = [];
	data = data.replace(/\n/g, "");
	var lines = data.split("\r");
	var headers = lines[0].toLowerCase().split(',');
	for(var i = 1; i < lines.length; i++)
	{
		if(filter.test(lines[i]))
		{
			var lineArr = lines[i].split(',');
			var line = {};
			if(lineArr.length > 1)
			{
				for(var l = 0; l < lineArr.length; l++)
				{
					line[headers[l]] = (lineArr[l].length > 0) ? lineArr[l] : " ";
				}
				dat.push(line);
			}
		}
	}
	callBack(dat);
}


function regex(filter)
{
	if(!filter)
	{
		return new RegExp("");
	} else {
		var fs = "";
		for(var f = 0; f < filter.length; f++)
		{
				fs += filter[f] + ",|";
		}
		return new RegExp(fs.substring(0, fs.length -1), "i");
	}
}

var parse = new parser();
