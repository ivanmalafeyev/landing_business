"use strict";

//@prepros-append map.js
//@prepros-append responsive.js
//@prepros-append ibg.js
function testWebP(cb) {
  var webP = new Image();

  webP.onload = webP.onerror = function () {
    cb(webP.height == 2);
  };

  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});
;
var img = document.querySelectorAll(".ibg");
Array.prototype.forEach.call(img, function (value) {
  if (value.querySelector("img")) {
    value.style.backgroundImage = "url(" + value.querySelector("img").getAttribute("src") + ")";
  }
});
;
var menuIcon = document.querySelector(".menu-header__icon");
var menu = document.querySelector(".menu-header__menu");
var links = document.querySelectorAll(".menu-header__link"); //smooth scroll from first fullscreen to content

var menuHeader = document.querySelector(".header");
var gotos = document.querySelectorAll(".goto");

if (gotos) {
  [].forEach.call(gotos, function (e) {
    e.addEventListener("click", function () {
      var link = e.getAttribute("href");

      if (link) {
        var box = document.querySelector("." + link.split("#")[1]).getBoundingClientRect();
        var headerOffset = 0;

        if (menuIcon.classList.contains("active")) {
          headerOffset = menuHeader.offsetHeight;
        }

        window.scrollTo({
          top: box.top + pageYOffset - headerOffset,
          // menuHeader.offsetHeight,
          behavior: "smooth"
        });
      }
    });
  });
}

menuIcon.addEventListener("click", function () {
  function toggleClass(c) {
    menuIcon.classList.toggle(c);
    menu.classList.toggle(c);
    [].forEach.call(links, function (lnk) {
      lnk.classList.toggle("active");
    });
    document.body.classList.toggle("lock");
  }

  toggleClass("active");

  function linkCB() {
    toggleClass("active");
    [].forEach.call(links, function (l) {
      l.removeEventListener("click", linkCB);
    });
  }

  [].forEach.call(links, function (l) {
    l.addEventListener("click", linkCB);
  });
});
;

function initMap(n) {
  google.maps.Map.prototype.setCenterWithOffset = function (latlng, offsetX, offsetY) {
    var map = this;
    var ov = new google.maps.OverlayView();

    ov.onAdd = function () {
      var proj = this.getProjection();
      var aPoint = proj.fromLatLngToContainerPixel(latlng);
      aPoint.x += offsetX;
      aPoint.y += offsetY;
      map.panTo(proj.fromContainerPixelToLatLng(aPoint)); // map.setCenter(proj.fromContainerPixelToLatLng(aPoint));
    };

    ov.draw = function () {};

    ov.setMap(this);
  };

  var markers = new Array();
  var infoWindow = new google.maps.InfoWindow({// pixelOffset: new google.maps.Size(-230, 250)
  });
  var locations = [[new google.maps.LatLng(53.22756, 50.173902)], [new google.maps.LatLng(53.20756, 50.223902)], [new google.maps.LatLng(53.19756, 50.193902)], [new google.maps.LatLng(53.20256, 50.103902)]];
  var options = {
    zoom: 11,
    panControl: false,
    mapTypeControl: false,
    center: locations[0][0],
    scrollwheel: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.querySelector(".map"), options);
  var icon = {
    url: "../img/icons/map_marker.svg",
    scaledSize: new google.maps.Size(24, 29),
    anchor: new google.maps.Point(12, 15)
  };

  for (var i = 0; i < locations.length; i++) {
    var marker = new google.maps.Marker({
      icon: icon,
      position: locations[i][0],
      map: map
    });
    markers.push(marker);
  }
}

initMap();
;
var filter = document.querySelectorAll(".tab__navitem");
[].forEach.call(filter, function (e) {
  e.addEventListener("click", function () {
    var i = e.getAttribute("data-filter");

    if (i == "1") {
      [].forEach.call(document.querySelectorAll(".item-newsmedia__column"), function (el) {
        el.style.display = "block";
      });
    } else {
      [].forEach.call(document.querySelectorAll(".item-newsmedia__column"), function (el) {
        el.style.display = "none";
      });
      [].forEach.call(document.querySelectorAll(".item-newsmedia__column.f_" + i), function (el) {
        el.style.display = "block";
      });
    }

    [].forEach.call(filter, function (elem) {
      elem.classList.remove("active");
    });
    e.classList.add("active");
  });
});
;