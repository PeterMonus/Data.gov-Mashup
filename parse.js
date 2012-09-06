var parser = function(){this.types=["csv"]};
parser.prototype.csv = function(csvName, callback)
{	
	$.get(csvName, function(data) {dat = parsecsv(data); callback(dat)}, "text");
}
parsecsv = function(data){
	var dat = [];
	var blobLines = data.split('\r\n');
	var headers = blobLines[0].toLowerCase().split(',');
	for(var i = 1; i < blobLines.length; i++)
	{
		var lineArr = blobLines[i].split(',');
		var line = {};
		if(lineArr.length === headers.length)
		{
			for(var l = 0; l < lineArr.length; l++)
			{
				line[headers[l]] = lineArr[l];
			}
			dat[i - 1] = line;
		}
	}
	return dat;
}
