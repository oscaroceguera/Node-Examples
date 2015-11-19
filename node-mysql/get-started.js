var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'root',
	database : 'tecsia',
	port : 8889
});

connection.connect();

connection.query('SELECT * FROM usuarios_tecsia', function(err, rows, fields){
	if(err) throw err;

	console.log('the solution is: ', rows);
});

connection.end();
