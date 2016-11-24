function log_user() {

    var fn = document.getElementById('fr-name').value;
    var ln = document.getElementById('ls-name').value;
    var email = document.getElementById('email').value;
    var gender = document.getElementById('gender-c').value;
    var g = "";
    var age = document.getElementById('age').value;
    var bio = document.getElementById('bio').value;

    console.log(fn);
    console.log(ln);
    console.log(email);
    console.log(gender);
    console.log(age);
    console.log(bio);

    console.log("Finish Logging");

    //Testing on updating user into firebase
    var su = new users(fn, ln, email);
    su.updateUser(fn, ln, email, gender, age, bio);

    //su.updateUser("tim", "yue", "test12@hg.com", "male", 21, "hello");

    /*var su = users(fn, ln, email);
    console.log(su);
    
    su.updateUser(fn,ln,email,gender,age,bio);*/
}