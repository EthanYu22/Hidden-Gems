// Initialize Firebase
var config = {
  apiKey: "AIzaSyB4KoM-qrygjw1NjyaF0vCLDTl_jtXB5-w",
  authDomain: "hidden-gems-64c2b.firebaseapp.com",
  databaseURL: "https://hidden-gems-64c2b.firebaseio.com",
  storageBucket: "hidden-gems-64c2b.appspot.com",
  messagingSenderId: "88207039041"
};
firebase.initializeApp(config);

var database = firebase.database();

function loadScript(path) {
  var body = document.body;
  var script = document.createElement('script');
  script.src = path;
  body.insertBefore(script, body.firstChild);
}

function getToday() {
  // Getting date
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var year = today.getFullYear();

  today = mm + '-' + dd + '-' + year;

  return today;
}

function uuid() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 32 characters
  // after the decimal.
  return Math.random().toString(36).substr(2, 33);
};

var userid = null;

if (!window.location.href.includes('index.html')) {
  // Making sure that the user is really logged in
  firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
      window.location.href = "./index.html";
      return;
    }
    userid = user.uid;
  });
}
