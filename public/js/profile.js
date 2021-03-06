﻿function log_user() {

    var fn = document.getElementById('fr').value;
    var ln = document.getElementById('ls-name').value;
    var gender = document.getElementById('gender-c').value;
    var g = "";
    var age = document.getElementById('age').value;
    var bio = document.getElementById('bio').value;

    console.log(fn);
    console.log(ln);
    console.log(gender);
    console.log(age);
    console.log(bio);

    console.log("Finish Logging");

    //Testing on updating user into firebase
    var su = new users(userid, fn, ln);
    su.editUser(userid, fn, ln, gender, age, bio);
    su.updateUser(fn, ln, gender, age, bio);

    //su.updateUser("tim", "yue", "test12@hg.com", "male", 21, "hello");
}


// Making sure that the user is really logged in
firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
        window.location.href = "./index.html";
        return;
    }

    // Whenever the user goes on the form, their info from the database will show. 
    // Goes through each entry in the database, if the id of that entry matches the user's id, then display the information. 
    var userref = firebase.database().ref('users/' + user.uid);
    userref.once('value', function (snapshot) {
        var data = snapshot.val();
        document.getElementById('fr').value = data.firstname;
        document.getElementById('ls-name').value = data.lastname;
        document.getElementById('gender-c').value = data.gender;
        document.getElementById('age').value = data.age;
        document.getElementById('bio').value = data.bio;
    })
})