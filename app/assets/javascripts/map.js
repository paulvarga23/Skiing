function initialise() {
var coords = new google.maps.LatLng(51, 0);

  function locateMe(callback) { 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        coords = new google.maps.LatLng(latitude, longitude);
        callback();
      }) 
      } else {
        callback();
    }
  };

  function renderMap() {
    var mapOptions = {
      center: coords,
      zoom: 5,
      mapTypeId: 'terrain',
      streetViewControl: false,
      mapTypeControl: false
    };

    var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
    var infowindow = new google.maps.InfoWindow();
    // var bounds = new google.maps.LatLngBounds();
    var image = '/assets/marker.png';

    // map.fitBounds(bounds);

    for (var i in resorts) {
      var p = resorts[i];

      var content = p.name

      var position = new google.maps.LatLng(p.latitude, p.longitude);
      // bounds.extend(position);

      var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: p.name,
        info: content,
        icon: image
      });

      google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
        return function() {
          infowindow.setContent(content);
          infowindow.open(map,marker);
       };
      })(marker,content,infowindow)); 
    }
  }
  
  locateMe(renderMap);

};
