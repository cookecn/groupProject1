// *************************************************
//Semantic UI Animation Scripts

$('.ui.dropdown')
    .dropdown();

$('.ui.rating')
    .rating();

// **************************************************
// IPGeolocation API (used to get geolocation of IP accessing the site)
// Documentation @ https://ipgeolocation.io/documentation/ip-geolocation-api-201812061140
var userCity;
var userLatitude;
var userLongitude;

// function getUserIPLocation() {
//     var ipGeoLocationAPIKey = "13254077d97f4249a0a6d6fd72053172";
//     var queryURL = "https://api.ipgeolocation.io/ipgeo?apiKey=" + ipGeoLocationAPIKey + "&fields=geo";
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//         userCity = response.city;
//         userIPLatitude = response.latitude;
//         userIPLongitude = response.longitude;
//         console.log(response);
//         console.log("Lat: ", userIPLatitude);
//         console.log("Long: ", userIPLongitude);
//     })
// }
// Call function
// getUserIPLocation();

// **************************************************

// *** TO-DO: Update function to pull User's lat & long; currently hard-coded
function getTrails() {
    var hikingProjectAPIKey = "200428466-2a448b50cc7ceff93b323bcffe658d58";
    // getUserIPLocation();
    // var userLatitude = userIPLatitude;
    // var userLongitude = userIPLongitude;
    var maxDistance = "50" // Max distance in miles, default = 30, max = 200
    var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + "36.144700" + "&lon=" + "-86.804050" + "&maxDistance=" + maxDistance + "&key=" + hikingProjectAPIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var numberOfTrails = response.trails.length;
        console.log(response);
        for (i = 0; i < numberOfTrails; i++) {
            createNewCard(response);
        }
        // SemanticUI Hover Action has to be called here to work
        $('.special.cards .image').dimmer({
            on: 'hover'
        });
    })
}

// Add Cards
function createNewCard(response) {
    var newCard = $("<div class='red raised card' data-lat='" + response.trails[i].latitude + "' data-long='" + response.trails[i].longitude + "'><div class='blurring dimmable image'><div class='ui dimmer'><div class='content'><div class='center'><div class='ui inverted button'>Get Directions</div></div></div></div><div class='backgroundimg image' style='background-image: url(" + response.trails[i].imgMedium + ")'></div></div><div class='content'><h3>" + response.trails[i].name + "</h3><div class='meta'><span class='description'>" + response.trails[i].summary + "</span></div></div><div class='extra content'>Rating: <div class='ui star rating' data-rating='" + Math.round(response.trails[i].stars) + "'></div></div></div>");

    $("#card-section").append(newCard);

}



// **************************************************
// On click of "Find a Hike Near Me: Search" button
$("#find-hike-button").click(function () {
    getTrails();
    $('#selection-box').hide();
});

// **************************************************
// Directons
// https://developers.google.com/maps/documentation/javascript/tutorial
// Google API Key: AIzaSyDpotG2jYwhChLgDUnmlaSt4C1Wt2tlJM4

// Google Maps JavaScript API Tutorial: https://www.youtube.com/watch?v=Zxf1mnP5zcw
// Shows how to create loop to add markers

var map;

function initMap() {
    // Map otions
    var options = {
        center: {
            lat: 35.8456,
            lng: -86.3903
        },
        zoom: 10,
    }
    // New map
    map = new google.maps.Map(document.getElementById('directions-map'), options);

    // Add marker for User's current location
    addMarker({
        lat: 35.9828,
        lng: -86.5186
    });

    // Add marker for trail selected
    addMarker({
        lat: 35.8456,
        lng: -86.3903
    })

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
// // Set origin (current location)
// var origin = new google.maps.LatLng(35.9828,-86.5186);
// // Set destination (trail selected)
// var destination = new googlemaps.LatLng(35.8456,-86.3903);

// var service = new google.maps.DistanceMatrixServce();
// service.getDistranceMatrix(
//     {
//         origins: [origin],
//         destinations: [destination],
//         travelMode: "DRIVING",
//         unitSystem: google.maps.UnitSystem.IMPERIAL,

//     }
//     )
//     console.log("distance...",service)


// ********** DIRECTIONS API **********
// TO-DO: "center", "start", and "end" are still hardcoded- replace values w/ userLocation and trail selected ******
var directionsDisplay;
var directionsService;

function getDirections() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsService = new google.maps.DirectionsService();
    var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    var mapOtions = {
        zoom: 7,
        center: chicago
    }
    directionsMap = new google.maps.Map(document.getElementById("directions-canvas"), mapOtions);
    directionsDisplay.setMap(directionsMap);
    directionsDisplay.setPanel(document.getElementById("directions-steps"));
    calcRoute();
}

function calcRoute() {
    var start = new google.maps.LatLng(41.850033, -87.6500523);
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