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

// GPlaces search results
let gplacesResults = [];

// Holds all activities in the cart
let cart = [];

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

    //Handle reset button click events
    $(document).on("click", "#reset-btn", resetFilters);
    
    // Handle add to cart click events
    $(document).on("click", ".add-cart", addCartEvent);

    $(document).on("click", ".clear-btn", removeActivity);
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

function resetFilters() {
    $("input[type='checkbox']").prop("checked", true);
   //TODO make range filter reset
};
/**
 * Performs the querying actions using filter settings
 */
function searchEvent(event) {
    event.preventDefault();

    // Obtain zip code and date values

    let zip = $("#zip-input").val() || $("#zip-input-mobile").val();

    let date = M.Datepicker.getInstance($("#date-input")).date ||
        M.Datepicker.getInstance($("#date-input-mobile")).date;

    dateString = moment(date).format('YYYY-MM-DD');

    //converts zip to latitude and longitude for apis
    getLatLng(zip).then(function () {
        //clears old results and performs google places api call and updates dom
        $("#result-container").empty();
        multiTypeSearch();
        console.log(searchResults);
    })
}

/**
 * Generates the itinerary from the selected activities
 */
function goEvent(event) {
    event.preventDefault();

    // Check that cart is not empty
    if (!cart.length > 0) {
        return;
    }

    let main = $("main");

    // Clear main content area
    main.emtpy();

    // Generate a new intinerary
    generateItinerary();
}

/**
 * TODO
 */
function addCartEvent(event) {
    event.preventDefault();

    // Obtain reference to cart
    let cartList = $("#cart-list");

    // Clear empty message in cart list
    if (cart.length === 0) {
        cartList.empty();
    }

    // Get activity that was clicked
    let index = $(this).attr("data-index");
    let activity = gplacesResults[index];

    // Check if activity is already in cart, if not then add it to the cart array
    if (cart.includes(activity)) {
        return;
    }

    // Add activity to cart array
    cart.push(activity);

    // Add activity to cart list
    appendCartActivity(index, activity);
}

/**
 * TODO
 */
function removeActivity(event) {
    event.preventDefault();

    console.log("Remove clicked");

    // Get activity that to remove from the cart
    let resIndex = $(this).attr("data-index");
    let activity = gplacesResults[resIndex];

    // Get index of the activity in the cart
    let cartIndex = cart.indexOf(activity);

    // Remove from cart array
    cart.splice(cartIndex, 1);

    // Clear cart list
    $("#cart-list").empty();

    // Check if cart is empty
    if (cart.length === 0) {
        // Display empty message
        $("#cart-list").append(
            $("<p>").addClass("center-align").text("Empty")
        );
    } else {
        // Repopulate cart
        for (var i = 0; i < cart.length; i++) {
            appendCartActivity(i, cart[i]);
        }
    }
}

/**
 * TODO
 */
function appendCartActivity(index, activity) {
    // Create text element
    let text = $("<span>").text(activity.name);

    // Create clear button
    let btn = $("<a>")
        .addClass("secondary-content btn-flat clear-btn red-text")
        .attr("data-index", index)
        .html('<i class="material-icons">clear</i>');

    // Create list item and append text and clear button
    let li = $("<li>")
        .addClass("collection-item")
        .attr("data-index", index)
        .append(text)
        .append(btn);

    // Append list item to the cart list
    $("#cart-list").append(li);
}