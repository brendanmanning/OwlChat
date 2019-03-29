// Variables saved for use everywhere
window.startedAt = secondsSinceEpoch();
window.randomname = "Anonymous" + rand(100,999);
window.name = window.randomname;

window.onload = function() {

  // (7) TODO: Check when we login/logout
  //
  //
  //
  //
  //
  //
  //

  // (1) TODO: Check for new messages added
  //
  //
  //
  //
  //
  //

  // Allow messages to be sent by the enter key (in addition to the send button)
  var input = document.getElementById("input_message");
  input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("input_send").click();
    }
  });

}

// (9) TODO: Wait for a file to be added
function handleFiles(files) {
}

// (5) TODO: Implement Firebase Signin
function signIn() {
}

// (6) TODO: Implement Firebase SignOut
function signOut() {
}

// (2) TODO: Implement message send -- sender is usually window.name
function sendMessage(sender, message) {

  // If we're not logged in, make the user do that

  // If the user asked to logout

  // Otherwise, send

}

// (8) TODO: Implement sending a message from our "OWLBOT" friend
function sendOwlBotMessage(message) {
  // Make use of the existing call, just change the name
}

// (3) TODO: Implement message recieved
function recievedMessage(sender, message) {
}

// (4) TODO: Decide whether or not the user sent this message
function isMe(sender) {
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
