fs = require 'fs'
{exec} = require 'child_process'

task 'test', 'run test', ->
	exec 'NODE_ENV=test mocha --compilers coffee:coffee-script
		  --reporter spec 
		  --require coffee-script
		  --colors', (err, output) ->
		  	(output += err) if err
		  	console.log output