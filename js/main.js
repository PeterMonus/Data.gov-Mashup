var userLoc = {};
var pins;
var map;

var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();	

$(document).ready(function() {	
    navigator.geolocation.getCurrentPosition(initLoc); //Initialise GeoLocation	
    map = initMap();//Load the map now. We'll move it later.

    /********************
     * The following code initiallises tab click for *all* tabs
     * Even ones we might add later.
     ********************/
    $('.tab').each(function() {
      $(this).click(function(e) {
        selectTab(this);
        });
      $(this).keydown(function(e) { 
        if(e.which == 13 || e.which == 32)
        {
          selectTab(this);
        }
        
        }
        )
      });

    /****************
     * Initialise search button click
     ***************/
	$('#servicesSearch').click(function() {
		clickSearch();
		$('#dvServicesTab').click();
	});
	  
	$('#directionsSearch').click(function() {
		clickSearch();
		$('#dvDirectionsTab').click();
	});

    $('.comp').each(
        function() {
        $(this).click(
          function() {
          if (!($(this).is('#chkAllCompanies')) && $('#chkAllCompanies').is(':checked'))
          {
          $('#chkAllCompanies').prop('checked', '');
          }
          });
        });

    $('#chkAllCompanies').click(
        function() {
        if (!($(this).is(':checked')))
        {
        $('.comp').each(function() {$(this).prop('checked', 'on');});
        } else {

        $('.comp').each(function() {$(this).prop('checked', '');});
        }
        });


    $('.fuel').each(
        function() {
        $(this).click(
          function() {
          if (!($(this).is('#chkAllFuel')) && $('#chkAllFuel').is(':checked'))
          {
          $('#chkAllFuel').prop('checked', '');
          }
          });
        });

    $('#chkAllFuel').click(
        function() {
        if (!($(this).is(':checked')))
        {
        $('.fuel').each(function() {$(this).prop('checked', 'on');});
        } else {

        $('.fuel').each(function() {$(this).prop('checked', '');});
        }
        });


    $('.service').each(
        function() {
        $(this).click(
          function() {
          if (!($(this).is('#chkAllService')) && $('#chkAllService').is(':checked'))
          {
          $('#chkAllService').prop('checked', '');
          }
          });
        });

    $('#chkAllService').click(
        function() {
        if (!($(this).is(':checked')))
        {
        $('.service').each(function() {$(this).prop('checked', 'on');});
        } else {

        $('.service').each(function() {$(this).prop('checked', '');});
        }
        });

});

/**************************
 * Callback function for loaded geolocation position
 **************************/
function initLoc(position) {
  userLoc['lat'] = position.coords.latitude;
  userLoc['long'] = position.coords.longitude;
  initCSV();
}

/**************************
 * Loads in all the CSV files of companies that are checked
 **************************/
function initCSV()
{
  var all = $('#chkAllCompanies').is(':checked');
  var caltex = $('#chkCaltex').is(':checked');
  var shell = $('#chkShell').is(':checked');
  var BP = $('#chkBP').is(':checked');
  var mobil = $('#chkMobil').is(':checked');

  var filter = {};

  if (!$('#chkAllFuel').is(':checked'))
  {
    $('.fuel').each(function() {
        console.log($(this).prop('name'));
        if ($(this).is(':checked'))
        {
        filter[$(this).prop('name').toLowerCase()] = true;
        }
        });
  }

  if (!$('#chkService').is(':checked'))
  {
    $('.service').each(function() {
        console.log($(this).prop('name'));
        if ($(this).is(':checked'))
        {
        filter[$(this).prop('name').toLowerCase()] = true;
        }
        });
  }
  if (all || caltex) parse.csv('csv/caltex.csv',
      function(data) {initialize(data, 'images/marker_caltex.png')},
      filter);
  if (all || shell) parse.csv('csv/shell.csv',
      function(data) {initialize(data, 'images/marker_shell.png')},
      filter);
  if (all || BP) parse.csv('csv/BP.csv',
      function(data) {initialize(data, 'images/marker_bp.png')},
      filter);
  if (all || mobil) parse.csv('csv/mobil.csv',
      function(data) {initialize(data, 'images/marker_711.png')},
      filter);
}


/**************************
 * Callback function for CSV parser
 *************************/
function initialize(petrol, markerImage) 
{
    var stations = [];
    var IsDirectionSearch = false;
    console.log($("#txtSearchFrom").val());
    if (($("#txtSearchFrom").val()).length > 0 && ($("#txtSearchTo").val().length > 0)) {
        IsDirectionSearch = true;
    }


	/**************************
	 * If not doing a directions search:
	 * This will add to the map all the petrol stations within 10 kilometres
	 **************************/

    if (IsDirectionSearch == false) {
        for (var i = 0; i < petrol.length; i++) {
            current = petrol[i];
            if (distance(current['latitude'], current['longitude']) < 10) {
                stations.push({
                    'location': new google.maps.LatLng(current['latitude'],
						current['longitude']),
                    'title': current['address']
                });
            }
        }
        google.maps.event.addListenerOnce(map, 'center_changed', function () {
            pins = drop(stations, map, markerImage);
        });
        centerMap();
    }

	/**************************
	 * If doing a directions search:
	 * Will pass to the google maps api an origin and a destination which will return a path
	 * and an array of coordinates along that path.
	 * The function will add markers for fuel stations within a certain distance of each point.
	 **************************/
    if (IsDirectionSearch == true) {
		
        var request =
	  	{
	  		origin: document.getElementById("txtSearchFrom").value + " Australia",
	  		destination: document.getElementById("txtSearchTo").value + " Australia",
	  	    travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
		
        directionsDisplay.setMap(map);
		directionsDisplay.setPanel(null);
		
        directionsService.route(request, function (result, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(result);
				for (var step = 0; step < result.routes[0].overview_path.length; step = step + 8) 
				{
					for (var i = 0; i < petrol.length; i++) 
					{
						current = petrol[i];
						if (DistanceBetweenTwoPoints(result.routes[0].overview_path[step].Ya, result.routes[0].overview_path[step].Za, current['latitude'], current['longitude']) < 20) {
	
							stations.push({
								'location': new google.maps.LatLng(current['latitude'],
							current['longitude']),
								'title': current['address']                            
							});
						}
					}
					google.maps.event.addListenerOnce(map, 'center_changed', function () {
						pins = drop(stations, map, markerImage);
					});
					centerMap();
				}
			}
			else
			{
				console.log("DIRECTIONS FAILED");
			}
        });
    }
}

/**************************
 * Listener for clicking on map markers
 * Show address when clicked
 **************************/
function pinClicks(pins)
{
  for (var i = 0; i < pins.length; i++)
  {
    google.maps.event.addListener(markers[i], 'click', function() {
        console.log(this.getTitle());
        });
  }
}
/*********************
 * Shiny Tab Clicking Panel Sliding...stuff.
 *******************/
function selectTab(elem)
{
  if ($(elem).hasClass('Selected'))
  {
    $('#' + $(elem).data('show')).slideUp();
    $(elem).removeClass('Selected');
  } else {
    console.log(elem);
    $(elem).addClass('Selected');
    $('#' + $(elem).data('hide')).slideUp();
    $('#' + $(elem).data('show')).slideDown();
    $('#' + $(elem).data('hide') + 'Tab').removeClass('Selected');
  }
}

/********************
 * Search button click.
 ********************/
function clickSearch()
{
  if (pins)
  {
    clearPins(pins);
    initCSV();
  }
}
