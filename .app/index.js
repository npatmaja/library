// Generated by CoffeeScript 1.4.0
var ECT, app, ectRenderer, env, express, routes, stylus;

express = require('express');

stylus = require('stylus');

ECT = require('ect');

ectRenderer = ECT({
  watch: true,
  root: __dirname + '/../views',
  ext: '.ect'
});

app = express();

app.port = process.env.PORT || process.env.VMC_APP_PORT || 3000;

env = process.env.NODE_ENV || "development";

app.set('view engine', 'ect');

app.engine('ect', ectRenderer.render);

routes = require('./routes');

routes(app);

module.exports = app;
