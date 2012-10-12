/**********************
  Function to calculate distance from current location from stackoverflow
TODO: Find actual SO question URL
**********************/

function distance(lat2, lon2)
{
	if (typeof(Number.prototype.toRad) === "undefined") {
		  Number.prototype.toRad = function() {
			      return this * Math.PI / 180;
			        }
	}

	lat2 = lat2 * 1;
	lon2 = lon2 * 1;
	
	var lat1 = userLoc["lat"];
	var lon1 = userLoc["long"];
	var R = 6371; // Radius of the earth in km
	var dLat = (lat2-lat1).toRad();  // Javascript functions in radians
	var dLon = (lon2-lon1).toRad(); 
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
			        Math.sin(dLon/2) * Math.sin(dLon/2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; // Distance in km
	return d;
}
function IsEmpty(input) {
        var strInput = input.toString().replace(" ", "");

        if (strInput == "") {
            return true;
        }
        else {
            return false;
        }
    }

function SelectDirTab()
{
	$("#dvServices").hide();
	$("#dvDirectionServices").show();
	document.querySelectorAll("#dvServicesTab")[0].className = "tab";
	document.querySelectorAll("#dvDirectionsTab")[0].className = "Selected";


}

function SelectServicesTab()
{
	$("#dvServices").show();
	$("#dvDirectionServices").hide();
	document.querySelectorAll("#dvServicesTab")[0].className = "Selected";
	document.querySelectorAll("#dvDirectionsTab")[0].className = "tab";	
}
