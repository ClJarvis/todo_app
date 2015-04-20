var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var todoList = [];

//include the model for a Todo that we set up in Mongoose
// var Todo = require('../models/todo');

var todoSchema = mongoose.Schema({
    toDoTitle: { type:String, required:true},
    dueDate: Date,
    description: { type:String, required:true},
    priority: Number,
    toDoDone: { type:Boolean,  default:false }
});

var Todo = mongoose.model('Todo', todoSchema);


mongoose.connect('mongodb://localhost/test');

 var app = express();
// send the todo list back to user
var sendTodoList = function (req, res, next) {
  Todo.find({}, function (err, list) {
    if (err) {
      console.log(err);
    } else {
      res.render("todoList", {
        title: "List of tasks",
        message: "Things you still need to do",
        todos: list
      });
    }
  });
}

//handle a GET request from the client to todo/list


router.get('/list', function (req, res, next) { ///need list?
    // return Todo.find( function (err, tasks) {
      Todo.find({}, function (err, list) {
        if (err) {
          console.log(err);
             res.render("error", {
                error: {
                  status: 500,
                  stack: JSON.stringify(err.errors)
                },
                message: "Could not find any tasks"
            });
        } else {
          sendTodoList(req, res, next);
        }
    });
});


// console.log("testing 1 2 3");
// handle a DELETE REQUEST FROM user to todo

router.delete('/', function (req, res) {

  Todo.find({ _id: req.body.todo_id })
          .remove(function ( err ) {

        if(err) {
          res.render("error", {
            error: {
              status: 500,
              stack: JSON.stringify(err.errors)
            },
            message: "Could not delete your task"
          });

        } else {
          res.send("success!");
        }
      });

});


//handle a POST request from client to /todo

router.post('/', function (req, res, next) {


  //user edits an existing item
  if (req.body.db_id !== "") { // space between parens?

    //find item to edit
    Todo.findOne({_id: req.body.db_id}, function (err, foundTodo) {

      if (err) {
        console.log(err);
        //send back error view so it doesn't time out on error.
        res.render("error", {
          error: {
            status: 500,
            stack: JSON.stringify(err.errors)
          },
          message: "Could not find that task."
        });
      } else {
        //found item Now update the values based on form POST Data.
        foundTodo.title = req.body.title;
        foundTodo.dueDate = req.body.dueDate;
        foundTodo.description = req.body.description;
        foundTodo.priority = req.body.priority;
        foundTodo.toDoDone = (req.body.toDoDone) ? req.body.complete : false;
        //save update list item
        foundTodo.save(function (err, newOne) {
           if (err) {
            res.render("error", {
              error: {
                status: 500,
                stack: JSON.stringify(err.errors)
              },
              message: "Could not save task with updated information."
            });
            //send back the error view so it doesn't time out an error.
           } else {
            res.redirect('/todo/list');  // /todo removed put back if needed
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

      res.redirect('/todo/list');  // /todo removed put it back if needed

      }
    });

  }

});


//handle a GET request from client
router.get('/:id', function (req, res) {
  // console.log(req.params.id);
    // if (req.params.id){  //// ??is this needed ?
    Todo.find({ _id: req.params.id }, function (err, item) {
        var thisitem = item[0];
        console.log(thisitem);
      if(err) {
        console.log(err);

        //find successful
      } else {
        res.render('todo', {
            title : 'Express Todo Example',
            // header : 'Your To Do List',
            // body: 'all the stuff you gotta do',
            todo: thisitem
          });
      }
    });
  // /};
});

//handle a GET Request from the client to  todo

router.get('/', function (req, res) {
  console.log(req.body);
  ////
      res.render('todo', {  //chnaged to todolist
        title : 'Express Todo Example',
        todo: {
            toDoTitle: ' ',
            description: ' ',
            priority: 1,
            dueDate: new Date(),
            toDoDone: false
          }
      });
});


router.get('/', function (req, res, next) {
      res.render('/', { //change todo lose your list header
          greeting: "Here's Your List",
          title: "List",
          message: "test",
          todos: todoList
    });

});


var getAllTodos = function (req,res,next) {
  Todo.find({}, function (err, list) {
    if (err) {
      console.log(err);
    } else {
      todoList = list;
      next();
    }
  });
};

router.post('/', function (req, res, next) {
  res.render("todoList", {
    title: "List of tasks",
    message: "Your tasks",
    todos: todoList
  });
});


app.post('/todo', function (req, res) {

  console.log("test terminal");
});

module.exports = router;



// Post form //



