Book = require "../models/book"

module.exports = 

  # list all books
  index: (req, res) ->
    Book.find (err, books) ->
      res.send books unless err

  create: (req, res) ->
    book = new Book(
      imageCover: req.body.imageCover
      title: req.body.title
      author: req.body.author
      releaseDate: req.body.releaseDate
      keywords: req.body.keywords
    )
    console.log book
    book.save (err) ->
      unless err
        res.send book
      else
        console.log err

  get: (req, res) ->
    Book.findById req.params.id, (err, book) ->
      unless err
        res.send book
      else
        console.log err

  update: (req, res) ->
    Book.findById req.params.id, (err, book) ->
      console.log 'updating book: ' + req.body.title

      book.title = req.body.title
      book.author = req.body.author
      book.releaseDate = req.body.releaseDate
      book.keywords = req.body.keywords

      book.save (err) ->
        unless err
          console.log 'book updated'
          res.send book
        else
          console.log err

  delete: (req, res) ->
    Book.findById req.params.id, (err, book) ->
      book.remove (err) ->
        unless err
          console.log 'book deleted'
          res.send book
        else
          console.log err