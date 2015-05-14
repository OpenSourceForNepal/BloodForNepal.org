// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery.turbolinks
//= require jquery_ujs
//= require vendor/smooth-scroll.js
//= require vendor/share.min.js

$(function() {
  $("#donors .pagination a").bind("click", function() {
    $.getScript(this.href);
    return false;
  });

  $("#donor_search").keyup(function() {
    $.get($("#donor_search").attr("action"), $("#donor_search").serialize(), null, "script");
    return false;
  });
});
