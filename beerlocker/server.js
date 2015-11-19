// Get the packages we need
var express          = require("express");
var mongoose         = require("mongoose");
var bodyParser       = require("body-parser");
var passport         = require("passport");
var authController   = require("./controllers/auth");
var beerController   = require("./controllers/beer");
var userController   = require("./controllers/user");
var clientController = require("./controllers/client");
var ejs              = require('ejs');
var session          = require('express-session');

// Use environment defined port or 3000
var port = process.env.PORT || 8080;

// Buscamos la conexion adecuada al hambiente, para mongoDB
var uristring =
	process.env.MONGOLAB_URI ||
	process.env.MONGO_URL ||
	'mongodb://localhost/beerlocker';

// Create our Express application
var app = express();

// Set view engine to ejs
app.set('view engine', 'ejs');


// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
	extended : true
}));

// Use express session support since OAuth2orize require it
app.use(session({
	secret : 'super Secret Session Key',
	saveUninitialized : true,
	resave : true
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

// Create endpoint handlers for /clients
router.route('/clients')
	.post(authController.isAuthenticated, clientController.postClients)
	.get(authController.isAuthenticated, clientController.getClients);

// Register all our routes with /api
app.use('/api', router);

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
