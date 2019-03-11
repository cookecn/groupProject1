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

https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=YOUR_KEY_HERE

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
        // userCity = response.city;
        // userLatitude = response.latitude;
        // userLongitude = response.longitude;
        console.log(response);
})}
// Call function
getTrails();