var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');


var todoSchema = mongoose.Schema({
    toDoTitle: String,
    dueDate: Date,
    // timestamp: { type: Date, default: Date.now},
    description: String,
    priority: Number,
    toDoDone: Boolean
});

var Todo = mongoose.model('Todo', todoSchema);


console.log("testing 1 2 3");
console.log("toDoTitle");



// Post form *//

router.get('/', function(req, res, next) {
    return Todo.find( function (err, tasks) {
    if(!err) {
        res.render('todo', {
            greeting: "Here's Your List",
            tasks: tasks
        });
        console.log(tasks);
        } else {
            return console.error(err);
        }
    });

});

router.post('/', function(req, res) {
	new Todo({
		toDoTitle: req.body.toDoTitle,
		dueDate: req.body.dueDate,
		description: req.body.description,
		toDoDone: req.body.toDoDone,
 		priority: req.body.priority
        //complete: false
    }).save(function (err, task) {
        if(err) {
            return console.err(err);
        }
            console.log(task);
	});
    		res.redirect('todo');
});



// console.log(toDoTitle);


// jQuery.validator.setDefaults({
//   debug: true
// });



// $(document).ready(function() {
// 	console.log("time to validate");
// 	$("#todoForm").validate/*.setDefaults*/({
// 		rules: {
// 			priority: {
// 				required: true,
// 				rangelength: [1, 10]
// 			},
// 			title:  {
// 				required: true,
// 				minlength: 5,
// 				maxlength: 32
// 			},
// 			dueDate: {
// 				required: true,
// 				dateISO: true
// 			}
// 		  }
// 		});
// });

module.exports = router;
