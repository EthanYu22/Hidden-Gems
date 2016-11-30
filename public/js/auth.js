loadScript("js/users.js");
//Global Variables

var su = null;

// After the page has fully loaded,
// load su to prevent errors.
window.onload = function () {
  // Set up su
  su = new users("", "", "");
}

/* This section is for signup scripts */

// If the button is clicked
$('#signup-btn').click(function () {
  // Grab email
  var email = $("#email").val();
  // Grab password
  var password = $("#password").val();
  // Grab first and last name
  var firstname = $("#first-name").val();
  var lastname = $("#last-name").val();

  console.log(firstname, lastname, email);
  
  // Check if they exists
  // TODO: Consider checking them one by one
  if (!email || !password) {
    // TODO: Consider putting some user-friendly error on screen
    console.error("Error - email or password isn't entered.");
    // Make sure to have this return, otherwise it'll keep going through.
    return;
  }

  // Create the user
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
    // TODO: Put a message to congrat users that they've signed up
      alert ("Successfully created account!");

      var id = user.uid;
      var user = new users(id, firstname, lastname);
      user.updateUser (firstname, lastname, "", "", "");

      console.log(user);
      console.log(id.val);
      user.printUser();
      
  }, function(error) {
    alert ("Error " + error.code + " - " + error.message);
  })

  // Creating the Object - pass in required parameters
  //var tmp = new user(firstname, lastname, email);
  //tmp.printUser();
})


/* This section is for login scripts */
$('#login-btn').click(function () {
  // Grab email
  var email = $("#login-email").val();
  // Grab password
  var password = $("#login-passwd").val();

  // Check if they exists
  // TODO: Consider checking them one by one
  if (!email || !password) {
    // TODO: Consider putting some user-friendly error on screen
    console.error ("Error - email or password isn't entered.");
    return;
  }

  firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
    // Successfully signed in
    window.location.href = "./dashboard.html";
  }, function(error) {
    // If any error reported
    // TODO: Put some error on the screen
    alert("Error " + error.code + " - " + error.message);
  })
})

/* This section is for signing out scripts */
$("#signout-btn").click(function () {
  console.log("signing out");
  firebase.auth().signOut().then(function() {
    // Successfully signed out
      window.location.href = './index.html';
  }, function(error) {
    alert("Error - Something went wrong while signing out.");
  });
})