#### Routes
# Routes the GET, POST, DELETE requests

module.exports = (app) ->
  app.get '/', (req, res, next) ->
    routeMvc('index', 'index', req, res, next)

  app.get '/api/:controller', (req, res, next) ->
    routeMvc(req.params.controller, 'index', req, res, next)

  app.get '/api/:controller/:id', (req, res, next) ->
    routeMvc(req.params.controller, 'get', req, res, next)
  
  app.post '/api/:controller', (req, res, next) ->
    routeMvc(req.params.controller, 'create', req, res, next)

  app.put '/api/:controller/:id', (req, res, next) ->
    routeMvc(req.params.controller, 'update', req, res, next)

  app.delete '/api/:controller/:id', (req, res, next) ->
    routeMvc(req.params.controller, 'delete', req, res, next)

routeMvc = (controllerName, methodName, req, res, next) ->
  controllerName = 'index' unless controllerName?
  controller = null
  try
    controller = require "./controllers/" + controllerName
  catch e
    console.warn "controller not found: " + controllerName, e
    next()
    return
  data = null
  if typeof controller[methodName] is 'function' 
    activeMethod = controller[methodName].bind controller
    activeMethod req, res, next
  else
    console.warn "method nof found: " + methodName
    next()
  
