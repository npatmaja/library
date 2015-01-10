mongoose = require 'mongoose'

Keywords = new mongoose.Schema(
    keyword: String
  )

Book = new mongoose.Schema(
    imageCover: String
    title: String
    author: String
    releaseDate: Date
    keywords: [Keywords]
  )

module.exports = mongoose.model 'Book', Book