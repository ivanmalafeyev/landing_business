function initMap(n) {
  google.maps.Map.prototype.setCenterWithOffset = function (
    latlng,
    offsetX,
    offsetY
  ) {
    var map = this;
    var ov = new google.maps.OverlayView();
    ov.onAdd = function () {
      var proj = this.getProjection();
      var aPoint = proj.fromLatLngToContainerPixel(latlng);
      aPoint.x += offsetX;
      aPoint.y += offsetY;
      map.panTo(proj.fromContainerPixelToLatLng(aPoint));
      // map.setCenter(proj.fromContainerPixelToLatLng(aPoint));
    };
    ov.draw = function () {};
    ov.setMap(this);
  };
  var markers = new Array();
  var infoWindow = new google.maps.InfoWindow({
    // pixelOffset: new google.maps.Size(-230, 250)
  });
  var locations = [
    [new google.maps.LatLng(53.22756, 50.173902)],
    [new google.maps.LatLng(53.20756, 50.223902)],
    [new google.maps.LatLng(53.19756, 50.193902)],
    [new google.maps.LatLng(53.20256, 50.103902)],
  ];
  var options = {
    zoom: 11,
    panControl: false,
    mapTypeControl: false,
    center: locations[0][0],
    scrollwheel: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };
  var map = new google.maps.Map(document.querySelector(".map"), options);
  var icon = {
    url: "../img/icons/map_marker.svg",
    scaledSize: new google.maps.Size(24, 29),
    anchor: new google.maps.Point(12, 15),
  };
  for (var i = 0; i < locations.length; i++) {
    var marker = new google.maps.Marker({
      icon: icon,
      position: locations[i][0],
      map: map,
    });
    markers.push(marker);
  }
}
initMap();
