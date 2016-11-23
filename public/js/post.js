// Listen to the Post button click
document.getElementById('post-btn').addEventListener('click', function () {
  // Name of location (address or simply title)
  var title = document.getElementById('title').value || "";
  var description = document.getElementById('description').value || "";
  var coord = { lat: localStorage.lat, lng: localStorage.lng };

  // NOTE: Should be deleted later.
  var makerid = 'Testing';

  saveLocation(makerid, coord, description, title);
  //savePost({lat: lat, lng: lng}, loc, title, short_desc, long_desc);
})

// Save data to database
function saveLocation(makerid, coord, description, title) {
  // Generate a new unique ID under posts/ database
  // and create the node for this post
  var locationRef = database.ref('locations/').push();

  // Now start saving the details of the node (post) into database
  locationRef.set({
    makerid: makerid,
    date: getToday(),
    coord: coord,
    description: description,
    title: title
  }, function (error) {
    if (error)
      console.error(error);
    else
      alert("Successfully saved location")
  });
}