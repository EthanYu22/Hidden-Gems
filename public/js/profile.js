function log_user() {

    var fn = document.getElementById('fr-name');
    var ln = document.getElementById('ls-name');
    var email = document.getElementById('email');
    var gender = document.getElementById('gender-li');
    var age = document.getElementById('age');
    var bio = document.getElementById('bio');

    console.log(fn);
    console.log(ln);
    console.log(email);
    console.log(gender);
    console.log(age);
    console.log(bio);

    console.log("Finish Logging");

    /*var su = users(fn, ln, email);
    console.log(su);
    
    su.updateUser(fn,ln,email,gender,age,bio);*/
}