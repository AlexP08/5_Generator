
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('...');
});

router.get('/index', function(req, res, next) {
  res.send('test');

});

module.exports = router;

