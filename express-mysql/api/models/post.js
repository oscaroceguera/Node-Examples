var Bookshelf = require('../commons/bookshelf');
Bookshelf.plugin('registry')

var Category = require('./category')
//require('./category');

//Bookshelf.model('Category', categoryModel);


var Tag = require('./tag')
var User = require('./user')

// var Category = Bookshelf.Model.extend({
//
//   tableName: 'categories',
//
// });

var Post = Bookshelf.Model.extend({

  tableName: 'posts',

  hasTimestamps: true,

  categories: function () {
    return this.belongsTo('Category', 'category_id');
  },

  tags: function () {
    return this.belongsToMany(Tag);
  },

  author: function () {
    return this.belongsTo(User);
  }
});

module.exports = Bookshelf.model('Post',Post);
