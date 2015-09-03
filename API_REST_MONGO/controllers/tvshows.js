var mongoose = require('mongoose');
var TVShow   = mongoose.model('TVShow');

// GET - Return all tvshows in the DB
exports.findAllTVShows = function(req, res) {
  TVShow.find(function(err, tvshows) {
    if (err) res.satus(500).send(err.message);

    console.log('GET /tvshows');
    res.status(200).jsonp(tvshows)
  })
}
// GET - return a tvshow with specified ID
exports.findById = function(req, res) {
  TVShow.findById(req.params.id, function(err, tvshow) {
    if (err)  res.satus(500).send(err.message);

    console.log('GET /tvshow/' + req.params.id);
    res.status(200).jsonp(tvshow);
  })
}
// POST - INSET a new tvshow in the db
exports.addTVShow = function(req, res) {
  console.log('POST');
  console.log(req.body);

  var tvshow = new TVShow({
    title  : req.body.title,
    year   : req.body.year,
    country: req.body.country,
    poster : req.body.poster,
    seasons: req.body.seasons,
    genre  : req.body.genre,
    summary: req.body.summary
  });

  tvshow.save(function(err, tvshow) {
    if (err)  res.satus(500).send(err.message);

    res.status(200)
      .jsonp(tvshow)
  })
}

// Update - Update a register alredy exists
exports.updateTVShow = function(req, res) {
  TVShow.findById(req.params.id, function(err, tvshow) {
    tvshow.title = req.body.title;
    tvshow.year = req.body.year;
    tvshow.country = req.body.country;
    tvshow.poster = req.body.poster;
    tvshow.genre = req.body.genre;
    tvshow.summary = req.body.summary;

    tvshow.save(function(err) {
      if (err)  res.satus(500).send(err.message);
      res
        .status(200)
        .jsonp(tvshow)
    })
  });
}

// Delete - a tvshow with specified ID
exports.deleteTVShow = function(req, res) {
  TVShow.findById(req.params.id, function(err, tvshow) {
    tvshow.remove(function(err) {
      if (err) {
        return  res.satus(500).send(err.message);
      }
      res.status(200);
    })
  });
}
