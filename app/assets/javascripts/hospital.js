//= require jquery
//= require jquery.turbolinks
//= require jquery_ujs
//= require namespace
//= require_tree ./hospital
//= require vendor/slider.js
//= require vendor/jquery.mask.min.js
//= require vendor/awesomplete.min.js

window.onload = (function() {
  var views = new BloodForNepal.Hospital.Views()
  var controller = new BloodForNepal.Hospital.Controller(views)

  controller.initialize()
})
