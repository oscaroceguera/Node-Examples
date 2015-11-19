var express = require('express');
var	app = express();
var	mysql = require('mysql');
var config = require('./config');

var	pool = mysql.createPool({
	connectionLimit : 100, // important
	host : 'localhost',
	user : 'root',
	password : 'root',
	database : 'tecsia',
	port : config.db.port,
	debug : false
});

function handle_database(req, res, comandos){
	console.log(comandos);
	pool.getConnection(function(err, connection){
		if(err){
			connection.release();
			res.json({
				"code" : 100,
				"status" : "Error in connection database"
			});
			return;
		}
		console.log('connected as id ' + connection.threadId);

		connection.query(comandos, function(err, rows){
			connection.release();
			if(!err) return res.json(rows);
		});

		connection.on('error', function(err){
			res.json({
				"code" : 100,
				"status" : "Error in connection database"
			});
			return;
		});
	});
}

app.get('/', function(req,res){
	handle_database(req, res, config.queries.getCampos);
})

app.get('/diagnostico', function(req,res){
	handle_database(req, res, config.queries.getSENASICA);
})

app.listen(3000);
