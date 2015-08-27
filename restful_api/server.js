var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Nave = require('./app/models/nave');

var app = express();

/**
 * Conexión a mongo
 */
mongoose.connect('mongodb://' + conf.mongoDB.host + '/' + conf.mongoDB.name)

/**
 * Configuramos el bpdy-parser este paquete
 * obtendremos los datos enviados por POST
 */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/**
 * Puerto del servidor
 */
var port = process.env.PORT || 4000;

/**
 * Rutas
 */
var router = express.Router();

/**
 * Middleware 
 */
router.use(function(req,res,next){
	console.log('Request a la API');
	next();
});

/**
 * Ruta para probar nuestro server
 */
router.get('/', function(req, res){
	res.json({message: 'Ándale, arriba arrriba, yepa, yepa'});
});

/**
 * Registrar las rutas con prefijo /api 
 */
app.use('/api', router);

/**
 * Iniciar servidor
 */
app.listen(port, function(){
	console.log('La magia esta en el puerto ' + port);
});
