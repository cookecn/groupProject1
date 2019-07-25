// Declare global variables
var map;
var infoWindow;
var userLatitude;
var userLongitude;
var trailLatitude;
var trailLongitude;

function getTrails() {
    var hikingProjectAPIKey = "200428466-2a448b50cc7ceff93b323bcffe658d58";
    var maxDistance = "50" // Max distance in miles, default = 30, max = 200
    var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + userLatitude + "&lon=" + userLongitude + "&maxDistance=" + maxDistance + "&key=" + hikingProjectAPIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var numberOfTrails = 9;
        for (i = 0; i < numberOfTrails; i++) {
            createNewCard(response);
        }
        // SemanticUI Hover Action has to be called here to work
        $('.special.cards .image').dimmer({
            on: 'hover'
        });
        $('.ui.rating')
            .rating();
    });
}

// **************************************************
// Semantic UI Animation Scripts
$('.ui.dropdown')
    .dropdown();

// **************************************************
// Add Cards
function createNewCard(response) {
    var newCard = $("<div class='red raised card'><div class='blurring dimmable image'><div class='ui dimmer'><div class='content'><div class='center'><div class='ui inverted button trail-button' data-lat='" + response.trails[i].latitude + "' data-lng='" + response.trails[i].longitude + "'>Get Directions</div></div></div></div><div class='backgroundimg image' style='background-image: url(" + response.trails[i].imgMedium + ")'></div></div><div class='content'><h3>" + response.trails[i].name + "</h3><div class='content'><h4>" + response.trails[i].location + "</h4><div class='meta'><span class='description'>" + response.trails[i].summary + "</span></div></div></div><div class='extra content'>Rating: <div class='ui star rating' data-rating='" + Math.round(response.trails[i].stars) + "'></div></div></div>");

    $("#card-section").append(newCard);
}

// **************************************************
// On click of "Find a Hike Near Me: Search" button
$("#find-hike-button").click(function () {
    $(".segment").hide(1000);
    getTrails();
    $('#selection-box').hide();
});

// **************************************************
// On click of "Get Directions" button
$(document).on('click', '.button.trail-button', function () {
    trailLatitude = $(this).data('lat');
    trailLongitude = $(this).data('lng');

});


// **************************************************
// Setup map on page load
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 36.144700,
            lng: -86.804050
        },
        zoom: 14,
        disableDefaultUI: true
    });
    infoWindow = new google.maps.InfoWindow;
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            userLatitude = pos.lat;
            userLongitude = pos.lng;
            map.setCenter(pos);
            var marker = new google.maps.Marker({
                position: pos,
                map: map,
                title: 'You are here'
            });
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

// **************************************************
// Display error if location services fails
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

// **************************************************
// Functions called in HTML as google callback
function initialize() {
    initMap();
}