displayGems();
displayFeedbacks();

function displayGems() {
  // Grab ALL posts
  var locationRef = firebase.database().ref('locations/');

  locationRef.once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      // Grab the data
      var data = childSnapshot.val();
      // Display ONLY when maker_id matches curUserid;
      if (data.makerid == userid) {
        // Add a wrapper
        var my_gems = document.getElementById('my-gems');

        // Display locations
        var el = document.createElement('p');
        el.innerHTML = "<b>Title:</b> <span style='color: blue'>" + data.title + "</span> <br />posted on date: " + data.date + "<br /><br />";
        my_gems.appendChild(el);
      }
    })
  });
}

function displayFeedbacks() {
  // Grab ALL posts
  var FeedbacksRef = firebase.database().ref('feedbacks/');

  FeedbacksRef.once('value', function (feedbacks) {
    feedbacks.forEach(function (fb) {
      var fbRef = firebase.database().ref('feedbacks/' + fb.key);
      // Grab the data
      fbRef.once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var data = childSnapshot.val();
          // Display ONLY when maker_id matches curUserid;
          if (data.userid == userid) {
            // Add a wrapper
            var my_gems = document.getElementById('feedbacks');

            // Display locations
            var el = document.createElement('p');
            el.innerHTML = "<b>Feedback:</b> <span style='color: blue'>" + data.text + "</span> <br />posted on date: " + data.date + "<br /><br />";
            my_gems.appendChild(el);
          }
        })
      })
    })
  });
}