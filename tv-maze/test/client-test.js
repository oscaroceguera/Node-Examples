var test = require('tape')
var nock = require('nock')
var tvmaze = require('../')
var Client = require('../lib/client')

var endpoint = 'http://api.waze.test'

test('should create a client', function (t) {
  t.ok(tvmaze.createClient, 'should exist')
  t.equals(typeof tvmaze.createClient, 'function', 'whould be a function')

  var client = tvmaze.createClient()
  t.ok(client instanceof Client, 'should be instance of client')

  t.end()
})

// Prueba para que la peticion falle
test('should fail with unknow endpoint', function(t){
	var client = tvmaze.createClient({ endpoint: endpoint })

	nock(endpoint)
	.get('/foo')
	.reply(404)

	//  request
	client._request('/foo', 'GET', null, function (err, body) {
		t.ok(err, 'should faild')
		t.end()
	})
})

test('should list shows not query is passed', function(t){
	var client = tvmaze.createClient({ endpoint: endpoint })

	nock(endpoint)
		.get('/search/shows')
		.reply(400, {
			code : 0,
			message : 'Missing required parameter: q',
			name : 'BAd request',
			status : 400
		})

	client._request('/search/shows', 'GET', null, function (err, res) {
		t.ok(err, 'bad request error')
		t.notOk(res, 'should be null')
		t.end()
	})
})

test('should list shows', function (t) {
  var client = tvmaze.createClient({ endpoint: endpoint })

  t.equals(typeof client.shows, 'function', 'should be a function')

  nock(endpoint)
    .get('/shows')
	.reply(200, [])

  client.shows(function (err, shows) {
    t.error(err, 'should be not an error')
    t.ok(Array.isArray(shows), 'should be an array')
    t.end()
  })
})

test('should search shows', function (t) {
	var client = tvmaze.createClient({ endpoint: endpoint })

	t.equals(typeof client.search, 'function', 'should be a function')

	nock(endpoint)
		.get('/search/shows')
		.query({ q: 'limitless' })
		.reply(200, [{ name: 'Limitless' }])

	client.search('limitless', function(err, shows){
		t.error(err, 'should be an error')
		t.ok(Array.isArray(shows), 'should be not an array')
		t.equals(shows[0].name, 'Limitless', 'should retrieve a show name')
		t.end()
	})
})
