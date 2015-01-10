var app = app || {};
/**
 * Handles when image is selected, to 
 * provide image thumbnail view and 
 * upload the selected image to the server.
 */
app.ThumbnailView = Backbone.View.extend({
  events: {
    'change #coverImageUpload': 'renderThumb',
    'submit #uploadCoverForm': 'upload'
  },

  render: function () {
    this.renderThumb();
  },

  renderThumb: function () {
    var input = this.$('#coverImageUpload');
    var img = this.$('#uploadedImage')[0];
    if(input.val() !== '') {
      var selected_file = input[0].files[0];
      var reader = new FileReader();
      reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
      reader.readAsDataURL(selected_file);
    }
  },

  submit: function () {
    this.$form = this.$('#uploadCoverForm');
    this.$form.submit();
  },

  upload: function () {
    var _this = this;
    this.$form.ajaxSubmit({
      error: function (xhr) {
        _this.renderStatus('Error: ' + xhr.status);
      },
      success: function (response) {
        _this.trigger('image-uploaded', response.path);
        _this.clearField();
      }
    });
    return false;
  },

  renderStatus: function (status) {
     $('#status').text(status);
  },

  clearField: function () {
    this.$('#uploadedImage')[0].src = '';
    this.$('#coverImageUpload').val('');
  }
});

/**
 * BookList, the container for all recorded books
 */
app.BookListView = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, 'add', this.renderBook);
    this.listenTo(this.collection, 'reset', this.render);
  },

  render: function () {
    console.log("render each");
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

/**
 * Application view
 */
app.LibraryView = Backbone.View.extend({
  el: '#books',

  events: {
    'click #add': 'addBook'
  },

  initialize: function (initialBooks) {
    this.collection = new app.Library(initialBooks);

    this.thumbnailView = new app.ThumbnailView();
    this.bookListView = new app.BookListView( { collection: this.collection } );

    this.listenTo(this.thumbnailView, 'image-uploaded', this.updateInput);
  },

  render: function () {
    this.thumbnailView.setElement(this.$('#imageCoverUpload')).render();
    this.bookListView.setElement(this.$('#bookList')).render();
  },

  start: function () {
    this.render();
    this.collection.fetch({ reset: true });
  },

  addBook: function (e) {
    e.preventDefault();
    this.thumbnailView.submit();
  },

  updateInput: function (path) {
    console.log(path);
    $('#imageCover').val(path);
    this.createData();
  },

  createData: function () {
    var formData = {};
    // iterate the form's data using JQuery.each function
    // that takes a callback function with two parameters
    // (index and element) as its parameter
    $('#addBook div').children('input').each(function(index, el) {
      if ($(el).val() !== '') {
        if (el.id === 'keywords') {
          formData[el.id] = [];
          var pattern = /("[^"]+")|\S+/g;
          _.each(regexArray($(el).val(), pattern), function (keyword) {
            formData[el.id].push({ 'keyword': keyword.replace(/"/g, "") });
          });
        } else if (el.id === 'releaseDate') {
          formData[el.id] = $('#releaseDate').datepicker('getDate').getTime();
        } else {
          formData[el.id] = $(el).val();  
        }
      }
      $(el).val('');
    });
    console.log(formData);
    this.collection.create(formData);
    $('#uploadedImage').val('');
  }
});

var regexArray = function (string, pattern) {
  var result = [];
  var r;
  while ((r = pattern.exec(string)) !== null) {
    result.push(r[0]);
  }
  return result;
}