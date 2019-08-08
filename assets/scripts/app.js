<<<<<<< HEAD
/// <reference path="../typings/globals/jquery/index.d.ts" />


=======
// ###################### Global Variables ##########################################
// variable for holding user selected search radius
var distanceInput;

var searchArea = [29.7604,-95.3698]; //needs to be a latlng generated from user inputted zipcode

// arrays of gplaces types organized by user search options
const nightTypes = ["bar", "bakery", "casino", "night_club", "stadium", "bowling_alley", "art_gallery", "movie_theater"];
const dayTypes = ["amusement_park", "aquarium", "art_gallery", "bowling_alley", "cafe", "campground", "park", "museum", "stadium"];
const outdoorTypes = ["amusement_park", "campground", "park"];
const allTypes = ["amusement_park", "aquarium", "art_gallery", "bar", "bowling_alley", "cafe", "campground", "casino", "movie_theater", "museum", "night_club", "park", "restaurant", "stadium"];

//############################## App Logic #############################################
>>>>>>> a8e6fb28fef110135295fdced4681ef8d3c97b46
// Start logic after page has loaded
$(document).ready(function () {

    // Materialize initializations
    init();


    // Handle search button click events
    $(document).on("click", "#search-btn", search);

    // Handle go button click events
    $(document).on("click", "#go-btn", generateItinerary);
});

function init() {

    // Initialize input character counting
    $('input#zip-input').characterCounter();

    // Initialize date pickers
    $('.datepicker').datepicker({
        autoClose: true,
        defaultDate: Date.now(),
        setDefaultDate: true
    });

    // Initialize modals
    $('.modal').modal();

    // Intialize select fields
    $('select').formSelect();
}
// #################################   API Info ##########################################
//yelp
const yelpID = "8tbFFNcnX4YcPxbNA7DwBw"
const yelpApiKey = "231r7Ia-ZXGh5J9wW4MA3DBGzycWROrufJz0I3wD_H1uCf16dba1IkRfPGyCzOSc9Cs8IbCyVMJcVT7oA0efxI756ydSvCXUA6pLTFyaRrjR3OgJzETvz68qRxdKXXYx"

// ################################# Google Places API Functions  #############################

// function to convert user input from miles to meters
function radiusConverter(distanceMi) {
    return distanceMi * 1609.34;
}

// function creats a request for API call 
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
        console.log(results)
        console.log(results[0].name, results[0].vicinity, results[0].opening_hours.isOpen())
        var name;
        var location;
        var type;
        var icon;
        var gSearchResultsARR = [];
        
        for (var i = 0; i<results.length; i++) {
            currentResult = results[i];

            name = currentResult.name;
            location = currentResult.vicinity;
            type = currentResult.types;
            icon = currentResult.icon;

            var gSearchResultOBJ = {
                name: name,
                location: location,
                type: type,
                icon: icon,
            }
            gSearchResultsARR.push(gSearchResultOBJ);
        }
        console.log(gSearchResultsARR);
        return gSearchResultsARR;
    });
};

//##################################### APP Functions #################################################

function search(event) {
    event.preventDefault();
<<<<<<< HEAD
 
=======

    
    // gets distance from user.  should probably be incorporated into another function
    distanceInput = $("#range-filter").formSelect('getSelectedValues')[0];
    //creates a radius in meters for the gPlacesSearch function call. also will probably end up somewhere else
    var radiusInMeters = radiusConverter(distanceInput);
    gPlacesSearch(searchArea[0], searchArea[1], ['restaurant'], radiusInMeters);


>>>>>>> a8e6fb28fef110135295fdced4681ef8d3c97b46
    // TODO
}

function generateItinerary(event) {
    event.preventDefault();

    // TODO
}
