request = require 'supertest'
app = require process.cwd() + '/.app'
mongoose = require 'mongoose'



describe 'index', ->
  describe '/', ->
    it "returns 200", (done) ->
      request(app)
        .get("/")
        .expect(200, done)

  describe "When page not found", ->
    it "returns 404", (done) ->
      request(app)
        .get('/nonexistent/action')
        .expect(404, done)

describe 'REST test', ->
  before (done) ->
    mongoose.disconnect()
    mongoose.connect "mongodb://localhost/library_test", done
    @book1 = 
      "title":"book1"
      "author":"on earth"
      "releaseDate":1420995600000
      "keywords":[{"keyword":"well"},{"keyword":"yeah"}]
      "imageCover":"/img/placeholder.jpg"

  describe 'POST /api/books/', ->
    it 'returns a JSON object', (done) ->
      request(app)
        .post('/api/books/')
        .send(@book1)
        .expect('Content-Type', /json/)
        .expect(200, done)

  describe 'GET /api/books/', ->
    it 'returns list of JSON objects', (done) ->
      request(app)
        .get('/api/books/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)

  describe 'DELETE /api/books/', ->
    it 'returns 200', (done) ->
      mongoose.connection.model('Book').find { title: @book1.title }, (err, docs) ->
        id = docs[0]._id 
        request(app)
          .delete("/api/books/#{id}")
          .expect(200, done)

  describe 'POST /api/cover', ->
    it 'returns a JSON object', (done) ->
      request(app)
        .post('/api/cover')
        .attach('coverImageUpload', "#{process.cwd()}/test/data/placeholder.jpg")
        .expect('Content-Type', /json/)
        .expect(200, done)

  after (done) ->
    mongoose.connection.db.executeDbCommand { dropDatabase:1 }, (err, result) -> 
      mongoose.connection.close done
  