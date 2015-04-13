var express = require('express'); // tutorial test
var router = express.Router();
var mongoose = require('mongoose');
//tutorial test
// var Comment = mongoose.model('comments');


// mongoose.connect('mongodb://localhost/test');


 var formSchema = mongoose.Schema({
    toDoTitle: String,
    dueDate: Date,
    // timestamp: { type: Date, default: Date.now},
    description: String,
    priority: Number,
    toDoDone: Boolean
});

var form = mongoose.model('form', formSchema);



// GET form.  this does send info to form page//
// router.get('/', function(req, res) {
//   res.send('My funky form');

// });

router.get('/', function(req, res, next) {
    return form.find( function (err, tasks) {
    if(!err) {
        res.render('form', {
            greeting: "Here's A List",
            tasks: tasks
        });
        console.log(tasks);
        } else {
            return console.error(err);
        }
    });

});

// POST form.  //
// router.post('/', function(req, res) {
//   console.log(req.body.comment);
//   res.redirect('form');
// });


router.post('/', function(req, res) {
            new form({
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
             console.log(hello);
	});
    		res.redirect('form');
});


console.log("toDoTitle");


module.exports = router;
