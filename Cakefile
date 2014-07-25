#### Cakefile
# mostly take from express-coffee (https://github.com/twilson63/express-coffee)

fs = require 'fs'
which = require 'which'
{spawn, exec} = require 'child_process'

# ANSI Terminal Colors
bold  = '\x1B[0;1m'
red   = '\x1B[0;31m'
green = '\x1B[0;32m'
reset = '\x1B[0m'

log = (message, color, explanation) ->
  console.log color + message + reset + ' ' + (explanation or '')

build = (callback) ->
	options = ['-c','-b', '-o', '.app', 'src']
	cmd = which.sync 'coffee'
	coffee = spawn cmd, options
	coffee.stdout.pipe process.stdout
	coffee.stderr.pipe process.stderr
	coffee.on 'exit', (status) -> callback?() if status is 0

test = (callback) ->
	options = ['--compilers', 'coffee:coffee-script', '--reporter', 'spec', '--require', 'coffee-script', '--colors']
	cmd = which.sync 'mocha'
	fixture = spawn 'mocha', options
	fixture.stdout.pipe process.stdout
	fixture.stderr.pipe process.stderr
	fixture.on 'exit', (status) -> callback?() if status is 0

task 'build', 'build project', ->
	build -> log ':)', green

task 'test', 'run test', ->
	build -> test -> log ':)', green

task 'dev', 'start dev env', ->
	options = ['-c', '-b', '-w', '-o', '.app', 'src']
	cmd = which.sync 'coffee'
	coffee = spawn cmd, options
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
	