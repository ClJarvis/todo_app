var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users =require('./routes/users');
var todo=require('./routes/todo');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/todo', todo);
app.use('/create', todo);

//get data from database

///not on joe git hub stuff from validation on wed?
  // app.get('/', function(req, res) {
  //   res.send('hello world');
  // });

  // app.post('/todo', function (req, res) {
  //   console.log('connected');  /// post to database
  //   res.send('POST request to the homepage');
  // });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

// tutorial mherman.org

// app.use('/form', form);
// var form = require('./routes/form');



// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function (callback) {
//   // yay!
//   console.log("connected")
// });




// var firstTodo = new Todo({
//    due_date: Date.now(),
//     timestamp: { type: Date, default: Date.now},
//     description: "My first To do item",
//     title: "First",
//     priority: 10,
//     compelete: false
// });



// firstTodo.save(function (err, first) {
//   if (err) {
//    return console.error(err);
//     }
//   console.log(first);

// });


// var routes = require('./routes/index');
// var users = require('./routes/users');



