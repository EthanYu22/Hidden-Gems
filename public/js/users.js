/*function user(id, firstname, lastname, email, gender, age, bio) {
	this.id = id;
	this.firstname = firstname;
	this.lastname = lastname;
	this.email = email;
	this.gender = gender;
	this.age = age;
	this.bio = bio;
} ;
*/

// Constructor 
var users = function(firstname, lastname, email) {
	this.firstname = firstname;
	this.lastname = lastname;
	this.email = email;
};

// Function to update user object variables ( not firebase ) -- see updateUser() for firebase 
users.prototype.editUser = function(id, firstname, lastname, email, gender, age, bio) {
	this.id = id;
	this.firstname = firstname;
	this.lastname = lastname;
	this.email = email;
	this.gender = gender;
	this.age = age;
	this.bio = bio;
};

// Function to load user data into firebase table
users.prototype.updateUser = function(fn, ln, email, gender, age, bio) {

    // Generate a new unique ID under posts/ database
    // and create the node for this post
    var editUser = database.ref('users/').push();
	
	// Now start saving the details of the node (user) into database
	editUser.set({
			firstname: fn,
			lastname: ln,
			email: email,
			gender: gender,
			age: age,
			bio: bio
	});
}

// Update the user's password. This does not require old password, so you can change it if you do not remember password.
users.prototype.updatePassword = function(password) {
    var user = firebase.auth().currentUser;

    user.updatePassword(password).then(function() {
        //Update Successful
        console.log("Password successfully changed");
    }, function(error) {
        // Error happened
        console.log("An error has occured");
    });        
};

// Function to delete the user from the firebase auth
users.prototype.deleteUser = function() {
	var user = firebase.auth().currentUser;
	user.delete().then(function() {
	    // User Deleted
	    console.log("User Successfully Deleted");
	}, function(error) {
	    //Error Occurred 
	    console.log("An error has occurred.");
	} );
};

// Logs the users first name , last name, and email in the console
users.prototype.printUser = function () {
    console.log(this.firstname, this.lastname, this.email);
};


