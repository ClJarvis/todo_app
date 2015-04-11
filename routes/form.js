// tutorial test

var express = require('express');
var router = express.Router();

/* GET form. */
router.get('/', function(req, res) {
  res.send('My funky form');
});

module.exports = router;
