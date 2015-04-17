$(document).ready(function() {

	$(".deleteButton").click(function () {
		var todoItemId = $(this) [0].id;

		$.ajax({
			url: "/",
			method: "DELETE",
			data: {
				todo_id: todoItemId
		},
		success: function (response) {
			//refresh page OR
		// }
			//remove DOM Element
			$( "#todo_"+todoItemId ).remove( );
			}
		});
	});

});

