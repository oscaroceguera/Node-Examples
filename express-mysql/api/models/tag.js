var Bookshelf = require('../commons/bookshelf');
var Post = require('./post');

var Tag = Bookshelf.Model.extend({
  tableName: 'tags',

  posts : function(){
	  return this.belongsToMany(Post)
  }
});

module.exports = Tag;
