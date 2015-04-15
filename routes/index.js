var express = require('express');
var router = express.Router();


//GET home page. *//
router.get('/', function(req, res, next) {
  res.render('index', { title: 'todoList',
  			               header: 'My To Do List',
  			               body: ' "All the things I gotta do!" '
	});
});

module.exports = router;
