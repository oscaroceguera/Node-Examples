// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var authController = require('./controllers/auth');
var beerController = require('./controllers/beer');
var userController = require('./controllers/user');

// Use environment defined port or 3000
var port = process.env.PORT || 8080;

// Buscamos la conexion adecuada al hambiente, para mongoDB
var uristring =
	process.env.MONGOLAB_URI ||
	process.env.MONGO_URL ||
	'mongodb://localhost/beerlocker'; 

// Connect to the beerlocker MongoDB
//mongoose.connect('mongodb://localhost/beerlocker');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
	extended : true
}));

// Use the passport package in our application
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /beers
router.route('/beers')
	.get(authController.isAuthenticated, beerController.getBeers)
	.post(authController.isAuthenticated, beerController.postBeers);

// Create endpoint handlers for /beers/:beer_id
router.route('/beers/:beer_id')
	.get(authController.isAuthenticated, beerController.getBeer)
	.put(authController.isAuthenticated, beerController.putBeer)
	.delete(authController.isAuthenticated, beerController.deleteBeer);

// Create endpoint handlers for /users
router.route('/users')
	.post(userController.postUsers)
	.get(authController.isAuthenticated, userController.getUsers);

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port, function(){
	console.log('Insert beer port ' + port);
})
