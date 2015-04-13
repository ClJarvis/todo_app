console.log("testing 1 2 3");


$(document).ready(function() {
	console.log("time to validate");
	$("#todoForm").validate/*.setDefaults*/({
		rules: {
			priority: {
				required: true,
				rangelength: [1, 10]
			},
			title:  {
				required: true,
				minlength: 5,
				maxlength: 32
			},
			dueDate: {
				required: true,
				dateISO: true
			}
		  }
		});
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



