// #################################   API Info ##########################################


// Songkick
const songkickApiKey = "&apikey=OJjdV1C71cGFN7Nj";

// ############################### Zipcode to LatLng API  ###############################
//converts zipcode to latitude and longitude for apis
function getLatLng (zipcode) {
    var zipcodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+ zipcode +"&key=AIzaSyCBjqQBqpsTRLKM_9Y0bYVCWNQVQwrve6o"
    var apiPromise = $.ajax({
        url: zipcodeURL,
        method: 'GET'
    }).then(function (data) {
        var geocodedZipObj = data.results[0].geometry.location;

        searchAreaSongkick = `${geocodedZipObj.lat},${geocodedZipObj.lng}`
        
        searchAreaARR = [geocodedZipObj.lat, geocodedZipObj.lng];

        return true;
    });
    return apiPromise;
}


// ############################### Google Places API Functions ###############################
//global variable 
var gSearchResultsARR = [];

/**
 * Convert input from miles to meters
 */
function radiusConverter(distanceMi) {
    return distanceMi * 1609.34;
}

/**
 * Creates a request for Google Places API call 
 */
function radiusConverter(distanceMi) {
    return distanceMi * 1609.34;
}

/**
 *  Creates a request for Google Places API call 
 */
function gPlacesSearch(lat, lng, types, radius) {
    var place = new google.maps.LatLng(lat, lng);

    var map = new google.maps.Map(document.getElementById('map'), {
        center: place,
        zoom: 15
    });

    var request = {
        location: place,
        radius: radius,
        type: types,
    };

    //creates a google places service object to search
    var service = new google.maps.places.PlacesService(map);

    //uses google places nearby search method to generate an API call and return a customized array of results
    service.nearbySearch(request, function (results, status) {
        if (status !== "OK") {
            console.log(`Error: ${status}`);
            return;
        }
        console.log(results);
        var name;
        var location;
        var type;
        var icon;
        var rating;
        var placeId;
        var address;
        var gSearchResultOBJ;

        for (var i = 0; i < results.length; i++) {
            currentResult = results[i];

            name = currentResult.name;
            location = currentResult.vicinity;
            type = currentResult.types;
            icon = currentResult.icon;
            rating = currentResult.rating;
            placeId = currentResult.id;
            address = currentResult.vicinity;
            photo = currentResult.photos[0].getUrl()

            gSearchResultOBJ = {
                name: name,
                location: location,
                type: type,
                icon: icon,
                rating: rating,
                id: placeId,
                address: address,
                photo: photo,
            }
            if (gSearchResultOBJ.type.includes("lodging")) {
                return;
            }
            else {
                searchResults.push(gSearchResultOBJ);
                cardTemplate(searchResults.length - 1);
            }
        };
    });
};

//################################## Songkick API Functions ###################################
//global variables
var searchAreaSongkick = ""; //string that is updated with latlng generated from user inputted zipcode
dateString = moment().format('YYYY-MM-DD'); //date in form YYYY-MM-DD

//function does an api call to get songkick metro id from latlng. then calls function to do upcoming events search
function musicSearch() {
    var locationURL = "https://api.songkick.com/api/3.0/search/locations.json?" + songkickApiKey + "&location=geo:" + searchAreaSongkick;

    $.ajax({
        url: locationURL,
        method: 'GET'
    }).then(function (data) {
        var metroID = data.resultsPage.results.location[0].metroArea.id;

        var upcomingMusicURL = "https://api.songkick.com/api/3.0/metro_areas/" + metroID + "/calendar.json?&min_date=" + dateString + "&max_date=" + dateString + songkickApiKey;

        getUpcomingMusic(upcomingMusicURL);

    });

};

function getUpcomingMusic(url) {

    $.ajax({
        url: url,
        method: 'GET'
    }).then(function (data) {

        var result = data.resultsPage.results.event;
        console.log(result);
        for (var i = 0; i < 10; i++) {
            var currentResult = result[i];
            var name = currentResult.displayName;
            var type = currentResult.type;
            var time = currentResult.start.date + "at: " + currentResult.start.time;
            var info = currentResult.uri;
            var venue = currentResult.venue.displayName;

            var songkickResultsOBJ = {
                name: name,
                type: type,
                venue: venue,
                info: info,
                time: time,
                icon: "./assets/images/ticket-concert-512.png",
                photo: "./assets/images/concert-pic.jpg",

            }
            
            searchResults.push(songkickResultsOBJ);

            cardTemplate(searchResults.length - 1);
        }
    });
}