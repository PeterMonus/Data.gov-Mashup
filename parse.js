var parser = function(){this.types=["csv"];};
parser.prototype.csv = function(csvName, callback, filter)
{	
	var fReg;
	console.log(filter);
	if(!filter)
	{
		fReg = new RegExp("");
	} else {
		var fs = "";
		console.log(fs);
		for(var f = 0; f < filter.length; f++)
		{
			console.log(filter[f]);
			if(f < filter.length - 1)
			{
				fs += filter[f] + ",|";
			}
			else { fs += filter[f] + ",";
			}
		}
		fReg = new RegExp(fs, "i");
	}

	$.get(csvName, function(data) {dat = parsecsv(data, fReg, callback);}, "text");
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


var parse = new parser();
