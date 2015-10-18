var myRef = new Firebase('https://popping-torch-7165.firebaseio.com/');

var user = $('#username');
var text = $('#message');
var send_button = $('#post');

send_button.click(function() {
	/* Act on the event */
	myRef.push({
		username: user.val(),
		message: text.val()
	});

	text.val('');
});

myRef.on('child_added', function(snapshot) {
    msg = snapshot.val();
    var new_message = $('<div/>');
    new_message.append('<p><strong>' + msg.username + '</strong></p><p>' + msg.message + '</p>');
    //add a class for styling purposes    
    new_message.addClass('msg');

    // to differentiate between your messages and someone else's messages, we'll add a class 'me'
    // to your messages and style them accordingly
    new_message.addClass(msg.username == user.val() ? ' me' : '')   // this is an inline version of if-else    

    $("#results").append(new_message);
});

var google_login_button = $('#google_login');

google_login_button.click(function() {
	/* Act on the event */
	myRef.authWithOAuthPopup("google", function(error, authData) {
	    if(error){
	      console.log('login failed');
	    }else{
	      username =  authData.google.username;
	      //add the username to the post button
	      send_button.html("Post as " + user);

	      // enable the post message button
	      send_button.attr('disabled', 'false');
	      google_login_button.attr('disabled', 'true');
	    }
	  }, {remember: "none"}  // this will end authentication when the page is closed
	  );
});