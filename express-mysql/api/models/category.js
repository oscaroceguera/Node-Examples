var configDB = require('../knexfile');
var Knex = require('knex')(configDB);
var Bookshelf = require('bookshelf')(Knex);

var Post = require('./post');

var Category = Bookshelf.Model.extend({

  tableName: 'categories',

  hasTimestamps: true,

  posts: function () {
	  return this.hasMany(Post, 'category_id');
   }

});

module.exports = Category;
