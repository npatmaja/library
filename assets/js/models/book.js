var app = app || {};

app.Book = Backbone.Model.extend({
  defaults: {
    coverImage: 'img/placeholder.jpg',
    title: 'No Title',
    author: 'No Author',
    releaseDate: 'Unknown',
    keywords: 'None'
  }
});