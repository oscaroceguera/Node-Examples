var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var movies = require('./routes/movies');
var conf = require('./conf.json')

var app = express();

mongoose.connect(conf.database);

// Configure body-parser
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// This is our route middleware
app.use('/api', movies);

module.exports = app;
