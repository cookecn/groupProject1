$('.ui.dropdown')
    .dropdown();


// var map, infoWindow;

// function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: {
//             lat: -34.397,
//             lng: 150.644
//         },
//         zoom: 6
//     });
//     infoWindow = new google.maps.InfoWindow;

//     // Try HTML5 geolocation.
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(function (position) {
//             var pos = {
//                 lat: position.coords.latitude,
//                 lng: position.coords.longitude
//             };

//             infoWindow.setPosition(pos);
//             infoWindow.setContent('Location found.');
//             infoWindow.open(map);
//             map.setCenter(pos);
//         }, function () {
//             handleLocationError(true, infoWindow, map.getCenter());
//         });
//     } else {
//         // Browser doesn't support Geolocation
//         handleLocationError(false, infoWindow, map.getCenter());
//     }
// }

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//     infoWindow.setPosition(pos);
//     infoWindow.setContent(browserHasGeolocation ?
//         'Error: The Geolocation service failed.' :
//         'Error: Your browser doesn\'t support geolocation.');
//     infoWindow.open(map);
// }


// **************************************************
// IPGeolocation API (used to get geolocation of IP accessing the site)
// Documentation @ https://ipgeolocation.io/documentation/ip-geolocation-api-201812061140
var userCity;
var userLatitude;
var userLongitude;

function getUserIPLocation() {
    var ipGeoLocationAPIKey = "13254077d97f4249a0a6d6fd72053172";
    var queryURL = "https://api.ipgeolocation.io/ipgeo?apiKey=" + ipGeoLocationAPIKey + "&fields=geo";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        userCity = response.city;
        userLatitude = response.latitude;
        userLongitude = response.longitude;
        console.log(response);
        console.log(userLongitude);
})}
// Call function
getUserIPLocation();

// **************************************************

// *** TO-DO: Update function to pull User's lat & long; currently hard-coded
function getTrails() {
    var hikingProjectAPIKey = "200428466-2a448b50cc7ceff93b323bcffe658d58";
    var userLatitude = "35.8456"
    var userLongitude = "-86.3903"
    var maxDistance = "10" // Max distance in miles, default = 30, max = 200
    var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + userLatitude + "&lon=" + userLongitude + "&maxDistance=" + maxDistance + "&key=" + hikingProjectAPIKey; 
        $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var numberOfTrails = response.trails.length;
        console.log(response);
        console.log("# of trails...",numberOfTrails);
        newTable();
        // var trailImage = response.trails[0].imgSqSmall;
        // console.log("trailImage...",trailImage);
        for (i=0; i<numberOfTrails; i++) {
            var trailImage = response.trails[i].imgSqSmall;
            var trailName = response.trails[i].name;
            var trailRating = response.trails[i].stars;
            var trailDifficulty = response.trails[i].difficulty;
            var trailCondition = response.trails[i].conditionStatus;
            addRow(trailImage,trailName,trailRating,trailDifficulty,trailCondition);
        }
})}


// **************************************************
// Function to add trail data to page
// Add new table to page
function newTable() {
    var newTableElement = $("<table>");
    $(newTableElement).attr("id","results-table");
    $("#table-body").append(newTableElement);

    var tableHeaderRow = $("<tr>");
    $(tableHeaderRow).attr("id","table-header-row");
    $(newTableElement).append(tableHeaderRow);

    var newImageHeader = $("<th>");
    $(newImageHeader).attr("class","tableHeader")
    $(newImageHeader).attr("id","table-image-header")
    // $(newImageHeader).text();
    $(tableHeaderRow).append(newImageHeader);

    var newNameHeader = $("<th>");
    $(newNameHeader).attr("class","tableHeader");
    $(newNameHeader).attr("id","table-name-header");
    $(newNameHeader).text("Trail Name");
    $(tableHeaderRow).append(newNameHeader);

    var newRatingHeader = $("<th>");
    $(newRatingHeader).attr("class","tableHeader");
    $(newRatingHeader).attr("id","table-rating-header");
    $(newRatingHeader).text("Rating");
    $(tableHeaderRow).append(newRatingHeader);
    
    var newDifficultyHeader = $("<th>");
    $(newDifficultyHeader).attr("class","tableHeader");
    $(newDifficultyHeader).attr("id","table-difficulty-header");
    $(newDifficultyHeader).text("Difficulty");
    $(tableHeaderRow).append(newDifficultyHeader);

    var newConditionHeader = $("<th>");
    $(newConditionHeader).attr("class","tableHeader");
    $(newConditionHeader).attr("id","table-condition-header");
    $(newConditionHeader).text("Current Condition");
    $(tableHeaderRow).append(newConditionHeader);
}

function addRow(newImage,newName,newRating,newDifficulty,newConditionStatus) {
    // Add new row to table
    var newRow = $("<tr>")
    $("#results-table").append(newRow);

    // Add trail image to table row
    var trailImage = $("<td>");
    trailImage.attr("class","trailImage");
    $(newRow).append(trailImage);
    $(trailImage).append(newImage);

    // Add Trail Name to table row
    var trailName = $("<td>");
    trailName.attr("class","trailName");
    $(newRow).append(trailName);
    $(trailName).text(newName);
   
    // Add Trail Rating to table row
    var trailRating = $("<td>");
    trailRating.attr("class","trailRating");
    $(newRow).append(trailRating);
    $(trailRating).text(newRating);

    // Add Trail Difficulty to table row
    var trailDifficulty = $("<td>");
    trailDifficulty.attr("class","trailDifficulty");
    $(newRow).append(trailDifficulty);
    $(trailDifficulty).text(newDifficulty);

    // Add Trail Condition Status to table row
    var trailConditionStatus = $("<td>");
    trailConditionStatus.attr("class","trailConditionStatus");
    $(newRow).append(trailConditionStatus);
    $(trailConditionStatus).text(newConditionStatus);
  };

// **************************************************
// On click of "Find a Hike Near Me: Search" button
$("#find-hike-button").click(function() {
    getTrails();
});