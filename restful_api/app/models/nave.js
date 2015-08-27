var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NaveSchema = new Schema({
	nombre : String,
	caegorias : String,
	motores : Number,
	peso : Number
});

module.exports = mongoose.model('Nave', NaveSchema);