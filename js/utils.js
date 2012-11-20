/**********************
* Function to calculate distance from current location from stackoverflow
* See answer http://stackoverflow.com/a/27943/453554 for more information.
**********************/
function distance(lat2, lon2)
{
  if (typeof(Number.prototype.toRad) === 'undefined') {
    Number.prototype.toRad = function() {
      return this * Math.PI / 180;
    };
  }

  lat2 = lat2 * 1;
  lon2 = lon2 * 1;

  var lat1 = userLoc['lat'];
  var lon1 = userLoc['long'];
  var R = 6371; // Radius of the earth in km
  var dLat = (lat2 - lat1).toRad();
  var dLon = (lon2 - lon1).toRad();
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

/**************************
 * Calculates how far one point is from another
 * Source: http://www.360doc.com/content/10/0906/20/1344893_51690957.shtml
 **************************/
function DistanceBetweenTwoPoints(lat1, lon1, lat2, lon2) {
    if (typeof (Number.prototype.toRad) === "undefined") {
        Number.prototype.toRad = function () {
            return this * Math.PI / 180;
        }
    }

    lat2 = lat2 * 1;
    lon2 = lon2 * 1;
    var R = 6371; // Radius of the earth in km
    var dLat = (lat2 - lat1).toRad();
    var dLon = (lon2 - lon1).toRad();
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
			        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; //
    return d;
}
