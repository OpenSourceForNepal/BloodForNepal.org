//= require jquery
//= require jquery.turbolinks
//= require jquery_ujs
//= require namespace
//= require_tree ./donate
//= require vendor/slider.js
//= require vendor/jquery.mask.min.js

window.onload = (function() {
  var views = new BloodForNepal.Donate.Views()
  var controller = new BloodForNepal.Donate.Controller(views)

  controller.initialize()
})
