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

app.use(function(req, res, next) {
	// Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
   // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // Set to true if you need the website to include cookies in the requests sent
     // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

require('./app/routes.js')(app);

app.listen(8080, function(){
	console.log("App listening on port 8080");
})
