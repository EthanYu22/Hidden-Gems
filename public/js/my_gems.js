displayGems();

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
        el.innerHTML = "Title: <span style='color: blue'>" + data.title + "</span> posted on date: " + data.date;
        my_gems.appendChild(el);
      }
    })
  });
}