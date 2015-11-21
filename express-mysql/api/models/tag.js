var configDB = require('../knexfile');
var Knex = require('knex')(configDB);
var Bookshelf = require('bookshelf')(Knex);

var Tag = Bookshelf.Model.extend({
  tableName: 'tags'
});

module.exports = Tag;
