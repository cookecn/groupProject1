
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
        userIPLatitude = response.latitude;
        userIPLongitude = response.longitude;
        console.log(response);
        console.log(userLongitude);
})}
// Call function
getUserIPLocation();

// **************************************************

// *** TO-DO: Update function to pull User's lat & long; currently hard-coded
function getTrails() {
    var hikingProjectAPIKey = "200428466-2a448b50cc7ceff93b323bcffe658d58";
    getUserIPLocation();
    var userLatitude = userIPLatitude;
    var userLongitude = userIPLongitude;
    var maxDistance = "50" // Max distance in miles, default = 30, max = 200
    var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + userLatitude + "&lon=" + userLongitude + "&maxDistance=" + maxDistance + "&key=" + hikingProjectAPIKey; 
        $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var numberOfTrails = response.trails.length;
        console.log(response);
        newTable();
        for (i=0; i<numberOfTrails; i++) {
            var trailImage = response.trails[i].imgSqSmall;
            var trailName = response.trails[i].name;
            var trailRating = response.trails[i].stars;
            var trailDifficulty = response.trails[i].difficulty;
            var trailCondition = response.trails[i].conditionStatus;
            if (trailImage === "") {
                var placeHolderImage = 'images/trailplaceholder.jpg'
                addRow(placeHolderImage,trailName,trailRating,trailDifficulty,trailCondition);
                } else {
                    addRow(trailImage,trailName,trailRating,trailDifficulty,trailCondition);
                }
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
    var trailImageElement = $("<img>")
    $(trailImageElement).attr("src",newImage);
    $(trailImage).append(trailImageElement);
    $(newRow).append(trailImage);

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
    $("#table-body").empty(); // Empty tabe-body to prevent multiple button clicks from re-displaying table data
    getTrails();
});

// **************************************************
// Directons
// https://www.mapquestapi.com/d irections/v2/route?key=KEY&from=Denver%2C+CO&to=Boulder%2C+CO&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false
// API Docs @ https://developer.mapquest.com/documentation/common/forming-locations/
