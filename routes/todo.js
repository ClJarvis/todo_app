var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var todoList = [];

//include the model for a Todo that we set up in Mongoose
// var Todo = require('../models/todo');


mongoose.connect('mongodb://localhost/test');

var getAllTodos = function (req,res,next) {
  Todo.find({}, function (err, list) {
    if (err) {
      console.log(err);
    } else {
      todoList = list;
      next();
    }
  });
}


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
// handle a DELETE REQUEST FROM user to todo

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

// Post form //

//handle a GET request from the client to todo/list

router.get('/', function(req, res, next) {
    // return Todo.find( function (err, tasks) {
      Todo.find({}, function (err, list) {
        if (err) {
          console.log(err);
        } else {
          getAllTodos(req, res, next);
        }
    });
});

router.get('/', function (req, res, next) {
      res.render('todoList', { //change todo lose your list header
          greeting: "Here's Your List",
          title: "List",
          message: "test",
          todos: todoList
    });

});

//handel a POST request from client to /todo

router.post('/', function(req, res, next) {


  //user edits an existing item
  if (req.body._id) {

    //find item to edit
    Todo.findOne({_id: req.body._id}, function(err, foundTodo) {
      if (err) {
        console.log(err);
        //send back error view so it doesn't time out on error.
      } else {
        //found item Now update the values based on form POST Data.
        foundTodo.title = req.body.title;
        foundTodo.dueDate = req.body.dueDate;
        foundTodo.description = req.body.description;
        foundTodo.priority = req.body.priority;
        foundTodo.toDoDone = req.body.toDoDone;
        //save update list item
        foundTodo.save(function (err, newOne) {
           if (err) {
            console.log(err);
            //send back the error view so it doesn't time out an error.
           } else {
            res.send("YAY! We updated it successfuly!")
           }
        });
      }

    });

  } else {
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

      getAllTodos(req, res, next);

      }
    });

  }

});

router.post('/', function (req, res, next) {
  res.render("todoList", {
    title: "List of tasks",
    message: "Your tasks",
    todos: todoList
  });
});


app.post('/todo', function (req, res) {


});

//handle a GET request from client
router.get('/:id', function (req, res) {
  // console.log(req.params.id);
   if (req.params.id){  //// ??is this needed ?
    Todo.find({ _id: req.params.id }, function (err, item) {
        var thisitem = item[0];
        console.log(thisitem);
      if(err) {
        console.log(err);

        //find successful
      } else {
        res.render('index',
          {
            title : 'Express Todo Example',
            header : 'Your To Do List',
            body: 'all the stuff you gotta do',
            todo: thisitem
          });

      }
    });
  };


});

//handle a GET Request from the client to  todo

router.get('/', function (req, res) {
  console.log(req.body);
  ////
      res.render('index',
      {
        title : 'Express Todo Example',
            header : 'Hello',
            body: 'the jungle',
          }
      );
});


module.exports = router;
