
var userCity;
var userLatitude;
var userLongitude;
var destinationLatitude;
var destinationLongitude;

// **************************************************
// IPGeolocation API (used to get geolocation of IP accessing the site)
// Documentation @ https://ipgeolocation.io/documentation/ip-geolocation-api-201812061140

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
        console.log("Lat: ", userLatitude);
        console.log("Long: ", userLongitude);
        getDirections();
    })
}
// Call function
// getUserIPLocation();

// **************************************************
getUserIPLocation();
// *** TO-DO: Update function to pull User's lat & long; currently hard-coded
function getTrails() {
    var hikingProjectAPIKey = "200428466-2a448b50cc7ceff93b323bcffe658d58";
    getUserIPLocation();
    console.log(userLatitude);
    var maxDistance = "50" // Max distance in miles, default = 30, max = 200
    var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + userLatitude + "&lon=" + userLongitude + "&maxDistance=" + maxDistance + "&key=" + hikingProjectAPIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var numberOfTrails = response.trails.length;
        console.log(response);
        newTable();
        for (i = 0; i < numberOfTrails; i++) {
            var trailImage = response.trails[i].imgSqSmall;
            var trailName = response.trails[i].name;
            var trailRating = response.trails[i].stars;
            var trailDifficulty = response.trails[i].difficulty;
            var trailCondition = response.trails[i].conditionStatus;
            var trailLatitude = response.trails[i].latitude;
            var trailLongitude = response.trails[i].longitude;
            if (trailImage === "") {
                var placeHolderImage = 'images/trailplaceholder.jpg'
                addRow(placeHolderImage, trailName, trailRating, trailDifficulty, trailCondition);
            } else {
                addRow(trailImage, trailName, trailRating, trailDifficulty, trailCondition);
            }
        }
    })
}
// getTrails();

// **************************************************
// Function to add trail data to page
// Add new table to page
function newTable() {
    var newTableElement = $("<table>");
    $(newTableElement).attr("id", "results-table");
    $("#table-body").append(newTableElement);

    var tableHeaderRow = $("<tr>");
    $(tableHeaderRow).attr("id", "table-header-row");
    $(newTableElement).append(tableHeaderRow);

    var newImageHeader = $("<th>");
    $(newImageHeader).attr("class", "tableHeader")
    $(newImageHeader).attr("id", "table-image-header")
    $(tableHeaderRow).append(newImageHeader);

    var newNameHeader = $("<th>");
    $(newNameHeader).attr("class", "tableHeader");
    $(newNameHeader).attr("id", "table-name-header");
    $(newNameHeader).text("Trail Name");
    $(tableHeaderRow).append(newNameHeader);

    var newRatingHeader = $("<th>");
    $(newRatingHeader).attr("class", "tableHeader");
    $(newRatingHeader).attr("id", "table-rating-header");
    $(newRatingHeader).text("Rating");
    $(tableHeaderRow).append(newRatingHeader);

    var newDifficultyHeader = $("<th>");
    $(newDifficultyHeader).attr("class", "tableHeader");
    $(newDifficultyHeader).attr("id", "table-difficulty-header");
    $(newDifficultyHeader).text("Difficulty");
    $(tableHeaderRow).append(newDifficultyHeader);

    var newConditionHeader = $("<th>");
    $(newConditionHeader).attr("class", "tableHeader");
    $(newConditionHeader).attr("id", "table-condition-header");
    $(newConditionHeader).text("Current Condition");
    $(tableHeaderRow).append(newConditionHeader);
}

function addRow(newImage, newName, newRating, newDifficulty, newConditionStatus) {
    // Add new row to table
    var newRow = $("<tr>")
    $("#results-table").append(newRow);

    // Add trail image to table row
    var trailImage = $("<td>");
    trailImage.attr("class", "trailImage");
    var trailImageElement = $("<img>")
    $(trailImageElement).attr("src", newImage);
    $(trailImage).append(trailImageElement);
    $(newRow).append(trailImage);

    // Add Trail Name to table row
    var trailName = $("<td>");
    trailName.attr("class", "trailName");
    $(newRow).append(trailName);
    $(trailName).text(newName);

    // Add Trail Rating to table row
    var trailRating = $("<td>");
    trailRating.attr("class", "trailRating");
    $(newRow).append(trailRating);
    $(trailRating).text(newRating);

    // Add Trail Difficulty to table row
    var trailDifficulty = $("<td>");
    trailDifficulty.attr("class", "trailDifficulty");
    $(newRow).append(trailDifficulty);
    $(trailDifficulty).text(newDifficulty);

    // Add Trail Condition Status to table row
    var trailConditionStatus = $("<td>");
    trailConditionStatus.attr("class", "trailConditionStatus");
    $(newRow).append(trailConditionStatus);
    $(trailConditionStatus).text(newConditionStatus);
};


// **************************************************
// On click of "Find a Hike Near Me: Search" button
$("#find-hike-button").click(function () {
    $("#table-body").empty(); // Empty tabe-body to prevent multiple button clicks from re-displaying table data
    getTrails();
});

// **************************************************
// https://developers.google.com/maps/documentation/javascript/tutorial
// Google API Key: AIzaSyDpotG2jYwhChLgDUnmlaSt4C1Wt2tlJM4

// Google Maps JavaScript API Tutorial: https://www.youtube.com/watch?v=Zxf1mnP5zcw
// Shows how to create loop to add markers

var map;
function initMap() {
    // Map otions
    var options = {
        center: { lat: 35.8456, lng: -86.3903 },
        zoom: 10,
    }
    // New map
    map = new google.maps.Map(document.getElementById('directions-map'), options);
    // Add marker for User's current location
    addMarker({ lat: 35.9828, lng: -86.5186 });
    // Add marker for trail selected
    addMarker({ lat: 35.8456, lng: -86.3903 })
    // Function to add new markers on map
    function addMarker(coords) {
        new google.maps.Marker({
            position: coords,
            map: map,
            icon: 'images/hiker-icon.png'
        });
    }
}

// ********** DISTANCE API **********
// function getDistance() {
// // Set origin (current location)
// var origin = new google.maps.LatLng(35.9828,-86.5186);
// // Set destination (trail selected)
// var destination = new google.maps.LatLng(35.8456,-86.3903);

// var service = new google.maps.DistanceMatrixService();
// service.getDistanceMatrix(
//     {
//         origins: [origin],
//         destinations: [destination],
//         travelMode: "DRIVING",
//         unitSystem: google.maps.UnitSystem.IMPERIAL,
//     });
//     console.log("distance...",service)
// }


// ********* DIRECTIONS API **********
// TO-DO: "center", "start", and "end" are still hardcoded- replace values w/ userLocation and trail selected ******
var directionsDisplay;
var directionsService;
function getDirections() {
    console.log(userLatitude, userLongitude);
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsService = new google.maps.DirectionsService();
    var userLocation = new google.maps.LatLng(41.850033, -87.7000523);
    var mapOtions = {
        zoom: 7,
        center: userLocation
    }
    directionsMap = new google.maps.Map(document.getElementById("directions-canvas"), mapOtions);
    directionsDisplay.setMap(directionsMap);
    directionsDisplay.setPanel(document.getElementById("directions-steps"));
    calcRoute();
}

function calcRoute() {
    var start = new google.maps.LatLng(userLatitude, userLongitude);
    var end = new google.maps.LatLng(41.850033, -87.7000523)
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
        }
    });
}

// ******** CODE FOR API CALLBACK FUNCTION IN HTML ***************
function initialize() {
    getUserIPLocation();

    // getDistance();
    // getDirections();

}

var myObj = { //object
    test: 4,
    test2: function() { //method
        test = 5;
        console.log(test);
    }
}

myObj.test2()

