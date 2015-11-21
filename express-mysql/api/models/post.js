var configDB = require('../knexfile');
var Knex = require('knex')(configDB);
var Bookshelf = require('bookshelf')(Knex);

var Category = require('./category');
var Tag = require('./tag')
var User = require('./user')

var Post = Bookshelf.Model.extend({

    tableName: 'posts',

    hasTimestamps: true,

    category: function () {
      return this.belongsTo(Category, 'category_id');
    },

    tags: function () {
        return this.belongsToMany(Tag);
    },

    author: function () {
        return this.belongsTo(User);
    }
});

module.exports = Post;
