var app = app || {};

app.Book = Backbone.Model.extend({
  defaults: {
    imageCover: '/img/placeholder.jpg',
    title: 'No Title',
    author: 'No Author',
    releaseDate: 'Unknown',
    keywords: 'None'
  },
  parse: function (response) {
    response.id = response._id;
    return response;
  }
});