var app = app || {};

$(function () {
  $('#releaseDate').datepicker();
  var mainView = new app.LibraryView();
  mainView.start();
})