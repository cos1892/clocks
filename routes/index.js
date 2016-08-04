var express = require('express');
var router = express.Router();
var connection = require('../bin/dbConnection');
/* GET home page. */
router.get('/', function(req, res, next) {

  connection.query('SELECT * from watch', function(err, watchs, fields) {
    if (err) return res.status(500).end();

    connection.query('SELECT * from watchmaker', function(err, watchmakers, fields) {
      if (err) return res.status(500).end();

      res.render('index', { center: 'main', watchs: watchs, watchmakers: watchmakers});
    });

  });

});

router.get('/addWatch', function(req, res, next) {

  connection.query('SELECT * from watch', function(err, watchs, fields) {

    if (err) return res.status(500).end();

    res.render('index', { center: 'addWatch',watchs: watchs});

  });

});

router.post('/addWatches', function(req, res, next) {

  connection.query('INSERT INTO `watch` set ?', [req.body], function(err, addwatches, fields) {
    if (err) return res.status(500).end();

  });

  res.redirect('/addWatch');

});

router.get('/addWatchMaker', function(req, res, next) {


  connection.query('SELECT * from watchmaker', function(err, watchmakers, fields) {
    if (err) return res.status(500).end();

    res.render('index', { center: 'addWatchMaker',watchmakers: watchmakers});

  });

});

router.post('/addWatchMakers', function(req, res, next) {

  connection.query('INSERT INTO `watchmaker` set ?', [req.body], function(err, addwatchmakers, fields) {
    if (err) return res.status(500).end();

  });

  res.redirect('/addWatchMaker');

});

router.post('/watches', function(req, res, next) {
  console.log(req.body.idWatch);
  connection.query('Delete from `watch` Where idwatch="' + req.body.idWatch + '"', function(err, deletewatches, fields) {
    if (err) return res.status(500).end();
    res.redirect('/');
  });

});

router.post('/watchmakers', function(req, res, next) {
  console.log(req.body.idWatch);
  connection.query('Delete from `watchmaker` Where idwatchmaker="' + req.body.idwatchmaker + '"', function(err, deletewatchmakers, fields) {
    if (err) return res.status(500).end();
    res.redirect('/');
  });

});

router.get('/updateWatch', function(req, res, next) {

  connection.query('SELECT * from watch', function(err, watchs, fields) {

    if (err) return res.status(500).end();

    res.render('index', { center: 'updateWatch',watchs: watchs});

  });

});

router.post('/updateWatches', function(req, res, next) {

  connection.query('Update `watch` set ? Where idwatch=?', [req.body, req.body.idwatch], function(err, updatewatches, fields) {

    if (err) return res.status(500).end();

  });

  res.redirect('/updateWatch');

});

router.get('/updateWatchMaker', function(req, res, next) {


  connection.query('SELECT * from watchmaker', function(err, watchmakers, fields) {
    if (err) return res.status(500).end();

    res.render('index', { center: 'updateWatchMaker',watchmakers: watchmakers});

  });

});

router.post('/updateWatchMakers', function(req, res, next) {

  connection.query('Update `watchmaker` set ? Where idwatchmaker=?', [req.body, req.body.idwatchmaker], function(err, updatewatchmakers, fields) {
    if (err) return res.status(500).end();

  });

  res.redirect('/updateWatchMaker');

});

module.exports = router;
