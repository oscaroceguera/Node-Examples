var configDB = require('../knexfile');
var Knex = require('knex')(configDB);
var Bookshelf = require('bookshelf')(Knex);

var Post = require('../models/post');

var Posts = Bookshelf.Collection.extend({
	model : Post
});

module.exports = Posts;
