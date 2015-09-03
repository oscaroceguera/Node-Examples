var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

var config = require('./config');
var tvshow = require('./models/tvshow')
var TVShowCtrl = require('./controllers/tvshows')

var port = process.env.PORT || config.port;

var app = express();

mongoose.connect('mongodb://' + config.mongoDB.host + '/' + config.mongoDB.name, function(err, res){
	if(err) throw err;
	console.log('Connected to Database');
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

router.get('/', function(req, res){
	res.send("Hello World");
});

app.use(router);

// API ROUTES
var tvshows = express.Router();

tvshows.route('/tvshows')
	.get(TVShowCtrl.findAllTVShows)
	.post(TVShowCtrl.addTVShow);

tvshows.route('/tvshows/:id')
	.get(TVShowCtrl.findById)
	.put(TVShowCtrl.updateTVShow)
	.delete(TVShowCtrl.deleteTVShow);

app.use('/api', tvshows);

app.listen(port, function(){
	console.log("localhost:" + port);
})
