BloodForNepal.Hospital.Views = function() {
  this.setLatLongParams = function(lat, long) {
    document.getElementById('latitude').value = lat
    document.getElementById('longitude').value = long
  }

  this.initialGoogleMap = function(mapOptions) {
    return new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  }

  this.updateAddressInput = function(address) {
    var el = document.getElementById('hospital_address')
    el.value = address
    el.className += ' animated '
    el.className += ' pulse '

    setTimeout(function(){ el.classList.remove("pulse"); }, 1000);
  }
};
