BloodForNepal.Controller = function(views) {
  var self = this;
  this.views = views;

  this.initialize = function() {
    var map = this.map()
    map.data.loadGeoJson('https://gist.githubusercontent.com/dahal/729a9963886b9fef6b2a/raw/029fea0c2ea5591b80b924819a67f4a5baeeab41/nepal.geojson')
    map.setOptions({styles: this.mapStyle()})
    this.views.activateSlider()
    this.bindAddressInput()
  };

  this.mapOptions = function(zoom, center) {
    var nepal = new google.maps.LatLng(27.8, 84.1)
    var zoom = zoom || 7
    var center = center || nepal

    return {
      zoom: zoom,
      center: center
    }
  };

  this.mapStyle = function() {
    return [{"elementType":"geometry","stylers":[{"hue":"#ff4400"},{"saturation":-68},{"lightness":-4},{"gamma":0.72}]},{"featureType":"road","elementType":"labels.icon"},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"hue":"#0077ff"},{"gamma":3.1}]},{"featureType":"water","stylers":[{"hue":"#00ccff"},{"gamma":0.44},{"saturation":-33}]},{"featureType":"poi.park","stylers":[{"hue":"#44ff00"},{"saturation":-23}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"hue":"#007fff"},{"gamma":0.77},{"saturation":65},{"lightness":99}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"gamma":0.11},{"weight":5.6},{"saturation":99},{"hue":"#0091ff"},{"lightness":-86}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"lightness":-48},{"hue":"#ff5e00"},{"gamma":1.2},{"saturation":-23}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"saturation":-64},{"hue":"#ff9100"},{"lightness":16},{"gamma":0.47},{"weight":2.7}]}]
  }

  this.map = function() {
    return this.views.initialGoogleMap(this.mapOptions())
  };

  this.bindAddressInput = function() {
    var markers = [];
    var input = (document.getElementById('donor_address'))
    var searchBox = new google.maps.places.SearchBox(input, { componentRestrictions: {country: "np"}});

    google.maps.event.addListener(searchBox, 'places_changed', function() {
      var places = searchBox.getPlaces();
      self.PinPointOnMap(markers, places, searchBox)
    })
  };

  this.PinPointOnMap = function(markers, places, searchBox) {
    var bounds = new google.maps.LatLngBounds();
    var map = this.map()
    map.setOptions({styles: this.mapStyle()});

    for (var i = 0, place; place = places[i]; i++) {
      var marker = new google.maps.Marker({
        map: map,
        icon: '/person_pin.png',
        position: place.geometry.location,
        draggable: true
      });

      markers.push(marker);

      bounds.extend(place.geometry.location);
      self.views.setLatLongParams(marker.getPosition().lat(), marker.getPosition().lng())
      this.activatePinDrag(marker, searchBox, map)
      this.activateMapInfo(marker, map)
    }

    this.mapBoundZoom(map, bounds)
  };

  this.activatePinDrag = function(marker, searchBox, map) {
    google.maps.event.addListener(marker, 'dragend', function(e) {
      self.views.setLatLongParams(e.latLng.lat(), e.latLng.lng())
      self.geocodePosition(e);
      self.activateMapInfo(map, marker)
    });
  };

  this.activateMapInfo = function(marker, map) {
    var infowindow = new google.maps.InfoWindow({
      content: '<center><strong>Is this where you live?</strong> </br> You may move it around to pinpoint your location.</center>'
    });

    infowindow.open(map,marker);

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });
  }

  this.mapBoundZoom = function(map, bounds) {
    map.fitBounds(bounds);
    var zoom = map.getZoom();
    map.setZoom(zoom > 15 ? 15 : zoom);
  };

  this.geocodePosition = function(pos) {
    var geocoder = new google.maps.Geocoder()
    geocoder.geocode({
      latLng: pos.latLng
    }, function(responses) {
      if (responses && responses.length > 0) {
        self.views.updateAddressInput(responses[0].formatted_address)
      } else {
        self.alertify("", "Cannot determine address at this location, please try again.", "")
      }
    });
  }

  this.alertify = function(title, text, type) {
    swal({
      title: title,
      text: text,
      type: type,
      confirmButtonColor: "black",
      allowOutsideClick: true,
      allowEscapeKey: true
    })
  }
};
