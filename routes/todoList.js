var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');


var todoSchema = mongoose.Schema({
    toDoTitle: { type:String, required:true},
    dueDate: Date,
    description: { type:String, required:true},
    priority: Number,
    toDoDone: { type:Boolean,  default:false }
});

var Todo = mongoose.model('Todo', todoSchema);

var app = express();



// console.log("testing 1 2 3");
// console.log("toDoTitle");

router.delete('/', function (req, res) {

  Todo.find({ _id: req.body.todo_id })
  .remove(function( err ) {

    if(err) {
      console.log(err);
    } else {
      res.send("success!");
    }
  });

});

// Post form *//

router.get('/', function(req, res, next) {
    return Todo.find( function (err, tasks) {
    if(!err) {
        res.render('todoList', {
            greeting: "Here's Your List",
            tasks: tasks
        });
        console.log(tasks);
        } else {
            return console.log(err);
        }
    });

});

router.post('/', function(req, res) {
  var mytodo = new Todo(req.body);
  mytodo.save(function (err, todo) {

    if (err) {
      // console.log("Error!")

      res.render("error", {
        error: {
          status: 500,
          stack: JSON.stringify(err.errors)
        },
        message: "You failed!"
      });

    } else {

      Todo.find( function (err, tasks) {
console.log("this works")
        if (err) {   //had (!err) ?
          res.render('todoList', {
              title: "Todo created",
              message: "Success!",
              tasks: tasks
          });
console.log("will it render")
        } else {
          return console.log(err);
        }

      });
    }
  });
});
console.log("yes")

app.post('/todo', function (req, res) {


});


module.exports = router;
