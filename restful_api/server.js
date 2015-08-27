var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var conf = require('./conf.json');
var Nave = require('./app/models/nave');

var app = express();

/**
 * Conexión a mongo
 */
mongoose.connect('mongodb://' + conf.mongoDB.host + '/' + conf.mongoDB.name);

/**
 * Configuramos el bpdy-parser este paquete
 * obtendremos los datos enviados por POST
 */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/**
 * Puerto del servidor
 */
var port = process.env.PORT || 3000;

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
 * Rutas para naves
 */
router.route('/naves')
	// RUTA POST
	.post(function(req, res){
		var nave = new Nave();	
		nave.nombre = req.body.nombre;
		nave.categoria = req.body.categoria;
		nave.motores = req.body.motores;
		nave.peso = req.body.peso;

		nave.save(function(err){
			if(err){
				res.send(err);
			}else{
				res.send({message: 'Nave creada con exito'});
			}
		})
	})
	// RUTA GET
	.get(function(req, res){
		Nave.find(function(err, naves){
			if(err) re.send(err);
			res.json(naves);
		});
	});

// Rutas para Nave especifica
router.route('/naves/:id')
	.get(function(req, res){
		Nave.findById(req.params.id, function(err, nave){
			if(err) res.send(err)
			res.json(nave)
		})
	})
	// UPDATE
	.put(function(req,res){
		Nave.findById(req.params.id, function(err, nave){
			if(err){
			 res.send(err);
			}else{
				nave.nombre = req.body.nombre;
				nave.categoria = req.body.categoria;
				nave.motores = req.body.motores;
				nave.peso = req.body.peso;

				// Guardamos la nave
				nave.save(function(err){
					if(err) res.send(err);
					res.json({message: 'Nave actualizada!'});
				})
			}	
		})
	})
	// DELETE
	.delete(function(req,res){
		Nave.remove({_id : req.params.id}, function(err,nave){
			if(err) res.send(err);
			res.json({message : 'nave eliminada con exito'});
		});
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
