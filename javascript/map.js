function initMap() {
  // Styles a map in night mode.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 1.37229, lng: 103.95658},
    zoom: 12,
    styles: [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},

      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
      }
    ]
  });

  var myLatLng = {lat: 1.37229, lng: 103.95658}
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Click to see my address!'
  });

  var contentString =
    '<div id="content">' +
      '<div id="siteNotice">'+
      '</div>'+
      '<div id="bodyContent">'+
      // '<p>186B Rivervale Drive</p>'+'<p>+(65) 92963897</p>'+'<p>pooyising@gmail.com</p>'+
      '<p>Singapore <br> +(65) 9296389-seven<br> pooyisingwork [at] gmail [dot] com</p>'+
      '</div>'+
    '</div>';

  var infowindow = new google.maps.InfoWindow({
       content: contentString
  });

  marker.addListener('click', function() {
   infowindow.open(map, marker);
 })
  google.maps.event.trigger(marker, 'click');
 //  google.maps.event.addListener(infoWindow, 'DOMContentLoaded', function() {
 //    infowindow.open(map, marker, content);
 // });
}

// google.maps.event.addListener(window, 'load', initialize);
