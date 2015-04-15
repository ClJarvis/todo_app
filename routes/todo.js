var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');





var todoSchema = mongoose.Schema({
    toDoTitle: { type:String, required:true},
    dueDate: Date,
    description: { type:String, required:true},
    priority: Number,
    toDoDone: { type:Boolean, required:true, default:false }
});

var Todo = mongoose.model('Todo', todoSchema);

var app = express();



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


app.post('/todo', function (req, res) {
  var mytodo = new Todo(req.body);
  mytodo.save(function (err, todo) {
    if (err) {

      res.render("error", {
        error: {
          status: 500,
          stack: JSON.stringify(err.errors)
        },
        message: "You failed!"
      });

    } else {

      res.render("todoList", {
        title: "Todo created",
        message: "Success!",
        postData: JSON.stringify(req.body, null, 2)
      });

    }

    console.log(todo);
  });

});


module.exports = router;
