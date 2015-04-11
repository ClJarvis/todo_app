var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'To do list generator',
  			               header: 'My To Do List',
  			               body: ' "All the things I gotta do!" '
	});
});

module.exports = router;
