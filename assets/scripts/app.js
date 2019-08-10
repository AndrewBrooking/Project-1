
/// <reference path="../typings/globals/jquery/index.d.ts" />
// ###################### Global Variables ##########################################
var  template;
// variable for holding user selected search radius
var distanceInput;

var searchArea = [29.7604, -95.3698]; //needs to be a latlng generated from user inputted zipcode

// Create filter variables and initalize them with default values
let filterRange = 50;
let filterDay = true;
let filterNight = true;
let filterFood = true;
let filterMusic = true;
let filterOutdoor = true;

// arrays of gplaces types organized by user search options
const nightTypes = ["bar", "bakery", "casino", "night_club", "stadium", "bowling_alley", "art_gallery", "movie_theater"];
const dayTypes = ["amusement_park", "aquarium", "art_gallery", "bowling_alley", "cafe", "campground", "park", "museum", "stadium"];
const outdoorTypes = ["amusement_park", "campground", "park"];
const allTypes = ["amusement_park", "aquarium", "art_gallery", "bar", "bowling_alley", "cafe", "campground", "casino", "movie_theater", "museum", "night_club", "park", "restaurant", "stadium"];

//############################## App Logic #############################################

/**
 * Start logic after page has loaded
 */
$(document).ready(function () {
    // Materialize initializations
    initMaterialize();

    // Handle checkbox click events
    $(document).on("click", "input[type='checkbox']", checkboxEvent);

    // Handle range filter change events
    $(document).on("change", "#range-filter", rangeEvent);

    // Handle search button click events
    $(document).on("click", "#search-btn", searchEvent);

    // Handle go button click events
    $(document).on("click", "#go-btn", goEvent);
});

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
       // console.log(results[0].name, results[0].vicinity, results[0].opening_hours.isOpen())
        var name;
        var location;
        var type;
        var icon;
        var rating;
        var open;
        var placeId;
         var gSearchResultOBJ;
        var gSearchResultsARR = [];
        
        for (var i = 0; i<results.length; i++) {
            currentResult = results[i];
console.log(results[i].name)
            name = currentResult.name;
            location = currentResult.vicinity;
            type = currentResult.types;
            icon = currentResult.icon;
            rating = currentResult.rating;
            open = currentResult.opening_hours.open_now;
            placeId = currentResult.id;
           
             gSearchResultOBJ = {
                name: name,
                location: location,
                type: type,
                icon: icon,
                rating: rating,
                open: open,
                id: placeId,
            }
            
         
            
            gSearchResultsARR.push(gSearchResultOBJ);
            // Call cardTemplate function
         // GENERATE CARD TEMPLATE FUNCTION
      
         function cardTemplate(){
   
      
            template = $("<div>");
             template.addClass("col s12 m7 black-text");
             template.html(`
             
             <div class="card horizontal">
             <div class="card-image">
             </div>
             <div class="card-stacked">
                 <div class="card-content">
                     <span class="card-title activator grey-text text-darken-4">`+gSearchResultOBJ.name+`<i
                             class="material-icons right">more_vert</i></span>
                     <div class="row">
                         <!-- Map Div-->
                         <div class="col s12 m4 l4 info-boxes center-align">
                             <img class="materialboxed" width="150"
                                 src="`+currentResult.photos[0] +`">
                         </div>
                         <!--Place Info-->
                         <div class="col s12 m4 r l4 info-boxes">
                             <div class="row">
                                 <div class="col s12 info">
                                     <h5></h5>
                                 </div>
                                 <div class="col s12 info">`+gSearchResultOBJ.location+`</div>
                                 <div class="col s12 info">Rating `+gSearchResultOBJ.rating+`</div>
                             </div>
                         </div>
                         <!-- Right side links and opening and closing time-->
                         <div class="col s12 m4  center-align l4 info-boxes">
                             <div class="row">
                                 <div class="col s12 info">
                                     <p class="hours"> </p>
                                     
                                 </div>
                                 <div class="col s12 info">Visit site</div>
                                 <div class="col s12 info"></div>
                             </div>
                         </div>
                     </div>
                 </div>
                 <!-- Card Button to Show More Info -->
                 <div class="card-action">
                     <button class=" btn activator red">Details</button>
                     <a class=" add-basket btn-floating  btn-small waves-effect waves-light red"><i class="material-icons">add</i></a>
                 </div>
             </div>
             <!-- Card Revel  -->
             <div class="card-reveal">
                 <span class="card-title grey-text text-darken-4">Images<i
                         class="material-icons right">close</i></span>
                 <div class="row">
                     <div class="col s4 m3 l3">
                         <img class="materialboxed" width="150"
                             src="https://images.unsplash.com/photo-1476385822777-70eabacbd41f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60">
                     </div>
                     <div class="col s4 m3 l3">
                         <img class="materialboxed" width="150"
                             src="https://images.unsplash.com/photo-1476385822777-70eabacbd41f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60">
                     </div>
                     <div class="col s4 m3 l3">
                         <img class="materialboxed" width="150"
                             src="https://images.unsplash.com/photo-1476385822777-70eabacbd41f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60">
                     </div>
                     <div class="col s4 m3 l3">
                         <img class="materialboxed" width="150"
                             src="https://images.unsplash.com/photo-1476385822777-70eabacbd41f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60">
                     </div>
                     <div class="col s4 m3 l3">
                         <img class="materialboxed" width="150"
                             src="https://images.unsplash.com/photo-1476385822777-70eabacbd41f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60">
                     </div>
                 </div>
             </div>
         </div>
         
         
             
             `)
             $("#result-container").append(template)
         }
           cardTemplate();
        
        }
       // console.log(gSearchResultsARR);
        return gSearchResultsARR;
    });
};


// #################################   API Info ##########################################

//yelp
const yelpID = "8tbFFNcnX4YcPxbNA7DwBw"
const yelpApiKey = "231r7Ia-ZXGh5J9wW4MA3DBGzycWROrufJz0I3wD_H1uCf16dba1IkRfPGyCzOSc9Cs8IbCyVMJcVT7oA0efxI756ydSvCXUA6pLTFyaRrjR3OgJzETvz68qRxdKXXYx"


//##################################### APP Functions #################################################

/**
 * Initialize all materialize objects on first load
 */
function initMaterialize() {
    // Initialize input character counting
    $('input#zip-input, input#zip-input-mobile').characterCounter();

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

    // Initialize sidenav components
    $('.sidenav').sidenav();
}

/**
 * Changes the value of a filter variable when a checkbox is checked or unchecked
 */
function checkboxEvent(event) {
    // Obtain id of checkbox that was clicked
    let id = $(this).attr("id");

    // Obtain current status of the checkbox
    let status = $(this).prop("checked");

    // Set corresponding filter value to the new value
    switch (id) {
        case "day-filter":
            filterDay = status;
            break;
        case "night-filter":
            filterNight = status;
            break;
        case "food-filter":
            filterFood = status;
            break;
        case "music-filter":
            filterMusic = status;
            break;
        case "outdoor-filter":
            filterOutdoor = status;
            break;
    }
}

/**
 * Sets the range filter to the selected value
 */
function rangeEvent(event) {
    filterRange = this.value;
}

/**
 * Performs the querying actions using filter settings
 */
function searchEvent(event) {
    event.preventDefault();

    // Obtain zip code and date values

    let zip = $("#zip-input").val() || $("#zip-input-mobile").val();
    let date = M.Datepicker.getInstance($("#date-input")).toString() ||
        M.Datepicker.getInstance($("#date-input-mobile")).toString();

    // creates a radius in meters for the gPlacesSearch function call. also will probably end up somewhere else
    var radiusInMeters = radiusConverter(filterRange);
    gPlacesSearch(searchArea[0], searchArea[1], ['restaurant'], radiusInMeters);

    // TODO
}

/**
 * 
 */
function goEvent(event) {
    event.preventDefault();

    // TODO
}
