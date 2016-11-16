// Initialize Firebase
var config = {
  apiKey: "AIzaSyB4KoM-qrygjw1NjyaF0vCLDTl_jtXB5-w",
  authDomain: "hidden-gems-64c2b.firebaseapp.com",
  databaseURL: "https://hidden-gems-64c2b.firebaseio.com",
  storageBucket: "hidden-gems-64c2b.appspot.com",
  messagingSenderId: "88207039041"
};
firebase.initializeApp(config);

//Global Variables

var su = new users("", "", "");

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
      console.log("Successfully created account!");

      var id = user.uid;
      var id = new users(firstname, lastname, email);

      console.log(user);
      console.log(id.val);
      id.printUser();
      
  }, function(error) {
    console.error("Error " + error.code + " - " + error.message);
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
    console.error("Error " + error.code + " - " + error.message);
  })
})

/* This section is for signing out scripts */
$("#signout-btn").click(function () {
  console.log("signing out");
  firebase.auth().signOut().then(function() {
    // Successfully signed out
      window.location.href = './index.html';
      console.log("Successfully logged out");
  }, function(error) {
    console.error("Error - Something went wrong while signing out.");
  });
})

// Change Password Button
$("#pass-btn").click(function () {
    console.log("changing password");
    var newpassword = $("#user-pass").val();
    su.updatePassword(newpassword);
});

//Delete User Button
$("#del-btn").click(function () {
    console.log("Deleting this user");
    su.deleteUser();
    console.log("Successfully deleted user");
    }, function(error) {
        console.log("An error has occurred. Please re-log in.");
});



