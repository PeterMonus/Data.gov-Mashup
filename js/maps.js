/****************
 * Initialise the map with the global user location coordinates
 ****************/
function initMap()
{
  var mapOptions =
  {
center: new google.maps.LatLng(-35.237, 149.085),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  return new google.maps.Map(document.getElementById('map_canvas'),
      mapOptions);
}
function centerMap()
{
  map.panTo(new google.maps.LatLng(userLoc['lat'], userLoc['long']));
  new google.maps.Marker({
position: (new google.maps.LatLng(userLoc['lat'], userLoc['long'])),
map:map,
animation:drop,
draggable: false,
clickable: true,
title: 'You Are Here',
icon: 'images/marker_user.png'
});
}


/*****************
 * Drop the markers, return an array of them for use later.
 ****************/
var markers = [];
function drop(stations, map, image) {
  for (var i = 0; i < stations.length; i++) {
    markers.push(new google.maps.Marker({
position: (stations[i])['location'],
title: (stations[i])['title'],
map: map,
animation: drop,
draggable: false,
clickable: true,
icon: image
}));

}

pinClicks(markers);
return markers;
}

function clearPins(pins)
{
  for (var i = 0; i < pins.length; i++)
  {
    pins[i].setMap(null);
  }
  markers = [];
}
