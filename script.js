var myRef = new Firebase('https://popping-torch-7165.firebaseio.com/');

var user = $('#username');
var text = $('#message');
var send_button = $('#post');

send_button.click(function() {
	/* Act on the event */
	myRef.set(user.val() + " says: " + text.val());
});