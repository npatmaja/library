#### Routes
# Routes the GET, POST, DELETE requests

module.exports = (app) ->
	app.get '/', (req, res) ->
		res.render 'index'
