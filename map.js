// *************************************************
//Semantic UI Animation Scripts

$('.ui.dropdown')
    .dropdown();

$('.ui.rating')
    .rating();

new Glide('.glide', {
    type: 'slider',
    autoplay: false,
    arrows: 'body',
}).mount()


var userCity;
var userLatitude;
var userLongitude;
var destinationLatitude;
var destinationLongitude;

// **************************************************
// IPGeolocation API (used to get geolocation of IP accessing the site)
// Documentation @ https://ipgeolocation.io/documentation/ip-geolocation-api-201812061140
getUserIPLocation();
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
    });
}

// Call function
// getUserIPLocation();

// **************************************************
// *** TO-DO: Update function to pull User's lat & long; currently hard-coded
function getTrails() {
    // getUserIPLocation();
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
    let newCard = $("<ul class='glide__slides'><li class='glide__slide'><div class='red raised card slide-item item"+[i]+"' data-lat='" + response.trails[i].latitude + "' data-long='" + response.trails[i].longitude + "'><div class='blurring dimmable image'><div class='ui dimmer'><div class='content'><div class='center'><div class='ui inverted button'>Get Directions</div></div></div></div><div class='backgroundimg image' style='background-image: url(" + response.trails[i].imgMedium + ")'></div></div><div class='content'><h3>" + response.trails[i].name + "</h3><div class='meta'><span class='description'>" + response.trails[i].summary + "</span></div></div><div class='extra content'>Rating: <div class='ui star rating' data-rating='" + Math.round(response.trails[i].stars) + "'></div></div></div></li></ul>");

    let testItem = $("<ul class='glide__slides'><li class='glide__slide'><h1>HELLO</h1></li></ul>") 
    $(".hike-section").append(newCard);
    
   

}


// **************************************************
// On click of "Find a Hike Near Me: Search" button
$("#find-hike-button").click(function () {
    $(".segment").hide(1000);
    $("#results-table").show(2000);

    getTrails();
    $('#selection-box').hide();
});

// $(".select-buttons").click(function() {
//     // destinationLongitude = $(this).attr("data-traillong");
//     // destinationLatitude = $(this).attr("data-traillat");
//     console.log("did it work...");
// })

// **************************************************
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
    // console.log("test***",lat," ...",lng);
    console.log(userLatitude, userLongitude);
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsService = new google.maps.DirectionsService();
    
    var userLocation = new google.maps.LatLng(userLatitude, userLongitude);
    var mapOptions = {

        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: userLocation
    }
    directionsMap = new google.maps.Map(document.getElementById("directions-canvas"), mapOptions);
    directionsDisplay.setMap(directionsMap);
    directionsDisplay.setPanel(document.getElementById("directions-steps"));
    calcRoute();
}

function calcRoute() {
    // console.log("global?",destinationLatitude);

    var start = new google.maps.LatLng(userLatitude, userLongitude);
    var end = new google.maps.LatLng(40.7128,-74.0060);

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
    // calcRoute();
    getDirections();
    console.log("successss");
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

