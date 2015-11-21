var configDB = require('../knexfile');
var Knex = require('knex')(configDB);
var Bookshelf = require('bookshelf')(Knex);

var Category = require('../models/category');

var Categories = Bookshelf.Collection.extend({
	model : Category
});

module.exports = Categories;
