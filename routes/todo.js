var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');


var todoSchema = mongoose.Schema({
    dueDate: Date,
    timestamp: { type: Date, default: Date.now},
    description: String,
    ToDoTitle: String,
    priority: Number,
    compelete: Boolean
});

var Todo = mongoose.model('Todo', todoSchema);


console.log("testing 1 2 3");



// Post form *//

router.get('/', function(req, res, next) {
    return Todo.find( function (err, tasks) {
    if(!err) {
        res.render('todo', {
            greeting: "Howdy",
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
		dueDate: req.body.dueDate,
		toDoTitle: req.body.toDoTitle,
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





// jQuery.validator.setDefaults({
//   debug: true
// });



// var firstTodo = new Todo({
//    due_date: Date.now(),
//     timestamp: { type: Date, default: Date.now},
//     description: "My first To do item",
//     title: "First",
//     priority: 10,
//     compelete: false
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
