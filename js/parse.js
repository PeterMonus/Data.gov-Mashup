/****************
 * Parser constructor. OOPJS ALL UP IN THIS THING!
 * TODO: Make the base constructor actually do something useful?
 ***************/
var parser = function(){this.types = ["csv"];};

/****************
 * Add function to the parser object to parse CSV.
 * Takes the name and a callback function, plus an optional filter
 * Callback function gets the data from the CSV names, filter filters stuff.
 * TODO: Filters are functions for super filtery goodness?
 ****************/
parser.prototype.csv = function(csvName, callback, filter)
{	
	$.get(csvName, function(data) {dat = parsecsv(data, regex(filter), callback);}, "text");
}

/************************
 * The ACTUAL parser, splits stuff up, makes things super easy to use.
 * Returns an array of objects, so we can iterate through easily and get the data we need.
 ************************/

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

/*******************
 * turns the filter array into a handy dandy regexp for ease of use
 ******************/

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

var parse = new parser();//Create a global parse object so we can call parse.csv()
