module.exports = 
  create: (req, res) ->
    res.send 
      path: "/img/covers/#{req.files.coverImageUpload.name}"