// Create filter variables and initalize them with default values
let filterRange = 50;
let filterDay = true;
let filterNight = true;
let filterFood = true;
let filterMusic = true;
let filterOutdoor = true;

/**
 * Start logic after page has loaded
 */
$(document).ready(function () {
    // Materialize initializations
    initMaterialize();

    // Handle checkbox click events
    $(document).on("click", "input[type='checkbox']", checkboxEvent);

    // Handle search button click events
    $(document).on("click", "#search-btn", searchEvent);

    // Handle go button click events
    $(document).on("click", "#go-btn", goEvent);
});

/**
 * Initialize all materialize objects on first load
 */
function initMaterialize() {
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
 * Performs the querying actions using filter settings
 */
function searchEvent(event) {
    event.preventDefault();

    // Obtain zip code and date values
    let zip = $("#zip-input").val();
    let date = $("#date-input").val();

    // TODO
}

/**
 * 
 */
function goEvent(event) {
    event.preventDefault();

    // TODO
}
