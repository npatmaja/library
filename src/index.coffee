express = require 'express'
stylus = require 'stylus'
assets = require 'connect-assets'

# get current working directory of the process,
# which also the root of the project
__root = process.cwd() 

#### Application initialization
# Create app instance
app = express()
app.use assets()
app.use express.static (__root + '/public')

# Define Port & Environment
app.port = process.env.PORT or process.env.VMC_APP_PORT or 3000
env = process.env.NODE_ENV or "development"

# Set view engine
app.set 'view engine', 'jade'

#### Routes
# Routes initialization
routes = require './routes'
routes(app)

module.exports = app

