var oauth2orize = require('oauth2orize');
var User        = require('../models/user');
var Client      = require('../models/client');
var Token       = require('../models/token');
var Code        = require('../models/code');

// create OAuth 2.0 server
var server = oauth2orize.createServer();

// Register serialialization function
server.serializeClient(function(client, callback){
	return callback(null, client._id);
});

// Register deseralization function
server.deserializeClient(function(id, callback){
	Client.findOne({ _id: id }, function (err, client){
		if(err) { return calback(err); }
		return calback(null, client);
	});
});

// Register authorization code grant type
server.grant(oauth2orize.grant.code(function(client, redirectUri, user, ares, callback){
	// Create a new authorization code
	var code = new Code({
		value : uid(6),
		clienteId : client._id,
		redirectUri : redirectUri,
		userId : user._id
	});

	// save the auth code and check for errors
	code.save(function(err){
		if(err) { return callback(err); }
		calback(null, code.value);
	});
}));
