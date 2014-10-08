mongoose = require 'mongoose'

Keywords = new mongoose.Schema(
    keyword: String
  )

Book = new mongoose.Schema(
    title: String
    author: String
    releaseDate: Date
    keywords: [Keywords]
  )

module.exports = mongoose.model 'Book', Book