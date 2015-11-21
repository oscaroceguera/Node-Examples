var configDB = require('../knexfile');
var Knex = require('knex')(configDB);
var Bookshelf = require('bookshelf')(Knex);

var Tag = require('../models/tag');

var Tags = Bookshelf.Collection.extend({
	model : Tag
});

module.exports = Tags;
