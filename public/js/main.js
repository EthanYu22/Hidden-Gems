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
  body.appendChild(script);
}
