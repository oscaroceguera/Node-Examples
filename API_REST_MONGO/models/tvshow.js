var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tvshowSchema = new Schema({
	title : { type : String },
	year : { type : String },
	country : { type : String },
	poster : { type : String },
	seasons : { type : String },
	genre : { type : String, enum:
		['Drama', 'Fantasy', 'Triller', 'Comedy']
	},
	summary : { type : String }
});

module.exports = mongoose.model('TVShow', tvshowSchema);