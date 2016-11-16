var Location = function (id, makerid, date, coord, description, title, rating) {
  // These are all optional variables
  this.id = id || "";
  this.date = date || null;
  this.description = description || "";
  this.title = title || "";
  this.rating = rating || 0;

  // This is the required variables
  if (!coord || !makerid)
    console.log("Missing required variables for location!")
  this.maker_id = makerid;
  this.coord = coord;

  // What should be displayed in popup
  //var post_btn = '<a href="./feedback.html"><button class="btn btn-primary">Feedback</button></a>';
  var content = '<b>' + title + '</b><br>';
  this.marker = new Marker(coord, content);
}

Location.prototype = {
  constructor: Location,
  drawMarker: function () {
    // Drawing the marker for this location
    // NOTE: A location might be declared without marker present
    this.marker.draw();
  },
  deleteMarker: function () {
    // Simply call the marker.delete() function
    // Because it'll be handled for us
    this.marker.delete();
  },
  update: function () {
    // NOTE: Steven provided codes for this
    var locationRef = null;

    // In case the id isn't provided before
    if (this.id == "")
      locationRef = database.ref('locations/' + this.id).push();
    else
      locationRef = database.ref('locations/' + this.id);

    // Now start saving the details of the node (post) into database
    locationRef.set({
      maker_id: this.makerid,
      date: this.date,
      coord: this.coord,
      description: this.description,
      title: this.title,
      rating: this.rating
    });
  }
}

// Used for marker
var Marker = function (latlng, content) {
  this.lat = latlng.lat;
  this.lng = latlng.lng;
  this.google_marker = null;
  this.content = content;
}

Marker.prototype = {
  constructor: Marker,
  draw: function () {
    var that = this;
    // Destroy the previous marker for this location
    this.delete();

    // Set up a new marker
    this.google_marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.lat, this.lng),
      map: map.google_map,
      zIndex: Math.round(this.lat * -100000) << 5
    });

    // Listen to hovers, if the marker has been clicked on
    google.maps.event.addListener(this.google_marker, 'mouseover', function () {
      // Open the pop up with "content"
      map.infowindow.setContent(that.content);
      map.infowindow.open(map.google_map, that.google_marker);

      // Save the coordinates to localStorage so that other
      // scripts can access it
      localStorage.lat = that.lat;
      localStorage.lng = that.lng;
    });

    return this.google_marker;
  },
  delete: function () {
    // Simply delete the marker
    if (this.google_marker) {
      this.google_marker.setMap(null);
      this.google_marker = null;
    }
  }
}

// Getting location based on the location's ID 
// Return: null if not found
//         Location () if found
function getLocation(id) {
  // Getting the location's reference
  var locationRef = firebase.database().ref('locations/' + id);

  var locationObj = null;

  // Get the location's data'
  locationRef.once('value', function (snapshot) {
    var data = snapshot.val();
    if (data) {
      // Create Location object
      locationObj = Location(snapshot.key, data.maker_id,
        data.date, data.coord,
        data.description, data.title,
        data.rating);
    }
  })

  return locationObj;
}
