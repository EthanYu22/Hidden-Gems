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
var user = function(firstname, lastname, email) {
	this.firstname = firstname;
	this.lastname = lastname;
	this.email = email;
};

user.prototype.editUser = function(id, firstname, lastname, email, gender, age, bio) {
	this.id = id;
	this.firstname = firstname;
	this.lastname = lastname;
	this.email = email;
	this.gender = gender;
	this.age = age;
	this.bio = bio;
};

user.prototype.updateUser = function(fn, ln, email, gender, age, bio){
	// Generate a new unique ID under posts/ database
    // and create the node for this post
    var editUser = database.ref('users/').push();
	
	// Now start saving the details of the node (user) into database
	editUser.set({
		userID:{
			firstname: fn,
			lastname: ln,
			email: email,
			gender: gender,
			age: age,
			bio: bio
		}
	});
}

user.prototype.updatePassword = function(password) {
	// body...
};

user.prototype.deleteUser = function() {
	var user = firebase.auth().currentUser;
	user.delete().then(function() {

	}, function(error) {

	} );
};


