fs = require 'fs'
{spawn, exec} = require 'child_process'

# ANSI Terminal Colors
bold  = '\x1B[0;1m'
red   = '\x1B[0;31m'
green = '\x1B[0;32m'
reset = '\x1B[0m'

log = (message, color, explanation) ->
  console.log color + message + reset + ' ' + (explanation or '')

task 'test', 'run test', ->
	exec 'NODE_ENV=test mocha --compilers coffee:coffee-script
		  --reporter spec 
		  --require coffee-script
		  --colors', (err, output) ->
		  	(output += err) if err
		  	console.log output

task 'dev', 'start dev env', ->
	options = ['-c', '-b', '-w', '-o', '.app', 'src']
	coffee = spawn 'coffee', options
	coffee.stdout.pipe process.stdout
	coffee.stderr.pipe process.stderr
	log 'Watching coffee files', green
	# watch_js
	supervisor = spawn 'node', [
    './node_modules/supervisor/lib/cli-wrapper.js',
    '-w',
    '.app,views', 
    '-e', 
    'js|jade', 
    'server'
    ]
	supervisor.stdout.pipe process.stdout
	supervisor.stderr.pipe process.stderr
	log 'Watching js files and running server', green
	