// Listen to the Post button click
document.getElementById('post-btn').addEventListener('click', function () {
    // Name of location (address or simply title)
    var title = document.getElementById('title').value || "";
    var description = document.getElementById('description').value || "";
    var coord = {lat: localStorage.lat, lng: localStorage.lng};

    // Getting date
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var year = today.getFullYear();

    today = mm + '-' + dd + '-' + year;

    // NOTE: Should be deleted later.
    var makerid = 'Testing';

    saveLocation(makerid, today, coord, description, title);
    //savePost({lat: lat, lng: lng}, loc, title, short_desc, long_desc);
})

// Save data to database
function saveLocation (makerid, date, coord, description, title) {
    // Generate a new unique ID under posts/ database
    // and create the node for this post
    var locationRef = database.ref('locations/').push();

    // Now start saving the details of the node (post) into database
    locationRef.set({
        makerid: makerid,
        date: date,
        coord: coord,
        description: description,
        title: title
    });

    alert("Successfully saved location")
}