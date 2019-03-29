// Variables saved for use everywhere
window.startedAt = secondsSinceEpoch();
window.randomname = "Anonymous" + rand(100,999);
window.name = window.randomname;

window.onload = function() {

  // TODO: Check when we login/logout
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      window.name = user.displayName;
    } else {
      window.name = window.randomname;
    }
    sendOwlBotMessage("Welcome " + window.name + " :]");
  });

  // TODO: Check when another user logs in/logs out
  /*firebase.database().ref('users').on('child_added', function(data) {
    window.users[data.key()] = true;
    alert(JSON.stringify(window.users));
  });
  firebase.database().ref('users').on('child_removed', function(data) {
    window.users[data.key()] = true;
    alert(JSON.stringify(window.users));
  });*/

  // TODO: Check for new messages added
  firebase.database().ref('messages').on('child_added', function(data) {
    if(window.startedAt < data.val().timestamp) {
      recievedMessage(data.val().sender, data.val().message);
    }
  });

  // Allow messages to be sent by the enter key (in addition to the send button)
  var input = document.getElementById("input_message");
  input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("input_send").click();
    }
  });

}

// TODO: Wait for a file to be added
function handleFiles(files) {
  var name = rand(100000000,999999999) + "__(" + window.name + ")";
  firebase.storage().ref().child(name).put(
    document.getElementById('input_file').files[0]
  ).then(function(snapshot) {
    if(snapshot['state'] == "success") {
      sendMessage(window.name, "/file " + name);
    }
  })
}

// TODO: Implement Firebase Signin
function signIn() {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

  firebase.auth().signInWithPopup(provider).catch(function(error) {
    alert("Error: " + error.message);
  });

}

// TODO: Implement Firebase SignOut
function signOut() {
  firebase.auth().signOut();
}

// TODO: Implement message send -- sender is usually window.name
function sendMessage(sender, message) {

  // If we're not logged in, make the user do that
  if(window.loggedIn == false || message == "login") {
    return signIn();
  }

  if(message == "logout") {
    return signOut();
  }

  var newMessage = firebase.database().ref('messages').push();
  newMessage.set({
    'sender': sender,
    'message': message,
    'timestamp': secondsSinceEpoch()
  })

}

// TODO: Implement sending a message from our "OWLBOT" friend
function sendOwlBotMessage(message) {
  sendMessage('OWLBOT', message);
}

// TODO: Implement message recieved
function recievedMessage(sender, message) {

  // Check if an image was added
  if(message.startsWith("/file ")) {
    firebase.storage().ref(message.substring(6)).getDownloadURL().then(function(url) {
      document.getElementById("messages").innerHTML +=
        createImageMessageElement(sender, url, isMe(sender) ? 'r' : 'l');
        scrollToBottom();
    });
  } else {
    // Add the message to the ui
    document.getElementById("messages").innerHTML +=
      createMessageElement(sender, message,
        isMe(sender) ? 'r' : 'l');
    scrollToBottom();
  }

  // Check if the message has any bad words
  if(hasBadWords(message)) {
    sendOwlBotMessage('Hey ' + sender + '! That\'s a bad word!');
  }

}

// TODO: Decide whether or not the user sent this message
function isMe(sender) {
  return (sender == window.name || sender == window.randomname);
}

// ********************************************************************************** //
// ******* Please note that everything beyond this point is pre-written code  ******* //
// ******* to make the lives of OwlHackers like you easier. Feel free to take ******* //
// ******* a look around. If you have any questions or suggestions, please do ******* //
// *******                    not hesitate to ask.                            ******* //
// ********************************************************************************** //
// *******     (c) 2019 Brendan Manning. Released under the MIT License       ******* //
// *******          brendan.manning@temple.edu | @votemanning2036             ******* //
// ********************************************************************************** //

// Utility method to see if a string has any bad words
function hasBadWords(str) {
  var badwords = ['stupid', 'dumb', 'mumps', 'mumpy'];
  for(var i = 0; i < badwords.length; i++) {
    if(str.toLowerCase().includes(badwords[i])) {
      return true;
    }
  }
  return false;
}

// Utility method to get seconds since epoch
function secondsSinceEpoch() {
  return (new Date() / 1000);
}

// Utiity method for random int between
function rand(lower, upper) {
  return Math.floor(Math.random() * upper) + lower;
}

// Connect the send button to the method above
function ui_sendMessage() {
  if(document.getElementById("input_message").value == "") {
    return;
  }
  sendMessage(window.name, document.getElementById("input_message").value);
  document.getElementById("input_message").value = "";
}

// Create a chat element
function createMessageElement(sender, message, side) {
  return '<div ' + side + ' class="msg-' + side + '"><span class="bold">' + sender +  '</span><span>  ' + message + '</span></div>';
}

function createImageMessageElement(sender, url, side) {
  return '<div class="msg-' + side + '" style="height: 225px; width: 51%; background-color: transparent !important;"><div style="' + ((side == 'r') ? 'margin-left: auto; margin-right: 0px; ' : '') + ' height: 225px; width: auto; padding: 8px; border-radius: 8px;"><img src="' + url + '" style="border-radius: 8px; width: auto; height: 200px;"><p style="margin-top: 6px !important;">Sent by ' + sender + '</p></img></div></div>';
}

// Scroll to the bottom of the messages messages container
function scrollToBottom() {
  var messagesContainer = document.getElementById("messages");
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
