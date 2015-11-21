var configDB = require('../knexfile');
var Knex = require('knex')(configDB);
var Bookshelf = require('bookshelf')(Knex);

var User = Bookshelf.Model.extend({

  tableName: 'users',

  hasTimestamps: true,
  
});

module.exports = User;
