import bodyParser from 'body-parser';
import config from './config';
import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || config.port;

mongoose.connect('mongodb://' + config.mongoDB.host + '/' + config.mongoDB.name, (err, res) => {
	if(err) throw err;
	console.log('Connected to Database');
});

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
};

app.use(allowCrossDomain);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended : true}));
// parse application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

import routes from './routes';

app.use('/api', routes)

app.listen(port, ()=>{
	console.log("✔ Express server listening on port : ", port);
})
