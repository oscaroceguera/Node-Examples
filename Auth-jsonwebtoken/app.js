var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

/**
 * Iniciamos el servidor de express
 */
var app = express();

var User = require('./models/user')
var config = require('./config')

/**
 * Configuración
 * line(21) - Setear frase secreta
 * line(22) - Conectar a MongoDB
 */
var port = process.env.PORT || config.port;
app.set('superSecret', config.pharse);
mongoose.connect(config.database);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/**
 * Rutas de la API
 */
var router = express.Router();

/**
 * Ruta para probar nuestro servidor
 */
router.get('/', function(req,res){
	res.json({message: 'Vamos sigamso adelante Camarada'});
});

/**
 * Ruta para el registro de usuarios
 */
router.route('/register')
	.post(function(req, res){
		var user = new User();
		user.name = req.body.name;
		user.password = req.body.password;
		user.email = req.body.email;

		user.save(function(err){
			if(err){
				res.sen({error : true, message : 'Ocurrio un error'});
			}else{
				res.send({error : false, message : 'Usuario registrado con exito' });
			}
		});
	});

/**
 * Ruta de autentificacion de usuarios
 * mediante email y password
 */
router.route('/auth')
	.post(function(req, res){
		User.findOne({email : req.body.email}, function(err, user){
			if(err) res.send({error:true,message:'Oops, Ocurrio un error'});
			if(!user){
				res.send({error:true, message:'Usuario no encontrado'});
			}else if(user){
				//Comprobar password
				if(user.password != req.body.password){
					res.send({error:true, message:'La contraseña no es correcta'});
				}else{
					//Si es correcta generamos el token
					var token = jwt.sign(user, app.get('superSecret'), {
						expiresInMinutes: 1440 // Tiempo de expiración, checar documentación
					});
					res.send({error:false, message:'Autentificacion exitosa', token:token});
				}
			}
		})
	});

/**
 * Middleware para validar el token
 */
router.use(function(req, res, next){
	// Obtener token por gw, post o como header
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	console.log(token);

	if(token){
		jwt.verify(token, app.get('superSecret'), function(err, decoded){
			if(err){
				res.send({error:true, message:'Token no valido o no existe'});
			}
			
			req.decoded = decoded; // Establecemos el token en el request
			next();
		});
	}else{
		res.send({error:true, message: 'Token no valido o no existe'});
	}
});

/**
 * Rutas protegidas por token
 */
router.get('/users', function(req, res){
	User.find({}, function(err, users){
		res.json(users);
	});
});

router.get('/noderos', function(req, res){
	var mensajes = ["Los Jedi no pueden morir", "La capacidad de hablar no te hace inteligente", "Tu enfoque determina tu realidad"];

	res.send({message:mensajes[Math.floor((Math.random()*3) + 1)]});
})

/**
 * Registrar las rutas con prefijo /api
 */
app.use('/api', router);

/**
 * Iniciamos Servidor
 */
app.listen(port, function(){
	console.log('Estamos en el http://localhost:' + port);
})











