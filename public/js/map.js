loadScript("js/location.js");

// Make a Map object to be used later
var Map = function () {
  this.API_key = "AIzaSyAMPfebgDph8umAdPgVzXOlxIIbecgVvII";
  this.google_map = null;
  this.pin_drop = null;
  this.infowindow = null;
}

Map.prototype = {
  constructor: Map,
  init: function () {
    // This is used for addListener functions
    var that = this;

    // This is for map's pin drop's popup
    this.infowindow = new google.maps.InfoWindow({
      size: new google.maps.Size(150, 50)
    });

    // Declare a google map
    var santa_cruz = { lat: 36.974, lng: -122.0308 };
    this.google_map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      mapTypeControl: true,
      mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU },
      center: santa_cruz,
      navigationControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });


    // Detecting the clicks on the map
    google.maps.event.addListener(this.google_map, 'click', function () {
      that.infowindow.close();
    });

    // Detecting to the clicks on the map and also catch the events
    google.maps.event.addListener(this.google_map, 'click', function (event) {
      // TODO: Consider changing {lat, lng} into actual address
      var latlng = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      var post_btn = '<a href="./post.html"><button class="btn btn-primary">Make a Post</button></a>'

      // Delete the current pin drop if there is
      if (that.pin_drop) that.pin_drop.delete();
      // Create another instance of pin drop
      that.pin_drop = new Marker(latlng, "<b>Location</b><br>" + event.latLng + '<br>' + post_btn);
      // Draw the pin drop on the map (though it'll look like marker)
      that.pin_drop.draw();

      // Save lat and lng to the localStorage to let other pages access it
      localStorage.lat = latlng.lat;
      localStorage.lng = latlng.lng;
      google.maps.event.trigger(that.pin_drop.google_marker, 'mouseover');
    });
  },
  addressToCoordinates: function (address) {
    // This is Google's API
    var geo_url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + this.API_key;
    // To store lat and lng
    var location = null;
    $.ajax({
      method: 'GET',
      url: geo_url,
      async: false,
      success: function (response) {
        // If succeed, set location
        location = response.results[0].geometry.location;
      },
      error: function (error) {
        // If failed request
        console.error(error);
      }
    })
    // After all, return the location
    // location will have JSON format 
    // {
    //    lat: ...,
    //    lng: ...
    // }
    return location;
  },
  markPlaces: function () {
    var locationRef = firebase.database().ref('locations/');

    locationRef.once('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        // Grab the data
        var data = childSnapshot.val();
        // Create a location object for this particular location
        var location = new Location(childSnapshot.key, data.maker_id, data.date, data.coord, data.description, data.title, data.rating);
        // Draw the marker
        location.drawMarker();
      })
    });
  }
}

// Initialize the map to make it visible on the page
var map = new Map();
map.init();
map.markPlaces();

// Listenning to search's button to see if it's clicked
//    If it is clicked, search the location using Google's API to get coordinate
//    then move the map to that location, and draw pin drop
document.getElementById('search-btn').addEventListener('click', function () {
  // Grab the location in the box
  var loc = document.getElementById('loc').value;
  var coord = map.addressToCoordinates(loc);
  var latlng = {lat: coord.lat, lng: coord.lng};

  // Check if a pin_drop is present
  if (map.pin_drop) map.pin_drop.delete();

  // Move the map to that particular location
  map.google_map.panTo(new google.maps.LatLng(coord.lat, coord.lng));

  // Create a pin drop at that location
  // TODO: Convert loc into actual address or city's name
  var post_btn = '<a href="./post.html"><button class="btn btn-primary">Make a Post</button></a>'
  map.pin_drop = new Marker(latlng, "<b>Location</b><br>" + loc + '<br>' + post_btn);
  map.pin_drop.draw();

  // Trigger a click to open the pop up 
  google.maps.event.trigger(map.pin_drop.google_marker, 'mouseover');
})

// Listenning to view-feedback click
// Display if not, or un-display if it is
document.getElementById('view-fb').addEventListener('click', function () {
  var location_fb = document.getElementById('location-fb');
  if (location_fb.style.display == 'none')
    location_fb.style.display = 'block';    
  else
    location_fb.style.display = 'none';    

  // Get feedbacks
  if (!global_loc) return;

  var fbRef = database.ref('feedbacks/' + global_loc.id);

  fbRef.once ('value', function (snapshot) {
    snapshot.forEach (function (childSnapshot) {
      var data = childSnapshot.val();
      
      // Append comments into location-fb <div>
      var el = document.createElement('p');
      el.innerText = data.text;
      document.getElementById('location-fb').appendChild(el);      
    })
  })
})