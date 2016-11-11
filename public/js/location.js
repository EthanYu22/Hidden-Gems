var Location = function (id, makerid, date, coord, description, title, rating) {
  // These are all optional variables
  this.date = date || null;
  this.description = description || "";
  this.title = title || "";
  this.rating = rating || null;

  // This is the required variables
  if (!coord || !id || !makerid)
    console.log("Missing required variables for location!")
  this.id = id;
  this.maker_id = makerid;

  // What should be displayed in popup
  var post_btn = '<a href="./feedback.html"><button class="btn btn-primary">Feedback</button></a>';
  var content = '<b>' + title + '</b><br>' + post_btn;
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
    // NOTE: Steven is working on this part
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

    // Listen to clicks, if the marker has been clicked on
    google.maps.event.addListener(this.google_marker, 'click', function () {
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