/// <reference path="../typings/globals/jquery/index.d.ts" />

// ###################### Global Variables ##########################################
//Array holding search results from all APIs 
var searchResults = [];

// variable for holding user selected search radius
var distanceInput;

var searchAreaARR = []; //needs to be a latlng generated from user inputted zipcode

// Create filter variables and initalize them with default values
let filterRange = 50;
let filterDay = true;
let filterNight = true;
let filterFood = true;
let filterMusic = true;
let filterOutdoor = true;

// arrays of gplaces types organized by user search options
const nightTypes = ["night_club", "bar", "bowling_alley", "art_gallery", "movie_theater"];
const dayTypes = ["amusement_park", "art_gallery", "bowling_alley", "cafe", "campground", "park", "museum", "aquarium"];
const outdoorTypes = ["amusement_park", "campground", "park"];
const allTypes = ["amusement_park", "art_gallery", "bar", "bowling_alley", "cafe", "campground", "casino", "movie_theater", "museum", "night_club", "park", "aquarium"];
const foodType = ["restaurant"];


//Array of google search types to use for search
var typesArr = allTypes;

//############################## Search Logic #############################################
function setTypesforGS() {
    let checkArr = [{ checked: filterDay, filter: dayTypes }, { checked: filterNight, filter: nightTypes }, { checked: filterFood, filter: foodType }, { checked: filterOutdoor, filter: outdoorTypes }];

    if (filterDay && filterNight && filterFood && filterMusic && filterDay) {
        typeArr = allTypes;

    }
    else {
        typesArr = [];
        for (var i = 0; i < checkArr.length; i++) {
            if (checkArr[i].checked) {

                typesArr = [...typesArr, ...checkArr[i].filter];
            }
        }
    }
}

function multiTypeSearch() {
    if (filterMusic) {
        musicSearch();
    }
    for (var i = 0; i < typesArr.length; i++) {
        type = [typesArr[i]];
        let newArr = gPlacesSearch(searchAreaARR[0], searchAreaARR[1], type, radiusConverter(filterRange));

    }
}

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

    // //
    // $(document).on("change", "#zip-input", zipEvent);

});

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
    //Changes google api search types according to selection boxes
    setTypesforGS();
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
    // let date = M.Datepicker.getInstance($("#date-input")).toString() ||
    //     M.Datepicker.getInstance($("#date-input-mobile")).toString();
    let date = M.Datepicker.getInstance($("#date-input")).date;
    dateString = moment(date).format('YYYY-MM-DD');
    //converts zip to latitude and longitude for apis
    getLatLng(zip).then(function () {
        //clears old results and performs google places api call and updates dom
        $("#result-container").empty();
        multiTypeSearch();
        console.log(searchResults);
    })

    
    // TODO
}

/**
 * 
 */
function goEvent(event) {
    event.preventDefault();

    // TODO
}