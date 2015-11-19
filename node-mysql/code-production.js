var express = require('express');
var	app = express();
var	mysql = require('mysql');
var	connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'root',
	database : 'tecsia',
	port : 8889
});

connection.connect(function(err){
	if(!err) return console.log("Database is connected ... \n\n");
	return console.log("Error connection DB ... \n\n");
});

app.get('/', function(req,res){
	connection.query('SELECT * FROM usuarios_tecsia', function(err, rows, fields){
		connection.end();
		if(!err) return console.log('the solution is: ', rows);
		return console.log('Error while performing Qeury');
	});
});

app.listen(3000);
