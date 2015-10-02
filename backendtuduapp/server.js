var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var port = process.env.PORT || 8080;
var database = require('./config/database');

// Buscamos la conexion adecuada al hambiente, para mongoDB
var uristring = 
	process.env.MONGOLAB_URI || 
	process.env.MONGO_URL || 
	database.url; 

// Configurar Express
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(morgan('dev'));
app.use(methodOverride());
app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', 'http://ooceguera.webfactional.com'); // Permitido para todos los dominios
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE'); // Podemos mandar peticiones POST y GET
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization'); // se permiten cabeceras X-Requested-With y content-type
	next();
});

require('./app/routes')(app);

mongoose.connect(uristring, function(err){
	if (err){
		console.log("ERROR connecting to: " + uristring + '.' +err);
	} else {
		console.log("Succeeded connected to: " + uristring);
	}

	app.listen(port, function(){
		console.log('App listening on port: ' + port);
	});

});