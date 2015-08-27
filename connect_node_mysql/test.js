var express = require('express');
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'platzi'
});


var app = express();

connection.connect(function(err){
	if(!err){
		console.log("database is connected ...... \n\n");
	} else{
		console.log("Erro connectiong database ... \n\n");
	}
});

app.get('/', function(req,res){
	connection.query('SELECT * FROM books', function(err, rows, fields){
		connection.end();
		if(!err)
			console.log('The solution is :', rows);
		else
			console.log('Error while performing query');
	});
});

app.listen(3000)