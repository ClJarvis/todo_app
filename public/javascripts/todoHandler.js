$(document).ready(function() {

	$(".deleteButton").click(function () {
		var todoItemId = $(this) [0].id;
		console.log(todoItemId);
		$.ajax({
			url: "/todo",  // removed todo file is already in todo dir /
			method: "DELETE",
			data: {
				todo_id: todoItemId
		},
		success: function (response) {
			//refresh page OR
		// }
			//remove DOM Element
			$( "#todo_"+ todoItemId ).remove( );
			alert("Item has been deleted.");
			console.log("It deleted");
			}
		});
	});

	$(".editButton").click(function () {
		var todoItemId = $(this) [0].id;
		console.log(todoItemId);
		window.location.href = "/todo/" + todoItemId;

	});
});

