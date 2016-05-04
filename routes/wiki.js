var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('index', { /* template locals context */ });
  // res.send('got to GET /wiki/');
});

router.post('/', function(req, res, next) {
  res.send('got to POST /wiki/');
});

router.get('/add', function(req, res, next) {
  res.send('got to GET /wiki/add');
});


module.exports = router;
