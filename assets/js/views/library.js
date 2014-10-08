var app = app || {};

app.LibraryView = Backbone.View.extend({
  el: '#books',

  events: {
    'click #add': 'addBook'
  },

  addBook: function (e) {
    // prevent the form to submit and reload the page
    e.preventDefault();

    var formData = {};
    // iterate the form's data using JQuery.each function
    // that takes a callback function with two parameters
    // (index and element) as its parameter
    $('#addBook div').children('input').each(function(index, el) {
      if ($(el).val() !== '') {
        if (el.id === 'keywords') {
          formData[el.id] = [];
          _.each($(el).val().split(' '), function (keyword) {
            formData[el.id].push({ 'keyword': keyword });
          });
        } else if (el.id === 'releaseDate') {
          formData[el.id] = $('#releaseDate').datepicker('getDate').getTime();
        } else {
          formData[el.id] = $(el).val();  
        }
      }
      $(el).val('');
    });
    this.collection.create(formData);
  },

  initialize: function (initialBooks) {
    this.collection = new app.Library(initialBooks);
    this.collection.fetch({ reset: true });

    this.render();

    this.listenTo(this.collection, 'add', this.renderBook);
    this.listenTo(this.collection, 'reset', this.render);
  },
  
  render: function () {
    this.collection.each(function (item) {
      this.renderBook(item);
    }, this);
  },

  renderBook: function (item) {
    var bookView = new app.BookView({
      model: item
    });
    this.$el.append(bookView.render().el);
  }
});