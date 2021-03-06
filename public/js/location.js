var Location = function (id, makerid, date, coord, description, title, rating) {
  // These are all optional variables
  this.id = id || "";
  this.date = date || null;
  this.description = description || "";
  this.title = title || "";
  this.rating = rating || 0;
  makerid = 'testing';

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

// TODO: Get the real userid
var post_btn_func = null;
var upload_photo_func = null;
var direction_func = null;

var global_loc = null;

Location.prototype = {
  constructor: Location,
  drawMarker: function () {
    var that = this;
    // Drawing the marker for this location
    // NOTE: A location might be declared without marker present
    var google_marker = this.marker.draw();

    google.maps.event.addListener(google_marker, 'click', function () {
      $('#location-title').text(that.title);
      $("#location-description").text(that.description);

      $('#location-modal').modal('show');

      /***** This whole part is for feedbacks *****/

      // Add event listener for feedback button
      var post_btn = document.getElementById('fb-btn');
      // Remove previous listener
      if (post_btn_func)
        post_btn.removeEventListener('click', post_btn_func);

      // Make a new version of listener
      post_btn_func = function () {
        var fbRef = database.ref('feedbacks/' + that.id).push();

        // Getting the feedback text
        var feedback = document.getElementById('fb-input');
        if (!feedback.value) {
          alert("Feedback cannot be blank.");
          return;
        }

        fbRef.set({
          userid: userid,
          text: feedback.value,
          date: getToday()
        }, function (error) {
          if (error)
            console.error(error);
          else {
            alert("Successfully posted a comment");
            // Clear the feedback input
            feedback.value = "";
          }
        })
      }
      // Set listener
      post_btn.addEventListener('click', post_btn_func);

      /***** End of feedbacks section *****/

      /***** This part is for uploading picture listeners *****/
      var upload_field = document.getElementById('upload-photo');
      // Remove previous listener
      if (upload_photo_func)
        upload_field.removeEventListener('change', upload_photo_func);

      // Make a new version of listener
      upload_photo_func = function (evt) {
        // Making sure that it's an image file
        var re = /\.(jpe?g|png)$/i;
        if (!re.exec(evt.target.files[0].name)) {
          alert("Error: only accepting jpg, jpeg, and png files");
          return;
        }

        /* Save into storage first */
        var storageRef = firebase.storage().ref().child(uuid());

        storageRef.put(evt.target.files[0]).then(function (snapshot) {
          /* Now make a database query for saving the picture under this
           * post */
          var url = snapshot.downloadURL;
          var picRef = firebase.database().ref('images/' + that.id).push();

          picRef.set({
            userid: userid,
            url: url,
            date: getToday()
          }, function (error) {
            if (error)
              console.error(error);
            else
              alert("Successfully uploaded photo");
          });

        })
      }
      // Set listener
      upload_field.addEventListener('change', upload_photo_func);

      /***** End of uploading picture section *****/

      /***** Start of direction section */
      var direction_btn = document.getElementById('direction-btn');
      if (direction_func)
        direction_btn.removeEventListener('click', direction_func);

      direction_func = function () {
        var url = "http://maps.google.com/maps?daddr=" + that.coord.lat + "," +
          that.coord.lng;
        window.open(url, '_blank');
      }

      direction_btn.addEventListener('click', direction_func);
      /***** End of direction section */

      // Saving global_loc so that we can access what location we're
      // looking at later.
      global_loc = that;

      // Display images;
      that.display_thumbnails();

      // Make sure that the feedbacks section is hidden
      document.getElementById('location-fb').style.display = 'none';
      // Make sure to clear upload_field
      upload_field.value = null;
    });

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
  },
  display_thumbnails: function () {
    var photos = document.getElementById('photo-thumbnail');

    // Just like feedbacks, make a wrapper
    // In case couldn't get the location object
    if (!global_loc) return;

    // Do a few checkings to make sure that the old feedbacks are deleted
    var thumbnail_wrapper = document.getElementById('thumbnail-wrapper');
    // If feedbacks have already been present, delete it
    if (thumbnail_wrapper)
      photos.removeChild(thumbnail_wrapper);
    // Append fb-display div into location-fb
    var el = document.createElement('div');
    el.id = 'thumbnail-wrapper';
    photos.appendChild(el);

    var imgRef = database.ref('images/' + global_loc.id);

    imgRef.once('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var data = childSnapshot.val();

        // Get reference to the fb-display div
        thumbnail_wrapper = document.getElementById('thumbnail-wrapper');
        // Display all the comments
        var el = document.createElement('img');
        el.src = data.url;
        el.className = 'location-thumbnails';
        thumbnail_wrapper.appendChild(el);
      })
    })
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