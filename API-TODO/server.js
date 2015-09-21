var express = require('express');
var mongoose = require('mongoose');
/* Log request to the console */
var morgan = require('morgan');
/* pull information = require( HTML POST *); */
var bodyParser = require( 'body-parser');
/*  simulate DELETE and PUT */
var methodOverride = require('method-override');
var conf = require('./conf.json');

var port = process.env.PORT || conf.port;
var app = express();

mongoose.connect(conf.mongoURL);

app.use(morgan('dev')); 										// log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

require('./app/routes.js')(app);

app.listen(8080, function(){
	console.log("App listening on port 8080");
})
